import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { disableDrawer: true },
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/signin',
        meta: { disableDrawer: true },
        component: () => import('pages/SignInPage.vue'),
      },
      {
        path: '/signup',
        meta: { disableDrawer: true },
        component: () => import('pages/SignUpPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
