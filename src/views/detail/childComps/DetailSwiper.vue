<template>
    <swiper class="detail-swipe">
        <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>
<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'DetailSwiper',
    props:{
        topImages:{
            type:Array,
            defailt(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    },

}
</script>
<style scoped>
.detail-swipe{
    height: 300px;
    /* overflow: hidden; */
}
</style>