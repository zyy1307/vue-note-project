<template>
<div id='quiz'>
<div class='question'>
  <div class='ques' v-if="isShow" @click="showAns">{{question}}</div>
  <div class='ques' v-else> {{answer}}</div>
<el-row class='btn'>
 <el-button type="danger" plain>学会了</el-button>
 <el-button type="danger" plain>还不会</el-button>
 <el-button type="danger" plain>删除</el-button>
</el-row>
</div>
<div class="left"><el-button type="danger" icon="el-icon-arrow-left" circle></el-button></div>
<div class="right"><el-button type="danger" icon="el-icon-arrow-right" circle></el-button></div>
</div>
</template>

<script>
import {getQues}from '@/api'
export default {
  name:'quiz',
  data(){
   return {
     question:'',
     answer:'',
     isShow:true,
   }
  },
  methods:{
    showAns( ) {
      console.log('??');
      if(this.isShow===true){this.isShow=!this.isShow;}
    },
  },
  created(){
    // 在这里发起请求，又或者是beforecreate？再确定一下
    getQues().then((res)=>{
    this.question=res.data.ques,
    this.answer=res.data.answer
    })
      .catch((err)=>{console.log(err);})
  }
}
</script>

<style lang='scss' scoped>
#quiz{
  @mixin mid{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  }
  .ques{
    @include mid();
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    padding: 30px;   
  }
  width: 100%;
  height: 100%;
  position: relative;
  .left{
  left: 20px;
  @include mid();
  }
  .right{
  right: 20px;
  @include mid();
  }
  .question{
  // 定位+大小
  position: absolute;
  width: 700px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  // 边框
  border-radius: 16px;
  border: 2px solid #E8E8E8;
  .btn{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  }
}

</style>
