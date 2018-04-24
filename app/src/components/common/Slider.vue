<template>
  <agile :infinite="false">
    <div class="slide" v-for="(item, index) in items">
      <div class="obs w-100">{{ item.obs }}</div>
      <div class="slide-image">
        <cloudinary v-if="item.pic" :public_id="item.pic" :responsive="true" :crop="'scale'" />
      </div>
    </div>
  </agile>
</template>

<script>
// This component depends on vue-agile
import Cloudinary from './Cloudinary'

export default {
  name: 'slider',
  props: ['items'],
  components: {
    Cloudinary
  }
}
</script>

<style>
.agile__dots {
  bottom: 0;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  list-style: none;
  margin: 10px 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
}
.agile__dot {
  margin: 0 5px;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  transition-duration: .3s;
  width: 10px;
  padding: 0;
}
.agile__dot button:hover {
  background-color: #fff;
}
.agile__dot--current button {
  background-color: #fff;
}
.agile__arrow {
  border: none;
  cursor: pointer;
  bottom: 10px;
  margin: 0;
  padding: 0;
  position: absolute;
  transition-duration: .3s;
  height: 100%;
  top: 0;
  width: 40px;
  background-color: transparent;
}
/*.agile__arrow:hover {
  background-color: rgba(255,255,255,.5);
}*/
.agile__arrow svg {
  height: 25px;
}
.agile__arrow--next {
  right: 0;
}
.agile__arrow[disabled] {
  display: none;
  cursor: default;
  opacity: .4;
}
.slide {
  height: 300px;
}
.slide:before {
  background-color: rgba(#000, .2);
  content: '';
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.slide .obs {
  position: absolute;
  color: #fff;
  bottom: 0;
  font-size: .9rem;
  padding: 10px 15px 25px;
}
.slide .obs::after {
  content: '';
  background-color: #000;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
.slide .slide-image {
  position: relative;
  z-index: -2;
}
@media (min-width: 576px) {
  .slide {
    height: 400px;
  }
}
@media (min-width: 768px) {
  .slide {
    height: 450px;
  }
}
@media (min-width: 992px) {
  .slide {
    height: 500px;
  }
}
@media (min-width: 1200px) {
  .slide {
    height: 550px;
  }
}
</style>
