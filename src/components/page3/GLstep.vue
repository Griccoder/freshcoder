<template>
  <div :class="getClass">
    <span class="item" :class="step<1?'default':''"></span>
    <span class="item" :class="step<2?'default':''"></span>
    <span class="item" :class="step<3?'default':''"></span>
    <span class="item" :class="step<4?'default':''"></span>
    <span class="item" :class="step<5?'default':''"></span>
    <span class="item" :class="step<6?'default':''"></span>
    <span class="item" :class="step<7?'default':''"></span>
    <span class="item" :class="step<8?'default':''"></span>
    <span class="item" :class="step<9?'default':''"></span>
    <span class="item" :class="step<10?'default':''"></span>
    <span class="item" :class="step<11?'default':''"></span>
    <span class="item" :class="step<12?'default':''"></span>
  </div>
</template>
<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 0
      }
    },
    watch: {
      step (data) {
        this.getClass()
      }
    },
    methods: {
      getClass () {
        if (this.step < 6) {
          return 'error'
        } else if (this.step > 5.9 && this.step < 8) {
          return 'warning'
        } else if (this.step > 7.9) {
          return 'success'
        }
      }
    },
    mounted () {
      this.getClass()
    }
  }
</script>
<style lang="less" scoped>
  .item{
    width: 12px;
    height: 30px;
    background: #0b2962;
    display: inline-block;
  }
  .error-step{
    .item:nth-child(1){
      background: #ff6f71;
    }
    .item:nth-child(2){
      background: #ff6f71;
    }
    .item:nth-child(3){
      background: #d76163;
    }
    .item:nth-child(4){
      background: #d15f61;
    }
    .item:nth-child(5){
      background: #cb5e60;
    }
  }
  .warning{
    .item:nth-child(1){
      background: #fbfa73;
    }
    .item:nth-child(2){
      background: #f3f271;
    }
    .item:nth-child(3){
      background: #edec70;
    }
    .item:nth-child(4){
      background: #e3e26e;
    }
    .item:nth-child(5){
      background: #dfde6d;
    }
    .item:nth-child(6){
      background: #d6d56b;
    }
    .item:nth-child(7){
      background: #c4c362;
    }
    .item:nth-child(8){
      background: #bfbe63;
    }
  }
  .success{
    .item:nth-child(1){
      background: #4ff28e;
    }
    .item:nth-child(2){
      background: #48ef81;
    }
    .item:nth-child(3){
      background: #43ec78;
    }
    .item:nth-child(4){
      background: #3be96a;
    }
    .item:nth-child(5){
      background: #33e55b;
    }
    .item:nth-child(6){
      background: #2be14d;
    }
    .item:nth-child(7){
      background: #24de41;
    }
    .item:nth-child(8){
      background: #1ddb35;
    }
    .item:nth-child(9){
      background: #18d82a;
    }
    .item:nth-child(10){
      background: #0fd41b;
    }
    .item:nth-child(11){
      background: #08d10f;
    }
    .item:nth-child(12){
      background: #04cf06;
    }
  }
  .default{
    background: #0b2962 !important;
  }
</style>
