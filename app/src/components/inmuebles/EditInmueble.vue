<template>
  <div>
    <h1>Editar Inmueble</h1>
    <div class="row">
      <section class="tabs-to-accordions">
        <ul class="nav nav-tabs d-none d-md-block" id="edit-tabs" role="tablist">
          <li class="nav-item general">
            <a href="#general" class="nav-link active" id="general-tab" data-toggle="tab" role="tab" aria-controls="general" aria-selected="true" v-on:click.prevent.stop="clickTab($event)">
              General
            </a>
          </li>
          <li class="nav-item panel2">
            <a href="#panel2" class="nav-link" id="panel2-tab" data-toggle="tab" role="tab" aria-controls="panel2" aria-selected="false" v-on:click.prevent.stop="clickTab($event)">Tab 2</a>
          </li>
          <li class="nav-item services">
            <a href="#services" class="nav-link" id="services-tab" data-toggle="tab" role="tab" aria-controls="services" aria-selected="false" v-on:click.prevent.stop="clickTab($event)">
              Servicios
            </a>
          </li>
        </ul>

        <div class="accordion tab-content tabs-mode" id="edit-tabs-content">

          <div class="accordion-item toggleType tab-pane active" id="general" role="tabpanel" aria-labelledby="general-tab">
            <a href="#general" class="accordion-title d-md-none" v-on:click.stop.prevent="clickAccordion($event)">
              General
            </a>
            <div class="tab-wrap accordion-content">
              <save-inmueble-form :inmueble="inmueble" :mode="'edit'" v-on:submit="onFormSave"/>
            </div>
          </div>

          <div class="accordion-item toggleType tab-pane" id="panel2" role="tabpanel" aria-labelledby="panel2-tab">
            <a href="#panel2" class="accordion-title d-md-none" data-toggle="tab" v-on:click.stop.prevent="clickAccordion($event)">Accordion 2</a>
            <div class="tab-wrap accordion-content" >
              <h4>Panel 2. Lorem ipsum dolor</h4>
              <p>Commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
            </div>
          </div>

          <div class="accordion-item toggleType tab-pane" id="services" role="tabpanel" aria-labelledby="services-tab">
            <a href="#services" class="accordion-title d-md-none" data-toggle="tab" v-on:click.stop.prevent="clickAccordion($event)">Servicios</a>
            <div class="tab-wrap accordion-content" >
              <services-form :inmueble="inmueble" v-on:submit="onFormSave" />
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInmuebleForm from './SaveInmuebleForm'
import ServicesForm from './ServicesForm'

export default {
  name: 'edit-inmueble',
  components: {
    SaveInmuebleForm, ServicesForm
  },
  data () {
    return {
      inmueble: {}
    }
  },
  computed: mapGetters(['getInmueble']),
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      var _this = this
      this.saveInmueble(inmuebleData)
        .then(() => _this.notifySuccessEdition())
        .catch(() => {
          _this.notifyErrorEdition()
        })
    },
    checkSize () {
      var rwdTabs = this.$el.querySelector('.tab-content')
      var togglType = this.$el.querySelector('.toggleType')
      var tabWrap = this.$el.querySelector('.tab-wrap')

      // xs, sm
      if (window.innerWidth < 768) {
        if (rwdTabs.classList.contains('tabs-mode')) {
          tabWrap.style.display = 'none'
          rwdTabs.classList.remove('tabs-mode')
          rwdTabs.classList.add('accordion')
          togglType.classList.add('accordion-item')
          tabWrap.classList.add('accordion-content')
          rwdTabs.setAttribute('data-accordion', 1)
          togglType.classList.remove('tab-pane')
          this.$el.querySelector('.toggleType.active .tab-wrap').style.display = 'block'
        }
      } else { // md, lg
        if (rwdTabs.classList.contains('accordion')) {
          rwdTabs.removeAttribute('data-accordion')
          rwdTabs.classList.remove('accordion')
          tabWrap.classList.remove('accordion-content')
          togglType.classList.remove('accordion-item')
          rwdTabs.classList.add('tabs-mode')
          togglType.classList.add('tab-pane')
          tabWrap.style.display = ''
        }
      }
    },
    clickAccordion (event) {
      // Avoid this method being triggerd from Tabs
      if (!event.target.classList.contains('accordion-title')) return

      var tabs = this.$el.querySelector('ul.nav-tabs')
      var item = event.target.parentNode
      var tabWrap = item.querySelector('.tab-wrap')
      var sharedId = item.getAttribute('id')

      if (item.classList.contains('active')) {
        item.classList.remove('active')
        tabWrap.style.display = 'none'
        // tabs
        tabs.querySelector('.nav-item a.active').removeAttribute('aria-selected')
        tabs.querySelector('li.' + sharedId).classList.remove('active')
      } else {
        var previousItem = item.parentNode.querySelector('.active')
        if (previousItem) {
          previousItem.classList.remove('active')
          previousItem.querySelector('.tab-wrap').style.display = 'none'
          // tabs
          tabs.querySelector('.nav-item a.active').removeAttribute('aria-selected')
          tabs.querySelector('.nav-item a.active').classList.remove('active')
        }

        item.classList.add('active')
        item.querySelector('.tab-wrap').style.display = 'block'
        // tabs
        tabs.querySelector('.nav-item.' + sharedId + ' a').classList.add('active')
        tabs.querySelector('.nav-item a.active').setAttribute('aria-selected', 'true')
      }
    },
    clickTab (event) {
      var tabs = this.$el.querySelector('.tab-content')
      var item = event.target

      if (!item.classList.contains('active')) {
        var prevTab = item.parentNode.parentNode.querySelector('.active')
        var previousItem = tabs.querySelector('.tab-pane.active')
        item.parentNode.parentNode.querySelector('.active').removeAttribute('aria-selected')
        prevTab.classList.remove('active')
        previousItem.classList.remove('active')
        previousItem.querySelector('.tab-wrap').style.display = 'none'

        var sharedId = event.target.getAttribute('href').replace('#', '')
        var tabToShow = tabs.querySelector('#' + sharedId)
        item.classList.add('active')
        item.setAttribute('aria-selected', 'true')
        tabToShow.classList.add('active')
        tabToShow.querySelector('.tab-wrap').style.display = 'block'
      }
    }
  },
  notifications: {
    notifySuccessEdition: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Inmueble Editado con éxito'
    },
    notifyErrorEdition: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  },
  mounted () {
    var _this = this
    this.getInmueble(this.$route.params.id)
      .then((inmueble) => {
        _this.inmueble = inmueble
      })
    window.addEventListener('resize', this.checkSize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.checkSize)
  }
}
</script>

<style>
.tabs-to-accordions { width: 100%; }
.nav-tabs::after { clear: both; }
.tabs-content { border: 1px solid #e6e6e6; }
.nav-tabs { margin: 0; background: #fefefe; }
.nav-tabs::after, .nav-tabs::before { content: ' '; display: table; }
.nav-tabs.simple > li > a { padding: 0; }
.nav-tabs.simple > li > a:hover { background: 0 0; }
.nav-tabs.vertical > li { width: auto; float: none; display: block;}
.nav-tabs.primary { background: #2199e8; }
.nav-tabs.primary > li > a { color: #fefefe; }
.nav-tabs.primary > li > a:focus, .tabs.primary > li > a:hover { background: #1893e4; }
.tabs-to-accordions .nav-item { float: left;margin-right: 1px; }
.tabs-to-accordions .nav-item > a {
  display: block;
  padding: 1rem;
  line-height: 1;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  background: #e6e6e6;
}
.tabs-to-accordions .nav-item > a:focus, .tabs-to-accordions .nav-item > a:hover,
.tabs-to-accordions .nav-item.active > a, .tabs-to-accordions .nav-item > a[aria-selected=true] {
  background: #fff;
}
.tab-content {
  background: #fefefe;
  transition: all .5s ease;
  border-top: 0;
}
.tab-content.vertical { border: 1px solid #e6e6e6; border-left: 0; }
.tab-pane{ display: none; padding: 1rem; }
.tab-pane.active { display:block; }
.accordion-item.active,
.accordion-item.active .accordion-content { display:block; }
.accordion, .nav-tabs { list-style-type: none; }
.accordion {
  background: #fefefe;
  border-radius: 0;
  margin-left: 0;
}
.accordion .tab-pane { display: block;padding: 0; }
.accordion-title {
  display: block;
  padding: 1rem;
  line-height: 1;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  }
.tab-pane.active .accordion-title, .accordion-title:focus, .accordion-title:hover {
  background-color: #e6e6e6;
}
:last-child > .accordion-title { border-bottom-width: 0; }
.accordion-title::before {
  content: '+';
  position: absolute;
  right: 1rem;
  top: 50%;
  margin-top: -.5rem;
}
.active > .accordion-title::before { content: '–'; }
.accordion-content {
  padding: 1.25rem 1rem;
  display: none;
  border-bottom: 1px solid #e6e6e6;
}
.is-accordion-submenu-parent > a { position: relative; }
.is-accordion-submenu-parent > a::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 6px inset;
  border-color: #2199e8 transparent transparent;
  border-top-style: solid;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1rem;
}
.is-accordion-submenu-parent[aria-expanded=true] > a::after {
  -webkit-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scaleY(-1);
  -ms-transform: scaleY(-1);
  transform: scaleY(-1);
}
</style>
