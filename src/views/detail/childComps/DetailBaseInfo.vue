<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon">
                <span>{{goods.services[index-1].name}}</span>
            </span>
         
        </div>
    </div>
</template>
<script>
export default {
    name:'DetailBaseInfo',
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.base-info{
    margin-top:15px;
    padding:0 8px;
    color:rgb(126, 125, 125);
    border-bottom:5px solid #f2f5f8;
}
.info-title{
    color:#222;
    font-size:15px;
}
.info-price{
    padding-top:10px;
}
.info-price .n-price{
    color:var( --color-high-text);
    font-size:24px;
}
.info-price .o-price{
    font-size:14px;
    padding:0 8px;
    text-decoration: line-through;
}
.info-price .discount{
    background-color:var( --color-high-text);
    color:#fff;
    padding:2px 5px;
    font-size:12px;
    border-radius:9px;
    position: relative;
    top:-8px;
} 
.info-other{
    display: flex;
    justify-content: space-between;
    font-size:13px;
    line-height: 32px;
    box-shadow:0 1px 2px rgba(116, 116, 124, 0.2)
}
.info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}
.info-service-item img{
    width: 14px;
    height: 14px;
    position:relative;
    top:2px;
    left:-2px;
}
.info-service-item span{
    font-size:12px;
    color:#333;
}
</style>