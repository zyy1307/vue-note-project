<template>
<div id='calendar'>
<ThisDay v-for='items,index in weekDay' :key="index" :forList="thisWeek[index]" :mmdd="weekArr[index]" :tit="weekDay[index]" @changeFi="newList" @newDrag='getDrag'></ThisDay>
</div>
</template>

<script>
import moment from 'moment';
import ThisDay from './thisday.vue';
import {postList} from '@/api'
export default {
  name:'calendar',
  components:{ThisDay},
  data(){
   return {
     thisWeek:[],
     weekDay:['周一','周二','周三','周四','周五','周六','周日'],
     weekArr:[],
   }
  },
  methods:{
    newList(){
      postList(this.weekArr,'/api/task/week').then((res) => {
      this.thisWeek=res.data;
    }).catch((err) => {
      console.log(err);
    });
    },
    getDrag(nd){
      console.log(nd);
    }
  },
  created(){
    //获取今天日期和星期几
    const fortoday=moment().format('YYYY-MM-DD');
    const forweek=moment().format('E');
    //获取当周周一的日期
    const forMon=moment(fortoday).subtract(forweek-1, 'd').format('YYYY-MM-DD');
    this.weekArr.push(forMon);//arr0
    //写一个循环,把本周所有日期都获取;
    for (let i = 0; i < 6; i++) {//注意这里是6 否则变8天，因为周一已经被定义
      const forNext=moment(this.weekArr[i]).add(1, 'd').format('YYYY-MM-DD');
      this.weekArr.push(forNext);
    }
    this.newList();
  }
}
</script>

<style lang='scss' scoped>
#calendar{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(40vh, auto);
  position: relative;
}
</style>
