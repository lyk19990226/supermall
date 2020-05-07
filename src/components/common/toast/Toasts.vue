<template>
    <div class="toasts" v-show="isShows">
        <div class="message">{{messages}}</div>
    </div>
</template>
  
<script>
  export default {
    name: 'Toasts',
    data() {
        return {
            messages:'',
            isShows:false
        }
    },
  }
</script>
  
<style scoped>
  .toasts {
      position: fixed;
      top:50%;
      left:50%;
      padding:8px 10px;
      transform: translate(-50%, -50%);/* 根据自己的高度和宽度再偏移百分之50，达到垂直居中的效果 */

      background-color:rgba(0,0,0,.6);
      color:#fff;
      text-align: center;
  }
  .message{
      width: 200px;
  }
</style>
  