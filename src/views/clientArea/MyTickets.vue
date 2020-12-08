<template>
  <div>
    <div class="full-container">
      <LeftSidebar />
      <div class="content">
        <Header step-back-link="Назад до сайту" v-if="!detectMobile" />
        <div class="tickets-content">
          <h1 class="tickets__title">{{ $t('myTickets') }}</h1>
          <template v-if="!detectMobile">
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
          </template>
          <template v-else>
            <svg width="424" height="1" viewBox="0 0 424 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="424" y2="0.5" stroke="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="1" x2="424" y2="1.00123" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0104167" stop-color="#3B76BB" stop-opacity="0"/>
                  <stop offset="0.511111" stop-color="#3B76BB"/>
                  <stop offset="1" stop-color="#3B76BB" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </template>
          <h4 class="tickets__subtitle" v-html="$t('myTicketsSubtitle')"></h4>
          <div class="tickets-carousel">
            <swiper class="swiper" :options="swiperOption">
              <div class="parallax-bg" slot="parallax-bg"></div>
              <swiper-slide>
                <div class="fix-padding">
                  <div class="departure-arrival-block">
                    <div class="departure-block">
                      <h4 class="city__departure">Київ</h4>
                      <p class="date-departure__label">{{ $t('departureDate') }}: <span class="color-blue">11/10/2020</span></p>
                      <p class="time-departure__label">{{ $t('comebackDate') }}: <span class="color-red">15:30</span></p>
                    </div>
                    <div class="travel-time">
<!--                      <svg width="42" height="61" viewBox="0 0 42 61" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <path d="M15.1145 20.5865C15.186 20.7652 15.3095 20.9184 15.4689 21.0264C15.6283 21.1343 15.8164 21.192 16.0089 21.192H25.6414C25.834 21.192 26.0221 21.1343 26.1815 21.0264C26.3409 20.9184 26.4643 20.7652 26.5358 20.5865L28.4623 15.7702C28.5208 15.624 28.5425 15.4658 28.5257 15.3093C28.5088 15.1528 28.4539 15.0028 28.3656 14.8724C28.2773 14.7421 28.1585 14.6353 28.0194 14.5616C27.8804 14.4878 27.7254 14.4492 27.568 14.4492H14.0824C13.925 14.4492 13.77 14.4878 13.6309 14.5616C13.4919 14.6353 13.373 14.7421 13.2848 14.8724C13.1965 15.0028 13.1415 15.1528 13.1247 15.3093C13.1078 15.4658 13.1296 15.624 13.188 15.7702L15.1145 20.5865ZM26.1452 16.3757L24.9893 19.2655H16.661L15.5051 16.3757H26.1452Z" fill="#2A2A2A"/>-->
<!--                        <path d="M40.8497 59.1308L35.317 52.0159H35.7553C36.6129 52.0117 37.4405 51.6998 38.0876 51.137C38.7474 50.5674 39.1267 49.8342 39.1267 49.1262V14.4491C39.1267 12.2167 37.7083 10.596 35.7553 10.596H28.1624L26.5032 7.27523C26.423 7.11529 26.2999 6.98081 26.1477 6.88683C25.9954 6.79284 25.82 6.74305 25.6411 6.74303H24.3094L26.5032 2.35782C26.5598 2.2446 26.5936 2.12135 26.6026 1.99509C26.6115 1.86883 26.5956 1.74204 26.5555 1.62196C26.5155 1.50188 26.4522 1.39086 26.3693 1.29523C26.2863 1.19961 26.1854 1.12126 26.0722 1.06465C25.959 1.00804 25.8357 0.974289 25.7094 0.965316C25.5832 0.956343 25.4564 0.972327 25.3363 1.01235C25.2162 1.05238 25.1052 1.11567 25.0096 1.1986C24.914 1.28154 24.8356 1.38249 24.779 1.49571L22.1565 6.74303H19.4932L16.8707 1.49571C16.8141 1.38249 16.7357 1.28154 16.6401 1.1986C16.5445 1.11567 16.4335 1.05238 16.3134 1.01235C16.0709 0.931515 15.8062 0.950327 15.5775 1.06465C15.3489 1.17897 15.175 1.37944 15.0942 1.62196C15.0133 1.86448 15.0321 2.12917 15.1465 2.35782L17.3403 6.74303H16.0086C15.8297 6.74305 15.6543 6.79284 15.502 6.88683C15.3498 6.98081 15.2267 7.11529 15.1465 7.27523L13.4873 10.596H5.89442C3.94143 10.596 2.52304 12.2167 2.52304 14.4491V49.1262C2.52304 49.8342 2.90232 50.5674 3.56215 51.137C4.20923 51.6998 5.03682 52.0117 5.89442 52.0159H6.3327L0.800018 59.1308C0.717156 59.23 0.655121 59.3449 0.617609 59.4686C0.580097 59.5924 0.567875 59.7224 0.581673 59.8509C0.595471 59.9795 0.635005 60.1039 0.69792 60.2169C0.760835 60.3298 0.845843 60.4289 0.947878 60.5083C1.04991 60.5877 1.16689 60.6458 1.29183 60.679C1.41677 60.7122 1.54713 60.72 1.67512 60.7018C1.80312 60.6836 1.92614 60.6398 2.03686 60.573C2.14757 60.5062 2.24371 60.4179 2.31955 60.3132L4.2894 57.781C4.34231 57.7901 4.39586 57.7949 4.44954 57.7955H37.2002C37.2538 57.7949 37.3074 57.7901 37.3603 57.781L39.3302 60.3132C39.4902 60.5049 39.7185 60.6269 39.9668 60.6536C40.2151 60.6802 40.464 60.6094 40.6611 60.456C40.8582 60.3027 40.988 60.0787 41.0232 59.8315C41.0584 59.5843 40.9962 59.333 40.8497 59.1308ZM16.6034 8.66954H25.0463L26.0096 10.596H15.6401L16.6034 8.66954ZM4.44954 14.4491C4.44954 13.2787 5.01666 12.5225 5.89442 12.5225H35.7553C36.633 12.5225 37.2002 13.2787 37.2002 14.4491V23.1183H4.44954V14.4491ZM4.44954 25.0448H37.2002V35.6406H4.44954V25.0448ZM5.89442 50.0894C5.03352 50.0894 4.44954 49.3658 4.44954 49.1262V37.5671H37.2002V49.1262C37.2002 49.3658 36.6162 50.0894 35.7553 50.0894H28.3623L26.4659 40.2739C26.4236 40.0543 26.3061 39.8562 26.1336 39.7138C25.9611 39.5715 25.7444 39.4936 25.5207 39.4936H15.8882C15.6625 39.4934 15.444 39.5726 15.2708 39.7172C15.0976 39.8618 14.9807 40.0627 14.9406 40.2847L13.1574 50.0894H5.89442ZM32.8764 52.0159L33.6253 52.9792H8.02442L8.77335 52.0159H32.8764ZM15.1164 50.0894L16.6925 41.4202H24.726L26.4009 50.0894H15.1164ZM5.77643 55.8689L6.52656 54.9057H35.1231L35.8733 55.8689H5.77643Z" fill="#2A2A2A"/>-->
<!--                        <path d="M9.26672 42.3838C8.69517 42.3838 8.13647 42.5533 7.66125 42.8708C7.18603 43.1883 6.81564 43.6397 6.59692 44.1677C6.37821 44.6957 6.32098 45.2768 6.43248 45.8373C6.54398 46.3979 6.81921 46.9128 7.22335 47.3169C7.62749 47.7211 8.14239 47.9963 8.70295 48.1078C9.26351 48.2193 9.84454 48.1621 10.3726 47.9433C10.9006 47.7246 11.3519 47.3542 11.6695 46.879C11.987 46.4038 12.1565 45.8451 12.1565 45.2736C12.1556 44.5074 11.8508 43.7729 11.3091 43.2312C10.7674 42.6894 10.0329 42.3847 9.26672 42.3838ZM9.26672 46.2368C9.0762 46.2368 8.88997 46.1803 8.73156 46.0745C8.57315 45.9686 8.44969 45.8182 8.37678 45.6422C8.30388 45.4662 8.2848 45.2725 8.32197 45.0856C8.35914 44.8988 8.45088 44.7271 8.58559 44.5924C8.7203 44.4577 8.89194 44.366 9.07879 44.3288C9.26565 44.2916 9.45932 44.3107 9.63534 44.3836C9.81135 44.4565 9.96179 44.58 10.0676 44.7384C10.1735 44.8968 10.23 45.083 10.23 45.2736C10.2297 45.5289 10.1281 45.7738 9.94752 45.9544C9.76694 46.1349 9.5221 46.2365 9.26672 46.2368Z" fill="#2A2A2A"/>-->
<!--                        <path d="M32.3839 48.1633C32.9554 48.1633 33.5141 47.9938 33.9894 47.6763C34.4646 47.3588 34.835 46.9074 35.0537 46.3794C35.2724 45.8514 35.3296 45.2703 35.2181 44.7098C35.1066 44.1492 34.8314 43.6343 34.4273 43.2302C34.0231 42.826 33.5082 42.5508 32.9477 42.4393C32.3871 42.3278 31.8061 42.385 31.278 42.6038C30.75 42.8225 30.2987 43.1929 29.9812 43.6681C29.6636 44.1433 29.4941 44.702 29.4941 45.2736C29.495 46.0397 29.7998 46.7742 30.3415 47.3159C30.8833 47.8577 31.6178 48.1624 32.3839 48.1633ZM32.3839 44.3103C32.5744 44.3103 32.7607 44.3668 32.9191 44.4726C33.0775 44.5785 33.2009 44.7289 33.2738 44.9049C33.3467 45.0809 33.3658 45.2746 33.3286 45.4615C33.2915 45.6483 33.1997 45.82 33.065 45.9547C32.9303 46.0894 32.7587 46.1811 32.5718 46.2183C32.385 46.2555 32.1913 46.2364 32.0153 46.1635C31.8393 46.0906 31.6888 45.9671 31.583 45.8087C31.4771 45.6503 31.4206 45.4641 31.4206 45.2736C31.4209 45.0182 31.5225 44.7733 31.7031 44.5927C31.8837 44.4122 32.1285 44.3106 32.3839 44.3103Z" fill="#2A2A2A"/>-->
<!--                      </svg>-->
                      <p class="travel-time__label">7 {{ $t('hour') }}. <br v-if="!detectMobile"> 48 {{ $t('min') }}.</p>
                    </div>
                    <div class="arrival-block">
                      <h4 class="city__departure">Львів</h4>
                      <p class="date-departure__label">{{ $t('dateOfArrival') }}: <span class="color-blue">11/10/2020</span></p>
                      <p class="time-departure__label">{{ $t('arrivalTime') }}: <span class="color-red">15:30</span></p>
                    </div>
                  </div>
                  <div class="ticket-action">
                    <span class="print__action" v-if="!detectMobile">>
                      
                      {{ $t('ticketPrint') }}
                    </span>
                    <span class="send__action">
                      

                      {{ $t('ticketSend') }}
                    </span>
                    <span class="ticket-return__action">

                      <span v-html="$t('ticketRefund')"></span>
                    </span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="fix-padding">
                  <div class="departure-arrival-block">
                    <div class="departure-block">
                      <h4 class="city__departure">Ужгород</h4>
                      <p class="date-departure__label">{{ $t('departureDate') }}: <span class="color-blue">02/12/2020</span></p>
                      <p class="time-departure__label">{{ $t('departureTime') }}: <span class="color-red">12:30</span></p>
                    </div>
                    <div class="travel-time">
                      
        
                      <p class="travel-time__label">5 {{ $t('hour') }}. <br v-if="!detectMobile"> 21 {{ $t('min') }}.</p>
                    </div>
                    <div class="arrival-block">
                      <h4 class="city__departure">Лисичанськ</h4>
                      <p class="date-departure__label">{{ $t('dateOfArrival') }}: <span class="color-blue">12/10/2020</span></p>
                      <p class="time-departure__label">{{ $t('arrivalTime') }}: <span class="color-red">16:30</span></p>
                    </div>
                  </div>
                  <div class="ticket-action">
                    <span class="print__action" v-if="!detectMobile">
                      
                      {{ $t('ticketPrint') }}
                    </span>
                    <span class="send__action">
                      

                      {{ $t('ticketSend') }}
                    </span>
                    <span class="ticket-return__action">


                      {{ $t('ticketRefund') }}
                    </span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="fix-padding">
                  <div class="departure-arrival-block">
                    <div class="departure-block">
                      <h4 class="city__departure">Маріуполь</h4>
                      <p class="date-departure__label">{{ $t('departureDate') }}: <span class="color-blue">14/10/2020</span></p>
                      <p class="time-departure__label">{{ $t('departureTime') }}: <span class="color-red">17:10</span></p>
                    </div>
                    <div class="travel-time">
                      
                      <p class="travel-time__label">10 {{ $t('hour') }}. <br  v-if="!detectMobile"> 32 {{ $t('min') }}.</p>
                    </div>
                    <div class="arrival-block">
                      <h4 class="city__departure">Львів</h4>
                      <p class="date-departure__label">{{ $t('dateOfArrival') }}: <span class="color-blue">15/10/2020</span></p>
                      <p class="time-departure__label">{{ $t('arrivalTime') }}: <span class="color-red">12:30</span></p>
                    </div>
                  </div>
                  <div class="ticket-action">
                    <span class="print__action" v-if="!detectMobile">>
                      
                      {{ $t('ticketPrint') }}
                    </span>
                    <span class="send__action">
                      

                      {{ $t('ticketSend') }}
                    </span>
                    <span class="ticket-return__action">


                      {{ $t('ticketRefund') }}
                    </span>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev btn-nav" slot="button-prev"></div>
              <div class="swiper-button-next btn-nav" slot="button-next"></div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isMobile } from "mobile-device-detect";
  import LeftSidebar from "../../components/clientArea/LeftSidebar"
  import Header from "../../components/clientArea/Header"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  
  export default {
    name: "MyTickets",
    
    components: {
      LeftSidebar,
      Header,
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        detectMobile: isMobile,
        swiperOption: {
          effect: 'flip',
          grabCursor: true,
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: {
              width: 280
            },
            460: {
              width: 380
            },
            1024: {
              width: 980
            }
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .full-container {
    .content {
      @include respond-until(s) {
        padding: 0;
        width: 100%;
      }
      .tickets-content {
        min-width: 320px;
        @include respond-until(s) {
          margin-top: 20px;
          padding: 0 15px;
          width: 100%;
        }
        > svg {
          @include respond-until(s) {
            width: 100%;
          }
        }
        .parallax-bg {
          position: absolute;
          left: 15px;
          top: 20px;
          width: 100%;
          height: 100%;
          background: #fff;
          box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
          border-radius: 10px
        }
        .tickets-carousel {
          width: 100%;
          padding: 0 75px;
          margin-top: 80px;
          @include respond-until(s) {
            margin-top: 20px;
            padding: 0 25px;
          }
          .swiper {
            height: 420px;
            width: 100%;
            @include respond-until(s) {
              height: 680px;
            }
            .swiper-slide {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-weight: bold;
              font-size: 16px;
              background-color: #fff;
              box-shadow: 0px 0px 30px rgba(27, 115, 205, 0.1);
              border-radius: 10px;
              @include respond-until(s) {
                width: 380px;
              }
              .fix-padding {
                padding: 55px 0;
                width: 100%;
                @include respond-until(s) {
                  padding: 15px;
                }
                .departure-arrival-block {
                  display: flex;
                  height: 150px;
                  width: 100%;
                  justify-content: space-between;
                  @include respond-until(s) {
                    flex-direction: column;
                    height: auto;
                    padding: 0 45px;
                    width: auto;
                  }
                  .departure-block,
                  .arrival-block {
                    width: 300px;
                    @include respond-until(s) {
                      width: auto;
                    }
                    .city__departure {
                      margin: 0;
                      font-weight: 500;
                      font-size: 36px;
                      text-transform: uppercase;
                      &:after {
                        content: '';
                        background-image: url("data:image/svg+xml,%3Csvg width='293' height='2' viewBox='0 0 293 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='1' y1='1' x2='292' y2='1' stroke='%23C8C8C8' stroke-width='2' stroke-linecap='round' stroke-dasharray='0.1 5'/%3E%3C/svg%3E%0A");
                        background-size: cover;
                        width: 100%;
                        height: 2px;
                        display: block;
                        margin-top: 10px;
                        @include respond-until(s) {
                          margin-top: 25px;
                          margin-bottom: 40px;
                        }
                      }
                    }
                    .date-departure__label {
                      margin-bottom: 20px;
                    }
                    .date-departure__label,
                    .time-departure__label {
                      color: #2A2A2A;
                      font-weight: 100;
                      font-size: 18px;
                      @include respond-until(s) {
                        font-size: 17px;
                      }
                      span.color-blue {
                        color: $LINK_COLOR;
                        font-weight: 400;
                      }
                      span.color-red {
                        color: $DANGER_COLOR;
                        font-weight: 400;
                      }
                    }
                  }
                  .departure-block {
                    padding-left: 55px;
                    @include respond-until(s) {
                      padding-left: 0px;
                    }
                  }
                  .arrival-block {
                    padding-right: 55px;
                    @include respond-until(s) {
                      padding-right: 0;
                    }
                  }
                  .travel-time {
                    display: flex;
                    @include respond-until(s) {
                      margin-top: 40px;
                      align-items: center;
                    }
                    .travel-time__label {
                      font-size: 18px;
                      color: #6F6F6F;
                      font-weight: 100;
                      margin-left: 10px;
                      margin-top: 10px;
                      @include respond-until(s) {
                        margin-top: 0;
                      }
                    }
                  }
                }
                .ticket-action {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 70px 45px 0;
                  @include respond-until(s) {
                    flex-direction: column;
                    padding: 0;
                    margin-top: 40px;
                  }
                  .send__action {
                    @include respond-until(s) {
                      margin-bottom: 15px;
                    }
                  }
                  .print__action,
                  .send__action,
                  .ticket-return__action {
                    width: 240px;
                    height: 80px;
                    font-size: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid #000;
                    border-radius: 40px;
                    transition: all .2s;
                    cursor: pointer;
                    @include respond-until(s) {
                      height: 53px;
                    }
                    svg {
                      fill: #000;
                      margin-right: 15px;
                      transition: all .2s;
                    }
                    &:hover {
                      color: $BUTTON_HOVER;
                      border-color: $BUTTON_HOVER;
                      svg {
                        fill: $BUTTON_HOVER;
                      }
                    }
                  }
                }
              }
            }
            .btn-nav {
              color: #000;
              border: 3px solid #000;
              border-radius: 20px;
              width: 67px;
              height: 61px;
              
              transition: all .2s;
              @include respond-until(s) {
                top: 40%;
                width: 55px;
                height: 55px;
              }
              &:after {
                font-size: 32px;
                font-weight: bold;
              }
              &:hover {
                border-color: $BUTTON_HOVER;
                color: $BUTTON_HOVER;
              }
            }
            .swiper-button-prev {
              left: -80px;
              @include respond-until(s) {
                left: -25px;
                background-color: #fff;
              }
            }
            .swiper-button-next {
              right: -110px;
              @include respond-until(s) {
                right: -25px;
                background-color: #fff;
              }
            }
            .swiper-pagination {
              bottom: -100px;
            }
          }
        }
        .tickets__title {
          @include respond-until(s) {
            font-size: 26px;
          }
        }
        .tickets__subtitle {
          @include respond-until(s) {
            font-size: 17px;
          }
        }
      }
    }
  }
</style>
