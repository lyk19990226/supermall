<template>
    <div id="shop-item">
        <div class="item-selector">
            <!-- <check-button @checkBtnClick="checkedChange" :value="itemInfo.checked"></check-button> -->
            <check-button :is-checked="itemInfo.checked"  @click.native="checkedChange"/>
            <!-- <CheckButton/> -->
        </div>
        <div class="item-img">
            <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
            <div class="item-title">{{itemInfo.title}}</div>
            <div class="item-desc">{{itemInfo.desc}}</div>
            <div class="info-bottom">
                <div class="item-price left">￥{{itemInfo.price}}</div>
                <div class="item-count right">
                    <span @click="add">-</span>
                    <span style="width:38px;" @click="popUp"> {{itemInfo.count}}</span>
                    <span @click="sub">+</span>
                </div>
            </div>
        </div>
        <div class="item-remove">
            <remove-button @click.native="removeClick" />
        </div>
    </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import RemoveButton from 'components/content/itemRemove/RemoveButton'

  export default {
    name: 'CartListItem',
    props:{
        itemInfo:{
            type:Object,
            default:{}
        },
        index: {
            type:Number,
            default:0
        }
    },
    components: {
        CheckButton,
        RemoveButton
    },
    methods:{
        checkedChange() {
            this.itemInfo.checked = !this.itemInfo.checked
        },
        add() {
            this.itemInfo.count>1 && this.itemInfo.count--
        },
        sub(){
            this.itemInfo.count++
        },
        popUp(){
           this.$toasts('暂时不能手动指定的数量，请谅解！')
        },
        removeClick() {
            if(confirm("确认将这1个宝贝删除?") == true){
                this.$toasts('删除成功')
                this.$store.state.cartList.splice(this.index,1)
            }
        }
    },
  }
</script>
  
<style scoped>
  #shop-item {
      width: 100%;
      display: flex;
      flex:1;
      font-size: 0;
      padding:5px;
      border-bottom:1px solid #ccc;
  }
  .item-selector {
      /* width: 20px; */
      display: flex;
      /* justify-content: center; */
      align-items:center;
  }
  .item-title, .item-desc {
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
  }
  .item-img{
      padding:5px;
  }
  .item-img img {
      width: 72px;
      height: 100px;
      display: block;
      border-radius: 5px;
  }
  .item-info {
      font-size:17px;
      color:#333;
      padding:5px 10px;
      position: relative;
      overflow: hidden;
  }
  .item-info .item-desc {
      font-size: 14px;
      color:#666;
      margin-top:15px;
  }
  .info-bottom {
      margin-top:10px;
      position: absolute;
      bottom:10px;
      left:10px;
      right:10px;
  }
  .info-bottom .item-price {
      color:orangered;
  }
  .right span{
      border:1px solid #eee;
      display: inline-block;
      width: 22px;
      height: 22px;
      text-align: center;
  }
  
</style>
  