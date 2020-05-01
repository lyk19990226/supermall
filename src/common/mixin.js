import {debounce} from './utils'

export const itemListenerMixin = {//混入的用法，多个组件想复用代码可以用混入；
    data(){
        return {
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted() {
        // 1 . 图片加载完成的事件监听
        this.newRefresh = debounce(this.$refs.scroll.refresh,80)   
        // 对监听的事件进行保存（通过事件总线发出然后监听的事件）
        this.itemImgListener = () => {
            this.newRefresh()
            console.log('----')
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
        // console.log('我已经混入到里面去了，并起到了相应的作用')
        },
}