import { createRouter, createWebHistory } from 'vue-router';

const ChatView = () => import('@/views/ChatView.vue');
const AdminPanelView = () => import('@/views/AdminPanelView.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanelView
    }
  ]
});

export default router;
