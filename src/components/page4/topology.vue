<template>
<div class="ecu-box">
      <div class="header">
        <div>
          <span class="name">ECU {{isEnglish?'Topology':'拓扑图'}}</span>
          <span class="project">({{carModel}})</span>
        </div>
        <div>
          <el-input v-model="carModel" placeholder="请输入车型"></el-input>
        </div>

      </div>

      <div class="body relative">
        <div class="title" v-if="ecuData.root">{{ecuData.root[0].ecuCode}}</div>
        <div class="content flex">
          <div class="flex-1 content-item">
            <div class="name" v-if="ecuData.can1">{{ecuData.can1[0]?ecuData.can1[0].parentCode+' CAN':''}}</div>
            <div v-if="ecuData.can1" class="full-height">
              <jTopo :ecuData="ecuData.can1"></jTopo>
            </div>

          </div>
          <div class="flex-1 content-item">
            <div class="name" v-if="ecuData.can2">{{ecuData.can2[0]?ecuData.can2[0].parentCode+' CAN':''}}</div>
            <div v-if="ecuData.can2" class="full-height">
              <jTopo :ecuData="ecuData.can2"></jTopo>
            </div>

          </div>
          <div class="flex-1 content-item">
            <div class="name" v-if="ecuData.can3">{{ecuData.can3[0]?ecuData.can3[0].parentCode+' CAN':''}}</div>
            <div v-if="ecuData.can3" class="full-height">
              <jTopo :ecuData="ecuData.can3"></jTopo>
            </div>

          </div>
          <div class="flex-1 content-item">
            <div class="name" v-if="ecuData.can4">{{ecuData.can4[0]?ecuData.can4[0].parentCode+' CAN':''}}</div>
            <div v-if="ecuData.can4" class="full-height">
              <jTopo :ecuData="ecuData.can4"></jTopo>
            </div>

          </div>
          <div class="flex-1 content-item">
            <div class="name" v-if="ecuData.can5">{{ecuData.can5[0]?ecuData.can5[0].parentCode+' CAN':''}}</div>
            <div v-if="ecuData.can5" class="full-height">
              <jTopo :ecuData="ecuData.can5"></jTopo>
            </div>

          </div>
          <!--<div v-for="item in ecuData" class="content-item flex-1"></div>-->
        </div>
        <img class="obd" src="../../../static/imgs/page4/OBD.png" alt="">

        <div class="foot">
			<div class="foot-left">
				<div class="item" :class="thisProgress==0?'fontColor blink':thisProgress>0?'fontColor':''">{{isEnglish?"Boxcar Ready":"台架准备"}}</div>
				<div class="item arrow"></div>
				<div class="item" :class="thisProgress==1?'fontColor blink':thisProgress>1?'fontColor':''">{{isEnglish?"GW Connect":"网关通讯"}}</div>
				<div class="item arrow"></div>
				<div class="item" :class="thisProgress==2?'fontColor blink':thisProgress>2?'fontColor':''">{{isEnglish?"Key Learn":"钥匙学习"}}</div>
				<div class="item arrow"></div>
				<div class="item" :class="thisProgress==3?'fontColor blink':thisProgress>3?'fontColor':''">{{isEnglish?"Ignition":"上电"}}</div>
				<div class="item arrow"></div>
				<div class="item" :class="thisProgress==4?'fontColor blink':thisProgress>4?'fontColor':''">{{isEnglish?"SWDL":"软件刷写"}}</div>
				<div class="item arrow"></div>
				<div class="item" :class="thisProgress==5?'fontColor blink':thisProgress>5?'fontColor':''">{{isEnglish?"Function Test":"功能测试"}}</div>
			</div>
			<div class="foot-right">
            <div v-for="item in footRightData" class="item">
              <span class="color"></span>
              <span class="text">{{footRightDataFilter(item.icon)}}</span>
            </div>
          </div>
        </div>
      </div>

      <span class="icon icon1"></span>
      <span class="icon icon2"></span>
      <span class="icon icon3"></span>
      <span class="icon icon4"></span>
<router-view :key="$route.fullPath"></router-view>
</div>
</template>

<script>
  import jTopo from './jTopo'
  export default {
    components: {
      jTopo
    },
    data () {
      return {
        ecuData: [],
        isEnglish: false,
        carModel: 'VF11',
        thisProgress: 0,
        footRightData: [
          {
            icon: 1,
            text: '通讯失败',
          },
          {
              icon: 6,
              text: '通讯成功'
          },
          {
            icon: 2,
            text: '刷写失败',
          },
          {
            icon: 3,
            text: '刷写成功',
          },
          {
              icon: 4,
              text: '测试失败',
            },
            {
              icon: 5,
              text: '测试通过',
            }
        ],
        tableData: [],
      }
    },
    methods: {
     footRightDataFilter(icon){
      if(this.isEnglish){
        switch(icon){
        case 1: return 'Communication OK';
      case 2: return 'SWDL NOK';
      case 3: return 'SWDL OK';
      case 4: return 'Test NOK';
      case 5: return 'Test OK';
      case 6: return 'Communication NOK';
        }
      }else{
        switch(icon){
      case 1: return '通讯失败';
      case 2: return '刷写失败';
      case 3: return '刷写成功';
      case 4: return '测试失败';
      case 5: return '测试通过';
      case 6: return '通讯成功';
    }
      }
     },
     getProgress (){
       this.$http.get('/api/boxcar/progress?vehicle='+this.carModel).then(res => {
             this.thisProgress = res.body.data
           }, err => {})
     },
      getTopoData () {
        this.$http.get('/api/boxcar/ecus?vehicle='+this.carModel).then(res => {
          this.ecuData = res.body.data

        },err => {})
      }
    },
    watch: {
      carModel (data) {
       // this.getTestData()
        //this.getTjData()
        this.getTopoData()
        //this.getSxData()
        this.getProgress()
      },
      '$route' (){
        let project = this.$route.query.project
        if(project){
          this.carModel = project
        }
      }
    },
    mounted () {
      //this.getTestData()
      //this.getTjData()
       
      this.getTopoData()
      //this.getSxData()
      let self = this;
      setInterval(function () {
       // self.getTestData()
         // self.getTjData()
          self.getTopoData()
          //self.getSxData()
          self.getProgress()
      }, 10000)
    },
    created(){
      let project = this.$route.query.project
      if(project){
        this.carModel = project
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/less/CONST";
  @headerBackgroundColor: #001a4b;
  .full-height{
    height: 100%;
  }
  .ecu-box{
    background: #12326a;
    position: relative;
   // margin-top: 100px;
    height: 570px;
    border: 1px solid @boxBorderColor;
    .header{
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      background: @headerBackgroundColor;
      color: #fff;
      font-size: 22px;
      .project{
        color: #8c9bb2;
      }
    }
    .body{
      padding: 18px 118px 18px 18px;
      .title{
        text-align: center;
        background: #2f5cb1;
        color: #fff;
        font-size: 18px;
        padding:  8px;
        letter-spacing: 50px;
      }
      .content-item{
        position: relative;
        min-height: 370px;
        padding-bottom: 15px;
        background: #06193a;
        margin-right: 2px;
        overflow: hidden;
        .name{
          position: absolute;
          width: 100%;
          text-align: center;
          top: 0;
          left: 0;
          color: #8490a5;
          z-index: 888;
        }
        &:last-child{
          margin-right: 0;
        }

        /*-------------------------------------------------------------*/


        /*-------------------------------------------------------------*/
      }
      .foot{
        display:flex;
        padding: 20px 0;
        justify-content: space-between;
      }
      .foot-left, .foot-right{
        align-items: center;
        min-width: 500px;
        width: 48%;
        display: flex;
        justify-content: space-between;
      }
      .foot-left{
        .item{
          font-size: 18px;
          color: #fff;
        }
        .fontColor{
        color: #00ff14;
      }
        .arrow{
          width: 38px;
          height: 17px;
          background: url("../../../static/imgs/page4/arrow.png") no-repeat;
        }
      }
      .foot-right{
        max-width: 860px;
        .item{
          .color{
            display:inline-block;
            width: 28px;
            height: 14px;
            margin-right: 8px;
          }
          &:nth-child(1){
            .color{
              background: #848484;
            }
          }
          &:nth-child(2){
            .color{
              background: #a2f9a38a;
            }
          }
          &:nth-child(3){
            .color{
              background: #c04fff;
            }
          }

          &:nth-child(4){
            .color{
              background: #53a740bf;
            }
          }

          &:nth-child(5){
            .color{
              background: #ff5353;
            }
          }

          &:nth-child(6){
            .color{
              background: #05a928;
            }
          }
        }
      }
    }

  }
  .chart-boxs{
    display: flex;
    justify-content: space-between;
    .chart{
      position: relative;
      margin-right: 10px;
      height: 340px;
      max-height: 340px;
      overflow: hidden;
      border: 1px solid @boxBorderColor;
      &:last-child{
        margin-right: 0;
      }
      .header{
        padding:10px 20px;
        background: @headerBackgroundColor;
        font-size: 22px;
        color: #fff;
      }
    }
    .table{
      font-size: 16px;
      text-align: center;
      td{
        padding: 18px 5px;
        color:#a4cfff;
        border-right: 1px solid @boxBorderColor;
        &:last-child{
          border-right: none;
        }
      }
      .title td{
        color: #fff;
      }
      tr:nth-child(odd){
        td{
          background: #113a8a;
        }
      }
      tr:nth-child(even){
        td{
          background: #0b2c6f;
        }
      }
    }

    #pie-box,#flush,#verify{
      height: 286px;
    }
    .data-explain{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item{
        display: flex;
        margin: 10px 0;
        justify-content: center;
        align-items: center;
        .color{
          display: inline-block;
          width: 20px;
          height: 8px;
          margin-right: 20px;
        }
        .name{
          margin-right: 20px;
        }
        &:nth-child(1){
          .color{
            background:#53a740bf;
          }
        }
        &:nth-child(2){
          .color{
            background:#fe4e4e;
          }
        }
        &:nth-child(3){
          .color{
            background:#fff369;
          }
        }
      }
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
  .relative{
    position: relative;
    .obd{
      position: absolute;
      right: 4px;
      top: 20px;
    }
  }
  /* 定义keyframe动画，命名为blink */
@keyframes blink{
  0%{opacity: 1;}
  100%{opacity: 0;} 
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-moz-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-ms-keyframes blink {
    0% {opacity: 1; } 
    100% { opacity: 0;}
}
@-o-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
/* 定义blink类*/
.blink{
    color: #dd4814;
    animation: blink 1s linear infinite;  
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
</style>