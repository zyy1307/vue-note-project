<template>
<div id='quiz'>
<div class='question'>
  <div class='ques' v-if="isShow" @dblclick="isShow=false">{{question}}</div>
  <div class='ques' v-else> {{answer}}</div>
<el-row class='btn'>
 <el-button type="danger" plain @click="known(1)">学会了</el-button>
 <el-button type="danger" plain @click='del()'>删除</el-button>
 <el-button type="prime" plain @click="dialogVisible = true">结束答题</el-button>
</el-row>
</div>
<el-dialog
  title="答题结束"
  :visible.sync="dialogVisible"
  width="30%">
  <span>你共计学会了{{haveKnown}}道题</span>
  <span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="leave()">确 定</el-button>
  </span>
</el-dialog>
<div class="left" @click="countS()"><el-button type="danger" icon="el-icon-arrow-left" circle></el-button></div>
<div class="right" @click="countP()"><el-button type="danger" icon="el-icon-arrow-right" circle></el-button></div>
</div>
</template>

<script>
import {getQues,get}from '@/api'
export default {
  name:'quiz',
  data(){
   return {
     result:[],
     i:0,
     isShow:true,
     dialogVisible:false,
     haveKnown:0,
   }
  },
  methods:{
    countP() {
      this.isShow=true;
      if (this.i<this.result.length-1){this.i++;}
      },
    countS() {
      this.isShow=true;
      if (this.i>0){this.i--}
      },
    known(a) {
      const obj=this.result[this.i];
      const id=obj.id;
      get({know:a,id}).then((res)=>{console.log(res);})
      .catch((err)=>{console.log(err);})
      getQues().then((res)=>{this.result=res.data;})
      .catch((err)=>{console.log(err);})
      this.isShow=true;
      this.haveKnown++;
    },
    del(){
    const obj=this.result[this.i];
    const id=obj.id;
    get({del:1,id}).then((res)=>{console.log(res);})
      .catch((err)=>{console.log(err);})
    getQues().then((res)=>{this.result=res.data;})
      .catch((err)=>{console.log(err);})
      this.isShow=true;
    },
    leave(){
      this.dialogVisible = false;
      this.$router.push({path:'/memo'});
    }
  },
  computed:{
  question(){
   if(this.result[0]!=undefined){
    const i=this.i;
    const obj=this.result[i];
    return obj.ques;
   }
  },
  answer(){
    if(this.result[0]!=undefined){
    const i=this.i;
    const obj=this.result[i];
    return obj.answer;
   }
  },
  id(){
    return this.resulte[this.i].id
  }
  },
 created(){
    getQues().then((res)=>{
    // [数组套对象]
    console.log(res.data);
    if(res.data.length===0){
      alert('你还没有上传过错题哦');
      return this.$router.push({path:'/memo'});
    }
    this.result=res.data;
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
    white-space: pre-wrap;
    overflow: auto;   
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
    left: 20%;
  }
  }
}

</style>
