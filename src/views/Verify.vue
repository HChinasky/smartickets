<template>
  <div class="container">
    <template v-if="!isVerified">
      <h3 class="ticket-search__title">Перевірити квиток</h3>
      <div class="client-tickets__inner">
        <div class="client-tickets__item">
          <div class="client-tickets__ticket"></div>

          <form @submit.prevent="onSubmit">
            <div>
              <input type="password" ref="pin" placeholder="Введіть PIN код" />
            </div>
            <div class="ts-form__submit">
              <button type="submit" class="btn btn--black">Перевірити</button>
            </div>
          </form>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="response[0].type == 'metro'">
        <div v-for="(item, index) in response" :key="index">
          <h2>Київський метрополітен</h2>
          <p>
            Станція відправлення:
            <strong>{{item.metro_from}}</strong>
          </p>
          <p>
            Станція прибуття:
            <strong>{{item.metro_to}}</strong>
          </p>
          <p>
            Cтрок дії: до
            <strong>{{item.date_end}}</strong>
          </p>
          <p></p>
        </div>
      </div>
      <div v-else v-for="(item, index) in response" :key="index">
        <h2>{{item.FIO}}</h2>
        <p>
          Статус:
          <strong>{{item.status}}</strong>
        </p>
        <p>
          FK:
          <strong>{{item.FK}}</strong>
        </p>
        <p>
          FN:
          <strong>{{item.FN}}</strong>
        </p>
        <p>
          Номер замовлення:
          <strong>{{item.OrderNum}}</strong>
        </p>
        <p>
          PN:
          <strong>{{item.PN}}</strong>
        </p>
        <p>
          ZN:
          <strong>{{item.ZN}}</strong>
        </p>
        <p>
          Дата відправлення:
          <strong>{{item.dep_date}}</strong>&nbsp;
          <strong>{{item.dep_time}}</strong>
        </p>
        <p>
          Дата прибуття:
          <strong>{{item.arrival_date}}</strong>&nbsp;          
          <strong>{{item.arrival_time}}</strong>
        </p>
        <p>
          Звідки:
          <strong>{{item.city_from_name}}</strong>
        </p>
        <p>
          Куди:
          <strong>{{item.city_to_name}}</strong>
        </p>
        <p>
          Потяг:
          <strong>{{item.train_detail}}</strong>
        </p>
        <p>
          Номер вагону:
          <strong>{{item.wagon_num}} {{item.wagon_type}}{{item.wagon_class}}</strong>
        </p>
        <p>
          Місце:
          <strong>{{item.place}} {{item.doc_type == "FULL" ? "Повний" : item.doc_type }}</strong>
        </p>
        <p>
          UID:
          <strong>{{item.uid}}</strong>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Verify",
  data() {
    return {
      isVerified: false,
      response: null
    };
  },

  methods: {
    ...mapActions(["validateTicket"]),
    onSubmit() {
      if (this.$refs.pin.value == "") {
        this.$toasted.global.my_app_error({
          type: "error",
          message: "Вкажіть ПІН-код доступу"
        });
        return;
      }
      this.validateTicket({
        pin: this.$refs.pin.value,
        orderNum: this.$route.query.OrderNum,
        date: this.$route.query.date
      })
        .then(response => {
          this.isVerified = true;
          this.response = response;          
        })
        .catch(error => {
          this.$toasted.global.my_app_error({
            message: error.message
          });
        });
    }
  }
};
</script>

<style scoped>
</style>