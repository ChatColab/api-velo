import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from "@/views/AccueilView.vue";
import CartographieView from "@/views/CartographieView.vue";
import DonneesView from "@/views/DonneesView.vue";
import GeolocalisationView from "@/views/GeolocalisationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/geolocalisation',
      name: 'géolocalisation',
      component: GeolocalisationView
    },
    {
      path: '/cartographie',
      name: 'cartographie',
      component: CartographieView
    },
    {
      path: '/donnees',
      name: 'données',
      component: DonneesView
    }
  ]
})

export default router
