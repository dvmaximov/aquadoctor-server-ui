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
      {
        path: '/users',
        meta: { disableDrawer: false },
        component: () => import('pages/admin/UsersPage.vue'),
      },
      {
        path: '/aquadoctor',
        meta: { disableDrawer: false },
        component: () => import('pages/admin/AquadoctorPage.vue'),
      },
      {
        path: '/aquadoctoredit/:id',
        name: 'aquadoctoredit',
        meta: { disableDrawer: false },
        component: () => import('pages/admin/AquadoctorEditPage.vue'),
      },
      {
        path: '/breathing',
        meta: { disableDrawer: false },
        component: () => import('pages/admin/BreathingPage.vue'),
      },
      {
        path: '/profile',
        meta: { disableDrawer: false },
        component: () => import('pages/UserProfilePage.vue'),
      },
      {
        path: '/profile/:userId',
        name: 'profileId',
        meta: { disableDrawer: false },
        component: () => import('pages/UserProfilePage.vue'),
      },
      {
        path: '/usercard/:userId',
        name: 'usercard',
        meta: { disableDrawer: false },
        component: () => import('pages/admin/UserCardPage.vue'),
      },
      {
        path: '/diagnostic',
        meta: { disableDrawer: false },
        component: () => import('pages/UserDiagnosticPage.vue'),
      },
      {
        path: '/forbidden',
        meta: { disableDrawer: false },
        component: () => import('pages/ErrorForbidden.vue'),
      },
      {
        path: '/orderedAquadoctor',
        meta: { disableDrawer: false },
        component: () => import('pages/OrderedAquadoctorPage.vue'),
      },
      {
        path: '/orderedBreathing',
        meta: { disableDrawer: false },
        component: () => import('pages/OrderedBreathingPage.vue'),
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '/:catchAll(.*)*',
        meta: { disableDrawer: false },
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
];

export default routes;
