import { createRouter, createWebHistory } from "vue-router";
import InicioView from "@/views/InicioView.vue";
import ObrasView from "@/views/ObrasView.vue";
import ReservasView from "../views/ReservasView.vue";
import ContactoView from "../views/ContactoView.vue";
import LoginView from "../views/LoginView.vue";
import LoginUserView from "../views/LoginUserView.vue";
import DetallesView from "../views/DetallesView.vue";
import DashboardView from "../views/DashboardView.vue";
import NotFound from "../components/NotFound.vue";
import RegisterView from '../views/RegisterView.vue';
import TicketsView from '../views/TicketsView.vue';

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
    },
    {
      path: "/obras",
      name: "obras",
      component: ObrasView,
    },
    {
      path: "/reservas",
      name: "reservas",
      component: ReservasView,
    },
    {
      path: "/tickets",
      name: "tickets",
      component: TicketsView,
    },
    {
      path: "/contacto",
      name: "contacto",
      component: ContactoView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/loginUser",
      name: "loginUser",
      component: LoginUserView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/detalles",
      name: "detalles",
      component: DetallesView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/obras/:id",
      name: "Detalles",
      component: DetallesView,
    },
    {
      path: "/reservas/:obraId",
      name: "Reservas",
      component: ReservasView,
    },
  ],
});

export default router;
