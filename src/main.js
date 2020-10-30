import { createApp } from 'vue'
import Main from './Main.vue'
import { Amplify } from 'aws-amplify';
import { apiGateway } from './config.js';
import router from "./router";
Amplify.configure({
  API: {
    endpoints: [
      {
        name: "4Pic1Cy",
        endpoint: apiGateway.URL,
        region: apiGateway.REGION
      },
    ]
  }
});

const app = createApp(Main)
app.use(router)
app.mount('#app')
