<template>
  <div id="page-3">
    <div class="header">
      <div class="clearfix">
        <!-- <div class="pull-right ml20 location">
          <span>{{isEnglish?'vehicle pilot': '杭州湾研究院试制车间'}}</span>
        </div> -->
        <div class="pull-left">
          <span class="fa fa-clock-o"></span>
          <span>{{currentDate}}</span>
        </div>
      </div>
    </div>
    <div id="chart-box" class="mt70 flex">
      <div class="flex-1">
        <div class="header">
          <span class="head-icon head-icon1"></span>
          <span>{{isEnglish?'The project schedule': '项目进度'}}</span>
        </div>
        <div class="content">
          <ul class="project-list">
            <li v-for="item in projectProgress">
              <div class="flex" @click="selectProject(item.id, item.vehicle, item.stage)">
                <div class="flex-150px name">{{item.vehicle}}-{{item.stage}}</div>
                <div class="flex-1 pt10 pl10">
                  <el-tooltip effect="dark" :content="'负责人:'+item.responsible" placement="top-end">
                    <GLProgress class="primary"
                                :width="parseInt((item.finsh-0)/(item.num-0)*100)"></GLProgress>
                  </el-tooltip>

                </div>
                <div class="flex-100px percent">
                  <span class="white-color">{{item.finsh}}</span>
                  <span class="total-color">/{{item.num}}</span>

                </div>
              </div>
            </li>
          </ul>
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="header">
          <span class="head-icon head-icon2"></span>
          <span>{{isEnglish?'Project quality': '项目质量'}}</span>
        </div>
        <div class="content" id="quality"></div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="header">
          <span class="head-icon head-icon3"></span>
          <span>{{isEnglish?'Job qualification rate': '工位合格率'}}</span>
          <small>{{stationName}}</small>
        </div>
        <div class="content" id="workstation"></div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>
    <div id="station-box" class="mt70 flex" style='position: relative;'>
     <div style='position: absolute;width: 100%; text-align: center;top: -50px;font-size:30px;background:#092966;'>
          <span>{{isEnglish?'Equipment maintenance cycle management': '设备维保周期管理'}}</span>
        </div>
      <div class="flex-1" v-for="(item,index) in workStation">
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
        <div class="header" :class="item.fault?'fault':''">
          {{index + 1}}.{{filterTypeName(item.name)}}
        </div>
        <ul class="device-list mt50">
          <li v-for="subItem in item.device" class="flex" :title="subItem.ip" >
            <div class="state flex-30px">
              <span class="use-state"></span>
              <span class="icon" :class="getStateClass(subItem.useState)" :title="subItem.deviceId" ></span>
            </div>
            <span class="device-icon flex-80px" :class="getDeviceClass(subItem.type)"></span>
            <div class="flex-1 energy" :class="getEnergyClass(subItem.energy)">
              <GLstep :step="subItem.energy"></GLstep>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require('echarts')
  import GLProgress from './GLProgress.vue'
  import GLstep from './GLstep.vue'
  export default {
    components: {
      GLProgress,
      GLstep
    },
    data () {
      return {
        currentDate: undefined,
        factoryName: undefined,
        tableData: undefined,
        projectProgress: [],
        stationId: '',
        stationName: '',
        isEnglish: false,
        workStation: [
          {
            name: '加注',
            fault: false,
            device: []
          },
          {
            name: '软件刷写',
            fault: false,
            device: []
          },
          {
            name: '四轮定位',
            fault: false,
            device: []
          },
          {
            name: '转毂',
            fault: false,
            device: []
          },
          {
            name: 'ADAS',
            fault: false,
            device: []
          }
        ]
      }
    },
    methods: {
      getProcessData () {
        this.$http.get('/api/varplan/getPP').then(res => {
          this.projectProgress = res.body.data
        },err=>{})
      },
      filterTypeName (name) {
    	  if(this.isEnglish){
    		switch(name){
    			case "加注": name="Brake Filling"; break;
    			case "软件刷写": name= "SWDL"; break;
    			case "四轮定位": name= "X-Wheel"; break;
    			case "转毂": name= "Rolling Road"; break;
    		} 
    	  }
   		  return name;    		  
      },
      getStationName(station){
    	  switch (station.toUpperCase()) {
          case "BRAKEFILL": return '加注'; 
          case "SWDL": return '软件刷写'; 
          case "X-WHEEL": return '四轮定位'; 
          case "VISP": return '转毂'; 
          case "FAS": return 'ADAS'; 
        }
      },
      getQualityData () {
        this.$http.get('/api/varplan/vehicleQuality').then(res => {
          let data1 = []
          let data2 = []
          res.body.data.map(v => {
            data1.push(v.vehicle + '-' + v.stage)
            data2.push(((v.successRate-0)*100).toFixed(2))
          })
          echarts.init(document.getElementById('quality'))
            .setOption(this.getOption(null, data1, data2))
        }, err => {})
      },
      getStationData () {
        this.$http.get('/api/varplan/stationQuality?id='+this.stationId).then(res=>{
          let station = []
          let data1 = []
          let data2 = []
          res.body.data.map(v => {
            station.push(this.getStationName(v.station));
            let num = ((v.successRate-0)*100).toFixed(2);
            data1.push(num);
            data2.push((100-num).toFixed(2));
          })
          echarts.init(document.getElementById('workstation'))
            .setOption(this.getBarOption(station,data1,data2))
        },err=>{})
      },
      selectProject (id,vehicle,stage) {
        this.stationId = id
        this.stationName = vehicle + '-' + stage
        this.getStationData()

      },
      getEnergyClass (step) {
        if (step < 4) {
          return 'error-step'
        } else if (step > 4 && step < 8) {
          return 'warning'
        } else if (step > 7.9) {
          return 'success'
        }
      },
      getDeviceClass (deviceType) {
        switch (deviceType) {
          case 't1': return 'device1';
          case 't2': return 'device2';
          case 't3': return 'device3';
          case 't4': return 'device4';
        }
      },
      getStateClass (state) {
        if (state == 1) {
          return 'error'
        } else if (state == 2) {
          return 'primary'
        } else if (state == 3) {
          return 'default'
        }
      },
      getBarOption (station,data, _data) {
        return {
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 20,
            left: 0,
            right: 20,
            bottom: 0,
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : station,
              axisTick: {
                alignWithLabel: true
              },
              axisLine:{
                lineStyle:{
                  color: '#9ed7ff'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine:{
                lineStyle:{
                  color: '#9ed7ff'
                }
              },
              splitLine:{
                lineStyle:{
                  color: ['rgba(62,100,176,.6)']
                }
              },
              axisLabel: {
                formatter: '{value} %'
              },

            }
          ],
          series : [
            {
              stack: 'stack',
              name:'成功率',
              type:'bar',
              data:data,
              label:{
                position: 'top',
                color: '#00CD00',
                show: true,
                formatter: function (data) {
                  return data.value + '%'
                }
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00CD00'
                }, {
                  offset: 1,
                  color: '#55F699'
                }])
              },
              barWidth: 34
            },
            {
              stack: 'stack',
              name:'失败率',
              type:'bar',
              data: _data,
              label:{
                show: false
              },
              itemStyle: {
                color: '#000',
                opacity: 0.2
              },
              barWidth: 34
            }
          ]
        }
      },
      getOption (name, data1,data2) {
        return {
          tooltip : {
            trigger: 'axis',
              axisPointer: {
              type: 'cross',
                label: {
                backgroundColor: '#6a7985'
              }
            }
          },

          grid: {
              top: 20,
              left: 0,
              right: 20,
              bottom: 0,
              containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              color: '#fff',
              data : data1,
              axisLine:{
                lineStyle:{
                  color: '#9ed7ff'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine:{
                lineStyle:{
                  color: '#9ed7ff'
                }
              },
              splitLine:{
                lineStyle:{
                  color: ['rgba(62,100,176,.6)']
                }
              },
              axisLabel: {
                formatter: '{value} %'
              },
            }
          ],
          series : [
          {

            type:'line',
            stack: '总量',
            smooth: true,
            data:data2,
            label:{
              show: true,
              formatter: function (data) {
                return data.value + '%'
              }
            },
            symbolSize:(value,params)=>{
              console.log(value,params.name,name)
              if (params.name === name) {
                return 14
              }
              return 8
            },
            lineStyle: {
              color: '#9ed7ff'
            },
            itemStyle: {
              color: '#9ed7ff'
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#7ac2fb'
                }, {
                  offset: 1,
                  color: '#0d3989'
                }])
              }
            },
          }
        ]
        }
      },
      getDate () {
        let date = new Date()
        this.currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) +
          '/' + date.getDate()
      },
      tableInterval () {
        let self = this
        setInterval(function () {
          self.getDate()
          if (document.cookie.indexOf('isEnglish=false') != -1) {
            self.isEnglish = false
            document.getElementById("page-3").style.backgroundImage="url(./static/imgs/bg3.jpg)"
          } else {
            self.isEnglish = true
            document.getElementById("page-3").style.backgroundImage="url(./static/imgs/page3.png)"
          }
        }, 1000)
      },
      workStationInit () {
        this.workStation = [
          {
            name: '加注',
            fault: false,
            device: []
          },
          {
            name: '软件刷写',
            fault: false,
            device: []
          },
          {
            name: '四轮定位',
            fault: false,
            device: []
          },
          {
            name: '转毂',
            fault: false,
            device: []
          },
          {
            name: 'ADAS',
            fault: false,
            device: []
          }
        ]
      },
      getWorkData () {
        this.$http.get('/api/equipments/list').then(res => {
          this.workStationInit()
          res.body.data.map(v => {
            let index
            let obj = v;
            switch (v.stationType) {
              case "BRAKEFILL": index = 0; break;
              case "SWDL": index = 1; break;
              case "X-WHEEL": index = 2; break;
              case "VISP": index = 3; break;
              case "FAS": index = 4; break;
              default: index = 1;
            }
            switch (v.equipmentType) {
              case 'bf': obj.type = 't1';break;
              case "iflex": obj.type = 't3';break;
              case "pc": obj.type = 't2';break;
              default: obj.type='t4';
            }
            switch (v.ping) {
              case 'unknown': obj.useState = '3';break;
              case 'false': obj.useState = '1';break;
              case 'true': obj.useState = '2';break;
              default: obj.useState = '1';break;
            }
            obj.energy = v.remainPeriod
            this.workStation[index].device.push(obj)
          })
        }, err => {})
      }
    },
    mounted () {
      setInterval(()=>{
        this.getProcessData()
        this.getQualityData()
      },60000)
      this.getStationData()
      this.getProcessData()
      this.getQualityData()
      this.getDate()
      this.tableInterval()
      this.getWorkData()


    }
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/CONST";
  #page-3{
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    background: url("../../../static/imgs/bg3.jpg") no-repeat;
    padding: 30px;
    .header{
      color: rgba(233,234,255,.7);
      font-size: 18px;
      .location{
        padding-left: 30px;
        background: url("../../../static/imgs/location.png") no-repeat 3px 7px;
      }
      .total{
        color: #fff;
        font-size: 26px;
        font-weight: 600;
      }
    }
  }
  #chart-box{
    >.flex-1{
      position: relative;
      box-sizing: border-box;
      height: 364px;
      width: 600px;
      margin-right: 24px;
      border: 1px solid @boxBorderColor;
      &:last-child{
        margin-right: 0;
      }
      .header{
        padding-top: 13px;
        padding-left: 20px;
        height: 64px;
        font-size: 26px;
        background: #092966;
        overflow: hidden;
        .head-icon{
          display: inline-block;
          height: 26px;
          width: 26px;
          margin-right: 10px;
          margin-bottom: -3px;
        }
        .head-icon1{
          background: url("../../../static/imgs/headicon3.png");
        }
        .head-icon2{
          background: url("../../../static/imgs/headicon2.png");
        }
        .head-icon3{
          background: url("../../../static/imgs/headicon1.png");
        }
      }
      .content{
        height: 298px;
        overflow-y: scroll;
      }
      .project-list{
        li{
          position: relative;
          height: 50px;
          border-bottom: 1px solid #3E64B0;
          cursor: pointer;
          .name{
            font-size: 18px;
            line-height: 50px;
            text-align: center;
            color: #9ED7FF;
            border-right: 1px solid #3E64B0;
          }
          .percent{
            font-size: 18px;
            line-height: 50px;
            text-align: center;
            .white-color{
              color: #fff;
            }
            .total-color{
              color: #9ED7FF;
            }
          }

        }
      }
    }
  }
  #station-box{
    >.flex-1{
      width: 363px;
      height: 448px;
      margin-right: 10px;
      border: 1px solid @boxBorderColor;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      &:last-child{
        margin-right: 0;
      }
      .header{
        text-align: center;
        height: 50px;
        line-height: 45px;
        width: 170px;
        border: 1px solid #1558F3;
        margin: -1px auto;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      .fault{
        // background: #fc323f;
        animation:colorChange 5s infinite;
        -webkit-animation:colorChange 1s infinite;
        border: 1px solid #fc323f;
      }
      .device-list{
        height: 350PX;
        overflow-y: scroll;
        li{
          padding: 15px;
          margin-bottom: 30px;
          .state{
            position: relative;
            padding: 20px;
            .icon{
              position: absolute;
              width: 18px;
              height: 18px;
              top: 21px;
              left: 6px;
              border-radius: 9px;
              /*-webkit-filter: blur(0px);*/
              /*-moz-filter: blur(1px);*/
              /*-ms-filter: blur(1px);*/
              /*filter: blur(1px);*/
            }
          }
          .use-state{
            position: absolute;
            top: 20px;
            left: 5px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            background: rgba(255,255,255,.5);
            -webkit-filter: blur(2px);
            -moz-filter: blur(2px);
            -ms-filter: blur(2px);
            filter: blur(2px);
          }
          .error{
            // background: #ff4149;
            animation:colorChange 5s infinite;
            -webkit-animation:colorChange 1s infinite;
          }
          .primary{
            background: #29e049;
          }
          .default{
            background: #d1d1d1;
          }
          .energy{
            padding-top: 12px;
          }
        }
        .device-icon{
          display: inline-block;
          width: 63px;
          height: 56px;
          // background: #fff;
        }
        .device1{
          background: url("../../../static/imgs/device1.png") no-repeat 7px 1px;
        }
        .device2{
          background: url("../../../static/imgs/device2.png") no-repeat 7px 1px;
        }
        .device3{
          background: url("../../../static/imgs/device3.png") no-repeat 7px 12px;
        }
        .device4{
          background: url("../../../static/imgs/device4.png") no-repeat 7px 1px;
        }
      }
    }
  }

  #quality, #workstation{
    padding: 10px;
  }
  @keyframes colorChange
  {
    0% {
      background: #ff797b;
    }
    50% {
      background: #ff0007;
    }
    100% {
      background: #ff797b;
    }
  }

  @-webkit-keyframes colorChange
  {
    0% {
      background: #ff797b;
    }
    50% {
      background: #ff0007;
    }
    100% {
      background: #ff797b;
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
</style>
