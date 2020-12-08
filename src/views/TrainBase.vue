<template>
  <div ref="trainPage" v-if="!$route.meta.clientArea">
    <loading :active.sync="isLoading"
        :can-cancel="false"
        :loader="loader"
        :color="color"
        :is-full-page="fullPage"></loading>

    <router-view />
    <router-view name="schedule" />
  </div>
  <div ref="trainPage" v-else>
    <loading :active.sync="isLoading"
             :can-cancel="false"
             :loader="loader"
             :color="color"
             :is-full-page="fullPage"></loading>
    <div class="full-container">
      <LeftSidebar />
      <div class="content">
        <Header :step-back-link="$t('backToResult')"  />
        <h1 class="search-tickets__title">{{ $t('ticketSearch') }}</h1>
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
        <swiper class="swiper" :options="swiperOption" :style="`height: ${height}px`">
          <swiper-slide class="text">
            <router-view />
            <router-view name="schedule" />
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import LeftSidebar from "../components/clientArea/LeftSidebar"
import Header from "../components/clientArea/Header"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "TrainBase",
components: {
  Loading,
  LeftSidebar,
  Header,
  Swiper,
  SwiperSlide
},
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
      height: 0,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      }
    }
  },
 
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.trainNumber);
    this.$scrollTo(this.$refs.trainsPage, 1200, {easing: "ease-in-out"})
    next();
  },

  methods: {
    ...mapActions(["fetchTrain", "updateSelectedTab"]),
    async fetchData(trainNumber) {
      this.isLoading = true
      await this.fetchTrain(trainNumber);
      this.isLoading = false;

    },
  },
  mounted() {
      setTimeout(() => {
        if(this.isLoading == false) {
        // this will set the duration back to normal after the initial render.
        this.height = this.$el.querySelector('main').clientHeight + this.$el.querySelector('.schedule.schedule--dashed-line').clientHeight + 10;
        }
      }, 400)
  }

};
</script>

<style lang="scss" scoped>

  .full-container {
    .content {
      .search-tickets__title {
        color: #2A2A2A;
        font-weight: 500;
        font-size: 42px;
        text-align: center;
        margin: 0;
      }
      .swiper {
        margin-top: 100px;
        .swiper-scrollbar {
          background-color: #F0F0F0;
          width: 13px;
        }
        .swiper-slide {
          &.text {
            height: auto;
            box-sizing: border-box;
            padding: 0 30px;
          }
          ::v-deep .main {
            overflow-x: visible;
            .ticket__tr--transfer {
              grid-template: "a b c d e f";
              grid-template-columns: 30% 15% 15% 15% 13% 15%;
              .ticket__th {
                text-align: center;
                &:last-child {
                  padding-left: 0;
                  text-align: left;
                }
              }
            }
            .ticket {
              background-color: transparent;
              .ticket__tbody {
                .ticket__tr--transfer {
                  border: 1px solid #F6F6F6;
                  box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
                  border-radius: 5px;
                  grid-template: "a b c d e f";
                  grid-template-columns: 30% 15% 15% 15% 13% 15%;
                  .ticket__th {
                    text-align: center;
                  }
                  .ticket__car-inf {
                    display: block;
                    .ticket__car-type {
                      display: flex;
                      flex-direction: column;
                      svg {
                        width: 35px;
                        height: 35px;
                        margin-bottom: 5px;
                        margin-right: 8px;
                      }
                    }
                  }
                  .ticket__td {
                    border-width: 1px;
                  }
                  .ticket__td--despature-time,
                  .ticket__td--arrival-time,
                  .ticket__td--travel-time,
                  .ticket__td--cost,
                  .ticket__td--transfer {
                    padding: 0 30px;
                    text-align: center;
                    &:last-child {
                      text-align: left;
                    }
                    .ticket__time {
                      font-weight: 500;
                      font-size: 28px;
                      color: #2A2A2A;
                    }
                    .ticket__cost {
                      font-size: 16px;
                      span {
                        margin: 5px 0;
                        font-weight: 500;
                        font-size: 28px;
                        color: #2A2A2A;
  
                      }
                    }
                    .ticket__travel-hours {
                      font-weight: 500;
                      font-size: 28px;
                      color: #2A2A2A;
                    }
                  }
                  .ticket__td {
                    .ticket__travel-min {
                      font-size: 1.7rem;
                      font-weight: 100;
                      color: #2A2A2A;
                    }
                    .ticket__date {
                      font-size: 1.7rem;
                      font-weight: 100;
                    }
                  }
                }
              }
            }
          }
          ::v-deep .schedule-block {
            .container {
              .schedule {
                &.schedule--dashed-line {
                  border: 1px solid #F6F6F6;
                  box-sizing: border-box;
                  box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
                  border-radius: 5px;
                  &:after {
                    background-size: cover;
                    height: 150px;
                  }
                }
                &.schedule--metro {
                  border: 1px solid #F6F6F6;
                  box-sizing: border-box;
                  box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
                  border-radius: 5px;
                  &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 46px;
                    top: -1px;
                    width: 2px;
                    background-color: #3398ff;
                    height: 47px;
                    z-index: 9;
                  }
  
                  .schedule--metro {
                    background-color: red;
                  }
                }
              }
              .notification {
                .notification__text {
                  .notification__time {
                    font-size: 22px;
                  }
                  .notification__checkbox {
                    .notification__input-label {
                      font-size: 17px;
                    }
                  }
                }
              }
              .result {
                .result__info {
                  .result__label {
                    font-weight: 200;
                    font-size: 22px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
