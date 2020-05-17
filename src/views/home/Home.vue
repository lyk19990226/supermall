<template>
    <div id="home">
        <nav-bar  class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
         <tab-control class="tab-control" 
                        :titles="['流行','新款','精选']" 
                        @tabClick="tabClick"
                        ref="tabControl2"
                        v-show="isTabFixed"/>

        <scroll class="content" 
                 ref="scroll"  
                 :probe-type="3" 
                 @scrollon = "contentScroll"
                 :pull-up-load="true"
                 @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/><!-- 轮播图 -->
            <home-recommend-view :recommends="recommends" /><!-- 四个圈 -->
            <feature-view/><!-- 8个圈的照片 -->
            <tab-control :titles="['流行','新款','精选']" 
                        @tabClick="tabClick"
                        ref="tabControl1"/>
            <goods-list :goods ="showGoods"/>
        </scroll>
        <back-top @click.native = "backClick" v-show="isShowBackTop"/>
    </div>  
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {itemListenerMixin} from 'common/mixin'
  import {debounce} from 'common/utils'


 
export default {
    name:'Home',
    mixins:[itemListenerMixin],
    data() {
        return {
            banners:[],
            recommends:[],
            goods: {
                'pop': {page:0,list:[]},
                'new': {page:0,list:[]},
                'sell': {page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
        }
    },
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    }, 
    computed:{
      showGoods(){
          return this.goods[this.currentType].list
      }
    },
    methods:{
        /**
         * 事件监听相关的方法
         */
        tabClick(index){
           switch(index){
               case 0:
                  this.currentType = 'pop'
                  break
               case 1:
                  this.currentType = "new"
                  break
               case 2:
                  this.currentType = 'sell'
           }
           this.$refs.tabControl1.currentIndex = index
           this.$refs.tabControl2.currentIndex = index
        },


        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
           getHomeMultidata()
            .then(res => {
                // console.log(res.data);
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
             })
        },
        getHomeGoods(type){ 
            const page = this.goods[type].page + 1
            getHomeGoods(type,page)
            .then(res => {
                // console.log(res)
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()//上拉加载更多，执行多次
            })
        },
        // 监听点击返回顶部的组件
        backClick(){//图标返回顶部
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
        // 1. 判断back-top是否显示
            //   if(position.y < -1000){
            //       this.isShowBackTop = true
            //   }else{
            //       this.isShowBackTop = false
            //   }
            this.isShowBackTop = position.y < -1000
        // 2. 绝对tabControl是否吸顶（position:fixed;）
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore(){
            // console.log('上拉加载更多home') //只能执行一次上拉加载
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
            // console.log('---')
            // 2. 获取tabControl的offsetTop  ： 所有组件都有一个$el属性，用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
            // console.log(this.$refs.tabControl1.$el.offsetTop)
        }
       
    },
    created(){
        //1. 请求多个数据
        this.getHomeMultidata()
        //2. 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },


    // 用混入的方法解决代码复用问题，所以下面不需要了
    // mounted(){  
    //     // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度

    // // 1 . 图片加载完成的事件监听
    //     const refresh = debounce(this.$refs.scroll.refresh,50)   
    //     // 对监听的事件进行保存（通过事件总线发出然后监听的事件）
    //     this.itemImgListener = () => {
    //         // console.log('图片加载~~')
    //         // console.log(this.$refs.scroll.refresh)
    //         refresh()
    //     }
    //     this.$bus.$on('itemImageLoad',this.itemImgListener)
    // }, 


    destroyed(){
        // console.log('销毁')
    },
    activated(){
    //    console.log('活跃')
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,this.saveY,0)
  
    },
    deactivated(){
        // console.log('不活跃')
        // 1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY()
        // 2.取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)//当home不活跃的时候，取消对itemImgListener函数的监听
    }
}
</script>

<style scoped>
   #home{
      /* padding-top:44px; */
      height: 100vh;
      position: relative;
   }
   .home-nav{
       background-color:var(--color-tint);
       color:#fff;
/* 下面是在使用浏览器原生滚动时，为了让导航不跟随一起滚动而设置的，而这里我们引用了better-scroll插件，所有下面的样式是多余的 */
  /*      position:fixed;
       left:0;
       right:0;
       top:0;
       z-index:9; */
   }
   .tab-control{
       position: relative;
       z-index: 9;
   }
   .content{
       overflow: hidden;
       position:absolute;
       top:44px;
       bottom:49px;
       left:0;
       right:0;
   }

   
</style>