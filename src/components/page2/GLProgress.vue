<template>
  <div id="out">
    <div id="in" ref="ins" :width="width">

      <div class="end-item">
        <div class="pointer"></div>
      </div>

    </div>
    <div class="icon" ref="icon" v-show="width > 10"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      width: {
        type: Number,
        default: 0
      }
    },
    methods: {
      setAnimate () {
        let self = this
        let left = 5;
        self.$refs.ins.style.width = self.width + '%'
        // setInterval(function () {
        //   if (left > self.width) {
        //     left = 5
        //   } else{
        //     left++
        //   }
        //   // console.log('=====', self.$refs.icon.style)
        //   // console.log('=====', self.$refs.icon)
        //   console.log(111111111111)
        //   self.$refs.icon.style.left = (left * 0.8) + '%'
        // }, 30)
      }
    },
    mounted () {
      this.setAnimate()
    }
  }
</script>
<style lang="less" scoped>
  #out{
    position: relative;
    margin-top: 8px;
    height: 18px;
    border-radius: 9px;
    background: #0e2a4f;
  }
  #in{
    background: #fff;
    height: 18px;
    border-radius: 9px;
    position: relative;
    background: -webkit-linear-gradient(left, #8dfebb , #02ce04) !important;
    background: -o-linear-gradient(right, #8dfebb, #02ce04) !important;
    background: -moz-linear-gradient(right, #8dfebb, #02ce04) !important;
    background: linear-gradient(to right, #8dfebb , #02ce04) !important;
  }
  .end-item{
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    right: -11px;
    top: -2px;
    background: #02ce04;
  }
  .pointer{
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: #fff;
    top: 5px;
    left: 5px;
  }
  .icon{
    position: absolute;
    top: 4px;
    width: 15px;
    height: 8px;
    left: 10px;
    background: rgba(255,255,255,1);
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
</style>
