import axios from 'axios'

export function request(config) {
// 1. 创建axios的实例
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
        })
// 2.axios的拦截器
  // 2.1 ： 请求拦截
    instance.interceptors.request.use(config => {
    return config //拦截之后，再返回出去
    },err => {//请求失败拦截

    })

  // 2.2：响应拦截
  instance.interceptors.response.use(res => {//响应成功拦截
      //  console.log(res)
      return res.data
  },err => {//响应失败拦截
  }) 
// 3.发送真正的网络请求
       return instance(config) //在调用instance()时，它的返回值就是Promise，所以可以这么写
}