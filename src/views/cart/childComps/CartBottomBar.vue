<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                :is-checked="isSelectAll" 
                class="check-button"
                @click.native="checkClick"/>
            <span>全选</span>
        </div>

        <div class="settlement">
            <div class="total-price">
                合计: <span style="color:rgb(255, 72, 0);">{{totalPrice}}</span>
            </div>

            <div class="calculate" @click="calcClick">
                结算: ({{checkLength}})
            </div>
        </div>
    </div>
</template>
  
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    methods: {
        checkClick(){
            if(this.isSelectAll) {//全部选中
                this.cartList.forEach(item => item.checked = false)
            }else {//全部不选中（至少有一个不选中）
                this.cartList.forEach(item => item.checked = true)
            }
            /* 
            //  这种方法在这里不可取，因为遍历时，两边互相影响
            this.cartList.forEach(item => item.checked = !this.isSelectAll)
             */
        },
        calcClick() {
           const length = this.cartList.filter(item => item.checked).length
           
            if(length === 0) {
                this.$toasts('请选择需要购买的商品')
            }else{
                this.$toasts('结算功能尚未完善，敬请期待！')
            }
        }
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return "￥" + this.cartList.filter(item => {
                return item.checked
            }).map(item => {
                return item.price * item.count
            }).reduce((preValue, sub) => {
                return preValue + sub
            },0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.cartList.length === 0) return false//默认购物车没有商品时，全选按钮不被选中
            // 1.filter方法
            // return !(this.cartList.filter(item => !item.checked).length)
            // 2.find方法
            // return !this.cartList.find(item => !item.checked)
            // 3.普通遍历方法
            for(let item of this.cartList) {
                if(!item.checked){//如果有一个商品没有被选中，则全选按钮也不会被选中
                    return false
                }
            }
            return true
        }
    }
  }
</script>
  
<style scoped>
  .bottom-bar {
      position: relative;
      display: flex;
      justify-content:space-between;
      height: 45px;
      line-height:45px;
      background-color:rgb(241, 239, 239);
      
  }
  .check-content{
      display:flex;
      align-items: center;
      font-size:17px;
  }
  .check-button{
      width:22px;
      height: 22px;
      line-height: 28px;
      margin:0 5px 0 10px;
  }
  .settlement{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .calculate {
      width: 80px;
      line-height: 36px;
      text-align: center;
      height: 80%;
      margin:0 10px 0 10px;
      color:#fff;
      background-color:rgb(255, 72, 0);
      border-radius: 25px;
  }
</style>
  