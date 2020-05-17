import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, SELL, NEW} from "common/const";

export const itemListenerMixin = {//混入的用法，多个组件想复用代码可以用混入；
    data(){
        return { 
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted() {
        // 1 . 图片加载完成的事件监听
        this.newRefresh = debounce(this.$refs.scroll.refresh,10)   
        // 对监听的事件进行保存（通过事件总线发出然后监听的事件）
        this.itemImgListener = () => {
            this.newRefresh()
            console.log('----')
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
        // console.log('我已经混入到里面去了，并起到了相应的作用')
        },
}


export const backTopMixin = {//返回顶部
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){//图标返回顶部
            this.$refs.scroll.scrollTo(0,0)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = position.y < -1000
        }
    }
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP ,
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }
  