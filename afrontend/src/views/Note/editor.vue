<template>
<div id='editor' class='editor'>
  <textarea class="text" v-model="noteText" placeholder="现在您在想什么呢？"></textarea>
    <div class="toolbar">
     <div class="send" @click="getcontent">
     <svg class="icon" aria-hidden="true">
     <use xlink:href="#icon-fasong"></use>
     </svg>记录
     </div>
  </div>
</div>
</template>

<script>
export default {
  components: { },
  name:'',
  data(){
   return {
     noteText: '',
   }
  },
  methods: {
  getcontent(){
    if(this.noteText.trim()==''){
      return;
    }
    const item=this.noteText;
    this.$emit('getcontent',item);
    this.noteText='';
    },
  },
  mounted() {
 },
}
</script>

<style lang='scss' scoped>
.editor {
  width: 300px;
  display:inline-block;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  position: relative;
  background: #FFF;
  padding:10px 15px; 
  margin: 0 auto;
  box-sizing: border-box;
  .text{
    width: 100%;
    color:$fontcolor;
    min-height: 200px;
    outline: none;
    border: none;
    resize: none;
  }
  .send{
    @include send();
  }
}
</style>
