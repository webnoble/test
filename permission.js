import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/404', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();

  // 设置页面title
  document.title = getPageTitle(to.meta.title);

  // 获得用户token
  const hasToken = getToken();

  // 判断token是否失效
  if (hasToken === 'true') {
    if (to.path === '/login') {
      // 如果已经登录则跳转到dashboard
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasMenus = store.getters.menus && store.getters.menus.length > 0;
      // 判断是否已经获取到当前用户的操作菜单
      if (hasMenus) {
        next();
      } else { // 没有用户角色则去下载菜单【待优化逻辑！！！】
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { menus } = await store.dispatch('user/getInfo');
          await store.dispatch('topo/getImages');
          if (!menus || !(menus instanceof Array) || menus.length <= 0) {
            Message.error('菜单数据结构异常');
          }
          // generate accessible routes map based on roles
          // 初始化拉取全局数据
          // store.dispatch('layout/getTree')
          // 获取分组数据
          await store.dispatch('layout/getAllDropDownBox')
          const accessRoutes = await store.dispatch('permission/generateRoutes', menus);
          // dynamically add accessible routes
          router.addRoutes(accessRoutes);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          console.log(error)
          Message.error(error || 'Has Error');
          // next(`/404?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 没有登录则判断当前要跳转的页面是否在免登陆白名单里面，如果当前跳转到路由在免登陆白名单里面则跳转该路由
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      let permit = false;
      permit = await store.dispatch('user/permitThrough');
      if (permit) {
        NProgress.done();
        return next({ ...to, replace: true });
      }
      store.dispatch('user/login').then(hasToken => {
        console.log(hasToken ? '已经登录！！！' : '还未登录！！！');
        if (hasToken) {
          next({ ...to, replace: true });
        }
      }).catch(() => {
        alert('报错');
      }).finally(() => {
        NProgress.done();
      });
    }
  }
});

router.afterEach(() => {
  // 路由跳转完成后完成加载进度条
  NProgress.done();
});
