<template>
    <div
        class="ticket__card"
    >
        <div class="aircraft__info_mobile">
          <svg width="53" height="53" viewBox="0 0 53 53">
            <use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-aircraft'" />
          </svg>
          <div class="aircraft__type">
            <p class="number">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureAirport }}</p>
            <p class="type">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].aircraftCode }}</p>
          </div>
        </div>
        <div class="airport__info">
          <div class="from-city__info">
            <p class="airport__iata">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureAirport }}</p>
            <div class="airport__city">
              <p class="region">{{ departmentCityName }}</p>
              <p class="city">{{ limitStr(airports(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureAirport), 15) }}</p>
            </div>
          </div>
          <div class="aircraft__info">
            <svg width="53" height="53" viewBox="0 0 53 53">
              <use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-aircraft'" />
            </svg>
            <div class="aircraft__type">
              <p class="number">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].flightNumber }}</p>
              <p class="type">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].aircraftCode }}</p>
            </div>
          </div>
          <div class="to-city__info">
            <p class="airport__iata">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].arrivalAirport }}</p>
            <div class="airport__city">
              <p class="region">{{ arrivalCityName }}</p>
              <p class="city">{{ limitStr(airports(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].arrivalAirport), 15) }}</p>
            </div>
          </div>
        </div>
        <div class="border-way"></div>
        <div class="trip-info_mobile">
          <p class="label">{{ $t('travelTime') }}:</p>
          <span class="duration">{{ tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].flightDuration }}</span>
        </div>
        <div class="time-trip__info">
          <div class="departure-date__info">
            <p class="label">{{ $t('departure') }}</p>
            <div class="d-flex">
              <span class="time">{{ formattedTime(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureTime) }}</span>
              <span class="day-month">{{ formattedDate(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureTime) }}</span>
              <span class="day">{{ formattedWeekDay(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].departureTime) }}</span>
            </div>
          </div>
          <div class="trip-info">
            <p class="label">{{ $t('travelTime') }}</p>
            <div class="d-flex">
              <span class="duration">{{ formattedTravelTime(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].flightDuration) }}</span>
            </div>
          </div>
          <div class="arrival-date__info">
            <p class="label">{{ $t('arrival') }}</p>
            <div class="d-flex">
              <span class="time">{{ formattedTime(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].arrivalTime) }}</span>
              <span class="day-month">{{ formattedDate(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].arrivalTime) }}</span>
              <span class="day">{{ formattedWeekDay(tickets[Object.keys(tickets)[Object.keys(tickets).length - 1]].arrivalTime) }}</span>
            </div>
          </div>
        </div>
        <div class="ticket__info">
          <div class="price-ticket">
            <p v-if="!getIcon">від <span>{{ getPriceForOneTicket(this.tickets[2].amount) }}</span> грн</p>
            <p v-else><span>{{ getPriceForOneTicket(getTicketPrice) }}</span> грн</p>
            <p class="ticket-label_mobile" v-if="!getIcon">basic</p>
            <p class="ticket-label_mobile" v-else>{{ getIcon.title }}</p>
          </div>
          <div class="type-ticket">
            <p v-if="!getIcon">basic</p>
            <p v-else>{{ getIcon.title }}</p>
          </div>
          <div class="choose-ticket">
            <template v-if="!getIcon">
              <button class="btn btn--black" @click="baggageTypeArr();">{{ $t('select') }}</button>
            </template>
            <template v-else>
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.37496 14.2753L2.56246 9.46284C2.43661 9.33547 2.28674 9.23433 2.12151 9.16531C1.95629 9.09628 1.77902 9.06074 1.59996 9.06074C1.4209 9.06074 1.24362 9.09628 1.0784 9.16531C0.913176 9.23433 0.7633 9.33547 0.637456 9.46284C0.510076 9.58869 0.408943 9.73857 0.339918 9.90379C0.270894 10.069 0.235352 10.2463 0.235352 10.4253C0.235352 10.6044 0.270894 10.7817 0.339918 10.9469C0.408943 11.1121 0.510076 11.262 0.637456 11.3878L6.39871 17.1491C6.93496 17.6853 7.80121 17.6853 8.33746 17.1491L22.9125 2.58785C23.0398 2.462 23.141 2.31213 23.21 2.1469C23.279 1.98168 23.3146 1.80441 23.3146 1.62535C23.3146 1.44629 23.279 1.26901 23.21 1.10379C23.141 0.938567 23.0398 0.78869 22.9125 0.662846C22.7866 0.535467 22.6367 0.434333 22.4715 0.365309C22.3063 0.296284 22.129 0.260742 21.95 0.260742C21.7709 0.260742 21.5936 0.296284 21.4284 0.365309C21.2632 0.434333 21.1133 0.535467 20.9875 0.662846L7.37496 14.2753Z" fill="#3398FF"/>
              </svg>
              <svg :width="getIcon.width" :height="getIcon.height" :viewBox="'0 0 ' + getIcon.width + ' ' + getIcon.height">
                <use :xlink:href="require('@/assets/img/sprite.svg') + getIcon.iconId" />
              </svg>
            </template>
          </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import moment from "moment";
  import ukLocale from "moment/locale/uk";
  moment.locale("uk", [ukLocale]);
  
  export default {
    name: "TicketCard",
    props: ["tickets", "getIcon", "backward"],
    data() {
      return {
        baggageType: Object,
      }
    },
    computed: {
      ...mapGetters([
        "resultId",
        "getMainCityNameByCode",
        "getDepartmentCityCode",
        "getArrivalCityCode",
        "getAirportsNameById",
        "allAircrafts",
        "getTicketPrice",
      ]),
      departmentCityName() {
        return this.getMainCityNameByCode(this.tickets[Object.keys(this.tickets)[Object.keys(this.tickets).length - 1]].departureAirport);
      },
      arrivalCityName() {
        return this.getMainCityNameByCode(this.tickets[Object.keys(this.tickets)[Object.keys(this.tickets).length - 1]].arrivalAirport);
      },
    },
    methods: {
      limitStr(string, limit) {
        let str = string;
    
        if (typeof str === 'string' && str.length > limit) {
          str = str.slice(0, limit) + '...';
        }
        return str;
      },
      getPriceForOneTicket(price) {
        if(this.allAircrafts.flights[0].routes.length > 1) {
          return (price / 2).toFixed(2)
        } else if(this.getTicketPrice) {
          return this.getTicketPrice
        }
        return this.tickets[0].amount;
      },
      baggageTypeArr() {
        var flights = {};
        var allowedListBasic = {
          0: {
            tooltip: false,
            text: this.$t('allowedList1')
          }
        }
        var allowedListStandard = {
          0: {
            tooltip: false,
            text: this.$t('allowedList1')
          },
          1: {
            tooltip: false,
            text: this.$t('allowedList2')
          },
          2: {
            tooltip: true,
            text: this.$t('allowedList3')
          }
        }
        var allowedListFlex = {
          0: {
            tooltip: false,
            text: this.$t('allowedList1')
          },
          1: {
            tooltip: false,
            text: this.$t('allowedList2')
          },
          2: {
            tooltip: false,
            text: this.$t('allowedList4')
          },
          3: {
            tooltip: true,
            text: this.$t('allowedList5')
          }
        }
        // FIXME
        for (var i = 0; i < this.allAircrafts.flights.length; i++) {
          for (var k = 0; k < this.allAircrafts.flights[i].routes.length; k++) {

            if(this.allAircrafts.flights[i].routes[k].backward == 0) {
              flights[this.allAircrafts.flights[i].routes[k].fareName] = {
                flightId: this.allAircrafts.flights[i].routes[k].flightId,
                baggageId: this.allAircrafts.flights[i].routes[k].fareId,
                classCode: this.allAircrafts.flights[i].routes[k].fareClassCode,
                allowedList: this.allAircrafts.flights[i].routes[k].fareName == 'Basic' ?
                  allowedListBasic :
                  this.allAircrafts.flights[i].routes[k].fareName == 'Standard' ?
                  allowedListStandard :
                  this.allAircrafts.flights[i].routes[k].fareName == 'Flex' ?
                  allowedListFlex : '',
                icon: {
                  id: this.allAircrafts.flights[i].routes[k].fareId,
                  title: this.allAircrafts.flights[i].routes[k].fareName,
                  price: this.allAircrafts.flights[i].amount.UAH.toFixed(2),
                  resultId: this.allAircrafts.flights[i].routes[k].resultId,
                  searchId: this.allAircrafts.flights[i].routes[k].searchId,
                  width: this.allAircrafts.flights[i].routes[k].fareName == 'Basic' ? '74' :
                    this.allAircrafts.flights[i].routes[k].fareName == 'Standard' ? '109' :
                      this.allAircrafts.flights[i].routes[k].fareName == 'Flex' ? '136' : '',
                  height: this.allAircrafts.flights[i].routes[k].fareName == 'Basic' ? '61' :
                    this.allAircrafts.flights[i].routes[k].fareName == 'Standard' ? '96' :
                      this.allAircrafts.flights[i].routes[k].fareName == 'Flex' ? '96' : '',
                  iconId: this.allAircrafts.flights[i].routes[k].fareName == 'Basic' ? '#icon-basic-baggage' :
                    this.allAircrafts.flights[i].routes[k].fareName == 'Standard' ? '#icon-standard-baggage' :
                      this.allAircrafts.flights[i].routes[k].fareName == 'Flex' ? '#icon-flex-baggage' : '',
                }
              }
            }
          }
        }
        this.baggageType = flights;
        this.$modal.show('baggageType', {
          item: this.tickets[Object.keys(this.tickets)[Object.keys(this.tickets).length - 1]].backward, baggageTypes: this.baggageType
        })
      },
      airports(code) {
        if (this.getAirportsNameById(code).terminal) {
          return this.getAirportsNameById(code).label + ' (' + this.getAirportsNameById(code).terminal + ')'
        }
        return this.getAirportsNameById(code).label
      },
      formattedDate(date) {
        return moment(date).format("D MMMM");
      },
      formattedWeekDay(date) {
        return moment(date).format("dddd");
      },
      formattedTime(date) {
        return moment(date).format("HH:mm");
      },
      formattedTravelTime(date) {
        date = date.split(":");
        return date[0] + " " + this.$t("hour") + ". " + date[1] + " " + this.$t("min");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .ticket__card {
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
    border-radius: 5px;
    padding: 25px 45px 35px;
    @include respond-until(sm) {
      padding: 25px 15px 35px;
    }
    
    .aircraft__info_mobile {
      display: none;
      flex-direction: column;
      align-items: center;
      @include respond-to(md) {
        display: flex;
      }
      @include respond-to(m) {
        display: flex;
      }
      @include respond-until(s) {
        display: flex;
      }
      .aircraft__type {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
        p {
          margin: 0;
        }
        .type {
          font-size: 17px;
          font-weight: 200;
          color: $LABEL_COLOR;
        }
      }
    }
    .airport__info {
      display: flex;
      justify-content: space-between;
      @include respond-until(sm) {
        margin-top: 35px;
      }
      .from-city__info {
        width: 170px;
      }
      .from-city__info, .to-city__info {
        .airport__iata {
          font-weight: 500;
          font-size: 28px;
          margin: 0;
          color: #000;
        }
        .airport__city {
          margin-top: 37px;
          @include respond-until(sm) {
            margin-top: 5px;
          }
          .region {
            font-size: 17px;
            color: #000;
            margin: 0 0 10px;
            @include respond-until(sm) {
              margin-bottom: 0;
            }
          }
          .city {
            font-size: 17px;
            font-weight: 100;
            color: $LABEL_COLOR;
            white-space: nowrap;
            margin: 0;
          }
        }
      }
      .aircraft__info {
        width: 180px;
        @include respond-to(md) {
          display: none;
        }
        @include respond-to(m) {
          display: none;
        }
        @include respond-until(s) {
          display: none;
        }
        .aircraft__type {
          margin-top: 15px;
          .number {
            font-size: 17px;
            color: #000;
            margin: 0 0 10px;
          }
          .type {
            font-size: 17px;
            font-weight: 100;
            color: $LABEL_COLOR;
            margin: 0;
          }
        }
      }
      .to-city__info {
        width: 130px;
      }
    }
    .border-way {
      border-bottom: 3px solid $BORDER_BOTTOM_LINK_COLOR;
      position: relative;
      width: 100%;
      margin: 20px 0 30px;
      @include respond-until(sm) {
        margin: 20px 0;
      }
      &:before {
        content: '';
        background-color: $BORDER_BOTTOM_LINK_COLOR;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: -5px;
      }
      &:after {
        content: '';
        position: absolute;
        top: -7px;
        border-radius: 3px;
        right: 0px;
        border: solid #3398FF;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 7px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }
    }
    .trip-info_mobile {
      justify-content: center;
      font-weight: 200;
      font-size: 17px;
      color: $LABEL_COLOR;
      display: none;
      @include respond-to(md) {
        display: flex;
      }
      @include respond-to(m) {
        display: flex;
      }
      @include respond-until(s) {
        display: flex;
      }
      .label {
        margin: 0;
      }
      .duration {
        font-weight: 500;
        color: #000;
        margin-left: 10px;
      }
    }
    .time-trip__info {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      @include respond-to(md) {
        position: relative;
      }
      @include respond-to(m) {
        position: relative;
      }
      @include respond-until(sm) {
        margin-top: 35px;
        position: relative;
      }
      .trip-info {
        @include respond-to(md) {
          display: none;
        }
        @include respond-to(m) {
          display: none;
        }
        @include respond-until(s) {
          display: none;
        }
      }
      .departure-date__info,
      .trip-info {
        position: relative;
        &:after {
          content: '';
          background-color: #E8E8E8;
          width: 1px;
          height: 100%;
          position: absolute;
          top: 0;
          right: -20px;
          @include respond-to(l) {
            right: 15px;
          }
          @include respond-to(md) {
            right: 50%;
          }
          @include respond-to(m) {
            right: 50%;
          }
          @include respond-until(m) {
            right: 20px;
          }
          @include respond-until(sm) {
            right: 20px;
          }
          @include respond-until(s) {
            right: 50%;
          }
        }
      }
      .departure-date__info,
      .arrival-date__info,
      .trip-info {
        font-size: 17px;
        color: $LABEL_COLOR;
        font-weight: 200;
        .label {
          font-weight: 200;
          font-size: 17px;
          color: $LABEL_COLOR;
          margin-top: 0;
        }
      }
      .time {
        font-size: 28px;
        font-weight: 500;
        color: #000;
      }
      .day-month {
        font-weight: 400;
        color: #000;
        margin: 10px 0;
      }
      .departure-date__info {
        width: 170px;
        @include respond-to(md) {
          position: static;
        }
        @include respond-to(m) {
          position: static;
        }
        @include respond-until(s) {
          position: static;
        }
        .d-flex {
          display: flex;
          flex-direction: column;
        }
      }
      .trip-info {
        width: 180px;
        .d-flex {
          display: flex;
          align-items: center;
          height: calc(100% - 30px);
          .duration {
            margin-top: 15px;
          }
        }
      }
      .arrival-date__info {
        width: 130px;
        .d-flex {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .ticket__info {
      display: flex;
      justify-content: space-between;
      height: 120px;
      padding: 10px 45px;
      background-color: #FCFCFC;
      width: calc(100% + 90px);
      left: -45px;
      bottom: -35px;
      position: relative;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      
      @include respond-until(sm) {
        width: calc(100% + 30px);
        left: -15px;
        padding: 0 15px;
        align-items: center;
      }
      .price-ticket {
        width: 250px;
        display: flex;
        align-items: center;
        @include respond-to(md) {
          flex-direction: column;
          align-items: flex-start;
        }
        @include respond-to(m) {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        @include respond-until(sm) {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .ticket-label_mobile {
          display: none;
          @include respond-to(md) {
            display: block;
            color: #3398FF;
            font-weight: 200;
            font-size: 17px;
          }
          @include respond-to(m) {
            display: block;
            color: #3398FF;
            font-weight: 200;
            font-size: 17px;
          }
          @include respond-until(s) {
            display: block;
            color: #3398FF;
            font-weight: 200;
            font-size: 17px;
          }
        }
        p {
          font-weight: 200;
          font-size: 17px;
          color: #000;
          span {
            font-size: 22px;
            font-weight: normal;
            color: $BORDER_BOTTOM_LINK_COLOR;
          }
          margin: 0;
        }
      }
      .type-ticket {
        width: 100px;
        display: flex;
        align-items: center;
        @include respond-to(md) {
          display: none;
        }
        @include respond-to(m) {
          display: none;
        }
        @include respond-until(s) {
          display: none;
        }
        p {
          margin: 0 0 0 5px;
          color: $BORDER_BOTTOM_LINK_COLOR;
          font-weight: 200;
          font-size: 17px;
        }
      }
      .choose-ticket {
        display: flex;
        align-items: center;
        svg {
          &:first-child {
            margin-right: 15px;
          }
        }
        .btn--black {
          width: 140px;
          height: 50px;
          padding: 0;
        }
      }
    }
  }
</style>
