import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEditor)

axios.defaults.baseURL = 'http://127.0.0.1:8082/'
axios.interceptors.response.use(response =>{
	const res =response.data
	//当结果的code是否为200的情况
	if(res.code ===200){
		return response
	}else {
		//弹出异常信息
		Element.Message({
			message: response.data.msg,
			type: 'error',
			duration: 2 * 1000
		 })
		//直接拒接往下面返回结果信息
		return  Promise.reject(response.data.msg)
	}
},
error => {
    console.log('err' + error)// for debug
    if(error.response.data) {
      error.message = error.response.data.msg
    }
    // 根据请求状态觉得是否登录或者提示其他
    if (error.response.status === 401) {
      store.commit('REMOVE_INFO');
      router.push({
        path: '/login'
      });
      error.message = '请重新登录';
    }
    if (error.response.status === 403) {
      error.message = '权限不足，无法访问';
    }
    Element.Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
})
Vue.prototype.$axios = axios //

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
