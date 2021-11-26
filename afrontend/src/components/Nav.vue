<template>
<div id='nav'>
   <p class='typing'>勿在浮沙筑高台</p>
</div>
</template>

<script>
export default {
  name:'',
  data(){
   return {
     
   }
  }
}
</script>

<style scoped lang='scss'>
#nav{
  margin-top: 20px;
}
// 打字机动画
@keyframes typing {
  0%{
    width: 0;
  }
  100%{
    width: 7em;
  }
}
// 光标闪烁
@keyframes cursor-flicker {
  50% { box-shadow: 1px 0 0 0 salmon; }
  100% { box-shadow: 1px 0 0 0 #fff; }
}
.typing{
  width: 7em;
  // https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/解决我问题的是step-start 也就是开始时就执行了第一段
  animation:typing 2.8s steps(7,start) infinite forwards,cursor-flicker 1s steps(2) infinite;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
}
</style>
