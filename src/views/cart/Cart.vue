<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <slot slot="center">购物车({{length}})</slot>
            <slot slot="right"><div @click="allClick">清空</div></slot>
        </nav-bar>
        <!-- 商品的列表 -->
        <cart-list/>
        <!-- 底部汇总 -->
        <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
    name:'Cart',
    components:{
        NavBar,
        CartList,
        CartBottomBar

    },
    computed: {
        // 将getters中的属性转成计算属性：两种方法
        // ...mapGetters(['cartLength'])//直接写getters中属性的名字 ----》数组语法写法
        ...mapGetters({//指定（自定义）getters中属性的名字  ----》对象语法写法
            length:'cartLength',
            cartList:'cartList'
        })
    },
    methods: {
        allClick(){
            if(this.length !== 0) {
                if(confirm("确认清空购物车?") == true) {
                this.$toasts('清空购物车成功！')
                this.cartList.splice(0,this.length)
                }
            } else {
                this.$toasts('您当前购物车没有商品！')
            }
        }
    }
    
}
</script>

<style scoped>
    .cart {
        height: 100vh;
    }
    .nav-bar {
        background-color: var(--color-high-text);
        color:#fff;
    } 
</style>