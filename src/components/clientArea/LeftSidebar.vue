<template>
  <div class="left-sidebar">
      <div class="profile-info">
        <div class="sidebar-wrapper">
          <template v-if="!detectMobile">
            <LocaleSwitcher />
          </template>
          <template v-else>
            <div class="mobile-header">
              <div class="back-to-site__block">
                <a v-back class="back-to-site__link">
                  <svg
                      width="36"
                      height="23"
                      viewBox="0 0 36 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M36 11.5L2 11.5M2 11.5L13.4815 22M2 11.5L13.4815 0.999998"
                        stroke="#3398ff"
                        stroke-width="2"
                    />
                  </svg>
                  {{ $t('backToSite') }}
                </a>
              </div>
              <LocaleSwitcher />
              <div class="logo-block">
                <svg data-v-bb50a5e4="" viewBox="0 0 108 52"><use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-logo'" /></svg>
              </div>
            </div>
          </template>
          <div class="frame-image">
            <img src="@/assets/img/svg/profile-no-photo.svg" alt="Іванов Іван Іванович">
          </div>
          <span class="separate-line"></span>
          <h5 class="fullName">Іванов Іван Іванович</h5>
        </div>
      </div>
      <nav class="sidebar-nav">
        <ul class="sidebar-nav__list">
          <li class="sidebar-nav__item">
            <router-link  active-class="active" :to="{ name: 'myTickets' }" class="sidebar-nav__link">{{ $t('myTickets') }}</router-link>
          </li>
          <li class="sidebar-nav__item">
            <router-link active-class="active" :to="{ name: 'SearchTickets' }" class="sidebar-nav__link">{{ $t('ticketSearch') }}</router-link>
          </li>
          <li class="sidebar-nav__item">
            <router-link active-class="active" :to="{ name: 'ProfileSettings' }" class="sidebar-nav__link">{{ $t('settings') }}</router-link>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script>
  import { isMobile } from "mobile-device-detect";
  import LocaleSwitcher from "../LocaleSwitcher";
  export default {
    name: "LeftSidebar",
    components: {
      LocaleSwitcher
    },
    data() {
      return {
        detectMobile: isMobile,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .full-container {
    .left-sidebar {
      @include respond-until(s) {
        width: 100%;
      }
      .profile-info {
        @include respond-until(s) {
          padding-top: 10px;
          height: 50vh;
        }
        .sidebar-wrapper {
          @include respond-until(s) {
            width: 100%;
            padding: 0 15px;
          }
          .mobile-header {
            display: flex;
            .back-to-site__block {
              width: 35%;
              display: flex;
              a {
                font-size: 17px;
                display: flex;
              svg {
                width: 20px;
                margin-right: 15px;
              }
              }
            }
            .header__lang-switch {
              width: 30%;
              display: flex;
              justify-content:center;
              ::v-deep .header__lang-link {
                color: $SECOND_FONT_COLOR;
                text-transform: uppercase;
                svg {
                  fill: $SECOND_FONT_COLOR;
                }
              }
            }
            .logo-block {
              width: 35%;
              display: flex;
              justify-content: flex-end;
              svg {
                width: 100px;
              }
            }
          }
          .frame-image {
            @include respond-until(s) {
              margin-top: 40px;
            }
            img {
              @include respond-until(s) {
                width: 110px;
              }
            }
          }
          .header__lang-switch {
            display: block;
            width: 100%;
            .header__lang-link {
              color: $SECOND_FONT_COLOR;
              display: inline-flex;
              font-size: 2rem;
              transition: all .3s;
              svg {
                fill: $SECOND_FONT_COLOR;
                display: inline-flex;
                transition: all .3s;
              }
              &:hover {
                color: $FONT_COLOR;
                svg {
                  fill: $FONT_COLOR;
                }
              }
            }
          }
          .fullName {
            @include respond-until(s) {
              font-size: 26px;
              text-align: center;
            }
          }
        }
      }
      .sidebar-nav {
        @include respond-until(s) {
          height: 50vh;
        }
        .sidebar-nav__list {
          .sidebar-nav__item {
            @include respond-until(s) {
              width: 290px;
              height: 65px;
              border-radius: 15px;
              background-position-x: 60px;
              background-size: 3px 85%;
            }
            .sidebar-nav__link {
              
              @include respond-until(s) {
                font-size: 22px;
                padding: 25px 0 25px 80px;
              }
            }
            &:before {
              @include respond-until(s) {
                width: 30px;
                height: 30px;
                left: 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
