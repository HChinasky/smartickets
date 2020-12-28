<template>
  <section class="awaiting-reg" ref="refundInfo">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :loader="loader"
      :color="color"
      :is-full-page="fullPage"
    ></loading>

    <div class="container">
      <NotificationBar v-if="isRefundSuccessful" :notification="msg" />
      <div class="awaiting-reg__inner" v-if="data.uz">
        <div class="awaiting-reg__top">
          <div class="awaiting-reg__thumb">
            <img src="@/assets/img/svg/train.svg" width="68" height="78" />
          </div>
          <span class="awaiting-reg__title"
            >{{ $t("train") }}: {{ data.uz.train_num }}</span
          >
          <strong class="awaiting-reg__tickets-id"
            >{{ data.uz.city_from_name }} — {{ data.uz.city_to_name }}</strong
          >
          <span class="awaiting-reg__title">
            {{ $t("departureDateShort") }}: {{ formatDate(data.uz.arrival_date) }}
            {{ data.uz.arrival_time }}
          </span>
        </div>
        <div class="awaiting-reg__description">
          <div class="awaiting-reg__notice">
            <svg viewBox="0 0 32 32">
              <use
                :xlink:href="require('@/assets/img/sprite.svg') + '#icon-info'"
              /></svg
            ><span>{{ $t("fundsWillBeRefundedTxt") }}</span>
          </div>
          <div class="awaiting-reg__order-inf">
            <span class="awaiting-reg__id"
              >{{ $t("orderNumber") }}: <strong>{{ data.uz.uid }}</strong></span
            ><span class="awaiting-reg__vendor"
              >{{ $t("carrier") }}:
              <strong>{{ $t("Ukrzaliznytsia") }}</strong></span
            ><span class="awaiting-reg__cost"
              >{{ $t("amount") }}:
              <strong class="marked"
                >{{ data.uz.cost }} {{ $t("UAH") }}</strong
              ></span
            >

            <span class="awaiting-reg__cost" style="margin-top: 16px;"
              >{{ $t("refundAmount") }}:
              <strong class="marked"
                >{{ data.uz.refund }} {{ $t("UAH") }}</strong
              ></span
            >

            <br />
            <span v-if="!isRefundSuccessful">
              <button @click="makeRefund()" class="btn btn--black">
                {{ $t("refundTickets") }}
              </button>
            </span>
            <span v-else>
              <button class="btn btn--black" @click="downloadRefundReceipt()">
                {{ $t("receiptDownload") }}
              </button>
            </span>
          </div>
        </div>
      </div>

      <div v-if="data.metro.metro_id != '-'" class="mt-5">
        <div class="awaiting-reg__top">
          <div class="awaiting-reg__thumb">
            <img
              src="@/assets/img/svg/Kyiv_Metro_logo.svg"
              width="88"
              height="98"
            />
          </div>
        </div>
        <div class="awaiting-reg__description">
          <div class="awaiting-reg__notice">
            <svg viewBox="0 0 32 32">
              <use
                :xlink:href="require('@/assets/img/sprite.svg') + '#icon-info'"
              /></svg
            ><span>{{ $t("fundsWillBeRefundedTxt") }}</span>
          </div>

          <div class="awaiting-reg__order-inf">
            <span class="awaiting-reg__id"
              >{{ $t("orderNumber") }}:
              <strong>{{ data.metro_id }}</strong></span
            ><span class="awaiting-reg__vendor"
              >{{ $t("carrier") }}:
              <strong>{{ $t("KyivMetro") }} </strong></span
            ><span class="awaiting-reg__cost"
              >{{ $t("amount") }}:
              <strong class="marked"
                >{{ data.metro.cost }} {{ $t("UAH") }}</strong
              ></span
            >
            <span class="awaiting-reg__cost" style="margin-top: 16px;"
              >{{ $t("refundAmount") }}:
              <strong class="marked"
                >{{ data.metro.refund }} {{ $t("UAH") }}</strong
              ></span
            >

            <br /><!--<button v-promise-btn @click="makeRefund()" class="btn btn--black">Повернути квиток</button>-->
          </div>
        </div>
      </div>

      <section class="cart-table__total cart-total">
        <a
          v-back
          class="cart-total__submit btn btn--black"
          style="cursor: pointer;"
        >
          {{ $t("back") }}
        </a>
      </section>
      <a v-show="false" href="#" ref="dwn"></a>

      <!--
      <section class="cart-table__total cart-total">
        <div class="cart-total__cost">
          Загальна сума повернення:
          <strong> {{ totalCost() }} {{ $t("UAH") }}</strong>
        </div>

        <template v-if="detectMobile">
          <button v-promise-btn
            @click="makeRefund()"
            class="cart-total__submit btn btn--black"
            style="margin-bottom: 10px;"
          >
            Повернути все
          </button>
          <a v-back class="cart-total__submit btn btn--black">
            Назад
          </a>
        </template>
        <template v-else>
          <a v-back class="cart-total__submit btn btn--black">
            Назад
          </a>

          <button v-promise-btn
            @click="makeRefund()"
            class="cart-total__submit btn btn--black"
            style="margin-left: 10px;"
          >
            Повернути
          </button>
        </template>
      </section>
      -->
    </div>
  </section>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import NotificationBar from "../components/NotificationBar";
import api from "../api/api";
import i18n from "../i18n";
import moment from "moment";
import Loading from "vue-loading-overlay";
export default {
  name: "RefundForm",
  components: {
    NotificationBar,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
      data: null,
      date: null,
      token: null,
      detectMobile: isMobile,
      isRefundSuccessful: false,
      msg: null,
    };
  },
  methods: {
    totalCost() {
      return (
        this.data.uz.refund +
        (this.data.metro.metro_id != "-"
          ? parseFloat(this.data.metro.refund)
          : 0)
      );
    },
    formatDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
    },

    async makeRefund() {
      this.isLoading = true;

      await api
        .makeRefund(this.token)
        .then((response) => {
          this.isLoading = false;
          if (response.data.code != 0) {
            if (response.data.info) {
              throw new Error(response.data.info);
            } else {
              throw new Error(response.data.msg);
            }
          } else {
            this.isRefundSuccessful = true;
            this.msg = {
              message: `${i18n.t("refundCompletedMsg")}!`,
              type: "success",
            };
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    },
    async downloadRefundReceipt() {
      this.isLoading = true;
      try {
        const response = await api.downloadRefundReceipt(
          this.$route.params.doc_num
        );
        this.isLoading = false;
        if (response.data.code != 0) {
          throw new Error(response.data.msg);
        } else {
          const source = "data:application/pdf;base64," + response.data.pdf;
          const fileName = response.data.file_name + ".pdf";
          this.$refs.dwn.href = source;
          this.$refs.dwn.download = fileName;
          this.$refs.dwn.click();
        }
      } catch (error) {
        this.isLoading = false;
        this.$toasted.global.my_app_error({
          message: error.message,
        });
      }
    },
  },

  created() {
    this.data = this.$route.params.refundInfo.data;
    this.date = this.$route.params.date;
    this.token = this.$route.params.refundInfo.refund_token;
  },
};
</script>

<style scoped>
.awaiting-reg {
  padding: 10px;
}

.materialert {
  text-align: center;
}
</style>
