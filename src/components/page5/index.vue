<template>
  <div id="page5">

    <div class="flex">
      <div class="flex-1">
        <div class="header">
          <span>{{isEnglish?'Virtual Test':'虚拟验证'}}</span>
          <span class="subtitle">({{carType}})</span>
          <div class="pull-right">
            <el-input v-model="carType" placeholder="请输入车型" class="el-input"></el-input>
          </div>
        </div>
        <div class="body">
          <iframe src="http://172.22.86.95:9100/"></iframe>
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="header">
          <span>{{isEnglish?'Project':'项目'}}</span>
          <span class="subtitle">
            ({{isEnglish?'Plan Number':'计划数'}}:{{projectData.planDone}}&nbsp;
            &nbsp;&nbsp;&nbsp;{{isEnglish?'Completed':'已完成'}}:{{projectData.planNum}})
          </span>
        </div>
        <div class="body">
          <table class="table">
            <tr>
              <td>{{isEnglish?'Name':'名称'}}</td>
              <td width="60%">
                <div>{{isEnglish?'Status':'状态'}}</div>
                <div class="process-name">
                  <div>{{isEnglish?'Development':'程序开发'}}</div>
                  <div class="fa fa-play"></div>
                  <div>{{isEnglish?'Virtual Test':'虚拟验证'}}</div>
                  <div class="fa fa-play"></div>
                  <div>{{isEnglish?'Boxcar Test':'台架验证'}}</div>
                  <div class="fa fa-play"></div>
                  <div>{{isEnglish?'Realy Vehicle Test':'实车验证'}}</div>
                </div>
              </td>
              <td>{{isEnglish?'Publish':'发布'}}</td>
            </tr>
            <tr v-for="item in projectData.list" class="table-body">
              <td>{{item.name}}</td>
              <td>
                <div class="process" :class="getProcessClass(item.status)"></div>
              </td>
              <td>
                <div class="status" :class="getButtonClass(item.publishStatus,item.status)">{{isEnglish?'Publish':'发布'}}</div>
                <small v-if="item.publishStatus == 1">{{item.version}}</small>
              </td>
            </tr>
          </table>
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="header">
          <span>{{isEnglish?'Real Vehicle Test':'实车验证'}}</span>
          <span class="subtitle">({{carType}})</span>
        </div>
        <div class="body">
          <img v-if="isEnglish" src="../../../static/imgs/page5/shicheyanzheng2.png" alt="" style="margin: 30px 100px;" >
          <img v-if="!isEnglish" src="../../../static/imgs/page5/shicheyanzheng.png" alt="" style="margin: 30px 100px;" >
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
    </div>

    <div class="flex mt30">
      <div class="flex-1">
        <div class="header">{{isEnglish?'Virtual Test Process':'虚拟验证过程'}}</div>
        <div class="body flex">
          <div class="flex-1" id="chart-box"></div>
          <div class="flex-1 question">
            <div class="question-item" ref="question">
              <div class="longFont" v-for="item in questionData">{{item.subModule+item.actionVal}}{{isEnglish?"Failed":"失败"}}</div>
            </div>
            <!--<div class="longFont" v-for="item in questionData">{{item}}</div>-->
          </div>
        </div>

        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="tab-box">
          <span v-for="item in tabData"
                class="tab" @click="tabChange(item.index)"
                :class="activeTab==item.index?'active':''">
            {{item.name}}</span>
        </div>

        <div class="body" v-if="activeTab==1">
          <iframe src="http://172.22.86.95:9201/?_=Aa123456"></iframe>
        </div>
        <div class="body" v-if="activeTab==2">
          <iframe src="http://172.22.86.95:9202/"></iframe>
        </div>
        <div class="body" v-if="activeTab==3">
        	请查看设备运行监控
        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span>
      </div>
      <div class="flex-1">
        <div class="header">{{isEnglish?'Real Vehicle Test Process':'实车验证过程'}}</div>
        <div class="body">
          <div class="real-car-box">
            <div class="real-car" ref="realCar">
              <div v-for="item in verifyData" class="car">
                <div class="verify-name">
                  <span class="verify-icon" :class="item.status?'verify-icon1':'verify-icon2'">

                  </span>
                  <span :class="item.status?'primary':'wrong'" class="index">{{item.index}}</span>
                  <span :class="item.status?'primary':'wrong'">{{verifyDataFilter(item.name)}}</span>
                </div>
                <div class="verify-result">
                  <span :class="item.status?'primary':'wrong'">
                    {{item.num}}
                  </span>
                  <span>/</span>
                  <span>{{item.sum}}</span>
                </div>
              </div>
            </div>
          </div>



        </div>
        <span class="icon icon1"></span>
        <span class="icon icon2"></span>
        <span class="icon icon3"></span>
        <span class="icon icon4"></span></div>
    </div>

  </div>
</template>

<script>
  let echarts = require('echarts')
  export default {
    data () {
      return {
    	isEnglish: false,
        carType: 'KC-2',
        activeTab: 1,
        tabData: [
          {name: '虚拟验证',index:1},
          {name: '台架验证',index:2},
          {name: '实车验证',index:3},
        ],
        projectData: {
          planDone: 0,
          planNum: 0,
          list: []
        },
        tableData: [
          {
            name: 'VF11',
            process: 3,
            status: 1
          },
          {
            name: 'SX11',
            process: 1,
            status: 2
          },
          {
            name: 'VF12',
            process: 2,
            status: 2
          },
          {
            name: 'CX11',
            process: 4,
            status: 2
          },
          {
            name: 'BX11',
            process: 3,
            status: 3
          }
        ],
        questionData: [],
        verifyData: [
          {
            index: '1',
            name: '加注',
            status: true,
            num: 1,
            sum:  1,
          },
          {
            index: '2',
            name: '软件刷写',
            status: true,
            num:  20,
            sum:  20,
          },
          {
            index: '3',
            name: '点火',
            status: true,
            num:  1,
            sum: 1,
          },
          {
            index: '4',
            name: '四轮定位',
            status: true,
            num:  1,
            sum:  1,
          },
          {
            index: '5',
            name: '转毂',
            status: true,
            num:  9,
            sum:  9,
          },
          {
            index: '6',
            name: 'ADAS',
            status: true,
            num:  0,
            sum:  0,
          },
        ]
      }

    },
    methods: {
      verifyDataFilter(name){
    	  if(this.isEnglish){
      		switch(name){
      			case "加注": name="Brake Filling"; break;
      			case "软件刷写": name= "SWDL"; break;
      			case "四轮定位": name= "X-Wheel"; break;
      			case "转毂": name= "Rolling Road"; break;
      			case "点火": name="Ignition"; break;
      		} 
      	  }
     	  return name;  
      }, 	
  	  getVerifyData (){
		var carType = this.carType;  		  
  		 this.$http.get('/api/research/realInfo?vehicle='+this.carType).then(res => {
  			var source = res.body.data.source;
  			var real = res.body.data.real;
  			this.verifyData.map(v=>{
  				switch (v.index){
  	          case "1": v.num = real.brakefill?real.brakefill:0; v.sum=source.bf;return;
  	          case "2": v.num = real.swdl?real.swdl:0; v.sum=source.swdl;return;
  	          case "3": v.num = real.wheel?1:real.visp?1:0; v.sum=1;return;
  	          case "4": v.num = real.wheel?real.wheel:0; v.sum=source.wheel;return;
  	          case "5": v.num = real.visp?real.visp:0; v.sum=source.visp;return;
  	          case "6": v.num = real.fas?real.fas:0; v.sum=source.fas;return;
  	        }
  			})
  		 }, err => {})
  	  },  	
      getListData () {
        this.$http.get('/api/research/virtual?vehicle='+this.carType).then(res => {
          this.questionData = res.body.data.failedList
          let title = []
          let arr = []
          arr.push({value: res.body.data.undone,name: '未测数 '+res.body.data.undone})
          arr.push({value: res.body.data.failed,name: '问题数 '+res.body.data.failed})
          arr.push({value: res.body.data.done,name: '完成数 ' + res.body.data.done})
          title.push('未测数 '+res.body.data.undone)
          title.push('问题数 '+res.body.data.failed)
          title.push('完成数 '+res.body.data.done)
          echarts.init(document.getElementById('chart-box'))
            .setOption(this.getCircleOption(arr, title))

        }, err => {})
      },
      getProcessData () {
        this.$http.get('/api/research/plans').then(res => {
          this.projectData = res.body.data
        }, err => {})
      },
      tabChange (index) {
        this.activeTab = index
      },
      getProcessClass (process) {
        switch (process){
          case 0: return 'process0';
          case 1: return 'process1';
          case 2: return 'process2';
          case 3: return 'process3';
          case 4: return 'process4';
          default: return 'process0';
        }
      },
      getButtonClass (status,process) {
        if (status==1) {
          return 'status3'
        }
        if (status==0 && process == 3) {
          return 'status2'
        }
        return 'status1'
      },
      loopAnimation () {
        let top = 0
        let top1 = 0
        setInterval(() => {
          if (this.questionData && this.questionData.length>7) {
            top-=0.4
            if (top<-53) {

              let data = this.questionData.shift();
              this.questionData.push(data)
              top=0
            }
            this.$refs.question.style.top = top + 'px'
          }
          if (this.verifyData && this.verifyData.length>7) {
            top1-=0.4
            if (top1<-53) {

              let data = this.verifyData.shift();
              this.verifyData.push(data)
              top1=0
            }
            this.$refs.realCar.style.top = top1 + 'px'
          }
        },20)
      },
      getCircleOption (data,title) {
        return {
          color: ['#2e5bff','#fe4e4e','#fff369'],
          tooltip: {
            trigger: 'item',
            formatter: ""
          },
          legend: {
            orient: 'vertical',
            bottom: 4,
            data:title,
            itemGap: 20,
            itemWidth: 30,
            width: '40',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name:'数据',
              type:'pie',
              radius: ['58%', '75%'],
              center: ['50%', '40%'],
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
              data:data
            }
          ]
        }
      }
    },
    watch: {
      carType () {
        this.getListData()
        this.getVerifyData()
      }
    },
    mounted () {
      let self = this;
	  this.getVerifyData()
      this.loopAnimation()
      this.getListData()
      this.getProcessData()
      setInterval(function () {
    	  self.getVerifyData()
          self.loopAnimation()
          self.getListData()
          self.getProcessData()
      }, 5000)
       setInterval(_ => {
        if (document.cookie.indexOf('isEnglish=false') != -1) {
          this.isEnglish = false
          this.tabData = [
            {name: '虚拟验证',index:1},
              {name: '台架验证',index:2},
              {name: '实车验证',index:3},
            ]
          document.getElementById("page5").style.backgroundImage="url(./static/imgs/page5/bg5.png)";
        } else {
          this.tabData = [
            {name: 'Virtual Test',index:1},
            {name: 'BoxCar Test',index:2},
            {name: 'Real Vehicle Test',index:3},
          ]
          this.isEnglish = true
          document.getElementById("page5").style.backgroundImage="url(./static/imgs/page5.png)";
        }
      },1000)
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/less/CONST";
  #page5{
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    padding: 30px;
    background: url("../../../static/imgs/page5/bg5.png");
    >.flex{
      >.flex-1{
        position: relative;
        height: 445px;
        border: 1px solid @boxBorderColor;
        margin-right:10px;
        &:last-child{
          margin-right: 0;
        }
        .header{
          padding: 10px 20px;
          background: @headerBackgroundColor;
          font-size: 18px;
          color: #fff;
          .subtitle{
            color: #8c9bb2;
          }

        }
        .tab-box{
          background: @headerBackgroundColor;
          font-size: 18px;
          color: #fff;
          .tab{
            display:inline-block;
            cursor: pointer;
            padding: 10px 20px;
          }
          .active{
            background: #092966;
            border-bottom: 1px solid #35d7da;
          }
        }
        .body{
          height: 398px;
          overflow-y: scroll;
          iframe{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .process-name{
      display: flex;
      font-size: 12px;
      padding: 4px;
      justify-content: space-between;
      color: #a4d1ff;
    }
    table{

      td{
        padding: 13px 5px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border-right: 1px solid #a4d1ff;
        &:last-child{
          border-right: 0;
        }
      }
      tr:nth-child(odd){
        td{
          background: #0b2f7d;
        }
      }
      tr:nth-child(even){
        td{
          background: #092868;
        }
      }
      .table-body td{
        color: #a4d1ff;
      }
      .status{
        margin: 0 auto;
        width: 80px;
        height: 40px;
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        color: #000;
        cursor: pointer;
      }
      .process{
        width: 220px;
        height: 18px;
        margin: 0 auto;
      }
      .process0{
        background: url("../../../static/imgs/page5/00.png");
      }
      .process1{
        background: url("../../../static/imgs/page5/01.png");
      }
      .process2{
        background: url("../../../static/imgs/page5/02.png");
      }
      .process3{
        background: url("../../../static/imgs/page5/03.png");
      }
      .process4{
        background: url("../../../static/imgs/page5/04.png");
      }
      .status1{
        background: #9097a7;
        color: #fff;
      }
      .status2{
        background: #f7f763;
      }
      .status3{
        background: #94d351;
      }
    }
  }
  .mt100{
    margin-top: 100px;
  }
  #chart-box{
    height: 380px;
    border-right: 1px solid @boxBorderColor;
  }
  .question{
    position: relative;
    padding: 15px;
    color: #a4d1ff;
    font-size: 16px;
    overflow: hidden;
    .longFont{
      padding: 15px 0;
      border-bottom: 1px solid rgba(164, 199,255,.5);
    }
    .question-item{
      width: calc(100% - 30px);
      position: absolute;
    }
  }
  .real-car-box{
    position: relative;
    padding: 0 120px;
    height: 380px;
    color: #a4d1ff;
    font-size: 16px;
    overflow: hidden;
    .real-car{
      position: absolute;
      width: calc(100% - 240px);
    }
    .car{

      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid rgba(164, 199,255,.5);
      justify-content: space-between;

    }
    .wrong{
      color: #ff694b;
      font-weight: 700;
    }
    .verify-icon{
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .verify-name{
      display: flex;
      align-items: center;
      .index{
        margin: 0 15px;
      }
    }
    .verify-icon1{
      background: url("../../../static/imgs/page5/blue.png");
    }
    .verify-icon2{
      background: url("../../../static/imgs/page5/red.png");
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
