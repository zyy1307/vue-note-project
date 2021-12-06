<template>
<div id='task'>
<section class='today'>
  <Colle></Colle>
  <div><ListItem :tit="title[0]" :cate='getList[0]' :val="today"></ListItem></div>
  <!--<div><LabelList></LabelList></div>-->
</section>
<section class="other">
  <!-- todolist列表,值由父组件给出,之后应该可以直接用v-for写 -->
  <ListItem :tit="title[1]" :cate='getList[1]' :val="later"></ListItem>
  <ListItem :tit="title[2]" :cate='getList[2]' :val="noTime"></ListItem>
  <ListItem :tit="title[3]" :cate='getList[3]' :val="after"></ListItem>
  <ListItem :tit="title[4]" :cate='getList[4]' :val="finish"><span v-show="finish.length!=0">查看更多</span></ListItem>
  </section>
</div>
</template>

<script>
import Colle from './collection.vue'
import ListItem from './listItem.vue'
import LabelList from './label.vue'
import {renderList,got} from '@/api'
export default {
  name:'task',
  components:{Colle,ListItem,LabelList},
  data(){
   return {
     title:['今天','以后','无日期','已过期','已完成'],
     today: [],
     later:[],
     noTime:[],
     after:[],
     finish:[],
     getList:['to','la','no','af','fi'],
   }
  },
  watch:{
    // 监听store的写法
     '$store.state.noTime'(){
      this.noTime=this.$store.state.noTime;
     },
      '$store.state.today'(){
       this.today=this.$store.state.today;
     },
      '$store.state.later'(){
       this.later=this.$store.state.later;
     },
      '$store.state.after'(){
       this.after=this.$store.state.after;
     },
      '$store.state.finish'(){
       this.finish=this.$store.state.finish;
     },
  },
  created(){
    //还是分开求吧，params{items：}参数为no无日期，to今天，la以后，fi完成（后有af过期、bel标签、pri优先级）
    //依次发起请求
    renderList();
  }
}
</script>

<style lang='scss' scoped>
#task{
  display: flex;
  justify-content: stretch;
  .today{
    width: 50%;
    border-right: $bor;
  }
  .other{
    width: 50%;
    display: inline-block;
  }
}
</style>
