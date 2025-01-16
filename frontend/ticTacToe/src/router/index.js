import {createRouter, createWebHistory} from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/LoginView.vue'
import Dashboard from "@/views/DashboardView.vue";
import Profile from "@/views/Profile.vue";
import Game from "@/views/Game.vue";
import {isAuthenticated} from "@/services/AuthProvider.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'home',
            component: Register,
            meta: {requiresGuest: true},
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {requiresGuest: true},
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {requiresAuth: true},
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {requiresAuth: true},
        },
        {
            path: '/game/:id',
            name: 'game',
            component: Game,
            meta: {requiresAuth: true},
        }
    ],
})

router.beforeEach((to, from, next) => {
    const isLogged = isAuthenticated();
    if (to.meta.requiresAuth && !isLogged) {
        next({name: 'login'});
    }
    else if (to.meta.requiresGuest && isLogged) {
        next({name: 'dashboard'});
    }
    else {
        next();
    }
});

export default router
