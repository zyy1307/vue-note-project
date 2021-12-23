<template>
<div id='output'>
  <div>{{newTime}}</div>
  <div class='text'><slot></slot></div>
  <div class="delete" @click='del'> 
    <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-huishouzhan"></use>
    </svg>
  </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name:'',
  data(){
   return {
    newTime: '',
    note:'',
   }
  },
  methods:{
    del(){
    const item=this.note;
    this.$emit('del',item);
    }
  },
  mounted(){
    const time=moment().format('llll'); // 2021年11月25日星期四 17:52
    return this.newTime=time;
  }
}
</script>

<style lang='scss' scoped>
#output {
  width: 300px;
  display: inline-block;
  border-radius: 8px;
  padding:10px 15px; 
  box-sizing: border-box;
  border: none;
  color: $fontcolor;
  background: #FFF7D1;
  margin: 3px auto;
  position: relative;
  &:hover{
    box-shadow: 3px 3px 5px $shadow;
  }
  .text{
    width: 100%;
    color:$fontcolor;
    white-space:pre-wrap; 
  }
  .delete{
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    user-select: none;
    svg{
      font-size: 20px;
    }
  }
}
</style>