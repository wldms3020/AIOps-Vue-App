import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// import store from '../store';
import { getCookie } from '@/util/cookie'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

// 전역 가드로 페이지 인증
router.beforeEach((to, from, next) => {
  // meta에서 authRequired: true 값을 가진 경우
  if (to.matched.some((routeInfo) => routeInfo.meta.authRequired)) {
    // 인증 확인
    if (getCookie('userId')) {
      next();
    } else {
      alert('로그인이 필요합니다.');
      next('/login');
    }
  } else {
    next();
  }
})

export default router;
