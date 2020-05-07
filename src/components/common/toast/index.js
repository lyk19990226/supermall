import Toasts from './Toasts'

const obj = {}

obj.install = function(Vue) {
    // console.log('执行install函数')
    // 1.插件组件构造器
    const toastContrustor = Vue.extend(Toasts)
    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toasts = new toastContrustor()
    // 3.将组件对象，手动挂载到某一个元素上
    toasts.$mount(document.createElement('div'))
    // 4.toasts.$el对应的就是div
    document.body.appendChild(toasts.$el)

    Vue.prototype.$toasts = (messages="默认文字",duration=1500) => {
        toasts.isShows = true 
        toasts.messages = messages
        setTimeout(() => {
            toasts.isShows = false
            toasts.message = ''
        },duration)
    }
}

export default obj