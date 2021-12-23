<template>
<div id='labelList'>
  <div class='get'>
    <div>
    <span class="select" @click="getLabel">#按标签筛选</span>
    </div>
  <ul tabindex='0' class='hash' v-show="lShow" @blur="lShow=!lShow">
      <input tabindex='0' type="text" v-model='searchLabel' @keyup.enter="$event.target.blur()" @blur="lShow=!lShow">
      <li style='cursor:pointer' v-for='(items,index) in showTag' :key="index" @click="chooseLabel($event,items)">
        #{{items}}</li>
  </ul>
     </div>
<ListItem :tit="searchLabel" :cate='isLabel' :val="choseTag"></ListItem>
</div>
</template>

<script>
import ListItem from './listItem.vue'
import {got} from '@/api'
export default {
  name:'labelList',
  data(){
   return {
     showTag:[],
     choseTag:[],//选择查找的tag
     lShow:false,
     searchLabel:'',
     isLabel:'label',
   }
  },
  components:{ListItem,},
  methods:{
    getLabel(){
      this.lShow=!this.lShow;
      got('/api/task/bel').then((res)=>{this.showTag=res.data;}).catch((err)=>{console.log(err);})
     },
     chooseLabel(e,items){
      this.searchLabel=items;
      e.target.parentNode.blur();
      got('/api/task',{myLabel:this.searchLabel}).then((res)=>{this.choseTag=res.data;console.log(this.choseTag)}).catch((err)=>{console.log(err);})
    }
    },
    
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
  .get{
    position: relative;
  }
  .hash{
      position: absolute;
      left: 0px;
      box-shadow: 3px 3px 5px $shadow;;
      z-index: 2;
      background: white;
      input{
        width: 100px;
      }
    }
}

</style>
