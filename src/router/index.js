import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("../views/Home/Home.vue")

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/home",
            component: Home
        }
    ]
})