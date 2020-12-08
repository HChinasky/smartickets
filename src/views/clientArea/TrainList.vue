<template>
  <div class="full-container">
    <LeftSidebar />
    <div class="content">
      <Header :step-back-link="$t('backToTicketSearch')"  />
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
      <div class="ticket__table">
        <div class="ticket__header">
          <h2 class="tickets__subtitle">
            {{$t("searchResults")}}:
            <span>{{ allTrains.length }}</span>
          </h2>
          <div class="ticket__connection-type"></div>
        </div>
        <div class="ticket__thead">
          <div class="ticket__tr">
            <div class="ticket__th">{{$t("from")}} — {{$t("to")}}</div>
            <div class="ticket__th">{{$t("departure")}}</div>
            <div class="ticket__th">{{$t("arrival")}}</div>
            <div class="ticket__th">{{$t("travelTime")}}</div>
            <div class="ticket__th">{{$t("availableSeats")}}</div>
          </div>
        </div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="text">
            <TrainResult />
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import TrainResult from "../../components/TrainResult";
  import LeftSidebar from "../../components/clientArea/LeftSidebar"
  import Header from "../../components/clientArea/Header"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import { mapGetters} from "vuex";
  
  export default {
    name: "TrainList",
    components: {
      TrainResult,
      LeftSidebar,
      Header,
      Swiper,
      SwiperSlide
    },
    data() {
      return {
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
    computed: {
      ...mapGetters([
        "allTrains",
      ]),
    },
  }
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
        .tickets__subtitle {
          font-size: 34px;
          font-weight: 200;
          text-align: center;
          color: #2A2A2A;
          margin-top: 50px;
        }
        .ticket__table {
          .ticket__thead {
            .ticket__tr {
              grid-template: "a b c d e";
              grid-template-columns: 30% 14% 14% 17% 20%;
              padding: 0 30px;
              .ticket__th {
                color: #6E6E6E;
                text-align: center;
                &:last-child {
                  text-align: left;
                  padding-left: 0;
                }
              }
            }
          }
        }
    }
  }
  .swiper {
    height: 700px;
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
      ::v-deep .ticket__tbody {
        .ticket__tr {
          border: 1px solid #F6F6F6;
          box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
          border-radius: 5px;
          margin-bottom: 25px;
          grid-template: "a b c d e";
          grid-template-columns: 30% 14% 14% 17% 20%;
          .ticket__car-inf {
            .ticket__car-type {
              flex-direction: column;
              svg {
                width: 22px;
                height: 33px;
              }
            }
          }
          .ticket__td {
            &.ticket__td--travel-time {
              text-align: center;
            }
            &:not(:last-child) {
              border-width: 1px;
            }
            .free-places__quantity {
              width: 40px;
            }
            .ticket__travel-min {
              font-weight: 200;
              font-size: 1.7rem;
            }
            .ticket__time {
              text-align: center;
              font-size: 2.8rem;
              font-weight: normal;
            }
            .ticket__date {
              text-align: center;
              font-weight: 200;
            }
          }
        }
      }
    }
  }
</style>
