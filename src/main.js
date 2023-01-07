import "@/service/proto/proto_main.js"
import "./service/websocket/websocket"

// eslint-disable-next-line no-undef
window.proto = proto

import { createApp } from "vue";
import App from "./App";

import "@/styles/preset.css"
import "@/styles/localize.css"
import "@/styles/common.css"

import store from "./store";
import router from "./router"

const app = createApp(App)

app.use(router)
    .use(store)
    .mount(document.getElementById("app"));