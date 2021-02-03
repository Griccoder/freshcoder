<template>
  <div id="page6">
    <div class="iframe-box mt100 flex">
      <div class="iframe flex-1" v-for="item in vncs.slice(0,3)">
        <div class="header">{{item.name}}</div>
        <iframe :src="item.url" :class="vncs.length==9?'frame1':'frame'"></iframe>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>
    <div class="iframe-box mt50 flex">
      <div class="iframe flex-1" v-for="item in vncs.slice(3,6)">
        <div class="header">{{item.name}}</div>
        <iframe :src="item.url" :class="vncs.length==9?'frame1':'frame'"></iframe>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>
    <div class="iframe-box mt50 flex" v-if="vncs.length==9">
      <div class="iframe flex-1" v-for="item in vncs.slice(6,9)">
        <div class="header">{{item.name}}</div>
        <iframe :src="item.url" :class="vncs.length==9?'frame1':'frame'"></iframe>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        vncs:  [
          {
          "name": "IFLEXPLUS_01",
          "url": "http://172.22.86.95:9001/"
          },
          {
            "name": "IFLEXPLUS_02",
            "url": "http://172.22.86.95:9002/"
          },
          {
            "name": "IFLEXPLUS_03",
            "url": "http://172.22.86.95:9003/"
          },
          {
            "name": "IFLEXPLUS_04",
            "url": "http://172.22.86.95:9004/"
          },
          {
            "name": "IFLEXPLUS_05",
            "url": "http://172.22.86.95:9005/"
          },
          {
            "name": "IFLEXPLUS_06",
            "url": "http://172.22.86.95:9006/"
          },
          {
            "name": "FAS_01",
            "url": "http://172.22.86.95:9011/"
          },
          {
            "name": "IFLEXPLUS_01",
            "url": "http://172.22.86.95:9001/"
          },
          {
            "name": "IFLEXPLUS_05",
            "url": "http://172.22.86.95:9005/"
          }]
      }
    },
    methods: {
      getVncs () {
        this.$http.get('/vnc/vnc.json').then(res => {
          console.log('test',res)
          if (res.body) {
            this.vncs = res.body
          }
        })
      }
    },
    mounted () {
      this.getVncs()
      setInterval(_ => {
        if (document.cookie.indexOf('isEnglish=false') != -1) {
          document.getElementById("page6").style.backgroundImage="url(./static/imgs/page6/bg3.png)";
        } else {
          document.getElementById("page6").style.backgroundImage="url(./static/imgs/page6.png)";
        }
      },1000)
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/less/CONST";
  #page6{
    width: 3840px;
    height: 2160px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 100px;
    background: url("../../../static/imgs/page6/bg3.png");
  }
  .iframe-box{
    width: 3600px;
    margin: 0 auto;
  }
  .iframe{
    color:#fff;
    position: relative;
    margin-right: 60px;
    border: 1px solid @boxBorderColor;
    &:last-child{
      margin-right: 0;
    }
    .header{
      padding: 10px 30px;
      font-size: 35px;
      font-weight: bold;
      background: #062f7f;
    }
    .frame{
      width: 100%;
      height: 720px;
    }
    .frame1{
      width: 100%;
      height: 500px;
    }
  }
  .icon{
    position: absolute;
    width: 22px;
    height: 21px;
    background: url("../../../static/imgs/corner.png");
  }
  .icon1{
    top: -1px;
    left: -1px;
  }
  .icon2{
    top: -1px;
    right: -1px;
    transform:rotate(90deg);
  }
  .icon3{
    bottom: -1px;
    left: -1px;
    transform:rotate(270deg);
  }
  .icon4{
    bottom: -1px;
    right: -1px;
    transform:rotate(180deg);
  }
  .mt100{
    margin-top: 160px;
  }
</style>
