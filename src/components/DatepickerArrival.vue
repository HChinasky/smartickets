<template>
  <span>
    <date-picker
      :lang="datepicker.lang"
      :format="hideYear ? momentFormat : datepicker.format"
      :clearable="false"
      :disabled-date="(date) => date <= yesterday() || date > twoMonth()"
      valueType="format"
      v-model="arrivalDate"
      :input-class="'ts-form__input ts-form__date'"
      :popup-class="$route.meta.clientArea ? 'client-area' : ''"
    >
      <span slot="icon-calendar" class="calendar-icon">
        <svg viewBox="0 0 32 32">
          <use
            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-calendar'"
          />
        </svg>
      </span>
    </date-picker>
    <div class="ts-form__help-links" v-if="!hideHelpLinks">
      <span @click="setDate('today')" class="ts-form__help-link">{{
        $t("today")
      }}</span>
      <span @click="setDate('tomorrow')" class="ts-form__help-link">{{
        $t("tomorrow")
      }}</span>
      <span @click="setDate('after_tomorrow')" class="ts-form__help-link">{{
        $t("dayAfterTomorrow")
      }}</span>
    </div>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/uk";

export default {
  name: "DatepickerArrival",
  components: {
    DatePicker,
  },
  props: {
    'hideHelpLinks':Boolean,
    'hideYear': Boolean,
    'getLink': String,
    'updateDate': String
  },
  data() {
    return {
      momentFormat: {
        //[optional] Date to String
        stringify: (date) => {
          return date ? moment(date).format('DD MMMM') : ''
        },
        //[optional]  String to Date
        parse: (value) => {
          return value ? moment(value, 'D').toDate() : null
        },
      },
      datepicker: {
        lang: {
          formatLocale: {
            firstDayOfWeek: 1,
          },
          monthBeforeYear: false,
        },
        format: "DD.MM.YYYY",
      },
    };
  },
  computed: {
    ...mapGetters(["getArrivalDate", "getCityArrivalDate", "getCityDepartmentDate"]),
    arrivalDate: {
      get() {
        if (this[this.getLink]) {
          return this[this.getLink];
        } else {
          return null;
        }
      },
      set(value) {
        console.log(value)
        this.$store.commit(this.updateDate, value ? value : null);
      },
    },
  },
  methods: {
    yesterday() {
      if (this.hideHelpLinks) {
        return moment(this.getCityDepartmentDate).subtract(1, "days").toDate();
      } else {
        return moment().subtract(1, "days").toDate();
      }
    },
    twoMonth() {
      return moment().add(60, "days").toDate();
    },
    setDate(date) {
      const now = Date.now();
      switch (date) {
        case "today":
          this.$store.commit(this.updateDate, moment(now).format("DD.MM.YYYY"));
          break;
        case "tomorrow":
          this.$store.commit(this.updateDate, moment(now).add(1, "days").format("DD.MM.YYYY"));
          break;
        case "after_tomorrow":
          this.$store.commit(this.updateDate, moment(now).add(2, "days").format("DD.MM.YYYY"));
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.calendar-icon {
  display: flex;
  padding-bottom: 10px;
}

.calendar-icon svg {
  width: 28px;
  height: 28px;
}
</style>
