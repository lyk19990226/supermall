<template>
    <div class="recommends">
        <div v-for="item in recommends" :key="item.link" class="recommends-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:'HomeRecommendView',
    props: {
        recommends:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>
<style scoped>
  .recommends{
      display:flex;
      width:100%;
      text-align: center;
      font-size:13px;
      padding:10px 0 20px;
      border-bottom:8px solid #eee;
  }
  .recommends-item{
      flex:1;
  }
  .recommends-item img{
      width:70px;
      height:70px;
      margin-bottom:8px;
    }
</style>