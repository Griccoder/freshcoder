<template>
  <div id="progress">
    <!--xuyaoxiugai-->
    <el-tooltip class="item" effect="dark" content="加注" placement="top-start">
      <span class="icon" :class="progressR(num,0)">1</span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="软件刷写" placement="top-start">
      <span class="icon" :class="progressR(num,1)">2</span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="四轮定位" placement="top-start">
      <span class="icon" :class="progressR(num,2)">3</span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="转毂" placement="top-start">
      <span class="icon" :class="progressR(num,3)">4</span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="ADAS" placement="top-start">
      <span class="icon" :class="progressR(num,4)">5</span>
    </el-tooltip>
  </div>
</template>
<script>
  export default {
    props: ['num'],
    mounted () {
      console.log(111, this.num)
    },
    methods: {
    	progressR(data,index) {
          return data[index]=='OK'?'success':data[index]=='WARN'?'warn':''
        }
      }
  }
</script>
<style scoped lang="less">
  .icon{
    display: inline-block;
    width: 40px;
    padding: 5px;
    border-radius: 4px;
    line-height: 10px;
    background: #08245d;
    color: #29a5fb;
  }
  .active1{
    background: #fff67f;
    color: #ffd800 ;
    border: 1px solid #fff67f;
    animation:colorChange 5s infinite;
    -webkit-animation:colorChange 1s infinite;
  }
  .success{
    background: #085d20;
    color: #00db3e  ;
  }
  .warn{
    background: #a92d2f;
  }
  @keyframes colorChange
  {
    0% {
      background: #085d20;
      border: 1px solid #085d20;
    }
    50% {
      background: #5d5008;
      border: 1px solid #5d5008;
    }
    100% {
      background: #085d20;
      border: 1px solid #085d20;
    }
  }

  @-webkit-keyframes colorChange
  {
    0% {
      background: #085d20;
      border: 1px solid #085d20;
    }
    50% {
      background: #5d5008;
      border: 1px solid #5d5008;
    }
    100% {
      background: #085d20;
      border: 1px solid #085d20;
    }
  }
</style>
