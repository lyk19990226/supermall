<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
      return {
          scroll:null
      }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        } 
    },
    mounted(){
        // 创建BScroll对象
       this.scroll = new BScroll(this.$refs.wrapper,{
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad//是否加入上拉加载更多的功能
       })
       // 监听滚动的位置(返回顶部功能)
       if(this.probeType ===2 || this.probeType ===3 ) {
            this.scroll.on('scroll',(position) => {
                // console.log(position)
                this.$emit('scrollon',position)
           })  
       }
      
      // 监听上拉事件
      if(this.pullUpLoad) {
            this.scroll.on('pullingUp',() => {
                //console.log('上拉加载更多')
                this.$emit('pullingUp')
       }) 
      } 
    //    console.log(this.scroll)
    },
    methods:{
        scrollTo(x,y,time=300){//返回顶部的时间
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {//上拉加载更多
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){//处理bug， 这个函数的作用是：更新获取到浏览器中数据，在页面的高度，即是更新scroll对象的scrollerHeight高度；每次下拉加载更多后请求到数据，会重新计算高度，防止出现滚动时短暂的卡停留bug
           this.scroll && this.scroll.refresh()
           console.log('refresh被调用了')
        //    console.log('加载全部图片，刷新scrollerHeight高度的次数')
        //    console.log(this.scroll)
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>
<style scoped>

</style>