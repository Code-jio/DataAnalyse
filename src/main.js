import "./service/websocket/websocket"

import { createApp } from "vue";
import App from "./App";

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "@/styles/localize.css"


import store from "./store";
import router from "./router"

const app = createApp(App)

app.use(router)
    .use(ElementPlus)
    .use(store)
    .mount(document.getElementById("app"));