import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import TypeTicket from "../components/TypeTicket";
import SearchForm from "../views/SearchForm";
import Trains from "../views/Trains";
import Train from "../views/Train";
import TrainBase from "../views/TrainBase";
import TrainSchedule from "../views/TrainSchedule";
import Cart from "../views/Cart.vue";
import Tickets from "../views/Tickets.vue";
import UserTickets from "../views/UserTickets.vue";
import Verify from "../views/Verify.vue";
import RefundSearchForm from "../views/RefundSearchForm.vue";
import RefundForm from "../views/RefundForm.vue";
import store from "@/store";
import TestScheme from "../views/utils/TestScheme.vue";
import MyTickets from "../views/clientArea/MyTickets";
import SearchTickets from "../views/clientArea/SearchTickets";
import CartCheckout from "../views/clientArea/CartCheckout";
import TrainList from "../views/clientArea/TrainList";
import ProfileSettings from "../views/clientArea/ProfileSettings";
import SearchAircraftTicket from "../views/aircraft/SearchAircraftTicket";
import CartAircraft from "../views/aircraft/CartAircraft";
import Aircraft from "../views/aircraft/Aircraft";
import Payment from "../views/aircraft/Payment";
import SearchTicket from "../views/suburbanTrain/SearchTicket";
import SuburbanTrains from "../views/suburbanTrain/SuburbanTrains";
import TrainTicketsBuy from "../views/suburbanTrain/TrainTicketsBuy";
import GeneralCart from "../views/generalCart/Cart";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: TypeTicket,
  },
  {
    path: "/search-form",
    name: "SearchForm",
    component: SearchForm,
    children: [
      {
        path: "/trains",
        name: "trainsList",
        component: Trains,
        props: true
      },
    ]
  },
  {
    path: "/refund",
    name: "refund",
    component: RefundSearchForm,
    alias: "/refund.html"
  },
  {
    path: "/search-train",
    name: "SearchForm",
    component: SearchForm,
    alias: "/search-train.html"
  },
  {
    path: "/search-aircraft",
    name: "SearchAircraftTicket",
    component: SearchAircraftTicket,
    alias: "/search-train.html",
    children: [
      {
        path: '/aircraft',
        name: 'AircraftList',
        component: Aircraft,
        props: true
      }
    ]
  },
  {
    path: "/cart-aircraft",
    name: "CartAircraft",
    component: CartAircraft,
    alias: "/cart-aircraft.html"
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    alias: "/cart-aircraft.html"
  },
  {
    path: "/search-suburban-train",
    name: "SearchSuburbanTrain",
    component: SearchTicket,
    alias: "/search-suburban-train.html",
    children: [
      {
        path: '/suburban-train',
        name: 'SuburbanTrain',
        component: SuburbanTrains,
        props: true
      }
    ]
  },
  {
    path: '/train-tickets-buy',
    name: 'TrainTicketsBuy',
    component: TrainTicketsBuy,
    alias: '/train-tickets-buy.html',
  },
  {
    path: '/registration-tickets',
    name: 'GeneralCart',
    component: GeneralCart,
    alias: '/registration-tickets.html',
  },
  {
    path: "/my-tickets",
    name: "myTickets",
    component: MyTickets,
    alias: "/my-tickets.html",
    meta: { clientArea: true }
  },
  {
    path: "/search-tickets",
    name: "SearchTickets",
    component: SearchTickets,
    alias: "/search-tickets.html",
    meta: { clientArea: true },
  },
  {
    path: "/settings",
    name: "ProfileSettings",
    component: ProfileSettings,
    alias: "/settings.html",
    meta: { clientArea: true },
  },
  {
    path: "/train-ticket",
    name: "TrainList",
    component: TrainList,
    meta: { clientArea: true },
    props: true
  },
  {
    path: "/train-ticket/:trainNumber",
    component: TrainBase,
    name: "trainSchedule",
    props: true,
    meta: {  scrollToTop: true, clientArea: true },
    children: [
      {
        path: ":wagonType",
        name: "wagonClientArea",
        components: {
          default: Train,
          schedule: TrainSchedule
        },
        meta: { clientArea: true },
        props: true
      }
    ]
  },
  {
    path: "/makeRefund",
    name: "makeRefund",
    component: RefundForm
  },

  {
    path: "/utils/scheme/:scheme",
    name: "testScheme",
    component: TestScheme
  },

  {
    path: "/verify",
    name: "verify",
    component: Verify,
    alias: "/verify.html"
  },

  {
    path: "/UserTickets",
    name: "userTickets",
    component: UserTickets,
    alias: "/UserTickets.html"
  },

  {
    path: "/my_tickets",
    name: "tickets",
    alias: "/tickets.html",
    component: Tickets,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("fetchTickets")
        .then(() => {
          next();
        })
        .catch(error => {
          Vue.toasted.global.my_app_error({
            message: error.message
          });
        });
    }
  },

  {
    path: "/cart",
    name: "cart",
    component: Cart,
    props: true
  },

  {
    path: "/cart-checkout",
    name: "cart-checkout",
    component: CartCheckout,
    props: true,
    meta: {  clientArea: true },
  },

  {
    path: "/trains/:trainNumber",
    component: TrainBase,
    name: "trainSchedule",
    props: true,
    meta: { scrollToTop: true },
    children: [
      {
        path: ":wagonType",
        name: "wagon",
        components: {
          default: Train,
          schedule: TrainSchedule
        },
        props: true
      },
      {
        path: ":wagonType",
        name: "wagonTypeTab",
        components: {
          default: Train,
          schedule: TrainSchedule
        },
        meta: { disableScroll: true },
        props: true
      }
    ]
  },

];

const router = new VueRouter({
  mode: "history",
  history: true,
  //base: process.env.BASE_URL,
  base: "/",
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (to.matched.some(m => m.meta.disableScroll)) return;
    if (to.matched.some(m => m.meta.scrollToTop)) return { x: 0, y: 0 };
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
