<template>
<div id='item'>
  <!-- 需要的数据，标题title-日期myDate-数量val-小标题tit ,内容在点击后渲染-->
<div class='title' @click="isShow=!isShow">
  <i v-if='isShow' class="el-icon-arrow-down"></i><i v-else class="el-icon-arrow-right"></i>
  {{tit}}<span v-show='!isShow'>{{val.length}}</span>
</div>
  <ul v-show="isShow">
    <li v-for="items in val" :key="items.id"><input type="checkbox" v-model="items.isFi" @click="update(items.id,items.isFi)">
    <div class="text">
     <!-- if有 展示优先级 -->
     <span v-show="items.priority==1"> 
       <svg class='icon' style="color:salmon" aria-hidden="true"><use xlink:href="#icon-flag"></use></svg>
     </span>
      <!-- 时间和内容 -->
     <span :class="{check:items.isFi}">{{items.con}}</span>
     <span class='showDate' v-show="items.ldate!=null">{{items.ldate|formatter}}</span>
      <!-- 删除 -->
     <span  class='tail' @click="del(items.id,cate)">
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-huishouzhan"></use></svg>
     </span>
    </div>
    </li>
    <div class='more' @click="more"><slot></slot></div>
  </ul>
</div>
</template>

<script>
import {got,renderList} from '@/api';
export default {
  name:'',
  data(){
    return {
      // 控制详细to-do是否显示
      isShow:true,
    }
  },
  props:['tit','val','cate'],
  methods:{
    del(a,cate){
      got('/api/task',{del:a}).then((res) => {
        got('/api/task',{items:cate}).then((result) => {
        const data=result.data;
        if(data.length==0) return;
        this.$store.dispatch({type:"aPlus",data,ele:cate});
        }).catch((err) => {console.log(err);});
      }).catch((err) => {console.log(err);});
    },
    update(id,isFi){
      isFi=!isFi;
      got('/api/task',{isFi,id}).then((res)=>{
        renderList()//重新渲染
      }).catch((err) => {console.log(err);});
    },
    more(){
      got('/api/task',{items:'fimore'}).then((result) => {
        const data=result.data;
        this.$store.dispatch({type:"aPlus",data,ele:'fi'});
        }).catch((err) => {console.log(err);});
    }
  }
}
</script>

<style lang='scss' scoped>
#item{padding-left:20px;
position: relative;
}

.check{
  color: $svg ;
  text-decoration:line-through;
}
// to-do-list
  li{
    @include list();
    svg{color: $svg;}
  }
  .title{
    font-size: 12px;
    font-weight: bold;
    margin-top:10px;
    cursor: pointer;
    span{
      font-size: 12px;
      margin-left: 3px;
      font-weight: 400;
      }
    i{margin-right: 3px;}
  }
  .text{
    display: inline-block;
    border-bottom: $bor;
    margin-left: 5px;
    outline: none;
    cursor: default;
    width: 93%;
    position: relative;
    .showDate{
      font-size: 12px;
      color: $svg;
      position: absolute;
      right: 30px;
    }
    .tail{
      display: inline-block;
      position: absolute;
      right: 2px;
    }
  }
  .more{
    position: absolute;
    color: $svg;
    font-size:10px;
    cursor: pointer;
  }
</style>
