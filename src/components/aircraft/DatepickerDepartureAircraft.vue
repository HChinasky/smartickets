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
        disabledDates: {
        },
        availableDates: [],
      };
    },
    watch: {
      getAvailableDates: {
        immediate: true,
        handler(newVal, oldVal) {
          let getAvailableDate = [];
          if (this.getDepartmentCityCode && this.getDepartmentCityCode) {
            if(newVal) {
              this.disabledDates = {
                customPredictor: function(date) {
                  getAvailableDate = newVal.data.filter((dep) => moment(dep.departure_datetime_loc).format('DD.MM.YYYY') === moment(date).format('DD.MM.YYYY'))
                  if (getAvailableDate.length !== 0) {
                    return false
                  } else {
                    return true
                  }
                }
              };
            } else {
              this.disabledDates = {
                customPredictor: function(date) {
                  getAvailableDate = oldVal.data.filter((dep) => moment(dep.departure_datetime_loc).format('DD.MM.YYYY') === moment(date).format('DD.MM.YYYY'))
                  if (getAvailableDate.length !== 0) {
                    return false
                  } else {
                    return true
                  }
                }
              }
            }
          }
        }
      },
    },
    computed: {
      ...mapGetters([
        "getCityDepartmentDate",
        "getAvailableDates",
        "getCityArrivalDate",
        "getArrivalCityCode",
        "getDepartmentCityCode",
      ]),
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
        let payload = {
          date: new Date(),
          arrival: this.getArrivalCityCode,
          department: this.getDepartmentCityCode
        }
        console.log(this.availableDates);
        await this.fetchAvailableDate(payload)
          .then((res) => {
            this.availableDates = res.data;
          })
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
</style>
