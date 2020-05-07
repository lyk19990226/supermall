<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>
  
<script>
  export default {
    name: 'Toast',
    props: {
      message: {
        type:String,
        default:''
      },
      isShow: {
        type:Boolean,
        default:false
      }
    }
  }
</script>
  
<style scoped>
  .toast {
      position: fixed;
      top:50%;
      left:50%;
      padding:8px 10px;
      transform: translate(-50%, -50%);/* 根据自己的高度和宽度再偏移百分之50，达到垂直居中的效果 */

      background-color:rgba(0,0,0,.6);
      color:#fff;
  }
</style>
  