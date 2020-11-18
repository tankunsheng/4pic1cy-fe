import { createApp } from 'vue';
import Main from './Main.vue'
import { Amplify } from 'aws-amplify';
import { apiGateway } from './config.js';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Message from 'primevue/message';
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import Tooltip from 'primevue/tooltip';


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

app.component('DataTable', DataTable);
app.component('Button', Button);
app.component('Message', Message);
app.component('Column', Column);
app.use(router)
app.mount('#app')
app.directive('tooltip', Tooltip);