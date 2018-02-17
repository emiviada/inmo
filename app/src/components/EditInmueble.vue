<template>
  <div>
    <h1>Editar Inmueble</h1>
    <div class="row">
      <section class="tabs-to-accordions">
        <ul class="tabs d-none d-md-block" data-tabs id="edit-tabs">
          <li class="tabs-title general is-active" v-on:click.prevent.stop="clickTab($event)">
            <a href="#general">General</a>
          </li>
          <li class="tabs-title panel2" v-on:click.prevent.stop="clickTab($event)">
            <a href="#panel2">Tab 2</a>
          </li>
          <li class="tabs-title panel3" v-on:click.prevent.stop="clickTab($event)">
            <a href="#panel3">Tab 3</a>
          </li>
        </ul>

        <ul class="accordion responsive-tabs" data-accordion data-tabs-content="edit-tabs" role="tablist">

          <li class="accordion-item toggleType is-active" id="general" v-on:click.prevent.stop="clickAccordion($event)">
            <a href="javascript:void(0)" class="accordion-title d-md-none" role="tab">General</a>
            <div class="tab-wrap accordion-content" data-tab-content role="tabpanel">
              <save-inmueble-form :inmueble="inmueble" :mode="'edit'" v-on:submit="onFormSave"/>
            </div>
          </li>

          <li class="accordion-item toggleType" id="panel2" v-on:click.prevent.stop="clickAccordion($event)">
            <a href="javascript:void(0)" class="accordion-title d-md-none" role="tab">Accordion 2</a>
            <div class="tab-wrap accordion-content" data-tab-content role="tabpanel" >
              <h4>Panel 2. Lorem ipsum dolor</h4>
              <p>Commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
              <a href="#">Nowhere to Go</a>
            </div>
          </li>

          <li class="accordion-item toggleType" id="panel3" v-on:click.prevent.stop="clickAccordion($event)">
            <a href="javascript:void(0)" class="accordion-title d-md-none" role="tab">Accordion 3</a>
            <div class="tab-wrap accordion-content" data-tab-content role="tabpanel">
              <h4>Panel 3. Lorem ipsum dolor</h4>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
              <a href="#">Nowhere to Go</a>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInmuebleForm from './SaveInmuebleForm'

export default {
  name: 'edit-inmueble',
  components: {
    SaveInmuebleForm
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
      var rwdTabs = this.$el.querySelector('.responsive-tabs')
      var togglType = this.$el.querySelector('.toggleType')
      var tabWrap = this.$el.querySelector('.tab-wrap')

      // xs, sm
      if (window.innerWidth < 768) {
        if (rwdTabs.classList.contains('tabs-content')) {
          tabWrap.style.display = 'none'
          rwdTabs.classList.remove('tabs-content')
          rwdTabs.classList.add('accordion')
          togglType.classList.add('accordion-item')
          tabWrap.classList.add('accordion-content')
          rwdTabs.setAttribute('data-accordion', 1)
          togglType.classList.remove('tabs-panel')
          this.$el.querySelector('.toggleType.is-active .tab-wrap').style.display = 'block'
        }
      } else { // md, lg
        if (rwdTabs.classList.contains('accordion')) {
          rwdTabs.removeAttribute('data-accordion')
          rwdTabs.classList.remove('accordion')
          tabWrap.classList.remove('accordion-content')
          togglType.classList.remove('accordion-item')
          rwdTabs.classList.add('tabs-content')
          togglType.classList.add('tabs-panel')
          tabWrap.style.display = ''
        }
      }
    },
    clickAccordion (event) {
      // Avoid this method being triggerd from Tabs
      if (!event.target.classList.contains('accordion-title')) return

      var tabs = this.$el.querySelector('ul.tabs')
      var item = event.target.parentNode
      var tabWrap = item.querySelector('.tab-wrap')
      var sharedId = item.getAttribute('id')

      if (item.classList.contains('is-active')) {
        item.classList.remove('is-active')
        tabWrap.style.display = 'none'
        // tabs
        tabs.querySelector('.tabs-title.is-active a').removeAttribute('aria-selected')
        tabs.querySelector('li.' + sharedId).classList.remove('is-active')
      } else {
        var previousItem = item.parentNode.querySelector('.is-active')
        if (previousItem) {
          previousItem.classList.remove('is-active')
          previousItem.querySelector('.tab-wrap').style.display = 'none'
          // tabs
          tabs.querySelector('.tabs-title.is-active a').removeAttribute('aria-selected')
          tabs.querySelector('.tabs-title.is-active').classList.remove('is-active')
        }

        item.classList.add('is-active')
        item.querySelector('.tab-wrap').style.display = 'block'
        // tabs
        tabs.querySelector('li.' + sharedId).classList.add('is-active')
        tabs.querySelector('.tabs-title.is-active a').setAttribute('aria-selected', 'true')
      }
    },
    clickTab (event) {
      var tabs = this.$el.querySelector('.responsive-tabs')
      var item = event.target.parentNode

      if (!item.classList.contains('is-active')) {
        var prevTab = item.parentNode.querySelector('.is-active')
        var previousItem = tabs.querySelector('li.is-active')
        item.parentNode.querySelector('.is-active a').removeAttribute('aria-selected')
        prevTab.classList.remove('is-active')
        previousItem.classList.remove('is-active')
        previousItem.querySelector('.tab-wrap').style.display = 'none'

        var sharedId = event.target.getAttribute('href').replace('#', '')
        var tabToShow = tabs.querySelector('#' + sharedId)
        item.classList.add('is-active')
        event.target.setAttribute('aria-selected', 'true')
        tabToShow.classList.add('is-active')
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
.tabs::after { clear: both; }
.tabs, .tabs-content { border: 1px solid #e6e6e6; }
.tabs { margin: 0; background: #fefefe; }
.tabs::after, .tabs::before { content: ' '; display: table; }
.tabs.simple > li > a { padding: 0; }
.tabs.simple > li > a:hover { background: 0 0; }
.tabs.vertical > li { width: auto; float: none; display: block;}
.tabs-title { float: left; }
.tabs.primary { background: #2199e8; }
.tabs.primary > li > a { color: #fefefe; }
.tabs.primary > li > a:focus, .tabs.primary > li > a:hover { background: #1893e4; }
.tabs-title > a {
  display: block;
  padding: 1.25rem 1.5rem;
  line-height: 1;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  background: #e6e6e6;
}
.tabs-title > a:focus, .tabs-title > a:hover, .tabs-title.is-active > a,
.tabs-title > a[aria-selected=true] { background: #fff; }
.tabs-content {
  background: #fefefe;
  transition: all .5s ease;
  border-top: 0;
}
.tabs-content.vertical { border: 1px solid #e6e6e6; border-left: 0; }
.tabs-panel{ display: none; padding: 1rem; }
.tabs-panel.is-active { display:block; }
.accordion-item.is-active,
.accordion-item.is-active .accordion-content { display:block; }
.accordion, .tabs { list-style-type: none; }
.accordion {
  background: #fefefe;
  border: 1px solid #e6e6e6;
  border-radius: 0;
  margin-left: 0;
}
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
.accordion-title:focus, .accordion-title:hover { background-color: #e6e6e6; }
:last-child > .accordion-title { border-bottom-width: 0; }
.accordion-title::before {
  content: '+';
  position: absolute;
  right: 1rem;
  top: 50%;
  margin-top: -.5rem;
}
.is-active > .accordion-title::before { content: '–'; }
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
