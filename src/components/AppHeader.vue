<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <div class="header__brand site-brand">
          <router-link to="/" class="site-brand__link" />
          
          <div class="site-brand__desc">
            {{ $t("mainTitle1") }}
            <br />
            {{ $t("mainTitle2") }}
          </div>
        </div>


      </div>
      
      <div class="header__bot">
        <nav class="header__nav header-nav">
          <ul class="header-nav__list">
            <li class="header-nav__item">
              <router-link to="/" class="header-nav__link">{{
                $t("ticketSearch")
                }}</router-link>
            </li>
            <li class="header-nav__item">
              <a href="/static/pub_oferta.pdf" class="header-nav__link">{{
                $t("offer")
                }}</a>
            </li>
            
            <li class="header-nav__item">
              <router-link :to="{ name: 'refund' }" class="header-nav__link">{{
                $t("refundTickets")
                }}</router-link>
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
        </nav>
        
        <div class="header__socials">
          <v-popover
              popoverClass="header-cart"
              placement="bottom-left"
          >
            <div class="header-cart__block">
              <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.2307 8.74202H25.3003L21.2215 1.03782C21.0014 0.622126 20.4861 0.463537 20.0703 0.68362C19.6546 0.903703 19.496 1.41916 19.7161 1.83485L23.3729 8.74202H7.33745L10.9943 1.83485C11.2144 1.41916 11.0558 0.903703 10.6401 0.68362C10.2245 0.463594 9.70896 0.622126 9.48888 1.03782L5.41002 8.74202H2.48461C1.58753 8.74202 0.857666 9.47189 0.857666 10.369V12.261C0.857666 13.1203 1.52745 13.8257 2.37241 13.8836L5.22974 25.7631C5.32178 26.1459 5.66417 26.4156 6.05783 26.4156H24.6519C25.0454 26.4156 25.3876 26.1461 25.4799 25.7636L28.3439 13.8835C29.1884 13.8251 29.8577 13.1199 29.8577 12.261V10.369C29.8577 9.47189 29.1279 8.74202 28.2307 8.74202ZM2.56109 10.4455H28.1542V12.1844H2.56109V10.4455ZM25.4918 18.4456H21.7628L22.3319 13.8879H26.5906L25.4918 18.4456ZM16.2105 24.7122V20.149H19.8334L19.2637 24.7122H16.2105ZM11.4538 24.7122L10.8835 20.149H14.5071V24.7122H11.4538ZM4.12546 13.8879H8.38449L8.95406 18.4456H5.22173L4.12546 13.8879ZM10.1011 13.8879H14.5071V18.4456H10.6707L10.1011 13.8879ZM16.2105 18.4456V13.8879H20.6152L20.0461 18.4456H16.2105ZM5.63141 20.149H9.16687L9.73712 24.7122H6.72898L5.63141 20.149ZM23.9811 24.7122H20.9804L21.5501 20.149H25.0811L23.9811 24.7122Z" fill="white"/>
              </svg>
              {{ $t('cart') }}
            </div>
    
            <template slot="popover">
              <div class="header-cart__wrap">
                <div class="header-cart-title__block">
                  <h4 class="header-wrap__title">{{ $t('selectedTickets') }}</h4>
                  <img src="@/assets/img/svg/bottom-line.svg"/>
                </div>
                <div class="header-cart-tickets__list" v-if="getTicketsFromCart.length !== 0">
                  <div class="header-cart-ticket__item" v-if="getTicketsFromCart.find(e => e.type == 'SkyUp')">
                    <div class="header-cart-ticket__logo">
                      <svg width="33" height="34" viewBox="0 0 33 34">
                        <use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-aircraft'" />
                      </svg>
                      <svg width="116" height="22" viewBox="0 0 116 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-skyup'"
                        />
                      </svg>
                    </div>
                    <div class="header-cart-ticket__remove" @click="removeTicket('SkyUp')">
                      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-remove'"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="header-cart-ticket__item" v-if="getTicketsFromCart.find(e => e.type == 'Train')">
                    <div class="header-cart-ticket__logo">
                      <svg  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-train'"
                        />
                      </svg>
                      <span class="train__label">{{ $t('train') }}</span>
                    </div>
                    <div class="header-cart-ticket__remove" @click="removeTicket('Train')">
                      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-remove'"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="header-cart-additional-transport__list" v-if="getIsMetroActive">
                    <div class="header-cart-additional-transport__item">
                      <div class="header-cart-additional-transport__logo">
                        <span class="header-cart-additional-transport__plus">+</span>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use
                              :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-metro'"
                          />
                        </svg>
                        <span class="header-cart-additional-transport__label">{{ $t('metroLabel') }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="header-cart-registration__block">
                    <router-link
                        :to="{ name: 'GeneralCart' }"
                        class="header-cart-registration__link"
                        v-if="getTicketsFromCart.every((item) => item.selectSeat === true)"
                    >
                      {{ $t('goRegistrationTicket') }}
                    </router-link>
                    <span class="header-cart-no-registration" v-else>
                      {{ $t('noRegistrationLabel') }}
                    </span>
                  </div>
                </div>
                <div class="header-cart-tickets__list" v-else>
                  <p class="header-cart-empty__text">{{ $t('emptyCart') }}</p>
                </div>
              </div>
            </template>
          </v-popover>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
    <AuthorizationBtn />
    <SignInForm />
  </header>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import LocaleSwitcher from "./LocaleSwitcher";
  import AuthorizationBtn from "./clientArea/SignUpForm";
  import SignInForm from "./clientArea/SignInForm";
  
  export default {
    name: "AppHeader",
    components: {
      LocaleSwitcher,
      AuthorizationBtn,
      SignInForm
    },
    data() {
      return {
        time: {
          hours: 12,
          minutes: 30
        },
      }
    },
    computed: {
      ...mapGetters([
        "getResultId",
        "getCart",
        "getIsMetroActive",
        "getTicketsFromCart"
      ]),
    },
    methods: {
      ...mapMutations(["removeTicketRow"]),
      ...mapActions(["clearResultId", "clearCart"]),
      removeTicket(type) {
        if(type == "SkyUp") {
          this.clearResultId()
        } else {
          this.clearCart()
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
  
  .site-brand__link {
    background-image: url("../assets/img/svg/logo-smartticket.svg");
    background-position: left 0px center;
    background-repeat: no-repeat;
    display: block;
    width: 300px;
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
    display: flex;
    align-items: center;
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
  .v-popover {
    &.open {
      .header-cart__block {
        display: flex;
        align-items: center;
        margin-right: 63px;
        color: #fff;
        cursor: pointer;
        svg {
          path {
            fill: #fff;
          }
          margin-right: 11px;
        }
      }
    }
  }
  .header-cart__block {
    display: flex;
    align-items: center;
    margin-right: 63px;
    color: #000;
    cursor: pointer;
    &:hover {
      color: #fff;
      svg {
        path {
          fill: #fff;
        }
      }
    }
    svg {
      path {
        fill: #000;
      }
      fill: #000;
      margin-right: 11px;
    }
  }
  .header-cart__wrap {
    width: 457px;
  }
  .header-cart-ticket__item {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 15px;
    border: 1px dashed $BORDER_BOTTOM_LINK_COLOR;
    border-radius: 5px;
    .header-cart-ticket__logo {
      display: flex;
      align-items: center;
      .train__label {
        font-weight: 300;
        font-size: 16px;
      }
      svg {
        margin-right: 15px;
      }
    }
    .header-cart-ticket__remove {
      margin-top: 15px;
      cursor: pointer;
    }
  }
  .header-cart-title__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    .header-wrap__title {
      font-weight: 500;
      font-size: 22px;
      color: #000;
      margin: 0 0 5px;
    }
  }
  
  .header-cart-additional-transport__item {
    margin-left: 45px;
    .header-cart-additional-transport__logo {
      display: flex;
      align-items: flex-start;
      svg {
        margin: 0 5px;
      }
    }
  }
  .header-cart-empty__text {
    font-size: 18px;
    font-weight: 300;
    text-align: center;
  }
  .header-cart-registration__block {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .header-cart-registration__link {
      color: $LINK_COLOR;
      text-decoration: none;
      transition: all .3s;
      &:hover {
        color: $SECOND_FONT_COLOR;
      }
    }
  }
  .header-cart-no-registration {
    color: $LABEL_COLOR;
    font-size: 12px;
    font-weight: 100;
  }
</style>
