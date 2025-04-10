import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import ExportView from '../view/admin-view/CourseSearchView.vue';
import Login from '../view/LoginView.vue';
import Dashbroad from '../view/admin-view/DashbroadView.vue';
import Chat from '../view/admin-view/ChatView.vue';
import OptionForm from '../view/admin-view/SchedulingRequestView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: HomeView,
    meta: { requiresAuth: true },
    redirect: '/home/dashboard',
    children: [
      { path: 'dashboard', component: Dashbroad },
      { path: 'export', component: ExportView },
      { path: 'chat', component: Chat },
      { path: 'option', component: OptionForm },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;