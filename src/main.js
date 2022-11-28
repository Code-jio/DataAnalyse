
import { createApp } from "vue";
import App from "./App";

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "./service/websocket/websocket"

import store from "./store";
import router from "./router"

const app = createApp(App)

app.use(router)
    .use(ElementPlus)
    .use(store)
    .mount(document.getElementById("app"));