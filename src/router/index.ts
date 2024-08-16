import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';
import { useAuthStore } from 'src/stores/auth.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const checkUserAuth = (path: string): boolean => {
  const auth = useAuthStore();
  const validPaths = ['/', '/signin', '/signup'];
  // console.log(path);
  // console.log('!auth.includes', !validPaths.includes(path));
  // console.log('!auth.isAuth', !auth.isAuth);
  if (!validPaths.includes(path) && !auth.isAuth) return false;
  return true;
};

export default route(function (/* { store, ssrContext } */) {
  // const createHistory = process.env.SERVER
  //   ? createMemoryHistory
  //   : process.env.VUE_ROUTER_MODE === 'history'
  //   ? createWebHistory
  //   : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
  });

  Router.beforeResolve((to) => {
    if (!checkUserAuth(to.path)) {
      return '/signin';
    }
  });

  // Router.afterEach((to, from) => {
  //   const router = useRouter();
  //   router.push('/signin');
  // });

  return Router;
});
