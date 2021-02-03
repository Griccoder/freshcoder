<template>
  <div id="map">
    <div style="height:10%;width:100%"></div>
    <div id="container" style="height: 90%;width: 100%; "></div>
    <div class="geely-logos">
      <ul>
        <li><img src="../../../static/imgs/vcartsBases/logo-geely.png" alt="" width="125" height="58"></li>
        <li><img src="../../../static/imgs/vcartsBases/logo-lk.png" alt="" width="206" height="31"></li>
        <li><img src="../../../static/imgs/vcartsBases/logo-volvo.png" alt="" width="74" height="74"></li>
         <li><img src="../../../static/imgs/vcartsBases/logo-lotus.png" alt="" width="74" height="74"></li>
      </ul>
    </div>
    <div class="icon-define">
      <ul>
        <li>
          <img src="../../../static/imgs/vcartsBases/1.png" alt="">
          <span>{{isEnglish?'Use the vcats pilot':'使用vcats基地'}}</span>
        </li>
        <li>
          <img src="../../../static/imgs/vcartsBases/2.png" alt="">
          <span>{{isEnglish?'No vcats pilot':'未使用vcats基地'}}</span>
        </li>
        <li>
          <img src="../../../static/imgs/vcartsBases/3.png" alt="">
          <span>{{isEnglish?'HangZhou Bay Geely Pilot Plant Center':'杭州湾试制中心vcats基地'}}</span>
        </li>
        <li>
          <img src="../../../static/imgs/vcartsBases/4.png" alt="">
          <span>{{isEnglish?'Remote monitoring':'已实现远程监控'}}</span>
        </li>
      </ul>
    </div>
    <div class="language">
      <el-button type="primary" size="mini" @click="cutLanguage">EN/CN</el-button>
    </div>
    <div class="animated fadeInDown" id="base-detail">
      <ul>
        <li v-for="item in popupData" :class="item.stateCode==0?'':'used'"><i class="fa fa-circle"></i>
          <a @click="initArea(item.enCode),open(item)">{{item.cn}}</a>
        </li>
      </ul>
    </div>
    <div class="dialogMask" id="mask" v-on:click.stop="dialogHide($event)"></div>
    <!--<img src="img/timg.jpg" class="logo_image" style="width: 200px; position:absolute;top: 20px;left: 20px;" />-->
    <!--<img src="img/island4.png" class="island_image" style="width: 400px; position:absolute;bottom: 6px;left: 1360px;" />-->
  </div>
</template>
<script>
  // $(function(){
  //   $.fn.autoHide =  function(){
  //     var ele = $(this);
  //     $(document).on('click',function(e){
  //         if(ele.is(':visible')&&(!$(e.target)[0].isEqualNode(ele[0])&&ele.has(e.target).length===0)){
  //           ele.hide();
  //         }
  //         e.stopPropagation();
  //         return false;
  //     })
  //     return this;
  //   }
  // })(jQuery)
  // $('#container').on('click',function(){
  //   $('#base-detail').toggle().autoHide();
  //   return false;
  // })
  let echarts = require('echarts')
  import '../../../static/js/china'
  export default {
    data () {
      return {
        showFlag:false,
        isEnglish: false,
        popupData:[]
      }
    },
    methods: {
      cutLanguage () {
        if (document.cookie.indexOf('isEnglish=false') != -1) {
          this.isEnglish = true
          document.cookie="isEnglish=true; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
          document.getElementById("map").style.backgroundImage="url(./static/imgs/vcartsBases/page1.png)";
        } else {
          this.isEnglish = false
          document.getElementById("map").style.backgroundImage="url(./static/imgs/vcartsBases/bg.png)";
          document.cookie="isEnglish=false; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
        }
		this.initMap()
      },
      initArea(enCode){
        if(enCode){
          this.$http.get("/api/area/createArea?area="+enCode)
            .then((res)=>{
              console.log(res.data.status)

            }).catch(error=>{
            console.log(error+"error")
          })
        }
      },
      open(item){
        let thisType = 'info';
        let thisMsg = item.cn+'暂未开通vcats服务'
        if(item.enCode){
          thisType = 'success';
          thisMsg = '您已选择'+item.cn;
          this.postMsg(item.enCode);
        }
        this.$message({message:thisMsg,type:thisType,customClass:'msg-vertical'});
      },
      postMsg(msg){
        window.parent.postMessage(msg,"*");
      },
      dialogHide(e){
        document.getElementById('base-detail').style.display = 'none';
        document.getElementById('mask').style.display = 'none';
      },
     convertData(data,geoCoordMap) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
        	  if(this.isEnglish){
        		  res.push({
                      name: data[i].enName,
                      value: geoCoord.concat(data[i].value)
                    });
        	  }else{
        		  res.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value)
                    });
        	  }
          }
        }
        return res;
      },
      initMap(){
    	  var dom = document.getElementById("container")
          var myChart = echarts.init(dom)
          option = null

          const usedData = [
            {name:'大庆',value:100, enName:'Daqing'},
            {name:'张家口',value:100, enName:'Zhangjiakou'},
            {name: '北仑', value: 100, enName: 'Beilun'}
          ]

          const rightData = [
            {name: '晋中', value: 100, enName: 'Jinzhong'},
            {name: '济南', value: 100, enName: "Ji'nan"},
            {name: '临海', value: 100, enName: 'Linhai'},
            {name: '武汉', value: 100, enName: 'Wuhan'},
            {name: '湘潭', value: 100, enName: 'Xiangtan'},
            {name: '枫泾', value: 100, enName: 'FengJing'},
            {name: '兰州', value: 100, enName: 'Lanzhou'},
            {name: '西安', value: 100, enName: "Xi'an"},
            {name: '南充', value: 100, enName: 'Nanchong'},
          ]
          const leftData = [
            {name: '贵阳', value: 100, enName: 'Guiyang'},
            {name: '宝鸡', value: 100, enName: 'Baoji'},
            {name: '杭州', value: 100, enName: 'Hangzhou'},
            {name: '义乌', value: 100, enName: 'Yiwu'},
            {name: '湖州', value: 100, enName: 'Huzhou'},
            {name: '余姚', value: 100, enName: 'Yuyao'}
          ]
          const diejiaData = [{name: '路桥', value: 100, enName: 'Luqiao'}]
          const jiankongData = [{name: '成都', value: 100, enName: 'Chengdu'}]
          const hangzhouwanData = [{name: '杭州湾', value: 100, enName: 'Hangzhou Bay'}]

          var data = usedData.concat(rightData).concat(leftData).concat(diejiaData).concat(jiankongData).concat(hangzhouwanData)
          console.log(data)
           console.log(usedData)


          var diaoyu = [{name:'钓鱼岛',value:[123.53,25.77,100]}]
          var geoCoordMap = {
            '大庆':[125.12,46.46],
            '张家口':[114.88,40.82],
            '路桥':[121.00,28.24],
            '北仑':[121.88,29.86],
            '宝鸡':[107.17,34.36],
            '晋中':[112.73,37.69],
            '济南':[117.02,36.68],
            '临海':[121.22,29.05],
            '武汉':[114.31,30.52],
            '湘潭':[112.93,27.83],
            '成都':[104.06,30.67],
            '枫泾':[121.03,30.89],
            '杭州':[120.15,30.27],
            '余姚':[121.15,30.04],
            '义乌':[120.07,29.31],
            '兰州':[103.83,36.06],
            '西安':[108.94,34.34],
            '南充':[106.11,30.84],
            '贵阳':[106.63,26.65],
            '湖州':[120.09,30.89],
            '杭州湾':[121.15,30.59]
          }

          //需要展开信息的城市
          var cities = [
            {name:"成都",detail:[{cn:'成都沃尔沃',stateCode:'0'},{cn:'成都高原吉利',enCode:'chengdu.gaoyuan',stateCode:'1'},{cn:'成都吉利',stateCode:'0'}]},
            {name:"Chengdu",detail:[{cn:'Volvo',stateCode:'0'},{cn:'Gaoyuan Geely',enCode:'chengdu.gaoyuan',stateCode:'1'},{cn:'Geely',stateCode:'0'}]},
            {name:"杭州湾",detail:[{cn:'杭州湾吉利帝豪',stateCode:'0'},{cn:'杭州湾领克',stateCode:'0'},{cn:'杭州湾吉利研究院',enCode:'hangzhouwan.pilot',stateCode:'2'}]},
            {name:"Hangzhou Bay",detail:[{cn:'First Factory',stateCode:'0'},{cn:'Second Factory',stateCode:'0'},{cn:'VP',enCode:'hangzhouwan.pilot',stateCode:'2'}]}
          ];
     //     console.log(convertData(data));
          let option = {
            // backgroundColor: '#274b89',
            title: {
              text: '',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize:'25',
              }
            },
            tooltip : {
              trigger: 'item'
            },
            geo: {
              map: 'china',
              layoutSize:'1200',
              layoutCenter: ['50%', '50%'],
              label: {
                emphasis: {
                  show: true,
                  color:"#395b94",
                  fontSize:'15',
                }
              },
               regions: [ //这个地方是关键,通过设置regions,可以实现不同的省份边界线配置不同的颜色,
                  {
                   name: '四川', //这个名字要和china.js保持一致
                    itemStyle: {
                        normal: {
                            opacity:'100',
                            areaColor :'#2F4F4F',
                        },
                    },
                 },
                {
                   name: '黑龙江', //这个名字要和china.js保持一致
                    itemStyle: {
                        normal: {
                            opacity:'100',
                            areaColor :'#2F4F4F',
                        },
                    },
                 },
                   {
                   name: '贵州', 
                    itemStyle: {
                        normal: {
                            
                            areaColor :'#2F4F4F',
                        },
                    },
                 },
                 {
                   name: '浙江', 
                    itemStyle: {
                        normal: {  
                            areaColor :'#2F4F4F',
                        },
                    },
                 }
           
            ],
              //roam表示是否允许放大缩小，true允许 false禁止
              roam: true,
              scaleLimit:{
                min:1,
                max:3
              },
              itemStyle: {
                normal: {
                  areaColor: '#395b94',
                  borderColor: '#fff'
                },
                emphasis: {
                  areaColor: '#395b94'
                }
              }
            },
            series : [
              //已使用的城市
              {
                name: '',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(usedData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/1.png",
                symbolSize: function (val) {
                  return val[2] / 6;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color:"#fff"
                  }
                },
              },
              //未使用标签在右边的
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: this.convertData(rightData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/weishiyong.png",
                symbolSize: function (val) {
                  return val[2] / 6;
                },
//                    showEffectOn: 'render',
//                    rippleEffect: {
//                        brushType: 'stroke'
//                    },
//                    hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
//                            shadowBlur: 10,
//                            shadowColor: '#333'
                  }
                },
//                    level: 1
              },
              //label在左边的
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: this.convertData(leftData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/weishiyong.png",
                symbolSize: function (val) {
                  return val[2] / 6;
                },
//                    showEffectOn: 'render',
//                    rippleEffect: {
//                        brushType: 'stroke'
//                    },
//                    hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'left',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
//                            shadowBlur: 10,
//                            shadowColor: '#333'
                  }
                },
//                    level: 1
              },
              //叠加标签的几个城市
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: this.convertData(diejiaData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/shiyong.png",
                symbolSize: function (val) {
                  return val[2] / 4;
                },
//                    showEffectOn: 'render',
//                    rippleEffect: {
//                        brushType: 'stroke'
//                    },
//                    hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
//                            shadowBlur: 10,
//                            shadowColor: '#333'
                  }
                },
//                    level: 1
              },
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: this.convertData(jiankongData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/4.png",
                symbolSize: function (val) {
                  return val[2] / 4;
                },
//                    showEffectOn: 'render',
//                    rippleEffect: {
//                        brushType: 'stroke'
//                    },
//                    hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'left',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
//                            shadowBlur: 10,
//                            shadowColor: '#333'
                  }
                },
//                    level: 1
              },
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: this.convertData(hangzhouwanData,geoCoordMap),
                symbol:"image://static/imgs/vcartsBases/hangzhouwan.png",
                symbolSize: function (val) {
                  return val[2] / 4;
                },
//                    showEffectOn: 'render',
//                    rippleEffect: {
//                        brushType: 'stroke'
//                    },
//                    hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
//                            shadowBlur: 10,
//                            shadowColor: '#333'
                  }
                },
//                    level: 1
              },
              //钓鱼岛
              {
                name: '',
                type: 'scatter',//effectScatter
                coordinateSystem: 'geo',
                data: diaoyu,
                symbolSize:5,
                itemStyle: {
                  normal: {
                    color: '#fff'
                  }
                }
              }
            ]
          };
          if (option && typeof option === "object") {
            myChart.setOption(option, true);
            myChart.on('click', function (params) {
              params.event.event.stopPropagation();
              console.log(params);
              var city = params.name;
              this.popupData = [];
              //包装
              var cityNames = []
              cities.forEach((v,i)=>{
                cityNames.push(v.name);
              })

              //判断是否是节点
              for(var ct of data){
                //是否是所标注的节点
                if(ct.name == city || ct.enName == city ){
                  for(var realCity of cities){
                    if(realCity.name == city ){
                      var bs = document.getElementById('base-detail');
                      bs.style.display = 'block';                  
                      bs.style.top = 100+params.event.offsetY+'px';
                      bs.style.left =-150+params.event.offsetX+'px';
                      this.popupData = realCity.detail;
                      setTimeout(function(){
                        document.getElementById('mask').style.display='block';
                      }, 1000);
                      
                      return;

                    }
                    if(!cityNames.includes(city)){
                      this.$message({message:city+'暂未开通vcats服务',customClass:'msg-vertical'});
                    }
                    // console.log(params.event);


                  }
                }
              }
            }.bind(this));
          }}},
    mounted () {
      
   	 if (document.cookie.indexOf('isEnglish=false') != -1) {
   	        this.isEnglish = false
   	        document.getElementById("map").style.backgroundImage="url(./static/imgs/vcartsBases/bg.png)";
   	      } else {
   	        this.isEnglish = true
   	        document.getElementById("map").style.backgroundImage="url(./static/imgs/vcartsBases/page1.png)";
   	      }
   	this.initMap();
       
    }
  }
</script>
<style lang="less" scoped>
  .language{
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
  #map{
    height: 1080px;
    width: 1920px;
    position: relative;
    background: url("../../../static/imgs/vcartsBases/bg.png") no-repeat;
  }
  #container{
    height: 100%;
  }
  .icon-define{
    width: 380px;
    height: 160px;
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 40px;
    ul{
      padding-left: 15px;
    }
    li{
      list-style: none;
      height: 35px;
      margin-bottom: 10px;
      overflow: hidden;
      img{
        float: left;
        margin-right: 10px;
      }
      span{
        float: left;
        padding-top: 4px;
        color: #9FC3FF;
        font-family: "MicrosoftYaHei";
        font-size:16px;
      }
    }
  }
  .geely-logos{
    height:80px;
    width:100%;
    position: absolute;
    top:145px;
    ul{
      width:760px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      li:nth-child(2){
        margin-left: 55px;
      }
      li:nth-child(3){
        margin-left: 51px;
      }
      li:nth-child(4){
        margin-left: 51px;
      }
    }
  }
  @dialog-yellow:#f4e925;
  #base-detail{
    height:30px;
    min-width: 130px;
    display: none;
    z-index: 999;
    position: absolute;
    ul{
      background:rgba(0,0,0,.3);
      border-radius: 5px;
      padding:2px 6px;
      li{
        a{
          color:white;
          // font-weight: bold;
          cursor: pointer;
          margin-left: 6px;
        }
        .fa{
          color:white;
        }
      }
      li.used{
        a{
          color:@dialog-yellow;
        }
        .fa{
          color:@dialog-yellow;
        }
      }
      li a:hover{
        color:#f4b325;
      }
    }
  }
  .dialogMask{
    display: none;
    position: absolute;
    top: 0;left: 0;
    z-index: 900;
    height:1080px;
    width: 1920px;
  }
</style>
