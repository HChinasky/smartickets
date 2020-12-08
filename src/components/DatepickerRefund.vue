<template>
  <span>
    <date-picker
      :lang="datepicker.lang"
      :format="datepicker.format"
      :clearable="false"     
      valueType="format"
      v-model="date"
      @change="changeDate"
      :input-class="'ts-form__input ts-form__date'"
      style="width: 100%;"
    >
      <span slot="icon-calendar" class="calendar-icon">
        <svg viewBox="0 0 32 32">
          <use
            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-calendar'"
          />
        </svg>
      </span>
    </date-picker>
  </span>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/uk";

export default {
  name: "DatepickerRefund",
  components: {
    DatePicker,
  },
  data() {
    return {
        date: null,
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
  methods: {
    changeDate() {
        this.$emit('changeRefundTicketDate', this.date)
    }

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
