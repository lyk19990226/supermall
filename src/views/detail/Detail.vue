<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
        <scroll class="content" ref="scroll" @scrollon = "contentScroll" :probe-type="3" >
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="param" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends" />
        </scroll>
      <back-top @click.native = "backClick" v-show="isShowBackTop"/>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'


import {getDetail,Goods,Shop,GoodsParam,getRecommend } from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
    name:'Detail',
    mixins:[itemListenerMixin],
    data(){
        return {
           iid: null,
           topImages: [],
           goods: {},
           shop:{},
           detailInfo:{},
           paramInfo:{},
           isShowBackTop:false,
           commentInfo:{},
           recommends:[],
           themeTopYs:[],
           getThemeTopY:null
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
       BackTop,
       GoodsList
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
            console.log(res)
            this.recommends = res.data.list
        })
        // 4.给getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

            console.log(this.themeTopYs)
        })
    },
    methods:{
        imageLoad(){
        //第一种方法，通过防抖函数来控制对refresh的频繁调用
               this.newRefresh()
        //第二种方法，控制子组件发出事件的次数也可以 减少对refresh的频繁调用（具体如何控制看子组件：DetailGoodsInfo）
        //    this.$refs.scroll.refresh() 

            console.log('-----')
            this.getThemeTopY()
              
        },
        // 监听点击返回顶部的组件
        backClick(){//图标返回顶部
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
        // 1. 判断back-top是否显示
            this.isShowBackTop = position.y < -1000
        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        }
    },
    mounted(){
    
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
    height: calc(100% - 44px);
}
</style>