<template>
<div id='labelList'>
  <div>
    <span class="select">#按标签筛选</span>
    <span class="select">隐藏</span>
  </div>
  <ul>
<ListItem :tit='"标签"'></ListItem>
  </ul>
</div>
</template>

<script>
import ListItem from './listItem.vue'
export default {
  name:'labelList',
  data(){
   return {

   }
  },
  components:{ListItem,}
}
</script>

<style lang='scss' scoped>
#labelList{
   padding-left:20px;
   margin-top:20px;
  .select{
  @include mainbtn();
  display: inline-block;
  $height: 30px;
  line-height: $height;
  margin-right: 10px;
  }
}

</style>
