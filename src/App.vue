<template>
  <div>
    <template v-if="detectMobile && !$route.meta.clientArea">
      <Slide right>
        <a href="/">
          <span>{{ $t("ticketSearch") }}</span>
        </a>
        
        <a href="/download/pub_oferta.pdf">
          <span>{{ $t("offer") }}</span>
        </a>
        
        <a href="https://about.smartticket.gov.ua/" target="_blank">
          <span>{{ $t("about") }}</span>
        </a>
        
        <a href="/refund">
          <span>{{ $t("refundTickets") }}</span>
        </a>
        
      </Slide>
    </template>
    
    <template v-if="!$route.meta.clientArea">
      
      <AppHeader/>
      
      <router-view class="progress"/>
      
      <AppFooter/>
    
    </template>
    
    <template v-else>
      
      <router-view class="progress"/>
    
    </template>
  </div>
</template>

<script>
  import AppHeader from "./components/AppHeader";
  import AppFooter from "./components/AppFooter";
  import {Slide} from "vue-burger-menu";
  import {isMobile} from "mobile-device-detect";
  import {mapActions} from "vuex";

  export default {
    name: "App",
    components: {
      AppHeader,
      AppFooter,
      Slide,
    },
    data() {
      return {
        detectMobile: isMobile,
      };
    },
    methods: {
      ...mapActions([
        "clearSelectedStations",
        "clearSelectedDates",
        "clearSelectedTrains",
      ]),

      clearStorageOnReload(path) {
        const excludedPath = [
          "/",
          "/tickets",
          "/tickets.html",
          "/my-tickets",
          "/my-tickets.html",
          "/search-tickets",
          "/search-tickets.html",
          "/cart-aircraft",
          "/cart-aircraft.html",
          "/payment",
          "/payment.html",
          "/search-aircraft",
          "/search-aircraft.html",
          "/search-suburban-train",
          "/search-suburban-train.html",
          "/suburban-train",
          "/suburban-train.html",
          "/train-tickets-buy",
          "/train-tickets-buy.html",
          "/train-ticket",
          "/train-ticket.html",
          "/settings",
          "/settings.html",
          "/refund",
          "/UserTickets",
          "/UserTickets.html",
          "/verify",
          "/verify.html",
        ];

        if (path != "/404") {
          this.clearSelectedStations();
          this.clearSelectedDates();
          this.clearSelectedTrains();
          if (!excludedPath.includes(path)) {
            this.$router.replace("/");
          }
        }
      },
    },

    created() {
      window.addEventListener(
        "beforeunload",
        this.clearStorageOnReload(window.location.pathname)
      );
    },
  };
</script>

<style scoped>
  
  a {
    color: white;
  }
  
  a:active {
    color: white;
  }
  
  .router-link {
    color: white;
  }
  
  .progress {
  }
  
  >>> .bm-burger-button {
    /*position: fixed; */
    position: absolute;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    cursor: pointer;
    z-index: 999;
  }
  
  >>> .bm-burger-bars {
    background-color: #373a47;
  }
  
  >>> .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  
  >>> .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  
  >>> .bm-cross {
    background: #bdc3c7;
  }
  
  >>> .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  
  >>> .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    /*background-color: rgb(63, 63, 65); /* Black*/
    background-color: #66b2ff;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }
  
  >>> .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  
  >>> .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }
  
  >>> .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  
  >>> .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }
</style>
