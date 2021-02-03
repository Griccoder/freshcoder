<template>
  <div id="page4">
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
    </div>
    <div class="chart-boxs mt20">
      <div class="chart plan flex-1">
        <div class="header">{{isEnglish?'Test plan':'测试计划'}}</div>
        <div class="table-box">
          <table class="table">
            <tr class="title">
              <td>{{isEnglish?'Project':'项目'}}</td>
              <td>{{isEnglish?'Phase':'阶段'}}</td>
              <td>{{isEnglish?'State':'状态'}}</td>
            </tr>
            <tr v-for="item in tableData">
              <td>{{item.name}}</td>
              <td>{{item.testStage}}</td>
              <td>{{  item.status == 0?'未开始':item.status== 1?'进行中':'已完成'}}</td>
            </tr>
          </table>
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="chart statistic flex-1">
        <div class="header">{{isEnglish?'Statistics':'统计'}}</div>
        <div id="pie-box"></div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="chart flush flex-1">
        <div class="header">{{isEnglish?'SWDL':'软件刷写'}}</div>
        <div class="chart-body flex">
          <div id="flush" class="flex-1"></div>
          <!--<div class="data-explain flex-150px">-->
            <!--<div class="item" v-for="item in pieChartData">-->
              <!--<span class="color"></span>-->
              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="value">{{item.value}}</span>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="chart verify flex-1">
        <div class="header">ECU {{isEnglish?'Test':'验证'}}</div>
        <div class="chart-body flex">
          <div id="verify" class="flex-1"></div>
          <!--<div class="data-explain flex-150px">-->
            <!--<div class="item" v-for="item in pieCircleData">-->
              <!--<span class="color"></span>-->
              <!--<span class="name">{{item.name}}</span>-->
              <!--<span class="value">{{item.value}}</span>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require('echarts')
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
        pieChartData: [ {
            name: '',
            value: 1524
          },
          {
            name: '',
            value: 1524
          },
          {
            name: '',
            value: 1524
          }],
        pieCircleData: [ {
            name: '',
            value: 1524
          },
          {
            name: '',
            value: 1524
          },
          {
            name: '',
            value: 1524
          }],
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
     getPieOption (data,color) {
        return {
          color: color,
          series : [
            {
              name: '数据',
              type: 'pie',
              radius : '80%',
              center: ['50%', '60%'],
              data:data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      },
      getCircleOption () {
        return {
          color: ['#53a740bf','#fe4e4e','#fff369'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name:'数据',
              type:'pie',
              radius: ['58%', '75%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[ {value:1524, name:''},
                {value:1524, name:''},
                {value:1524, name:''},]
            }
          ]
        }
      },
      getTestData () {
        this.$http.get('/api/boxcar/plans?vehicle='+this.carModel).then(res => {
          this.tableData = res.body.data
        }, err => {})
      },
      getTjData () {
        this.$http.get('/api/boxcar/planStatistics?vehicle='+this.carModel).then(res => {
          let arr = []
          arr.push({
              value: res.body.data.undone,
              name: '未开始'+ res.body.data.undone
            })
          arr.push({
            value: res.body.data.delay,
            name: '延期项 '+ res.body.data.delay
          })
          arr.push({
            value: res.body.data.doing,
            name: '进行中'+ res.body.data.doing
          })
          arr.push({
            value: res.body.data.done,
            name: '完成 '+ res.body.data.done
          })
          
          echarts.init(document.getElementById('pie-box'))
            .setOption(this.getPieOption(arr,['#848484','#ff5353','#00f0ff','#2e5bff']))
        }, err => {})
      },
      getSxData () {
        this.$http.get('/api/boxcar/boxStatistics?vehicle='+this.carModel).then(res => {
          let arr1 = []
          let arr2 = []
          arr1.push({
              value: res.body.data.e_undone,
              name: '未测试 '+res.body.data.e_undone,
            })
          arr1.push({
            value: res.body.data.e_done,
            name: '测试通过'+res.body.data.e_done,
          })
          arr1.push({
            value: res.body.data.e_failed,
            name: '测试失败 '+res.body.data.e_failed,
          })
           arr2.push({
            value: res.body.data.s_undone,
            name: '未刷写 '+res.body.data.s_undone,
          })
          arr2.push({
            value: res.body.data.s_done,
            name: '刷写成功 '+res.body.data.s_done,
          })
          arr2.push({
            value: res.body.data.s_failed,
            name: '刷写失败 '+res.body.data.s_failed,
          })
          echarts.init(document.getElementById('flush'))
            .setOption(this.getPieOption(arr2,['#848484','#53a740bf','#c04fff']))
          echarts.init(document.getElementById('verify'))
            .setOption(this.getPieOption(arr1,['#848484','#05a928','#fe4e4e']))
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
   	  	this.getTestData()
        this.getTjData()
        this.getTopoData()
        this.getSxData()
        this.getProgress()
      }
    },
    mounted () {
      this.getTestData()
      this.getTjData()
      this.getTopoData()
      this.getSxData()
      let self = this;
      setInterval(function () {
    	  self.getTestData()
          self.getTjData()
          self.getTopoData()
          self.getSxData()
          self.getProgress()
      }, 10000)
      setInterval(() => {
        if (document.cookie.indexOf('isEnglish=false') != -1) {
          this.isEnglish = false
          document.getElementById("page4").style.backgroundImage="url(./static/imgs/page4/bg4.png)";
        } else {
          this.isEnglish = true
          document.getElementById("page4").style.backgroundImage="url(./static/imgs/page4.png)";
        }
      }, 1000)
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/less/CONST";
  @headerBackgroundColor: #001a4b;
  .full-height{
    height: 100%;
  }
  #page4{
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    padding: 30px;
    background: url("../../../static/imgs/page4/bg4.png") no-repeat;
  }
  .ecu-box{
    position: relative;
    margin-top: 100px;
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
