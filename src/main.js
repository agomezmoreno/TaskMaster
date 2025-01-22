import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './firebase'
import { createWebHistory, createRouter } from 'vue-router'
import landing from './components/landing.vue'
import recordatorios from './components/recordatorios.vue'
import Login from './components/Login.vue'
import Registro from './components/registro.vue'


const routes = [
  { path: '/', component: landing, meta: { requiresAuth: false } },
  { path: '/recordatorios', component: recordatorios, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  { path: '/registro', component: Registro, meta: { requiresAuth: false } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
app.use(router)

app.mount('#app')
