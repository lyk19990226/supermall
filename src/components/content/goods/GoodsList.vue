<template>
    <div class="goods">
       <goods-list-item v-for="item in goods" :key="item.link" :goods-item="item"/>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'

export default {
    name:'GoodsList',
    props:{
        goods:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    components:{
        GoodsListItem
    },
}
</script>
<style scoped>
 .goods {
    display: flex;
    flex-flow:row wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>