<template>
<div>
  <el-container>
  <el-aside style="width:260px"><SideBar><template v-slot:heatmap><div></div></template></SideBar></el-aside>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main><router-view></router-view></el-main>
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
    test:0,
   }
  },
  computed:{
    thisPath(){
      console.log(this.$router.path);
      return this.$router.path;
    }
  },
  methods:{
  //    beforeRouteUpdate(to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   this.test=this.$router.to;
  //   next();
  // }
}
}
</script>

<style scoped>
.el-main {
  margin: 0;
  padding: 0;
}
.el-header {
  height: 10vh;
}
.el-main {
  height: 90vh;
}
</style>
