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
</style>
