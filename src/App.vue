<template>
  <div id="app">
    <header>
      <div class="container flex">
        <h1 class="header-title">.My-paint</h1>
        <div class="nav-section">
            <a class="nav-item">
              <span class="fas fa-palette" />
              Colors
              <div class="nav-item-drop-menu">
                <div class="drop-menu-item-color" v-for="(color, index) in colorsArr" :key="index" 
                                                  :style="{background: color}"
                                                  @click="changeColor(color)"
                                                  :class="{'selected-color': color === currentColor}"/>
              </div>
            </a>
            <a class="nav-item" :class="{'used': !isEraser}">
              <span class="fas fa-paint-brush" />
              Brush
              <div class="nav-item-drop-menu">
                <div class="drop-menu-item-weight"  v-for="(weigth, index) in weightArr" :key="index" 
                                                    @click="changeWeigth(weigth); isEraser = false"
                                                    :class="{'selected-weigth': weigth === currentWeigth && !isEraser}">
                  <p class="item-weight-body">{{weigth}}px</p>
                  <div class="item-weight-example" :style="{height: weigth + 'px'}"/>
                </div>
              </div>
            </a>
            <a class="nav-item" :class="{'used': isEraser}">
              <span class="fas fa-eraser" />
              Eraser
              <div class="nav-item-drop-menu">
                <div class="drop-menu-item-weight"  v-for="(weigth, index) in weightArr" :key="index"
                                                    @click="changeWeigth(weigth); isEraser = true" 
                                                    :class="{'selected-weigth': weigth === currentWeigth && isEraser}">
                  <p class="item-weight-body">{{weigth}}px</p>
                  <div class="item-weight-example" :style="{height: weigth + 'px'}"/>
                </div>
              </div>
            </a>
        </div>
        <div class="nav-section">
            <a class="nav-item" @click="resetCanvas">
              <span class="far fa-trash-alt" />
              Reset
            </a>
        </div>
      </div>
    </header>
    <main>
      <Canvas :lineWidth="currentWeigth" :lineColor="currentColor" :isEraser="isEraser" ref="paint"/>
    </main>
  </div>
</template>

<script>
import Canvas from '@/components/Canvas.vue'

export default {
  name: 'App',
  components: {
    Canvas
  },
  data: () => ({
    colorsArr: ['#000000', '#34495e', '#9b59b6', '#3498db', '#1abc9c', '#2ecc71'],
    weightArr: [2, 5, 10, 15, 20],
    currentColor: '',
    currentWeigth: 10,
    isEraser: false
  }),
  methods: {
    changeColor(color) {
      this.currentColor = color;
    },
    changeWeigth(weigth) {
      this.currentWeigth = weigth;
    },
    resetCanvas() {
      this.$refs.paint.clearCanvas();
    }
  },
  created() {
    let self = this;

    self.currentColor = self.colorsArr[0];
  }
}
</script>

<style>
  header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
    background: #fff;
    user-select: none;
  }

  .header-title {
    margin: .5em 0;
  }

  main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  .nav-section:hover .nav-item{
    opacity: .5;
  }

  .nav-item {
    margin: 0 .75em;
    padding: .75em 0;
    transition: all .2s ease;
    position: relative;
    cursor: pointer;
  } 
  .nav-item::after {
    content: '';
    position: absolute;
    left: 50%;
    right: 50%;
    top: 0;
    transition: all .2s ease;
    height: 3px;
    background: #FB5012;
  }
  .nav-item:hover{
    opacity: 1 !important;
  }
  .nav-item:hover::after {
    left: 0;
    right: 0;
  }
  .nav-item:hover .nav-item-drop-menu{
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .nav-item span{
    color: #FB5012;
    padding-right: .25em;
  }
  .used::after {
    left: 25%;
    right: 25%;
  }
  
  .nav-item-drop-menu {
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-5px);
    transition: all .2s ease;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
    padding: 15px;
  }

  .drop-menu-item-color {
    width: 80px;
    height: 22px;
    border-radius: 100px;
    transition: all .2s ease;
    position: relative;
  }
  .drop-menu-item-color + .drop-menu-item-color {
    margin-top: 7px;
  }
  .drop-menu-item-color:hover {
    opacity: .7;
  }
  .drop-menu-item-color::after {
    display: none;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('./assets/img/check-solid.svg') no-repeat 50%;
    background-size: 12px;
  }
  .selected-color::after {
    display: block;
  }

  .drop-menu-item-weight {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    transition: all .2s ease;
    margin: 0 -15px;
  }
  .drop-menu-item-weight:hover {
    background: #eee;
  }
  .item-weight-body {
    width: 40px;
    margin: 0;
    margin-right: .75em;
    text-align: right;
  }
  .item-weight-example {
    width: 80px;
    background: #000;
    border-radius: 100px;
    transition: all .2s ease;
  }
  .selected-weigth {
    background: #FB5012 !important;   
    color: #fff;
  }
  .selected-weigth .item-weight-example {
    background: #fff;
  }
</style>
