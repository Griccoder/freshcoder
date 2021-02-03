<template>
<div class="container">
<h1>综合控制</h1>

 <el-input v-model="carType" placeholder="请输入车型" class="el-input"></el-input>
 
 <p>Vehicle is: {{ carType }}</p>
 
 所有内容：<input class="btn btn-default" type="button" value="重置" @click="reset"><br/>
 
  项目：<input class="btn btn-default" type="button" value="虚拟验证完成" @click="vdone">
  
  <input class="btn btn-default" type="button" value="台架验证完成" @click="bdone">
  
  <input class="btn btn-default" type="button" value="实车验证完成" @click="rdone"><br/>
  
  台架：<input class="btn btn-default" type="button" value="台架重置" @click="bReset">
  <input class="btn btn-default" type="button" value="功能测试完成" @click="fdone">
  
  <div>
<h2>ecu列表</h2>
<input class="btn btn-default" type="button" value="获取ECU列表" @click="getEcuList">
 </div>
 <table class="table table-striped">
	<thead>
	<tr><th>#</th><th>ecu名称</th><th>状态</th><th></th><th></th></tr>
	</thead>
	<tbody>
	<tr v-if="ecuList.can1" v-for="(ecu, index) in ecuList.can1">
	<td>{{index+1}}</td>
	<td>{{ecu.ecuCode}}</td>
	<td>{{getStatus(ecu.status)}}</td>
	<td><p><input class="btn btn-success" type="button" value="成功" @click="test(ecu.ecuCode,10)"></p></td>
	<td><p><input class="btn btn-danger" type="button" value="失败" @click="test(ecu.ecuCode,-10)"></p></td>
	</tr>
	<tr v-for="(ecu, index) in ecuList.can2">
	<td>{{index+1+can1Length()}}</td>
	<td>{{ecu.ecuCode}}</td>
	<td>{{getStatus(ecu.status)}}</td>
	<td><p><input class="btn btn-success" type="button" value="成功" @click="test(ecu.ecuCode,10)"></p></td>
	<td><p><input class="btn btn-danger" type="button" value="失败" @click="test(ecu.ecuCode,-10)"></p></td>
	</tr>
	<tr v-for="(ecu, index) in ecuList.can3">
	<td>{{index+1+can1Length()+ecuList.can2.length}}</td>
	<td>{{ecu.ecuCode}}</td>
	<td>{{getStatus(ecu.status)}}</td>
	<td><p><input class="btn btn-success" type="button" value="成功" @click="test(ecu.ecuCode,10)"></p></td>
	<td><p><input class="btn btn-danger" type="button" value="失败" @click="test(ecu.ecuCode,-10)"></p></td>
	</tr>
	<tr v-for="(ecu, index) in ecuList.can4">
	<td>{{index+1+can1Length()+ecuList.can2.length+ecuList.can3.length}}</td>
	<td>{{ecu.ecuCode}}</td>
	<td>{{getStatus(ecu.status)}}</td>
	<td><p><input class="btn btn-success" type="button" value="成功" @click="test(ecu.ecuCode,10)"></p></td>
	<td><p><input class="btn btn-danger" type="button" value="失败" @click="test(ecu.ecuCode,-10)"></p></td>
	</tr>
	<tr v-for="(ecu, index) in ecuList.can5">
	<td>{{index+1+can1Length()+ecuList.can2.length+ecuList.can3.length+ecuList.can4.length}}</td>
	<td>{{ecu.ecuCode}}</td>
	<td>{{getStatus(ecu.status)}}</td>
	<td><p><input class="btn btn-success" type="button" value="成功" @click="test(ecu.ecuCode,10)"></p></td>
	<td><p><input class="btn btn-danger" type="button" value="失败" @click="test(ecu.ecuCode,-10)"></p></td>
	</tr>
	</tbody> 
 </table>
 </div>
 
 
</template>
<script>
  export default {
    data () {
      return {
        showFlag:false,
        popupData:[],
        carType:'',
        ecuList:[]
      }
    },
    methods: {
        can1Length:function(){
            return this.ecuList.can1?this.ecuList.can1.length:0;
        },
    	check:function(){
    		if(this.carType == ""){
    			alert("请输入车型");
    			return false;
    		}	
    		return true;
    	},
    	reset:function(){
    		if(!this.check()){
    			return;
    		}
    		 if(confirm("确定重置" + this.carType)){
    			 this.$http.get('/api/research/reset?vehicle='+this.carType).then(res => {
     	  			alert("重置成功");
     	  		 }, err => {}) 
    		 }
    	},
    	vdone:function(){
    		if(!this.check()){
    			return;
    		}
    		 this.$http.get('/api/research/updateStatus?vehicle='+ this.carType +'&status=2').then(res => {
    	  			alert("更新成功");
    	  		 }, err => {})
    	},
    	bdone:function(){
    		if(!this.check()){
    			return;
    		}
    		this.$http.get('/api/research/updateStatus?vehicle='+ this.carType +'&status=3').then(res => {
	  			alert("更新成功");
	  		 }, err => {})
    	},
    	rdone:function(){
    		if(!this.check()){
    			return;
    		}
    		this.$http.get('/api/research/updateStatus?vehicle='+ this.carType +'&status=4').then(res => {
	  			alert("更新成功");
	  		 }, err => {})
    	},
    	bReset:function(){
    		if(!this.check()){
    			return;
    		}
    		if(confirm("确定重置" + this.carType + "台架")){
    			this.$http.get('/api/boxcar/reset?vehicle='+ this.carType ).then(res => {
    	  			alert("更新成功");
    	  		 }, err => {})	
    		}
    	},
    	fdone:function(){
    		if(!this.check()){
    			return;
    		}
    		this.$http.get('/api/boxcar/updateProgress?vehicle='+ this.carType +"&progress=6").then(res => {
	  			alert("功能测试完成");
	  		 }, err => {})
    	},
    	getEcuList:function(){
    		if(!this.check()){
    			return;
    		}
    		this.$http.get('/api/boxcar/ecus?vehicle='+ this.carType).then(res => {
    			this.ecuList = res.body.data;
	  		 }, err => {})
    	},
    	test:function(ecuCode, status){
    		if(!this.check()){
    			return;
    		}
    		this.$http.post('/api/boxcar/test', 
    				{"vehicle":this.carType, "ecuCode":ecuCode, "status":status}
    		).then(res=>{
    			alert("更新成功");
    		},err => {})
    	},
    	getStatus:function(status){
	      let statusName
	      //0 未联通 1.已联通，5软件刷写成功，10 ecu验证成功 -5软件刷写失败 -10ecu验证失败
    	  switch(status){
    	  	case 0:
	    		statusName = "未联通";
    		  	break;
    	  	case 1:
    	  		statusName = "已联通";
    	  		break;
    	  	case 5:
    	  		statusName = "软件刷写成功";
    	  		break;
    	  	case 10:
    	  		statusName = "功能测试通过";
    	  		break;
    	  	case -5:
    	  		statusName = "软件刷写失败";
    	  		break;
    	  	case -10:
    	  		statusName = "功能测试失败";
    	  		break;
    	  } 
	      return statusName;
    	}
    	
    },
    mounted () {

    }
  }
</script>
<style lang="less" scoped>

</style>
