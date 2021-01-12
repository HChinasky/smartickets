<template>
  <header class="header">
    <div class="container">
      <div class="d-flex flex-wrap">
        <div class="header__left">
          <div class="header__brand site-brand">
            <router-link to="/" class="site-brand__link"/>
          </div>
        
        
        </div>
        
        <div class="header__right">
          <nav class="header__nav header-nav d-flex justify-content-between w-100">
            <ul class="header-nav__list">
              <li class="header-nav__item">
                <router-link to="/" class="header-nav__link">{{
                  $t("ticketSearch")
                  }}
                </router-link>
              </li>
              <li class="header-nav__item">
                <a href="/static/pub_oferta.pdf" class="header-nav__link">{{
                  $t("offer")
                  }}</a>
              </li>
              
              <li class="header-nav__item">
                <router-link :to="{ name: 'refund' }" class="header-nav__link">{{
                  $t("refundTickets")
                  }}
                </router-link>
              </li>
              <li class="header-nav__item">
                <a
                    class="header-nav__link"
                    href="https://about.smartticket.gov.ua/"
                    target="_blank"
                >{{ $t("about") }}</a
                >
              </li>
            </ul>
            <div class="d-flex">
              <div class="header-cart__block">
                <span class="count-trips" v-if="getTicketsFromCart.length !== 0">{{getTicketsFromCart.length}}</span>
                <icon-base icon-name="cart" :height="27" :width="29"><icon-cart/></icon-base>
    
                {{ $t('cart') }}
              </div>
  
              <LocaleSwitcher/>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <AuthorizationBtn/>
    <SignInForm/>
  </header>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from "vuex";
  import LocaleSwitcher from "./LocaleSwitcher";
  import AuthorizationBtn from "./clientArea/SignUpForm";
  import SignInForm from "./clientArea/SignInForm";
  import IconBase from "./icons/IconBase";
  import IconCart from "./icons/iconsItem/IconCart";

  export default {
    name: "AppHeader",
    components: {
      LocaleSwitcher,
      AuthorizationBtn,
      SignInForm,
      IconBase,
      IconCart
    },
    computed: {
      ...mapGetters([
        "getResultId",
        "getCart",
        "getIsMetroActive",
        "getTicketsFromCart"
      ]),
      getRoutingName() {
        if (this.$router.currentRoute.name === "GeneralCart") {
          if (this.getCart.length !== 0) {
            return "cart"
          }
        } else if (this.$router.currentRoute.name === "cart" || this.$router.currentRoute.name === "CartAircraft") {
          return "Home"
        }
        return false
      }
    },
    methods: {
      ...mapMutations(["removeTicketRow"]),
      ...mapActions(["clearResultId", "clearCart", "resetStateCartAircraft"]),
      removeTicket(type) {
        if (type == "SkyUp") {
          this.clearResultId()
          this.resetStateCartAircraft()
          this.$router.push({
            name: this.getRoutingName
          }).catch(() => {
          });
        } else {
          this.clearCart()
          this.$router.push({
            name: this.getRoutingName
          }).catch(() => {
          });
        }
        this.removeTicketRow(type)
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  @import "@/assets/scss/grid-mixins";
  @import "@/assets/scss/grid-classes";
  
  .header {
    padding-top: 45px;
  }
  .header__left, .header__right {
    height: 145px;
    display: flex;
    align-items: center;
  }
  .header__left {
    width: 25%;
  }
  .header__right {
    width: 75%;
  }
  .header-nav__link {
    outline: none;
    &:hover {
      color: $DARK_BLUE;
    }
    &.router-link-exact-active {
      font-weight: 800;
      color: $DARK_BLUE;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        left: 2px;
        bottom: -3px;
        width: 21px;
        border-bottom: 3px dotted $DARK_BLUE;
      }
    }
  }
  .site-brand__link {
    background-image: url("../assets/img/svg/logo-smartticket.svg");
    background-position: left 0px center;
    background-repeat: no-repeat;
    display: block;
    width: 255px;
    height: 75px;
    background-size: contain;
    @include respond-until(xs) {
      background-repeat: no-repeat;
      display: block;
      width: 280px;
      height: 65px;
    }
  }
  
  .header__socials {
    
    .header__lang-switch {
      /*margin-bottom: 0;*/
    }
    
    .sign-in__btn {
      display: block;
      margin-right: 60px;
      cursor: pointer;
      
      &:hover {
        color: #fff;
      }
    }
  }
  .header-cart__block {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 800;
    margin-right: 15px;
    color: $DARK_BLUE;
    cursor: pointer;
    transition: all .3s;
    svg {
      margin-right: 5px;
      g {
        transition: all .3s;
      }
    }
    &:hover {
      color: $LIGHT_BLUE;
      svg {
        g {
          fill: $LIGHT_BLUE!important;
        }
      }
    }
    .count-trips {
      position: absolute;
      z-index: 9;
      top: -5px;
      left: 6px;
      color: #fff;
      width: 18px;
      height: 18px;
      font-size: 12px;
      text-align: center;
      padding-top: 1px;
      background-color: $DANGER_COLOR;
      border-radius: 50%;
    }
  }
  
</style>
