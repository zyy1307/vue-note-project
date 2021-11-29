<template>
<div id='excel'>
  <div class='upload'>
    <Upload></Upload>
  </div>
  <div class='write'></div>
</div>
</template>

<script>
import Upload from './upload.vue'
  export default {
  components: { Upload },
    data() {
      return {

      }
    },
    methods: {
   
    }
  }
</script>

<style lang='scss' scoped>
#excel {
  position: relative;
  width: 100%;
  .upload {
  height: $mainH;
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid $maincolor;
  position: relative;

  }
  .write{
  height: $mainH;
  width: 50%;
  }
}
</style>
