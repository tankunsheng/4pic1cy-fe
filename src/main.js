import { createApp } from 'vue'
import Menu from './Menu.vue'
import Nav from './components/Navbar.vue'
import { Amplify } from 'aws-amplify';
import { apiGateway } from './config.js';

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


createApp(Nav).mount('#navbar')
createApp(Menu).mount('#app')
