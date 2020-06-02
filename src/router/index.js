import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Article from '../views/Article'
import ArticleDetail from '../views/ArticleDetail'
import ArticleEdit from '../views/ArticleEdit'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Article' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/article/add',
    name: 'ArticleAdd',
	 meta: {
	    requireAuth: true
	  },
    component: ArticleEdit
  },
  {
    path: '/article/:articleId',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/article/:articleId/edit',
    name: 'ArticleEdit',
	 meta: {
	    requireAuth: true
	  },
    component: ArticleEdit
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const token = sessionStorage.getItem("token")
    console.log("------------" + token)
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {
      } else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
