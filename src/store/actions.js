import{
    ADD_COUNTER ,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload){
        return new Promise((resolve, reject) => {
            // state.cartList.push(payload)
            // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            // 2. 判断oldProduct
            if(oldProduct) {//商品数量加1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
            }else {//添加新的商品
                payload.count = 1
                context.commit(ADD_TO_CART,payload)
                resolve('加入购物车成功')
            }
        })
    }
}