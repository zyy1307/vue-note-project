<template>
<div id='note'>
  <!-- 父组件接收第一个参数时这里不要写 -->
<keep-alive><Editor @getcontent='update'></Editor>
</keep-alive>
<Output v-for="(item,i) in newNote" :key="i" @del='del(item)'>
  {{item}}
</Output>

</div>
</template>

<script>
import Editor from './editor.vue'
import Output from './output.vue'
export default {
  name:'',
  data(){
   return {
     newNote:[],
   }
  },
  components:{Editor,Output},
  methods:{
    update(item){
      this.newNote.push(item)
    },
    del(item) {
      const ind=this.newNote.indexOf(item);
      this.newNote.splice(ind,1);
    },
  }
}
</script>

<style lang='scss' scoped>
#note{
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   grid-gap: 5px;
}
</style>
