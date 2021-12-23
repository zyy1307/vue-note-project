<template>
<div id='thisday'>
  <!--标题：两个变量，日期+周几-->
<div :style="{color:(this.isToday?'#5167F6':'black')}" class='uppest'><span>{{mmdd|onlyFour}}</span><span>{{tit}}</span></div>
<ul>
  <li v-for="items in forList" :key="items.id" draggable="true"  class="items"  @click="tick(items.id,items.isFi)">
      <span class='content' :class='{finish:items.isFi}' :style="{background:(items.priority?'salmon':'transparent')}">{{items.con}}</span>
      <span class='over' @click="del(items.id)"> <svg class='icon' aria-hidden="true"><use xlink:href="#icon-huishouzhan"></use></svg></span>
  </li>
  <!-- 默认五个input -->
  <input ref="ipt" v-for='item in fiveInput' :key='item' class='items chose' type="text" @keyup.enter="$event.target.blur()" @blur="listPlus($event,item)" @click="choseFirst">
  <!-- enter和blur事件冲突，所以enter直接指向blur，不重复触发事件 -->
</ul>
 <!--<div class='arrow' v-show="tit=='周四'">
    <span class="left" @click="countS()"><el-button type="danger" icon="el-icon-arrow-left" circle></el-button></span>
    <span class="right" @click="countP()"><el-button type="danger" icon="el-icon-arrow-right" circle></el-button></span>
  </div>-->
</div>
</template>

<script>
import moment from 'moment'
import {got,postList} from '@/api'
export default {
  name:'thisday',
  data(){
   return {
     isToday:false,
     fiveInput:[0,1,2,3,4,5,6,7,8],//不绑key就会出事md
     isDrag:false,
   }
  },
  props:['forList','mmdd','tit'],
  watch:{
    'forList':{
      deep:true,
      immediate:true,
      handler(){
       if(this.forList){//没有li就不管了
        let liLen =this.forList.length;
        if (liLen>=9) { return this.fiveInput.length=1; }
        else { return this.fiveInput.length=9-liLen; }
       }
      }
    }
  },
  methods:{
    tick(id,isFi){
      //发起更新请求
      isFi=!isFi;
      got('/api/task',{isFi,id}).then((res)=>{
        this.$emit('changeFi');//父组件重新渲染
      }).catch((err) => {console.log(err);});
    },
    del(id){//发起删除请求
      got('/api/task',{del:id}).then((res) => {
        this.$emit('changeFi');//父组件重新渲染
      }).catch((err) => {console.log(err);});
    },
    choseFirst(){
      this.$refs.ipt[0].focus();
    },
    listPlus(e,item){
    let subList=e.currentTarget.value;
    if(!subList.trim()){return;}
    let i=this.fiveInput.indexOf(item);
    this.fiveInput.splice(i,1);//会重新渲染li所以删除一个
    if(this.fiveInput.length<1){
      this.fiveInput[0]=='onlyone'?this.fiveInput.push('oneonly'):this.fiveInput.push('onlyone');
    }
    const listModel = {};
    listModel.con=subList;
    listModel.lDate=this.mmdd;
    // 处理完毕，发起数据库请求
    postList(listModel,'/api/task').then((result) => {
      this.$emit('changeFi');//父组件重新渲染
    }).catch((err)=>console.log(err));
    },
  },
  filters:{
    onlyFour(val){
      return moment(val).format('MM.DD')
    }
  },
  created(){
    const t=parseInt(moment().format('E'));
    let cnT;
    switch (t){
      case 1:
        cnT='周一'
        break
      case 2:
        cnT='周二'
        break
      case 3:
        cnT='周三'
        break
      case 4:
        cnT='周四'
        break
      case 5:
        cnT='周五'
        break
      case 6:
        cnT='周六'
        break
      case 7:
        cnT='周日'
        break
    }
    if (cnT==this.tit) return this.isToday=true;
  },
}
</script>

<style lang='scss' scoped>
#thisday{
   padding-left: 15px;
   .uppest{
     display: flex;
     justify-content: space-between;
     align-content: center;
     $height: 35px;
     line-height: $height;
     span{font-size: 20px;}
     box-sizing: border-box;
     border-bottom: 2.5px solid;
   }
  .items{
    position: relative;
    font-size: 16px;
    border-bottom: 1px solid #E5E5E5;
    $height: 30px;
    line-height: $height;
    width: 100%;
    cursor: pointer;
    vertical-align: center;
    .content{
      border-radius:16px;
      padding:0 10px;
    }
    &:hover{
      border-bottom: 1px solid #5167F4;
    }
    .over{
    display: inline-block;
    position: absolute;
    right: 4px;
    svg{
      color:$svg;
      margin-left: 5px;
    }
  }
  }
  //todo完成
  .finish{
    color:$svg;
    text-decoration: line-through;
  }
  //input被聚焦
  .chose:focus{
    box-shadow: 2px 2px 4px #ECECEC;
  }
  .arrow{
    margin-top:20px;
    position: relative;
    .right{
      position: absolute;
      right: 0;
    }
  }
}
</style>
