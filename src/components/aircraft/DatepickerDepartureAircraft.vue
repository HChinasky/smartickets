<template>
  <span>
    <date-picker
        :disabled-dates="disabledDates"
        :format="customFormatter"
        v-model="departureDate"
        :language="uk"
        :monday-first="true"
        @focusin.native="datepickerOpenedFunction"
        :input-class="'ts-form__input ts-form__date'"
        :popup-class="$route.meta.clientArea ? 'client-area' : ''"
        :calendar-class="{'loading' : loading}"
        :disabled="!this.getDepartmentCityCode || !this.getArrivalCityCode"
    >
      <datepicker>
        <span slot="afterDateInput" class="animated-placeholder">
          Choose a Date
        </span>
      </datepicker>
    </date-picker>
  </span>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import moment from "moment";
  import DatePicker from 'vuejs-datepicker';
  import {en, uk} from 'vuejs-datepicker/dist/locale'
  import "vue2-datepicker/index.css";
  import "vue2-datepicker/locale/uk";

  export default {
    name: "DatepickerDeparture",
    components: {
      DatePicker,
    },
    data() {
      return {
        en: en,
        uk: uk,
        loading: false
      };
    },
    computed: {
      ...mapGetters([
        "getCityDepartmentDate",
        "getAvailableDates",
        "getCityArrivalDate",
        "getArrivalCityCode",
        "getDepartmentCityCode",
      ]),
      disabledDates: {
        get() {
          var self = this,
              availableDates = self.getAvailableDates.data;
          return {
            customPredictor: function (date) {
              if (self.getDepartmentCityCode && self.getArrivalCityCode) {
                const getAvailableDate = availableDates.filter((department) => moment(department.departure_datetime_loc).format('DD.MM.YYYY') === moment(date).format('DD.MM.YYYY'))
                if (getAvailableDate.length === 0) {
                  return true
                }
              }
            }
          }
        }
      },
      departureDate: {
        get() {
          return moment(this.getCityDepartmentDate).format('MM.DD.YYYY');
        },
        set(value) {
          this.$store.commit('updateCityDepartmentDate', moment(value, "DD.MM.YYYY"));
        },
      },
    },
    methods: {
      ...mapActions(["fetchAvailableDate"]),
      async datepickerOpenedFunction() {
        this.loading = true
        let payload = {
          date: new Date(),
          arrival: this.getArrivalCityCode,
          department: this.getDepartmentCityCode
        }
        await this.fetchAvailableDate(payload)
          .then(() => {
            this.loading = false;
          }).catch((err) => {console.log(err)})
      },
      customFormatter(date) {
        return moment(date).format('DD.MM.YYYY');
      }
    },
  };
</script>

<style lang="scss" scoped>
  .calendar-icon {
    display: flex;
    padding-bottom: 10px;
  }
  
  .calendar-icon svg {
    width: 28px;
    height: 28px;
  }
  ::v-deep .vdp-datepicker__calendar {
    border: none;
    padding: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    &.loading {
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255,255,255,.7);
        
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translatex(-50%);
        background-color: transparent;
        width: 20px;
        height: 20px;
        border: 4px solid transparent;
        border-top: 3px solid #3398FF;
        border-radius: 50%;
        animation: loading 1.5s infinite linear;
        -moz-animation: loading 1.5s infinite linear;
        -webkit-animation: loading 1.5s infinite linear;
      }
    }
    .next {
      &:after {
        border-left-color: #73879c;
      }
    }
    .prev {
      &:after {
        border-right-color: #73879c;
      }
    }
    .day-header, .day__month_btn, .month {
      font-size: 12px;
      color: #73879c;
      text-transform: lowercase;
      &.disabled {
        cursor: not-allowed;
        color: #ccc;
        background-color: #f3f3f3;
      }
    }
    .day {
      font-size: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      color: #73879c;
      &:hover {
        border: none!important;
        color: #73879c;
        background-color: #f3f9fe;
      }
      &.disabled {
        cursor: not-allowed;
        color: #ccc;
        background-color: #f3f3f3;
      }
      &.selected {
        color: #fff;
        background-color: #1284e7;
        &.disabled {
          /*background-color: #ffa4a4;*/
          /*color: #73879c;*/
        }
      }
    }
  }
  ::v-deep .ts-form__date {
    &:disabled {
      background-color: transparent;
      cursor: not-allowed;
      border-bottom-color: rgba(0,0,0,.2);
    }
  }
  @keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  @-moz-keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  @-webkit-keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>
