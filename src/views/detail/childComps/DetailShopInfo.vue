<template>
   <div class="shop-info">
        <div class="shop-logo">
            <img :src="shop.logo" alt="">
            <span class="logo-text">{{shop.name}}</span>
        </div>
        <div class="info-survey">

            <div class="shop-middle-left">

                <div class="info-sells">
                    <div class="sells-count">
                        {{SellsCount}}
                    </div>
                    <div class="sells-text">总销量</div>
                </div>
            
             
               <div class="info-goods">
                    <div class="goods-count">
                        {{shop.goodsCount}}
                    </div>
                    <div class="goods-text">全部宝贝</div>
                </div>

            </div>
            <div class="shop-line"></div>
            <div class="shop-middle-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                        <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <a :href="shop.shopUrl" class="enter-shop">进店逛逛</a>
        </div>
   </div> 
</template>
<script>
export default {
    name:'DetailShopInfo',
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        SellsCount(){
            return this.shop.sells > 10000 ? Math.round(this.shop.sells/10000*100)/100+"万" : this.shop.sells
        }
    }
}
</script>
<style scoped>
.shop-info{
    padding:0 8px;
    padding-bottom: 30px;
    box-shadow:0 2px 2px rgba(116, 116, 124, 0.1);
}
.shop-logo{
    margin:25px 0;
}
.shop-logo img{
    width: 44px;
    height: 44px;
}
.shop-logo .logo-text{
    position: relative;
    top:-16px;
    left:16px;
}
.info-survey{
    display: flex;
    justify-content:space-between;
    margin-bottom:16px;
}
.shop-middle-left{
    display: flex;
    width: 43%;
    justify-content: space-between;
    padding-left:15px;
}
.info-sells,.info-goods{
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
    justify-content:space-evenly;
    padding:7px 0;
}
.sells-text, .goods-text{
    font-size:13px;
    width:60px;
}
.shop-line{
    height: 42px;
    width: 1px;
    background-color:rgba(116, 116, 124, 0.2);
    margin:13px 6% 0 4%;
}
.shop-middle-right{
    width: 47%;
    font-size:13px;
}
.shop-middle-right tr td {
    padding:3px 7px;
} 
.shop-middle-right .score {
    color:#5ea732;
}
.shop-middle-right .score-better {
    color: #f13e3a;
}
.shop-middle-right .better span{
    background-color: #5ea732;
    color:#fff;
}
.shop-middle-right .better-more span{
    background-color:#f13e3a;
    color:#fff;
}
.shop-bottom{
    height: 22px;
}
.shop-bottom .enter-shop {
    display:block;
    width: 100px;
    height: 100%;
    font-size:13px;
    text-align: center;
    line-height: 20px; 
    margin:auto;
    padding:2px 16px;
    background-color:rgba(245, 214, 214,.3);
}
</style>