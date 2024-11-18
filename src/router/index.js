import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/auth'
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        login: true
      }
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',

      component: () => import('../views/SignUpView.vue'),
    },
  ],
})
let isAuthChecked = false;
router.beforeEach((to, from, next) => {
  // Esperar hasta que Firebase haya validado el estado de autenticación
  if (!isAuthChecked) {
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true; // Cambia la bandera después de verificar el estado
      const isAuthenticated = user !== null; // Verifica si el usuario está autenticado

      // Si la ruta requiere autenticación y el usuario no está autenticado
      const authRequired = to.meta.login;
      if (authRequired && !isAuthenticated) {
        next({ name: 'login' }); // Redirige al login
      } else if (to.name === 'login' && isAuthenticated) {
        next({ name: '/' }); // Redirige a home si ya está autenticado
      } else {
        next(); // Deja pasar a la ruta
      }
    });
  } else {
    next(); // Si ya se ha verificado el estado de autenticación, dejar pasar a la ruta
  }
});

export default router
