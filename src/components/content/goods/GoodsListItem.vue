<template>
    <div class="goods-item" @click="itemClick">
            <img :src="showImage" alt="" @load="imageLoad"><!-- @load 在Vue中 是用来监听图片加载完成的事件 -->
            <div class="goods-info">
                 <p>{{goodsItem.title}}</p>
                <span class="price">{{'￥'+goodsItem.price}}</span>
                <span class="collect">{{goodsItem.cfav}}</span>
            </div>
    </div>
</template>
<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return[]
            }
        }
    },
    computed:{
        showImage(){
          return this.goodsItem.image || this.goodsItem.show.img 
        }
    },
    methods:{ 
      imageLoad(){//在Vue的原型中加入$bus，并将$bus赋为一个Vue实例，我们就可以间接的通过Vue实例来发出请求，并监听请求了（解决滚动时一卡一卡的bug）
        this.$bus.$emit('itemImageLoad')
        // console.log(this.$bus)
        // console.log('我调用了')
      },
      itemClick(){
        console.log('跳转详情页')
        this.$router.push('/detail/'+ this.goodsItem.iid)
      }
    }
}
</script>
<style scoped>
    .goods-item{
      padding-bottom: 40px;
      position: relative;
      width:48%;
    }
    .goods-item img{
      width:100%;
      border-radius:5px;
    }
    .goods-info{
      font-size:12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
    }
    .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }

   .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 1px 0/14px 14px;
  }

</style>


  