<template>
  <div class="full-container">
    <LeftSidebar/>
    <div class="content">
      <Header :step-back-link="$t('backToResult')"/>
      <h1 class="search-tickets__title">{{ $t('ticketing') }}</h1>
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
      <h4>Обрані квитки:</h4>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
          <Cart />
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import Cart from '../Cart'
  import LeftSidebar from "../../components/clientArea/LeftSidebar"
  import Header from "../../components/clientArea/Header"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    name: "CartCheckout",
    components: {
      Cart,
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
  }
</script>

<style lang="scss" scoped>
  .full-container {
    .content {
      h4 {
        font-weight: 200;
        font-size: 34px;
        color: #2A2A2A;
        text-align: center;
        margin-bottom: 15px;
      }
      .search-tickets__title {
        color: #2A2A2A;
        font-weight: 500;
        font-size: 42px;
        text-align: center;
        margin: 0;
      }
  
      .swiper {
        height: 705px;
        .swiper-scrollbar {
          background-color: #F0F0F0;
          width: 13px;
        }
        .swiper-slide {
          &.text {
            height: auto;
            box-sizing: border-box;
        
          }
          ::v-deep .cart-table {
            .cart-table__inner {
              background-color: transparent;
              border: none;
              padding-top: 0;
              .cart-table__title {
                font-weight: 200;
                font-size: 34px;
                text-align: center;
              }
              .ticket-list {
                .ticket-list__item {
                  border-bottom: none;
                  .ticket-list__header {
                    margin-left: 65px;
                    align-items: center;
                    display: flex;
                    font-size: 3rem;
                    font-weight: normal;
                  }
                  .ticket-list__inner {
                    .ticket-list__group {
                      text-align: center;
                      .ticket-list__label {
                        font-size: 1.7rem;
                      }
                      .ticket-list__input {
                        text-align: center;
                        font-size: 2.2rem;
                        margin-top: 5px;
                        background-color: transparent;
                      }
                      .errorMessage {
                        text-align: left;
                        color: #F44336;
                      }
                    }
                  }
                }
                .ticket-list__trip-inf {
                  .ticket-list__places-inf,
                  .ticket-list__ticket-type {
                    border: 1px dashed #66B2FF;
                    border-radius: 5px;
                    padding: 10px 40px;
                    .ticket-list__places {
                      font-weight: 500;
                      font-size: 1.7rem;
                      justify-content: space-between;
                      &:before {
                        width: 100%;
                        background-color: #66B2FF;
                      }
                      .marked {
                        color: #2A2A2A;
                      }
                    }
                    .ticket-list__cost {
                      font-size: 1.7rem;
                      justify-content: flex-start;
                      display: flex;
                      color: #6E6E6E;
                      strong {
                        color: #1B73CD;
                        margin-left: 25px;
                      }
                    }
                    .ticket-list__remove {
                      right: 20px;
                      top: 21px;
                      svg {
                        width: 16px;
                      }
                    }
                    .ticket-type__name {
                      font-weight: 500;
                      font-size: 1.7rem;
                      text-align: left;
                      &:before {
                        width: 100%;
                        background-color: #66B2FF;
                      }
                    }
                    .ticket-type__cost {
  
                      font-size: 1.7rem;
                      justify-content: flex-start;
                      display: flex;
                      color: #6E6E6E;
                      strong {
                        color: #1B73CD;
                        margin-left: 25px;
                      }
                    }
                  }
                }
              }
              .cart-table__total {
                .cart-total__cost.cart-total__cost_smartticket {
                  font-size: 1.7rem !important;
                  font-weight: 200;
                  color: #6E6E6E;
                }
                .cart-total__cost {
                  font-size: 2.2rem;
                  font-weight: normal;
                  margin-bottom: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
