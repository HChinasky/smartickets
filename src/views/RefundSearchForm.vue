<template>
  <span>
    <!--
    <section      
      class="cart-table"
      style="padding-top: 20px;"
    >
      <div class="container">
        <div class="cart-table__inner">
          <h3>
            {{ $t("pleaseFillApplicationMsg") }}:
            <a href="mailto:support@e-transport.gov.ua"
              >support@e-transport.gov.ua</a
            >
          </h3>
          <p>{{ $t("refundDateMsg") }}</p>
          <a class="btn btn--black mt-5" :href="downloadLink">
            {{ $t("downloadExample") }}
          </a>
        </div>
      </div>
    </section>
-->

    <section      
      class="cart-table"
      style="padding-top: 20px;"
    >
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :loader="loader"
        :color="color"
        :is-full-page="fullPage"
      ></loading>
      <div class="container">
        <div class="cart-table__inner">
          <h2>{{$t("refundTicket")}}:</h2>
          <form>
            <div class="ticket-list" style="padding-top: 20px;">
              <div class="ticket-list__item">
                <div class="ticket-list__inner">
                  <div class="ticket-list__passenger">
                    <div class="ticket-list__group">
                      <label class="ticket-list__label">{{
                        $t("lastname")
                      }}</label>
                      <input
                        id="surname"
                        v-model.trim="surname"
                        class="ticket-list__input"
                        type="text"
                      />
                    </div>
                    <div class="ticket-list__group">
                      <label class="ticket-list__label">{{
                        $t("firstname")
                      }}</label>
                      <input
                        class="ticket-list__input"
                        id="name"
                        v-model.trim="name"
                        type="text"
                      />
                    </div>
                    <div class="ticket-list__group">
                      <label class="ticket-list__label" for="client-email">
                       {{$t("ticketNumber")}}
                      </label>
                      <input
                        id="doc_num"
                        v-model="doc_num"
                        class="ticket-list__input"
                      />
                    </div>
                    <div class="ticket-list__group">
                      <label class="ticket-list__label">
                       {{$t("purchaseDate")}}
                      </label>
                      <DatepickerRefund
                        @changeRefundTicketDate="changeEvent($event)"
                      ></DatepickerRefund>
                    </div>
                  </div>
                </div>
              </div>

              <button
                class="cart-total__submit btn btn--black"
                style="margin-top: 15px;"
                v-promise-btn
                @click="onSubmit()"
              >
                {{ $t("find") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
    
  </span>
</template>

<script>
import api from "../api/api";
import DatepickerRefund from "../components/DatepickerRefund";
import moment from "moment";
import i18n from "../i18n";
import Loading from "vue-loading-overlay";
export default {
  name: "RefundForm",
  components: {
    DatepickerRefund,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
      name: null,
      surname: null,
      doc_num: null,
      date: null,
    };
  },

  computed: {
    downloadLink() {
      if (i18n.locale == "en") {
        return "/static/claim_for_st_refund.docx";
      } else {
        return "/static/refund.docx";
      }
    },
  },

  methods: {
    changeEvent(date) {
      this.date = date;
    },
    async onSubmit() {
      if (!this.name) {
        this.$toasted.global.my_app_error({
          message: i18n.t("firstNameEmpty"),
        });
        return;
      }

      if (!this.surname) {
        this.$toasted.global.my_app_error({
          message: i18n.t("lastNameEmpty"),
        });
        return;
      }

      if (!this.doc_num) {
        this.$toasted.global.my_app_error({
          message: i18n.t("ticketNumberEmpty"),
        });
        return;
      }

      if (!this.date) {
        this.$toasted.global.my_app_error({
          message: i18n.t("purchaseDateEmpty"),
        });
        return;
      }      

      await api
        .getRefundInfo({
          name: this.name,
          surname: this.surname,
          date: moment(this.date, "DD.MM.YYYY").format("YYYY-MM-DD"),
          doc_num: this.doc_num,
        })
        .then((response) => {
          if (response.data.code != 0) {
            if (response.data.code == 201) {
              throw new Error(i18n.t("ticketRefundNotFound"));
            } else {
              throw new Error(response.data.msg);
            }
          } else {            
            this.$router.push({
              name: "makeRefund",
              params: {
                refundInfo: response.data,
                doc_num: this.doc_num,
                date: moment(this.date, "DD.MM.YYYY").format("YYYY-MM-DD"),
              },
            });
          }
        })
        .catch((error) => {          
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    },
  },  
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
