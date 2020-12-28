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
                <use
                    :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-modal'"
                />
              </svg>
              Кошик
            </div>
    
            <template slot="popover">
              <div class="header-cart__wrap">
                <div class="header-cart-title__block">
                  <h4 class="header-wrap__title">Вибрані квитки</h4>
                  <img src="@/assets/img/svg/bottom-line.svg"/>
                </div>
                <div class="header-cart-tickets__list">
                  <div class="header-cart-ticket__item">
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
                    <div class="header-cart-ticket__remove">
                      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-remove'"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="header-cart-ticket__item">
                    <div class="header-cart-ticket__logo">
                      <svg  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-train'"
                        />
                      </svg>
                      <span class="train__label">Поїзд</span>
                    </div>
                    <div class="header-cart-ticket__remove">
                      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use
                            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-remove'"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="header-cart-additional-transport__list">
                    <div class="header-cart-additional-transport__item">
                      <div class="header-cart-additional-transport__logo">
                        <span class="header-cart-additional-transport__plus">+</span>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use
                              :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cart-metro'"
                          />
                        </svg>
                        <span class="header-cart-additional-transport__label">Метро</span>
                      </div>
                    </div>
                  </div>
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
  import LocaleSwitcher from "./LocaleSwitcher";
  import AuthorizationBtn from "./clientArea/SignUpForm";
  import SignInForm from "./clientArea/SignInForm";

  export default {
    name: "AppHeader",
    components: {
      LocaleSwitcher,
      AuthorizationBtn,
      SignInForm,
    },
    data() {
      return {
        time: {
          hours: 12,
          minutes: 30
        },
      }
    }
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
  .header-cart__block {
    display: flex;
    align-items: center;
    margin-right: 63px;
    color: #fff;
    cursor: pointer;
    svg {
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
</style>
