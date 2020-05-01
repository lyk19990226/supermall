<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc">
            <div class="start">
            </div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
        </div>
    </div>
</template>

<script>

export default {
  name: 'DetailGoodsInfo',
  data(){
      return{
          counter:0,
          imagesLength:0
      }
  },
  props:{
      detailInfo:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  methods:{
      imgLoad(){
// 第一种方法：通过防抖函数来控制对refresh的频繁调用
        //  console.log('----')
         this.$emit('imageLoad')


// 第二种方法：通过控制向父组件发出事件的次数，来控制对refresh的频繁调用
          /* this.counter++
          console.log('加载详情图片监听：'+this.counter)
          if(this.counter === this.imagesLength){//当加载的图片到达了该加载数，才向父组件发出事件
              this.$emit('imageLoad')
              console.log('----')
          } */
      }

  },
  watch:{//时刻监听事件的变化而变化
      detailInfo() {
          this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
  }
}
</script>

<style scoped>
.info-desc .desc {
    padding:0 14px;
    font-size:14px;
}
.info-desc .start{
    margin:25px 25px 15px;
    width:110px;
    height: 1px;
    background-color:rgb(80, 78, 78);
}
.info-desc .start::before {
    content:"11";
    font-size:10px;
    background-color:black;
    color:black;
    position: relative;
    top:-16px;
    left:-9px;
}
.info-desc .end{
    margin:15px 25px;
    width:110px;
    height: 1px;
    background-color:rgb(80, 78, 78);
    float:right;
}
.info-desc .end::before {
    content:"11";
    font-size:10px;
    background-color:black;
    color:black;
    position: relative;
    top:-16px;
    left:110px;
}
.info-key{
    padding:0 14px;
    font-size:15px;
    color:rgb(17, 17, 17);
    clear:both;
}
.info-list {
    display: flex;
    flex-flow:row wrap;
    justify-content: space-around;
    padding: 4px;
}
.info-list img{
    width:95%;
    height: 52%;
    margin-top:10px;
}
</style>>


