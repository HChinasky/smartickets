<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <div class="header__brand site-brand">
          <router-link to="/">
            <div class="site-brand__logo">
              <svg viewBox="0 0 108 52">
                <use
                    :xlink:href="
                    require('@/assets/img/sprite.svg') + '#icon-logo'
                  "
                />
              </svg>
            </div>
          </router-link>
          
          <div class="site-brand__desc">
            {{ $t("mainTitle1") }}
            <br />
            {{ $t("mainTitle2") }}
          </div>
        </div>
        
        <nav class="header__top-nav top-nav">
          <!--
          <ul class="top-nav__list">
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">Довідка</a>
            </li>
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">Кабінет</a>
            </li>
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">Контакти</a>
            </li>
          </ul>
          -->
        </nav>
        
        <!--
        <button class="hamburger">
          <span class="hamburger__s"></span>
          <span class="hamburger__s"></span>
          <span class="hamburger__s"></span>
        </button>
        -->
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
          <span class="sign-in__btn" @click="$modal.show('signUpForm')">Login</span>
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
  };
</script>

<style lang="scss" scoped>
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
</style>
