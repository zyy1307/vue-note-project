<template>
<div id='collection'>
  <h1>收集箱</h1>
  <div class='bigIpt'>
    <input class='ipt' ref='ipt' type="text" placeholder="+ 添加任务到收集箱，回车即可保存"  @keyup.enter="listPlus" v-model="msg">
    <div class='time'>{{labelShow}} <span v-show='labelShow&&lDate'>|</span> {{lDate|formatter}}</div>
    <!-- 标签菜单 失焦 点击 -->
    <ul tabindex='0' class='hash' v-show="hashShow">
      <input type="text" placeholder="创建新标签" v-model='lLabel' ref='labelUl' @keyup.enter="hashShow=!hashShow">
      <li v-show="lLabel==''" v-for='(items,index) in showTag' :key="index" @click="thisLabel(items)">
        #{{items}}</li>
    </ul>
    <!-- 还需要获取li中的value显示绑定lLabel -->
    <span class='font'>
      <!-- 添加标签 -->
      <span @click="getLabel">
        <svg class='icon' aria-hidden="true"><use xlink:href="#icon-biaoqian"></use></svg>
      </span>
      <!-- 选择日期及优先级 -->
      <span @click="priority==1?priority='':priority=1">
        <svg class='icon' :style="{color:priority==1?'salmon':'#9B9CA3'}" 
        aria-hidden="true"><use xlink:href="#icon-flag"></use></svg>
      </span>
      <svg  @click='isShow=!isShow' class='icon' aria-hidden="true"><use xlink:href="#icon-calendar-todo-fill"></use></svg>
    </span>
     <div class="clock" v-show='isShow'>
     <el-date-picker v-model="lDate" type="date" placeholder="选择日期"  @blur="lose">
     </el-date-picker>
     </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import {postList,got,renderList} from '@/api';
export default {
  name:'collection',
  data(){
   return {
     msg:'',//输入的事项
     isShow:false,
     hashShow:false,//标签列表
     lDate:'',
     lLabel:'',
     showTag:[],//获取回来的标签列表
     priority:'',
     pickerOptions: {
          disabledDate(time) {
            //重写
            //console.log(time.getDate());
            //let dd=new Date();
            //  console.log(dd.getDate());
            //return time.getDate() < dd.getDate();
          },
        },
   }
  },
  methods:{
  listPlus(){
    if(!this.msg.trim()){return;}
    const listModel = {};
        // 唯一必须：list内容      
    listModel.con=this.msg;
    this.msg='';
    if (this.lDate){
      // 给SQL设置了date类型，需要传入YYYY-MM-DD
       listModel.lDate=moment(this.lDate).format('YYYY-MM-DD');
       console.log(listModel.lDate);
       this.lDate='';
    }
    if(this.priority){
      listModel.priority=this.priority;
      this.priority='';
    }
    if (this.lLabel){
      listModel.fortag=this.lLabel;
      this.lLabel='';
    }
    // 处理完毕，发起数据库请求
    postList(listModel,'/api/task').then((result) => {
      renderList();
      //这个之后还可以优化，看可不可以做判断
    }).catch((err) => {
      console.log(err);
    });
  },
    lose(){
      this.isShow=!this.isShow;
      this.$refs.ipt.focus();
    },
     getLabel(){//使用正则表达式监控用户是否输入标签
      this.hashShow=!this.hashShow;
      if(this.hashShow){
        got('/api/task/bel').then((res)=>{this.showTag=res.data}).catch((err)=>{console.log(err);})
      }
      this.$nextTick(function () {
      this.$refs.labelUl.focus();
      })
     },
     thisLabel(items){
       this.lLabel=items;
       this.hashShow=!this.hashShow;
     }
  },
  computed:{
    labelShow(){
      if(!this.lLabel) return this.lLabel;
      return '#'+this.lLabel;
    }
  }
}
</script>

<style lang='scss' scoped>
#collection{
  user-select: none;
  padding:20px;
  .bigIpt{
    position: relative;
    //标签列表
    .hash{
      position: absolute;
      right: 0px;
      box-shadow: 3px 3px 5px $shadow;;
      z-index: 2;
      :focus{
        outline: none;
      }
      input{
        width: 100px;
      }
    }
    // 输入框
    .time{
      position: absolute;
      top: -20px;
      right: 0;
      color: $svg;
    }
    .ipt{
    width: 100%;
    height: 40px;
    background: #F8F8F8;
    border: none;
    outline: none;
    border-radius: 16px;
    padding-left: 3px;
    }
    .clock{
    position: absolute;
    right: 0;
    top:40px;
    }
    .font{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    }
    span svg{
    font-size: 20px;
    color:$svg;
    cursor: pointer;
    margin-right:5px;
    }
  }
  // 标题
  h1 {
    font-size: 28px;
    font-weight: 400;
    color:$fontcolor;
    margin-bottom: 20px;
  }
}
</style>
