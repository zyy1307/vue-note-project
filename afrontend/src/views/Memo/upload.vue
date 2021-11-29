<template>
    <!-- 表单 -->
<div class='upload-demo'>
  <form method="post" enctype="multipart/form-data">
  <div>
    <div class='up'>
    <div class='row'>
      <div class='send chose'><label for="file">选择文件</label></div>
      <div class='send' @click="upFile()">上传文件</div>
    </div>
    <input type="file" id="file" 
     name="file" accept= ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple enctype="multipart/form-data" @change="showFile($event)">
    <!-- change事件监听表单 -->
    </div>
  <div class="preview">
   <p>{{rawHtml}}</p>
  </div>
  </div>
  </form>
  <!-- 表单到此为止 -->
</div>
</template>

<script>
// 学习使用axios
import { handleUp } from '@/api'
export default {
  name:'',
  data(){
   return {
     rawHtml: 'No files currently selected for upload',
     fileList:[],
   }
  },
  methods: {
    upFile() {
      //声明一个FormDate对象
      const formData = new FormData();
      const file = this.fileList[0];
      //把文件信息放入对象中:键值对形式
      formData.append('userfile', file);
      let headers={
          // "Content-Type": "multipart/form-data"
          "Content-Type": "false"
        };
      handleUp(formData,headers).then((res)=>{console.log(res);})
      .catch((err)=>{console.log(err);})
      }
    ,
    showFile(e){
      // 清空原显示内容并显示上传文件名
      const rawFiles = Array.from(e.target.files);
      rawFiles.forEach ((ele)=>{
        this.fileList.push(ele);
      })
      this.rawHtml=this.fileList[0].name;
    },
  }
}
</script>

<style lang='scss' scoped>
input {
/* input缩小且不可见 */
opacity: 0; 
width: 20px;
}

.upload-demo{
position: absolute;
top: 50%; 
transform: translateY(-50%);
width: 400px;
margin-left: 50px;
}
.up{
  height:60px;
}
.row{
  position:absolute;
// 公共
.send {
  @include mainbtn();
  display: inline-block;
  user-select: none;
  cursor: pointer;
}
// 选择文件按钮
.chose{
  margin-right: 20px;
  background:$btncolor2;
}
}


</style>
