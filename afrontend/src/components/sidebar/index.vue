<template>
<div id='sidebar'>
  <div class='Avatar'>
     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <span>{{username}}的工作台</span>
  </div>
  <ul>
    <li class='function'>{{today}}</li>
    <li v-for="(items,i) in data" class='function' :key="i"><router-link :to='items.to'>{{items.label}}</router-link></li>
  </ul>
  <slot name='heatmap'></slot>
</div>
</template>

<script>
const moment=require('moment');
  export default {
    data() {
      return {
        username: 'helloworld',
        data: [{
          label: '错题卡',
          to:'/memo'
        }, {
          label: '日历计划表',
          to:'/calendar'
        }, {
          label: '便签板',
          to:'/note',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
      };
    },
    computed: {
        today(){
        moment.locale();
        return moment().format('ll');
        }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>

<style lang='scss' scoped>
#sidebar{
  .Avatar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width:100%;
    height:10vh;
    span{
    font-size: 16px;
    }
    border-bottom: 2px solid salmon;
  }
  ul{
    margin-top:10px;
  }
  .function{
    height: 5vh;
    padding-left:15px;
    color:$fontcolor;
    line-height: 5vh;
    &:hover{
      background-color:#FBE8E8;
    }
  }
  width:260px;
  height:100vh;
  background-color:#FAFAFA;
}

</style>
