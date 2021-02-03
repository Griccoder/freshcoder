<template>
  <div id="out">
    <div id="in" ref="ins" :width="width" :class="className">
      <div class="end-item">
        <div class="pointer"></div>
      </div>
    </div>
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
        default: 0
      },
      className: {
        type: String,
        default: 'error'
      }
    },
    watch: {
      width (data){
        this.$refs.ins.style.width = data + '%'
      }
    },
    methods: {
      // getClass () {
      //   console.log(11111)
      //   if (this.width < 60) {
      //     return 'error'
      //   } else if (this.width > 59.9 && this.width < 80) {
      //     return 'primary'
      //   } else {
      //     return 'success'
      //   }
      // },
      setAnimate () {
        let self = this
        let left = 5;
        console.log(111, self.width)
        self.$refs.icon.style.left = (left * 0.8) + '%'
        self.$refs.ins.style.width = self.width + '%'
        // setInterval(function () {
        //   if (left > self.width) {
        //     left = 5
        //   } else{
        //     left++
        //   }
        //   // console.log('=====', self.$refs.icon.style)
        //   // console.log('=====', self.$refs.icon)
        //   self.$refs.icon.style.left = (left * 0.8) + '%'
        //   self.$refs.ins.style.width = self.width + '%'
        // }, 30)
      }
    },
    mounted () {
      // this.setAnimate()
      console.log(this.width)
      this.$refs.ins.style.width = this.width + '%'
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
    height: 18px;
    border-radius: 9px;
    position: relative;

  }
  .error{
    #in{
      background: -webkit-linear-gradient(left, #FC3F80 , #FD353D) !important;
      background: -o-linear-gradient(right, #FC3F80 , #FD353D) !important;
      background: -moz-linear-gradient(right, #FC3F80 , #FD353D) !important;
      background: linear-gradient(to right, #FC3F80 , #FD353D) !important;
      .end-item{
        background: #FD353D;
      }
    }
  }
  .success{
    #in{
      background: -webkit-linear-gradient(left, #55F699 , #00CD00) !important;
      background: -o-linear-gradient(right, #55F699 , #00CD00) !important;
      background: -moz-linear-gradient(right, #55F699 , #00CD00) !important;
      background: linear-gradient(to right, #55F699 , #00CD00) !important;
      .end-item{
        background: #00CD00;
      }
    }
  }
  .primary{
    #in{
      background: -webkit-linear-gradient(left, #0BA0FB , #0051F1) !important;
      background: -o-linear-gradient(right, #0BA0FB , #0051F1) !important;
      background: -moz-linear-gradient(right, #0BA0FB , #0051F1) !important;
      background: linear-gradient(to right, #0BA0FB , #0051F1) !important;
      .end-item{
        background: #0051F1;
      }
    }
  }
  .end-item{
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    right: -11px;
    top: -2px;
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
</style>
