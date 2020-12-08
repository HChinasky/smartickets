<template>
  <div class="full-container">
    <LeftSidebar/>
    <div class="content">
      <Header :step-back-link="$t('backToSite')" />
      <h1 class="search-tickets__title">{{ $t('settings') }}</h1>
      <svg width="1103" height="1" viewBox="0 0 1103 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="-8.15169e-08" y1="0.5" x2="1103" y2="0.499948" stroke="url(#paint0_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="1" x2="1103" y2="1.00811" gradientUnits="userSpaceOnUse">
            <stop offset="0.0104167" stop-color="#3B76BB" stop-opacity="0"/>
            <stop offset="0.511111" stop-color="#3B76BB"/>
            <stop offset="1" stop-color="#3B76BB" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
        <div class="profile-settings__block">
          <div class="profile_part">
            <div class="block-title">
              <svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="38.5" cy="38.5" r="37" stroke="#2A2A2A" stroke-width="3"/>
                <path d="M37.7595 14.0672C39.5899 14.0672 41.3792 14.6099 42.9012 15.6269C44.4231 16.6438 45.6093 18.0892 46.3098 19.7803C47.0103 21.4714 47.1936 23.3322 46.8365 25.1275C46.4794 26.9227 45.5979 28.5718 44.3036 29.8661C43.0093 31.1604 41.3603 32.0418 39.565 32.3989C37.7697 32.756 35.9089 32.5728 34.2178 31.8723C32.5267 31.1718 31.0813 29.9856 30.0644 28.4637C29.0474 26.9417 28.5047 25.1524 28.5047 23.322C28.5047 20.8674 29.4797 18.5134 31.2153 16.7778C32.9509 15.0422 35.3049 14.0672 37.7595 14.0672ZM37.7595 10.3652C35.1969 10.3652 32.6918 11.1251 30.5611 12.5488C28.4304 13.9725 26.7697 15.9961 25.789 18.3636C24.8083 20.7312 24.5518 23.3363 25.0517 25.8497C25.5516 28.3631 26.7856 30.6717 28.5977 32.4838C30.4097 34.2958 32.7184 35.5298 35.2317 36.0297C37.7451 36.5297 40.3503 36.2731 42.7178 35.2924C45.0853 34.3118 47.1089 32.6511 48.5326 30.5203C49.9563 28.3896 50.7162 25.8846 50.7162 23.322C50.7162 19.8856 49.3511 16.59 46.9213 14.1602C44.4914 11.7303 41.1958 10.3652 37.7595 10.3652Z" fill="#2A2A2A"/>
                <path d="M56.2692 62.192H52.5673V52.9372C52.5673 50.4827 51.5922 48.1287 49.8566 46.3931C48.121 44.6574 45.767 43.6824 43.3125 43.6824H32.2067C29.7522 43.6824 27.3982 44.6574 25.6626 46.3931C23.927 48.1287 22.9519 50.4827 22.9519 52.9372V62.192H19.25V52.9372C19.25 49.5009 20.6151 46.2053 23.0449 43.7754C25.4748 41.3455 28.7704 39.9805 32.2067 39.9805H43.3125C46.7488 39.9805 50.0444 41.3455 52.4743 43.7754C54.9041 46.2053 56.2692 49.5009 56.2692 52.9372V62.192Z" fill="#2A2A2A"/>
              </svg>
              <span>{{ $t('profile') }}</span>
            </div>
            <div class="form-input">
              <label>{{ $t('shortFullName') }}</label>
              <input
                  id="fullName"
                  class="full-name__input"
                  type="text"
              >
            </div>
            <div class="form-input">
              <label>{{ $t('email') }}</label>
              <input
                  id="email"
                  class="email__input"
                  type="text"
              >
            </div>
            <div class="logout">
              <a href="#" class="logout__link">{{ $t('logout') }}</a>
            </div>
          </div>
          <div class="password-part">
            <div class="block-title">
              <svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="38.5" cy="38.5" r="37" stroke="#2A2A2A" stroke-width="3"/>
                <path d="M49.5 31C51.433 31 53 29.433 53 27.5C53 25.567 51.433 24 49.5 24C47.567 24 46 25.567 46 27.5C46 29.433 47.567 31 49.5 31Z" fill="#2A2A2A"/>
                <path d="M15 52.2977V59.9219C15 60.9141 15.8045 61.7188 16.7969 61.7188H24.421C24.8975 61.7188 25.3547 61.5294 25.6916 61.1923L42.0166 44.8659C43.4794 45.3183 44.9643 45.5469 46.4453 45.5469C54.8671 45.5469 61.7188 38.6952 61.7188 30.2734C61.7188 21.8517 54.8671 15 46.4453 15C38.0235 15 31.1719 21.8517 31.1719 30.2734C31.1719 31.755 31.4004 33.2394 31.8527 34.7008L15.5263 51.0272C15.1894 51.3643 15 51.8212 15 52.2977ZM18.5938 53.0422L35.1917 36.4441C35.6968 35.9388 35.8545 35.1827 35.594 34.5177C35.0443 33.1152 34.7656 31.6874 34.7656 30.2734C34.7656 23.8333 40.0051 18.5938 46.4453 18.5938C52.8855 18.5938 58.125 23.8333 58.125 30.2734C58.125 36.7136 52.8855 41.9531 46.4453 41.9531C45.0321 41.9531 43.6032 41.6742 42.1984 41.1244C41.5332 40.8642 40.7774 41.0223 40.2729 41.5273L23.6767 58.125H18.5938V53.0422Z" fill="#2A2A2A"/>
              </svg>
              <span>{{ $t('changePassword') }}</span>
            </div>
            <div class="form-input">
              <label>{{ $t('oldPassword') }}</label>
              <input
                  id="oldPassword"
                  class="old-password__input"
                  type="password"
              >
            </div>
            <div class="form-input">
              <label>{{ $t('newPassword') }}</label>
              <input
                  id="newPassword"
                  class="new-password__input"
                  type="password"
              >
            </div>
            <div class="form-input">
              <label>{{ $t('repeatPassword') }}</label>
              <input
                  id="repeatPassword"
                  class="repeat-password__input"
                  type="password"
              >
            </div>
          </div>
      </div>
      <div class="ts-form__submit">
        <button class="btn btn--black" v-promise-btn>
          {{ $t('saveSettingsBtn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftSidebar from "../../components/clientArea/LeftSidebar";
  import Header from "../../components/clientArea/Header";
  export default {
    name: "ProfileSettings",
    components: {
      LeftSidebar,
      Header
    }
  }
</script>

<style lang="scss" scoped>
  .full-container {
    .content {
      .search-tickets__title {
        font-weight: 500;
        font-size: 42px;
        color: #2A2A2A;
        text-align: center;
        margin-bottom: 0;
      }
      .block-title {
        display: flex;
        align-items: center;
        margin-bottom: 45px;
        span {
          font-size: 30px;
          font-weight: normal;
          margin-left: 20px;
          color: #2A2A2A;
        }
      }
      .profile-settings__block {
        display: flex;
        justify-content: space-between;
        margin-top: 65px;
        .profile_part {
          width: 510px;
          position: relative;
          &:after {
            content: '';
            width: 1px;
            height: 100%;
            position: absolute;
            background-color: #8E8E8E;
            top: 0;
            right: -50px;
          }
          .form-input {
            display: flex;
            flex-direction: column;
            margin-bottom: 55px;
            label {
              font-weight: 100;
              font-size: 22px;
              color: #6E6E6E;
              position: relative;
              &:after {
                content: '';
              }
            }
            input {
              border-left: none;
              border-right: none;
              border-top: none;
              border-bottom: 3px solid #000000;
              outline: none;
              background-image: url(../../assets/img/svg/edit-icon.svg);
              background-repeat: no-repeat;
              background-position: right 30px center;
              height: 65px;
              background-color: transparent;
              font-size: 26px;
              padding-right: 80px;
            }
          }
          .logout {
            margin-top: 110px;
            height: 60px;
            .logout__link {
              position: relative;
              display: flex;
              align-items: center;
              padding-left: 80px;
              font-size: 25px;
              color: #66B2FF;
              text-decoration: none;
              &:after {
                content: '';
                position: absolute;
                left: 0;
                background-image: url(../../assets/img/svg/exit-icon.svg);
                background-repeat: no-repeat;
                width: 75px;
                height: 60px;
                background-size: contain;
              }
            }
          }
        }
        .password-part {
          width: 510px;
          .form-input {
            display: flex;
            flex-direction: column;
            margin-bottom: 55px;
            label {
              font-weight: 100;
              font-size: 22px;
              color: #6E6E6E;
              position: relative;
              &:after {
                content: '';
              }
            }
            input {
              border-left: none;
              border-right: none;
              border-top: none;
              border-bottom: 3px solid #000000;
              outline: none;
              height: 65px;
              background-color: transparent;
              font-size: 42px;
              padding-right: 80px;
            }
          }
        }
      }
      .ts-form__submit {
        margin-top: 65px;
        .btn--black {
          width: 285px;
          height: 95px;
          padding: 0;
          border-radius: 45px;
        }
      }
    }
  }
</style>
