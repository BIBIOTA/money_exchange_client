import { createApp } from 'vue'
import App from './App.vue'
import urql from '@urql/vue'
import './assets/tailwind.css'

const app = createApp(App);

app.use(urql, {
  url: process.env.VUE_APP_API_URL,
});

app.mount('#app')
