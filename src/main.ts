import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";

const app = createApp(App);
app.use(router);
app.mount("#app");

//dayjs.extend(timezone);
