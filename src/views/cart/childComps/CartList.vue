<template>
    <div class="cart-list">
        <scroll class="wrapper" ref="scroll">
                <cart-list-item
                    v-for="(item,index) in cartList" 
                    :key="index" 
                    :item-info="item"
                    :index="index"/>
        </scroll>
    </div>
</template>
  
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

  export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }
  }
</script>
  
<style scoped>
  .cart-list{
      height: calc(100% - 44px - 51px - 45px);
  }
  .wrapper {
       height: 100%;
       overflow: hidden;
  }
</style>
  