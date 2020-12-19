<template>
  <div>
    <div class="tickets__body">
      <div class="ticket__block ticket-department">
        <div class="tickets__title">
          <h3 class="to">{{ $t('departureDateShort') }}:
            <span>
            {{departmentCityName}} - {{arrivalCityName}}
            </span>
          </h3>
        </div>
        <template v-if="toDate.length !== 0">
          <div class="change-date">
            <swiper class="swiper" :options="swiperOptionDepartment">
              <swiper-slide
                  class="text"
                  v-for="(date, index) in toDate" :key="date.id"
              >
                <select-btn
                    :key="index"
                    :obj-key="date.departure_datetime_loc"
                    :active-key="activeToDate"
                    :title="date.departure_datetime_loc"
                    :update-date="'updateCityDepartmentDate'"
                    :get-date="departmentDate"
                    @onUpdateKey="updateActiveDate('activeToDate', date.departure_datetime_loc)"
                >
                
                </select-btn>
              </swiper-slide>
              <div class="swiper-scrollbar" slot="scrollbar"></div>
            </swiper>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </div>
        </template>
        <template v-if="parseDepartmentFlights.length !== 0">
          <ticket-card
              :get-icon="baggageTypeIconFrom"
              :tickets="parseDepartmentFlights"
              :backward="returnBackward"
          />
        </template>
        <template v-else>
          <h4 class="ticketError">{{ $t('errorFindTicket') }}</h4>
        </template>
      </div>
      <div class="ticket__block ticket-arrival" v-if="parseArrivalFlights.length !== 0 || fromDate.length !== 0">
        <div class="tickets__title">
          <h3 class="from">{{ $t('back') }}:
            <span>
              {{arrivalCityName}} - {{departmentCityName}}
            </span>
          </h3>
        </div>
        <div class="change-date" v-if="fromDate.length !== 0">
          <swiper class="swiper" :options="swiperOptionArrival">
            <swiper-slide
                class="text"
                v-for="(date, index) in fromDate" :key="date.id">
              <select-btn
                  :key="index"
                  :obj-key="date.departure_datetime_loc"
                  :active-key="activeFromDate"
                  :title="date.departure_datetime_loc"
                  :update-date="'updateCityArrivalDate'"
                  :get-date="arrivalDate"
                  @onUpdateKey="updateActiveDate('activeFromDate', date.departure_datetime_loc)"
              >
                {{date.name}}
              </select-btn>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <template v-if="parseArrivalFlights.length !== 0">
          <ticket-card
              :get-icon="baggageTypeIconTo"
              :tickets="parseArrivalFlights"
              :backward="returnBackward"
          />
        </template>
        <template v-else>
          <h4 class="ticketError">{{ $t('errorFindTicket') }}</h4>
        </template>
      </div>
      <TariffType
          @baggageTypeData="handlerIcon"
          :backward="returnBackward"
      />
    </div>
    <div class="ts-form__submit" v-if="parseDepartmentFlights.length !== 0">
      <div class="passenger_faq">
        <a :href="'https://skyup.aero/' + $i18n.locale + '/faq'" target="_blank">
          <svg width="53" height="53" viewBox="0 0 53 53"  fill="none" xmlns="http://www.w3.org/2000/svg">
            <use
                :xlink:href="require('@/assets/img/sprite.svg') + '#icon-open-link'"
            />
          </svg>
          {{ $t('passengersFAQ') }}
        </a>
      </div>
      <router-link tag="button" :disabled="!validate" class="btn btn--black" :to="{name: 'CartAircraft'}">
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
  import TariffType from "./TariffType";
  import 'swiper/css/swiper.css'
  moment.locale("uk", [ukLocale]);

  export default {
    name: "AircraftResult",
    props: {
      "validateDepartmentTickets": Boolean,
      "validateArrivalTickets": Boolean
    },
    components: {
      Swiper,
      SwiperSlide,
      SelectBtn,
      TicketCard,
      TariffType
    },
    data() {
      return {
        activeToDate: "",
        baggageTypeIcon: "",
        activeFromDate: "",
        departmentDate: "",
        arrivalDate: "",
        baggageTypeIconTo: "",
        baggageTypeIconFrom: "",
        departmentFlight: [],
        arrivalFlight: [],
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
        toDate: [],
        fromDate: [],
      }
    },
    watch: {
      getRelatedDepartmentDate: {
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue && !oldValue) {
            this.toDate = newValue.filter((airports) => !airports.backward)
          }
          if (oldValue && oldValue.length !== 0) {
            this.toDate = oldValue.filter((airports) => !airports.backward)
          }
        }
      },
      getRelatedArrivalDate: {
        immediate: true,
        handler(newValue, oldValue) {
          console.log(this.fromDate.length);
          if (this.fromDate.length == 0 && this.toDate) {
            this.fromDate = newValue.filter((airports) => airports.backward)
          }
          if (oldValue && oldValue.length !== 0) {
            this.fromDate = oldValue.filter((airports) => airports.backward)
          }
        }
      },
    },
    computed: {
      ...mapGetters([
        "getCityNameByCode",
        "getCityDepartmentDate",
        "getCityArrivalDate",
        "getDepartmentCityCode",
        "getArrivalCityCode",
        "allAircrafts"
      ]),
      validate() {
        if(this.parseArrivalFlights.length !== 0) {
          if(!this.baggageTypeIconFrom || !this.baggageTypeIconTo) {
            return false
          }
        } else  {
          if(!this.baggageTypeIconFrom) {
            return false
          }
        }
        return true
      },
      returnBackward() {
        if(this.parseArrivalFlights.length !== 0) {
          return true
        }
        return false
      },
      departmentCityName() {
        return this.getCityNameByCode(this.getDepartmentCityCode);
      },
      arrivalCityName() {
        return this.getCityNameByCode(this.getArrivalCityCode);
      },
      parseDepartmentFlights() {
        let departmentFlight = [];
        if (this.allAircrafts) {
          for (var i = 0; i < this.allAircrafts.flights.length; i++) {
            for (var k = 0; k < this.allAircrafts.flights[i].routes.length; k++) {
              if (this.allAircrafts.flights[i].routes[k].backward === 0) {
                departmentFlight.push(this.allAircrafts.flights[i].routes[k]);

                departmentFlight[i]["resultId"] = this.allAircrafts.flights[i].resultId;
                departmentFlight[i]["searchId"] = this.allAircrafts.flights[i].searchId;
              }
            }
          }
        }
        return departmentFlight
      },
      parseArrivalFlights() {
        let arrivalFlight = [];
        if (this.allAircrafts) {
          for (var i = 0; i < this.allAircrafts.flights.length; i++) {
            for (var k = 0; k < this.allAircrafts.flights[i].routes.length; k++) {
              if (this.allAircrafts.flights[i].routes[k].backward === 1) {
                arrivalFlight.push(this.allAircrafts.flights[i].routes[k]);

                arrivalFlight[i]["resultId"] = this.allAircrafts.flights[i].resultId;
                arrivalFlight[i]["searchId"] = this.allAircrafts.flights[i].searchId;
              }
            }
          }
        }
        return arrivalFlight;
      },
      getRelatedDepartmentDate() {
        var depDate = [];
        this.allAircrafts.additional_flights.filter((dep_date) => {
          if(!dep_date.backward) {
            depDate.push(dep_date);
          }
        })
        return depDate;
      },
      getRelatedArrivalDate() {
        var arrDate = [];
        this.allAircrafts.additional_flights.filter((arr_date) => {
          if(arr_date.backward) {
            arrDate.push(arr_date);
          }
        })
        return arrDate;
      }
    },
    methods: {
      ...mapActions(["fetchAircrafts", "fetchAirports"]),
      handlerIcon(iconArr) {
        if(iconArr.modalId === 0) {
          this.baggageTypeIconFrom = iconArr;
        } else {
          this.baggageTypeIconTo = iconArr;
        }
      },
      updateActiveDate(directive, index) {
        this[directive] = index;
      },
    },
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
            margin: 0 0 15px;
          }
          @include respond-until(xs) {
            font-size: 24px;
            margin: 0 0 15px;
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
    position: relative;
    .passenger_faq {
      position: absolute;
      @include respond-until(m) {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
      }
      @include respond-until(sm) {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
      }
      @include respond-until(xs) {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
      }
      a {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 300;
        color: $BORDER_BOTTOM_LINK_COLOR;
        text-decoration: none;
        outline: none;
      }
    }
    .btn {
      &:disabled {
        color: #fff;
      }
    }
  }
  .ticketError {
    text-align: center;
    font-size: 26px;
    font-weight: 300;
    padding: 15px;
    border: 1px dashed $BORDER_BOTTOM_LINK_COLOR;
  }
</style>
