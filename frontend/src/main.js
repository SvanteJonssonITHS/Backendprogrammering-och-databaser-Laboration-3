// External Dependencies import
import { createApp } from 'vue';
import { io } from 'socket.io-client';
import VueSocketIO from 'vue-3-socket.io';

// Internal Dependencies import
import App from './App.vue';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

// Connect to socket.io
const socketio = new VueSocketIO({ connection: io(window.location.origin) });
app.use(socketio);

//Mounts app to div with id app
app.mount('#app');
