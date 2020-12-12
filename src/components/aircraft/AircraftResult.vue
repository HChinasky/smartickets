<template>
  <div>
    <div class="tickets__body">
      <div class="ticket__block ticket-department"  v-if="departmentTicket.length !== 0">
        <div class="tickets__title">
          <h3 class="to">{{ $t('departureDateShort') }}:
            <span>
            {{departmentCityName}} - {{arrivalCityName}}
            </span>
          </h3>
        </div>
        <div class="change-date">
          <swiper class="swiper" :options="swiperOptionDepartment">
            <swiper-slide
                class="text"
                v-for="date in toDate" :key="date.id"
            >
              <select-btn
                  :key="date.id"
                  :obj-key="date.name"
                  :active-key="activeToDate"
                  :title="date.name"
                  :update-date="'updateCityDepartmentDate'"
                  :get-date="departmentDate"
                  @onUpdateKey="updateActiveDate('activeToDate', date.name)"
              >
              
              </select-btn>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <ticket-card
            :get-icon="baggageTypeIcon"
            :tickets="departmentTicket"
            :backward="returnBackward"
        />
      </div>
      <div class="ticket__block ticket-arrival" v-if="arrivalTicket.length !== 0">
        <div class="tickets__title">
          <h3 class="from">{{ $t('back') }}:
            <span>
              {{arrivalTicket[0].departureCity}} - {{arrivalTicket[0].arrivalCity}}
            </span>
          </h3>
        </div>
        <div class="change-date">
          <swiper class="swiper" :options="swiperOptionArrival">
            <swiper-slide
                class="text"
                v-for="date in fromDate" :key="date.id">
              <select-btn
                  :key="date.id"
                  :obj-key="date.name"
                  :active-key="activeFromDate"
                  :title="date.name"
                  :update-date="'updateCityArrivalDate'"
                  :get-date="arrivalDate"
                  @onUpdateKey="updateActiveDate('activeFromDate', date.name)"
              >
                {{date.name}}
              </select-btn>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
          <ticket-card
              :get-icon="baggageTypeIcon"
              :tickets="arrivalTicket"
              :backward="returnBackward"
          />
      </div>
      
      <BaggageType
          @baggageTypeData="handlerIcon"
          :backward="returnBackward"
      />
    </div>
    <div class="ts-form__submit">
      <router-link tag="button" :disabled="!baggageTypeIcon" class="btn btn--black" :to="{name: 'CartAircraft'}">
        {{ $t('next') }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { mapGetters, mapActions } from "vuex";
  import ukLocale from "moment/locale/uk";
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import SelectBtn from '../../components/SelectBtn';
  import TicketCard from './TicketCard';
  import BaggageType from "./BaggageType";
  import 'swiper/css/swiper.css'
  moment.locale("uk", [ukLocale]);

  export default {
    name: "AircraftResult",
    props: {
      "departmentTicket": Array,
      "arrivalTicket": Array,
      "validateDepartmentTickets": Boolean,
      "validateArrivalTickets": Boolean
    },
    components: {
      Swiper,
      SwiperSlide,
      SelectBtn,
      TicketCard,
      BaggageType
    },
    data() {
      return {
        activeToDate: "",
        baggageTypeIcon: "",
        activeFromDate: "",
        departmentDate: "",
        arrivalDate: "",
        swiperOptionDepartment: {
          slidesPerView: 6,
          spaceBetween: 15,
          navigation: {
            nextEl: '.ticket-department .swiper-button-next',
            prevEl: '.ticket-department .swiper-button-prev'
          },
          breakpoints: {
            1367: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            993: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
            648: {
              slidesPerView: 6,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            },
            460: {
              slidesPerView: 3,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            }
          }
        },
        swiperOptionArrival: {
          slidesPerView: 6,
          spaceBetween: 15,
          navigation: {
            nextEl: '.ticket-arrival .swiper-button-next',
            prevEl: '.ticket-arrival .swiper-button-prev'
          },
          breakpoints: {
            1367: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            993: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            },
            648: {
              slidesPerView: 6,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            },
            460: {
              slidesPerView: 4,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 0,
              direction: 'horizontal',
              freeMode: true,
              scrollbar: {
                el: '.swiper-scrollbar'
              },
              mousewheel: true
            }
          }
        },
        toDate: [
          {id: 0, name: '2'},
          {id: 1, name: '4'},
          {id: 2, name: '6'},
          {id: 3, name: '8'},
          {id: 4, name: '10'},
          {id: 5, name: '12'},
          {id: 6, name: '14'},
        ],
        fromDate: [
          {id: 0, name: '2'},
          {id: 1, name: '4'},
          {id: 2, name: '6'},
          {id: 3, name: '8'},
          {id: 4, name: '10'},
          {id: 5, name: '12'},
          {id: 6, name: '14'},
        ],
      }
    },
    computed: {
      ...mapGetters([
        "getMainCityNameByCode",
        "getCityDepartmentDate",
        "getCityArrivalDate",
        "getDepartmentCityCode",
        "getArrivalCityCode"
      ]),
      returnBackward() {
        if(this.arrivalTicket.length !== 0) {
          return true
        }
        return false
      },
      departmentCityName() {
        return this.getMainCityNameByCode(this.getDepartmentCityCode);
      },
      arrivalCityName() {
        return this.getMainCityNameByCode(this.getArrivalCityCode);
      },
    },
    methods: {
      ...mapActions(["fetchAircrafts", "fetchAirports"]),

      cloneDate() {
        if(!this.departmentDate || !this.arrivalDate) {
          this.departmentDate = this.getCityDepartmentDate;
          this.arrivalDate = this.getCityArrivalDate;
        }
      },
      handlerIcon(iconArr) {
        this.baggageTypeIcon = iconArr;
      },
      formattedDate(date) {
        if (this.$route.meta.clientArea)
          return moment(date).format("LL, dddd");
        else
          return moment(date).format("ll, dd");
      },
      formattedTime(date) {
        return moment(date).format("HH:mm");
      },
      updateActiveDate(directive, index) {
        this[directive] = index;
      },
    },
    beforeMount() {
      this.cloneDate();
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  @import "@/assets/scss/grid-mixins";
  
  .tickets__body {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @include respond-until(m) {
      flex-wrap: wrap;
      justify-content: center;
    }
    @include respond-until(xs) {
      justify-content: center;
    }
    .ticket__block {
      max-width: 660px;
      @include respond-until(lg) {
        max-width: 520px;
      }
      @include respond-until(l) {
        min-width: 420px;
        max-width: 560px;
        width: 100%;
        padding: 0 20px;
      }
      @include respond-until(m) {
        max-width: 750px;
        width: 100%;
        padding: 0;
      }
      @include respond-until(xs) {
        max-width: 415px;
        min-width: 300px;
      }
      &.ticket-arrival {
        @include respond-until(sm) {
          margin-top: 40px;
        }
      }
      .tickets__title {
        h3.to,
        h3.from {
          font-weight: 500;
          font-size: 38px;
          color: #000;
          @include respond-until(l) {
            font-size: 28px;
          }
          @include respond-until(m) {
            font-size: 28px;
          }
          @include respond-until(sm) {
            font-size: 26px;
            margin: 0;
          }
          @include respond-until(xs) {
            font-size: 24px;
            margin: 0;
          }
          span {
            color: $SECOND_FONT_COLOR;
          }
        }
      }
      .change-date {
        position: relative;
        @include respond-to(l) {
          padding: 0 20px;
        }
        @include respond-to(md) {
          padding: 0 20px;
        }
        @include respond-to(m) {
          padding: 0 20px;
        }
        @include respond-to(sm) {
          padding: 0 20px;
        }
        .swiper {
          height: 100px;
          max-width: 620px;
          @include respond-until(sm) {
            max-width: 700px;
          }
          @include respond-until(xs) {
            max-width: 415px;
          }
          
          .swiper-slide {
            display: flex;
            align-items: center;
            text-align: center;
            font-weight: bold;
            ::v-deep span {
              button {
                font-weight: 200;
                font-size: 16px;
                color: #000;
                text-decoration: none;
                text-transform: lowercase;
                padding: 0 0 5px;
                border-bottom: 2px dashed $BORDER_BOTTOM_LINK_COLOR;
                transition: color .2s;
                &.active {
                  font-weight: normal;
                  color: $BORDER_BOTTOM_LINK_COLOR;
                }
                &:hover {
                  color: $BORDER_BOTTOM_LINK_COLOR;
                }
              }
            }
          }
          .swiper-scrollbar {
            background-color: #fff;
            display: none;
            margin-bottom:10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            @include respond-until(sm) {
              display: block;
            }
            ::v-deep .swiper-scrollbar-drag {
              position: absolute;
              background: #BDBDBD;
            }
          }
        }
        .swiper-button-prev,
        .swiper-button-next {
          @include respond-until(sm) {
            display: none;
          }
          outline: none;
          &.swiper-button-disabled {
            opacity: .1;
          }
          &:after {
            content: '';
            background-image: url("../../assets/img/svg/nav-arrow.svg");
            background-repeat: no-repeat;
            display: block;
            width: 18px;
            height: 18px;
          }
        }
        .swiper-button-prev {
          left: -5px;
          &:after {
            transform: rotate(180deg);
          }
        }
        .swiper-button-next {
          right: -5px;
        }
      }
    }
  }
  .ts-form__submit {
    .btn {
      &:disabled {
        color: #fff;
      }
    }
  }
</style>
