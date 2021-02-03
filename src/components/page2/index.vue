<template>
  <div id="page-2" @mousemove="mouseMove">
    <div class="header">
      <div class="clearfix">
        <div class="pull-right ml20 location">

          <span>{{factoryName}}</span>
        </div>

        <div class="pull-left">
          <span class="fa fa-clock-o"></span>
          <span>{{currentDate}}</span>
        </div>
      </div>
      <div>
        <div class="clearfix total mt5 mb10">
          <span class="pull-right">
            {{tableData.okCount}}/{{tableData.sumCount==0 && tableData.okCount!=0?' ':tableData.sumCount}}
          </span>
        </div>
      </div>

    </div>
    <div class="table-box">
      <div class="box">
        <table class="table">
          <colgroup>
            <col width="10%">
            <col width="25%">
            <col width="15%">
            <col width="10%">
            <col width="25%">
            <col width="15%">
          </colgroup>
          <thead>
          <tr>
            <td>{{isEnglish?'Serial Number':'序号'}}</td>
            <td>{{isEnglish?'Vehicle VIN Number':'车辆VIN号'}}</td>
            <td>{{isEnglish?'Car Model':'车型'}}</td>
            <td>{{isEnglish?'Configuration':'配置'}}</td>
            <td>{{isEnglish?'Detection Status':'检测状态'}}</td>
            <td>{{isEnglish?'Complete Status':'交付状态'}}</td>
          </tr>
          </thead>
        </table>
        <div class="scroll-box">
          <table class="table">
            <colgroup>
              <col width="10%">
              <col width="25%">
              <col width="15%">
              <col width="10%">
              <col width="25%">
              <col width="15%">
            </colgroup>
            <tbody>

            <tr v-for="(item, index) in tableData.varPlanVos"
                @click="searchStation(item.vin)">
              <td>{{ tableData.okCount - index }}</td>
              <td>{{item.vin}}</td>
              <td>{{item.vehicleCode}}</td>
              <td>{{item.controlMode}}</td>
              <td class="progress">
                <Progress :num="item.carSatauList"></Progress>
              </td>
              <td :class="item.allSuccess?'has-done':'undone'">
                {{item.allSuccess?isEnglish?'Done':'已交付':isEnglish?'Going':'未交付'}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>

      <span class="icon icon1"></span>
      <span class="icon icon2"></span>
      <span class="icon icon3"></span>
      <span class="icon icon4"></span>
    </div>
    <div class="filter">
      <span class="mr20 item"
            @click="stationInterval"
            :class="currentStatus == 0 ? 'active':''">

        <span class="mr5" :class="currentStatus == 0 ? 'dashborad-spin':'fa fa-dashboard'"></span>
        <span class="dashboradin" v-show="currentStatus == 0"></span>
        <span>{{isEnglish?'Real-time Monitoring':'实时监控'}}</span>
      </span>
      <span class="mr20 item"
            :class="currentStatus == 1 ? 'active':''">
        <span class="fa fa-search mr5 mt5"></span>
        <span>{{isEnglish?'Search':'查询'}}</span>
      </span>
      <div class="item">
        <div class="flex">
          <div class="flex-1">
            <el-input v-model="searchModel" placeholder="请输入vin"></el-input>
          </div>
        </div>

      </div>
    </div>
    <div class="work-station">
      <div class="flex">
        <div class="flex-1 station" v-for="(item,index) in workStationData">

          <div class="box">
            <span class="fa fa-arrow-circle-right" :class="index == iconAnimate?'active': ''"></span>
            <div class="name">
              <span class="num">
                {{index+1}}
              </span>
              <span>
                {{filterTypeName(item.typeName)}}
              </span>
            </div>
            <div class="img-box" :class="getImgUrl(item.type, currentActions[item.type])">

            </div>
            <div class="action" v-if="currentActions[item.type] && currentActions[item.type].actions.length">
              <p class="mt10">
                <span>{{currentActions[item.type].actions[0].vin}}</span>
              </p>
              <div class="flex mt5">
                <div class="flex-1 mr10">
                  <GLProgress :width="parseInt(currentActions[item.type].actions.length/currentActions[item.type].typeActions.length*100)">
                  </GLProgress>
                </div>
                <span class="flex-120px">
                  {{currentActions[item.type].actions.length}}/{{currentActions[item.type].typeActions.length?currentActions[item.type].typeActions.length:''}}<small>(max)</small>
                </span>
              </div>
              <div class="list mt20">
                <ul>
                  <li v-for="subItem in currentActions[item.type].actions">
                    <span class="list-item mr10"
                          :class="subItem.result?'item-success':'item-error'"></span>
                    <span :class="subItem.result?'':'error'"
                          v-if="subItem.subModule != '*' && subItem.subModule != ' '">
                      {{subItem.subModule}}
                    </span>
                    <span :class="subItem.result?'':'error'">{{subItem.actionVal}}</span>
                    <span class="fa pull-right"
                          :class="subItem.result?'fa-check-square success':'fa-warning error'">

                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <span class="icon icon1 top-icon"></span>
            <span class="icon icon2 top-icon"></span>
            <span class="icon icon3 bottom-icon"></span>
            <span class="icon icon4 bottom-icon"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Progress from './Progress.vue'
  import GLProgress from './GLProgress.vue'
  export default {
    components: {
      Progress,
      GLProgress
    },
    filters: {
      searchInput (data) {
        let res = []
        data.map(v => {
          if (v.indexOf(this.searchModel) != -1) {
            res.push(v)
          }
        })
        return res
      }
    },
    watch: {
      isActive (data) {
        let self = this
        // if (data) {
        //   setTimeout(function () {
        //     self.isActive = false
        //   }, 10000)
        // }
      },

      currentStatus (data) {
        // let self = this
        // if (data == 0) {
        //   self.stationTimer = setInterval(function () {
        //     self.getCurrentActions()
        //   }, 2000)
        // } else {
        //   clearInterval(self.stationTimer)
        // }
      },
      factoryName () {
        this.currentActions = []
      }
    },
    data () {
      return {
        searchModel: undefined,
        iconAnimate: 0,
        isEnglish: false,
        factoryName: '杭州湾研究院试制车间',
        currentStatus: 0,
        tableData: {},
        workStationData: [1],
        currentActions: [],
        isActive: false,
        stationTimer: undefined,
        mouseTimer: undefined,
        currentDate: undefined,
        callIsBack: false
      }
    },
    methods: {
      getDate () {
        let date = new Date()
        this.currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) +
          '/' + date.getDate()
      },
      filter () {
        if (this.searchModel) {
          let res = []
          this.tableData.varPlanVos.map(v => {
            if (v.vin.indexOf(this.searchModel) != -1) {
              res.push(v)
            }
          })
          return res
        } else {
          return this.tableData.varPlanVos
        }
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
      setIconAnimate () {
        let self = this
        if (this.currentActions['BRAKEFILL'] &&
          this.currentActions['SWDL'] &&
          this.currentActions['X-WHEEL'] &&
          this.currentActions['VISP'] &&
          this.currentActions['FAS']) {
          setInterval(function () {
            self.iconAnimate+=1
            if (self.iconAnimate==(self.workStationData.length-1)) {
              self.iconAnimate = 0
            }
          }, 300)
        } else{
          self.iconAnimate = -2
        }
      },
      getCurrentActions () {
        this.$http.get('/api/actions/current').then(function (res) {
          if (res.body.data) {
            if (this.currentStatus == 0) {
              this.currentActions = res.body.data
              // this.currentActions.percentage = parseInt(this.currentActions.length/61*100)
            }
          }
        }, function (err) {
          console.log(err)
        })
      },
      searchStation (vin) {
        let self = this
        this.currentStatus = 1
        // this.isActive = true
        this.clearStationTimer()
        if (this.mouseTimer) {
          clearInterval(this.mouseTimer)
        }
        this.mouseTimer = setTimeout(function () {
          self.isActive = false
          self.currentStatus = 0
          self.stationInterval()
        }, 10000)
        this.currentActions = []
        this.$http.get('/api/actions/query?vin='+ vin).then(function (res) {
          this.currentActions = res.body.data
          // this.currentActions.percentage = parseInt(this.currentActions.length/61*100)
        }, function (err) {
          console.log(err)
        })
      },
      getTableData () {
        if (!this.callIsBack) {
         // console.time(200000)
          this.callIsBack = true
          let url
          if (this.searchModel) {
            url = '/api/varplan/planList?vin=' + this.searchModel
          } else {
            url = '/api/varplan/planList'
          }
          this.$http.get(url).then(function (res) {
            if (res.body.status === 200) {
              this.tableData = res.body.data
              // this.tableData.varPlanVos = this.filter()
             /*  this.tableData.varPlanVos.map(v => {
                let step = v.carSatauList.lastIndexOf('OK') + 1
                v.step = step
              }) */
            } else {
              this.tableData.varPlanVos = []
              this.tableData.okCount = 0
              this.tableData.sumCount = 0
            }
            this.$nextTick(function () {
              this.callIsBack = false
            })
          }, function (err) {
            console.log(err)
          })
        }
      },
      getImgUrl (name, data) {
        let className
        switch (name) {
          case 'BRAKEFILL': if (data) {className='jiazhu2'}else{className='jiazhu1'};
            break;
          case 'SWDL': className='shuaxie';
            break;
          case 'X-WHEEL': if (data) {className='silun2'}else{className='silun1'};
            break;
          case 'VISP': if (data) {className='zhuangu2'}else{className='zhuangu1'};
            break;
          case 'FAS': if (data) {className='fas2'}else{className='fas1'};
            break;
        }
        return className
      },
      clearStationTimer () {
        clearInterval(this.stationTimer)
      },
      getWorkStation () {
        let self = this
        this.$http.get('/api/plantTypes/list').then(function (res) {
          this.getCurrentActions()
          this.workStationData = res.body.data
          this.workStationData.map(v=>{
            switch (v.plant) {
              case 'chengdu.gaoyuan': this.factoryName =self.isEnglish?'Chengdu Gao Yuan':'成都高原汽车工业有限公司';
                break;
              case 'hangzhouwan.pilot': this.factoryName =self.isEnglish?'HangZhouBay GRI Pilot Plant':'杭州湾研究院试制车间';
                break;
            }
          })
        }, function (err) {
          console.log(err)
        })
      },
      tableInterval () {
        let self = this
        setInterval(function () {
          if (document.cookie.indexOf('isEnglish=false') != -1) {
            self.isEnglish = false
            document.getElementById("page-2").style.backgroundImage="url(./static/imgs/bg.jpg)";
          } else {
            self.isEnglish = true
            document.getElementById("page-2").style.backgroundImage="url(./static/imgs/page2.png)";
          }
          self.getTableData()
          self.getWorkStation()
        }, 1000)
      },
      stationInterval () {
        let self = this
        this.currentStatus = 0
        if (self.stationTimer) {clearInterval(this.stationTimer)}
        self.stationTimer = setInterval(function () {
          if (self.currentStatus == 0) {
            self.getCurrentActions()
          }
        }, 1000)
      },
      mouseMove () {
        let self = this
        if (this.currentStatus == 1) {
          this.clearStationTimer()
          if (this.mouseTimer) {
            clearInterval(this.mouseTimer)
          }
          this.mouseTimer = setTimeout(function () {
            self.isActive = false
            self.currentStatus = 0
            self.stationInterval()
          }, 10000)
        }
      }
    },
    mounted () {
      this.getTableData()
      this.getWorkStation()
      this.tableInterval()
      this.stationInterval()
      this.setIconAnimate()
      this.getDate()
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../static/less/CONST";
  #page-2{
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    background: url("../../../static/imgs/bg.jpg") no-repeat;
    padding: 30px;
    .header{
      color: rgba(233,234,255,.7);
      font-size: 26px;
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
  .table-box{
    position: relative;
    .box{
      height: 400px;
      border: 1px solid @boxBorderColor;
    }
    .scroll-box{
      height: 344px;
      overflow-y: scroll;
    }
    td{
      color: #73b8fb;
      white-space: nowrap;
      font-size: 25px;
    }
    .progress{
      font-size: 16px;
    }
    thead tr:first-child td{
      color: #fff;
    }
    tr:nth-child(odd) td{
      background: rgba(6, 35, 92, .1);
      cursor: pointer;
      height: 50px;
      text-align: center;
      border: 1px solid rgba(0, 63, 208, .25);
    }
    tr:nth-child(even) td{
      background: #06235C;
      height: 50px;
      cursor: pointer;
      text-align: center;
      border: 1px solid rgba(0, 63, 208, .25);
    }
    .has-done{
      color: #72ff00;
    }
  }
  .icon{
    position: absolute;
    width: 22px;
    height: 21px;
    background: url("../../../static/imgs/corner.png");
  }
  .icon1{
    top: 0;
    left: 0;
  }
  .icon2{
    top: 0;
    right: 0;
    transform:rotate(90deg);
  }
  .icon3{
    bottom: 0;
    left: 0;
    transform:rotate(270deg);
  }
  .icon4{
    bottom: 0;
    right: 0;
    transform:rotate(180deg);
  }
  .filter{
    padding: 30px;
    padding-left: 820px;
    .item{
      position: relative;
      display: inline-block;
      padding: 10px;
      color: #6280b2;
      cursor: pointer;
      font-size: 16px;
    }
    .dashborad-spin{
      position: absolute;
      top: 13px;
      left: -27px;
      display: inline-block;
      width: 29px;
      height: 29px;

      background: url("../../../static/imgs/dashbord.png") no-repeat;
    }
    .dashboradin{
      position: absolute;
      top: 13px;
      left: -27px;
      display: inline-block;
      width: 29px;
      height: 29px;
      -webkit-animation: spin1 2s linear infinite;
      -o-animation: spin1 2s linear infinite;
      animation: spin1 2s linear infinite;
      background: url("../../../static/imgs/dashbordin.png") no-repeat;
    }
    .active{
      color: #29a5fb;
      font-size: 24px;
      border-bottom: 1px solid #2d71f4;
    }
  }
  .work-station{
    .fa-arrow-circle-right{
      position: absolute;
      top: 100px;
      right: -36px;
      color: #29a5fb;
      font-size: 40px;
      border-radius: 100%;
      height: 30px;
      width: 30px;
      &:before{
        position:absolute;
        left: -2px;
        top: -5px;
      }
    }
    .active{
      background: #feffe1;

    }
    .station{
      padding-right: 40px;
      .jiazhu1{
        background: url("../../../static/imgs/jiazhu1.jpg") no-repeat;
      }
      .jiazhu2{
        background: url("../../../static/imgs/jiazhu2.jpg") no-repeat;
      }
      .silun1{
        background: url("../../../static/imgs/silun1.jpg") no-repeat;
      }
      .silun2{
        background: url("../../../static/imgs/silun2.jpg") no-repeat;
      }
      .fas1{
        background: url("../../../static/imgs/fas1.jpg") no-repeat;
      }
      .fas2{
        background: url("../../../static/imgs/fas2.jpg") no-repeat;
      }
      .zhuangu1{
        background: url("../../../static/imgs/zhuangu1.jpg") no-repeat;
      }
      .zhuangu2{
        background: url("../../../static/imgs/zhuangu2.jpg") no-repeat;
      }
      .shuaxie{
        background: url("../../../static/imgs/xiezai.png") no-repeat;
      }
      &:last-child{
        padding-right: 0;
        .fa-arrow-circle-right{
          display: none;
        }
      }
      .box{
        position: relative;
        height: 420px;
        border: 1px solid @boxBorderColor;
        font-size: 24px;
      }
      .top-icon{
        top: 0;
      }
      .bottom-icon{
        bottom: 0;
      }
    }
    .name{
      width: 150px;
      height: 40px;
      font-size: 20px;
      margin: 0 auto;
      margin-top: -1px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      border: 1px solid rgba(0, 63, 208, .45);
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      background: url("../../../static/imgs/faguang.png") no-repeat 38px;
    }
    .img-box{

      text-align: center;
      width: 200px;
      height: 160px;
      margin: 5px auto;
      margin-top: 10px;
      border: 1px solid #29a5fb;
    }
    .action{
      padding-left: 20px;
      color: #29a5fb;
    }
    .list{
      height: 100px;
      overflow-y: scroll;
      font-size: 18px;
      li{
        margin-bottom: 10px;
        padding-right: 15px;
      }
    }
    .success{
      color: #48d947;
    }
    .error{
      color: #ff5757;
    }
    .list-item{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
    .item-success{
      background: #48d947;
    }
    .item-error{
      background: #ff5757;
    }
  }
  @keyframes spin1 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
