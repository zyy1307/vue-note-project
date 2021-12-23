<template>
<div>
  <div id="memo">
    <div class='select'><h1>今天也要好好学习鸭~</h1>
    <el-row>
     <el-button type="danger" plain><router-link to="/memo/excel">记录错题</router-link></el-button>
     <el-button type="danger" plain><router-link to="/memo/quiz">开始答题</router-link></el-button>
    </el-row>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name:'Home',
  components:{

  }
}
</script>
<style lang="scss" scoped>
#memo{
  height: 90vh;
  width: 100%;
  background: -webkit-linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  position: relative;
  .select{
    user-select: none;
    h1 {
    font-size: 80px;
    white-space: nowrap;
    }
    .el-row {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top:50px;
    }
    .el-button{
      margin-right: 20px;
    }
    color: #fff;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
  }
 
}
</style>
