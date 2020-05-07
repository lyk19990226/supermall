<template> 
        <div class="tab-bar-item">
          <div v-if="!isActive" @click="itemClick">
            <slot name="item-icon"></slot>
          </div>

          <div v-else>
              <slot name="item-icon-active"></slot>
          </div>
  
          <!-- <div :class="{active:isActive}"> -->
            <div :style="activeStyle">
             <slot name="item-text"></slot>
          </div>
        </div>
</template> 
<script>
export default {
  name:'TabBarItem',
  props:{
     path:String,
     activeColor:{
       type:String,
       default(){
         return 'red'
       }
     }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1   //等于-1 就返回false，不等于-1 就返回true
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
      
    }
  }, 
}
</script>
<style scoped>
.tab-bar-item{
   flex:1;
   text-align:center;
   height:49px;
   font-size:14px;
   padding-top:3px;
}
.tab-bar-item img{
    height: 24px;
    width:24px;
    vertical-align:middle;
    margin-bottom:2px;
}
/* .active{
  color:red;
} */
</style>
