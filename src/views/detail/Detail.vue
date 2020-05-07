<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" @scrollon = "contentScroll" :probe-type="3" >
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="param" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends" />
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>

        <back-top @click.native = "backClick" v-show="isShowBackTop"/>
        <toast :is-show="isShow" :message="message" />
     
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'


import {getDetail,Goods,Shop,GoodsParam,getRecommend } from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import { mapActions } from 'vuex'

export default {
    name:'Detail',
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
           iid: null,
           topImages: [],
           goods: {},
           shop:{},
           detailInfo:{},
           paramInfo:{},
           commentInfo:{},
           recommends:[],
           themeTopYs:[],
           getThemeTopY:null,
           currentIndex:0,
           message:'',
           isShow:false
        }
    },
    components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       DetailBottomBar,
       GoodsList,
       Toast
    },
    created(){
        // 1. 保存传入的id
        this.iid = this.$route.params.iid
        // 2. 根基iid请求详情数据
        getDetail(this.iid).then(res => {
            // console.log(res)
            const data = res.result
            // 1 . 获取顶部图片轮播数据
             this.topImages = data.itemInfo.topImages
            //  2. 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 3. 获取商家信息
            this.shop = new Shop(data.shopInfo)
            // 4. 保存商品的详情数据
            this.detailInfo = data.detailInfo
            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 6. 获取评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
                

            // this.$nextTick(() => {//上面渲染完之后才会回调这个函数
            //     this.newRefresh()
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //     console.log(this.themeTopYs)
            // })
        })
        // 3. 请求推荐数据
        getRecommend().then(res => {
            // console.log(res)
            this.recommends = res.data.list
        })
        // 4.给getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs)
        })
    },
    methods:{
        ...mapActions(['addCart']),
        imageLoad(){
        //第一种方法，通过防抖函数来控制对refresh的频繁调用
               this.newRefresh()
        //第二种方法，控制子组件发出事件的次数也可以 减少对refresh的频繁调用（具体如何控制看子组件：DetailGoodsInfo）
        //    this.$refs.scroll.refresh() 

            // console.log('-----')
    // 调用赋好值的函数，从而完成防抖
            this.getThemeTopY()
              
        },
        contentScroll(position){
        // 1. 判断back-top是否显示
            this.listenShowBackTop(position)
        // 2. 获取y值
            const positionY = -position.y
            // console.log(positionY)
        // 2.1 positionY和主题中值进行对比
            for(let i in this.themeTopYs){//这里获取的i是字符串
                i = parseInt(i)

                /* //这种方法行不通，到判断最后一个时获取不到this.themeTopYs[3+1]，即为undefined
                 if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
                    console.log(i)
                } */

                /*//这种方法判断太多，代码太长，性能较低
                 let length = this.themeTopYs.length
                if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
                  (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                      this.currentIndex = i
                    //   console.log(this.currentIndex)
                      this.$refs.nav.currentIndex = this.currentIndex
                  } */

                //   console.log(Number.MAX_VALUE)//获取原生js的最大值
                //   我们给原数组themeTopYs多加一个元素，即是上面这个原生js的最大值，从而简便了判断语句，虽然内存占用可能稍多一点，但是整体性能还是提高的（这是典型的空间换时间的写法）
                 if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                      this.currentIndex = i 
                      this.$refs.nav.currentIndex = this.currentIndex
                    //   console.log(this.currentIndex)
                 }
            }
        },
        titleClick(index){
            // console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        addToCart(){
            // 1.获取购物车需要展示的信息，然后添加进去
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // 2.将商品添加到购物车里
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res)
            // })
            this.addCart(product).then(res => {//使用了mapActions映射可以这么写
                this.message = res
                this.isShow = true 

                setTimeout(() => {
                    this.isShow = false
                    this.message =''
                },1500)
            })
        }
    },
    updated(){
        /* this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs) */
    },
    destroyed(){
       this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
}
</script>
<style scoped>
.detail{
    height:100vh;
    position: relative;
    z-index: 10;
    background-color:#fff;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color:#fff;
}
.content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>