<template>
<div>
  <el-container>
  <el-aside style="width:260px"><SideBar></SideBar></el-aside>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <div class='total' v-if='thisPath'>
           <div class="text front">ToDoList</div>
           <div class="text back">ToDoList</div>
      </div>
      <router-view v-else></router-view>
    </el-main>
  </el-container>
</el-container>
</div>

</template>

<script>
// 上栏：其实应该叫header比较好
import Nav from '@/components/Nav.vue'
// 侧边栏
import SideBar from "@/components/sidebar/index.vue"
export default {
  components: { Nav,SideBar },
  name:'layout',
  data(){
   return {
     thisPath:true,
   }
  },
  created(){
    this.thisPath = (this.$route.path!='/')?false:true;
  },
  watch:{
    $route(to){
      this.thisPath = (to.path!='/')?false:true;
    }
  },
  methods:{
 
}
}
</script>

<style lang='scss' scoped>
.el-main {
  margin: 0;
  padding: 0;
}
.el-header {
  height: 10vh;
}
.el-main {
  height: 90vh;
  min-width: 1000px;
  position: relative;
}
.text {
  @include incenter();
  font-size: 80px;
  font-weight: bold;
}
//  css3聚光灯动画特效 - teacherlin的视频 - 知乎
//https://www.zhihu.com/zvideo/1444739686157271040
.total{
  width: 100%;
  height: 100%;
  background: #9face6;
}
.back{
  color: #a9c9ff;
}
.front {
 background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
 background-clip: text;
 color: transparent;
 z-index:2;
 animation: move 3s infinite alternate-reverse;
}
@keyframes move{
  0%{
     clip-path: circle(60px at 0%) ;
  }
  100%{
     clip-path: circle(60px at 100%) ;
  }
}

</style>
