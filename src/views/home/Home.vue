<template>
    <div id="home">
        <nav-bar  class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"/><!-- 轮播图 -->
        <home-recommend-view :recommends="recommends" /><!-- 四个圈 -->
        <feature-view/><!-- 8个圈的照片 -->
        <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
        <goods-list :goods ="goods['pop'].list"/>
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
    </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
 
export default {
    name:'Home',
    data() {
        return {
            banners:[],
            recommends:[],
            goods: {
                'pop': {page:0,list:[]},
                'new': {page:0,list:[]},
                'sell': {page:0,list:[]},
            }
        }
    },
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        TabControl,
        GoodsList
    }, 
    methods:{
        getHomeMultidata(){
           getHomeMultidata()
            .then(res => {
                console.log(res);
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
            })
        }
    },
    created(){
        //1. 请求多个数据
        this.getHomeMultidata()
        //2. 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
        
    }
}
</script>

<style scoped>
   #home{
      padding-top:44px;
   }
   .home-nav{
       background-color:var(--color-tint);
       color:#fff;

       position:fixed;
       left:0;
       right:0;
       top:0;
       z-index:9;
   }
   .tab-control{
       position: sticky;
       top:44px;
       z-index: 9999;
   }
</style>