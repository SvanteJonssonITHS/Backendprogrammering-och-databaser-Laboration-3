// External Dependencies import
import { createApp } from 'vue';

// Internal Dependencies import
import App from './App.vue';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

//Mounts app to div with id app
app.mount('#app');
