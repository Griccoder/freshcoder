<template>
  <div id="topo-box">
    <div class="center-line" :class="getClassBaseLength(ecuData.length)">
      <div class="list1">
        <div v-for="(item,index) in ecuData"
             v-if="index%2==1"
             class="item"
             :class="getClass(item.status)">
          <div class="line"></div>
          <div>{{item.ecuCode}}</div>
        </div>
      </div>

      <div class="list2">
        <div v-for="(item,index) in ecuData"
             v-if="index%2==0"
             class="item"
             :class="getClass(item.status)">
          <div class="line"></div>
          <div>{{item.ecuCode}}</div>
        </div>
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
      ecuData: {
        dafault: []
      }
    },
    methods: {

      getClassBaseLength (length) {
        console.log(33333333)
        switch (length) {
          case 5: return 'margin80';
          case 6: return 'margin80';
          case 7: return 'margin50';
          case 8: return 'margin40';
          case 9: return 'margin30';
          case 10: return 'margin25';
          case 11: return 'margin20';
          case 12: return 'margin15';
          case 13: return 'margin10';
          case 14: return 'margin6';
          default: return 'margin100'
        }
      },
      getClass (status) {
        switch (status) {
          case 0: return 'status1';
          case 1: return 'status2';
          case 5: return 'status3';
          case 10: return 'status4';
          case -5: return 'status5';
          case -10: return 'status6';
          default: return 'status1';
        }
      }
    },
    mounted () {
      console.log(567, this.ecuData)
      // this.getClassBaseLength()
    }

  }
</script>
<style lang="less" scoped>
  #topo-box{

    display: flex;
    height: 100%;
    justify-content: center;
    .margin100{
      .item{
        margin-bottom: 100px;
      }
    }
    .margin80{
      .item{
        margin-bottom: 80px;
      }
    }
    .margin50{
      .item{
        margin-bottom: 50px;
      }
    }
    .margin40{
      .item{
        margin-bottom: 40px;
      }
    }
    .margin30{
      .item{
        margin-bottom: 30px;
      }
    }
    .margin25{
      .item{
        margin-bottom: 25px;
      }
    }
    .margin20{
      .item{
        margin-bottom: 20px;
      }
    }
    .margin6{
      .item{
        margin-bottom: 6px;
      }
    }
    .margin15{
      .item{
        margin-bottom: 15px;
      }
    }
    .margin10{
      .item{
        margin-bottom: 10px;
      }
    }
    .center-line{
      height: 100%;
      width: 4px;
      background: #5b7ec2;
      position: relative;

      .status1{
        background: #848484;
      }
      .status2{
        background: #a2f9a38a;
      }
      .status3{
        background: #53a740bf;
      }
      .status4{
        background: #00ff36;
      }
      .status5{
        background: #c04fff;
      }
      .status6{
        background: #ff5353;
      }
      .list2{
        position: absolute;
        top: 10px;
        left: 44px;
        .line{
          left: -40px;
        }
      }
      .list1{
        position: absolute;
        top: 30px;
        right: 44px;
        .line{
          right: -40px;
        }
      }
      .item{
        position: relative;
        height: 40px;
        width: 80px;
        line-height: 40px;
        text-align: center;
        color: #000;
        .line{
          position: absolute;
          width: 40px;
          height: 4px;
          background: #5b7ec2;
          top: 20px;
        }

      }

    }
  }
</style>
