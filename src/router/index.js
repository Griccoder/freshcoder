import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	  routes: [
		    {
		      path: '/page1',
		      name: 'page1',
		      component: () => import('@/components/page1'),
		      meta: {
		          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		      },
		    },
		    {
		      path: '/page1/show',
		      name: 'page1show',
		      component: () => import('@/components/page1/show')
		    },
		    {
		      path: '/page2',
		      name: 'page2',
		      component: () => import('@/components/page2')
		    },
		    {
		      path: '/page3',
		      name: 'page3',
		      component: () => import('@/components/page3')
		    },
		    {
		      path: '/page4',
		      name: 'page4',
		      component: () => import('@/components/page4'),

		    },
		    {
		      path: '/topology',
		      name: 'topology',
		      component: () => import('@/components/page4/topology.vue'),
		      
		    },
		    {
		      path: '/page5',
		      name: 'page5',
		      component: () => import('@/components/page5')
		    },
		    {
		      path: '/page6',
		      name: 'page6',
		      component: () => import('@/components/page6')
		    },
		    {
		        path: '/controller',
		        name: 'controller',
		        component: () => import('@/components/controller')
		      },
		      {
		          path: '/login',
		          name: 'login',
		          component: () => import('@/components/login')
		        },
		        {
		            path: '/',
		            name: 'login1',
		            component: () => import('@/components/login')
		          }
		  ]
		})

router.beforeEach((to, from, next) => {
    // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    //     //if (store.state.token) {  // 通过vuex state获取当前的token是否存在
    //     //    next();
    //     //}
    //     //else {
    //         next({
    //             path: '/login',
    //             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //         })
    //     //}
    // }
    // else {
        next();
    // }
})

export default router
