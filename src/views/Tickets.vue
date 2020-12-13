<template>
  <section class="client-tickets">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :loader="loader"
      :color="color"
      :is-full-page="fullPage"
    ></loading>
    <div class="container">
      <div class="client-tickets__inner">
        <div
          v-for="(item, index) in tickets"
          :key="index"
          class="client-tickets__item"
        >
          <div class="client-tickets__passenger-inf">
            <div class="client-tickets__name">{{ item.fio }}</div>
            <div class="client-tickets__desc">
              {{ $t("smartTicketCreated") }}!
            </div>

            <div class="client-tickets__link">
              <button @click="showTicket(item)">
                {{ $t("showTicket") }}
              </button>
            </div>

            <div class="client-tickets__link">
              <button
                @click="dwnTicket(item.pack_num, item.pay_time, item.html_data)"
              >
                {{ $t("downloadTicket") }}
              </button>
            </div>
            <div class="client-tickets__link">
              <button
                @click="
                  sendToEmail(item.pack_num, item.pay_time, item.html_data)
                "
              >
                {{ $t("sendTicketToEmail") }}
              </button>
            </div>
            <div class="client-tickets__link">
              <a
                :href="
                  $appConfig.downloadReceiptUrl +
                    item.payment_no +
                    '&trn_date=' +
                    item.pay_time
                "
                >{{ $t("downloadReceipts") }}</a
              >
            </div>

            <div class="client-tickets__caption">{{ $t("happyJourney") }}!</div>
          </div>
          <hr />
        </div>
        <a v-show="false" href="#" ref="dwn"></a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { decode } from "js-base64";
import Loading from "vue-loading-overlay";

export default {
  name: "Tickets",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
    };
  },
  computed: {
    ...mapGetters(["getTickets"]),
    tickets() {
      return this.getTickets;
    },
  },
  methods: {
    ...mapActions(["downloadTicket", "sendTicketToEmail"]),

    addFirstZero(str, max) {
      let result = "";
      var i;
      for (i = str.length; i <= max - 1; i++) {
        result += "0";
      }
      return result + str;
    },
    showTicket(item) {
      let width = (window.screen.width - 50) / 2 - 1000;
      var win = window.open(
        "",
        item.fio,
        "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" +
          (window.screen.width - 50) +
          ",height=800,top=50,left=" +
          width
      );
      win.document.body.innerHTML = decode(item.html_data);
    },

    async dwnTicket(pack_num, trn_date, html_data) {
      var html = html_data;
      const response = await this.downloadTicket({ pack_num, trn_date, html });
      const source = "data:application/pdf;base64," + response.pdf;
      const fileName = "SmartTicket_" + response.file_name + ".pdf";
      this.$refs.dwn.href = source;
      this.$refs.dwn.download = fileName;
      this.$refs.dwn.click();
    },
    async sendToEmail(pack_num, trn_date, html_data) {
      this.isLoading = true;
      var html = html_data;
      const response = await this.sendTicketToEmail({
        pack_num,
        trn_date,
        html,
      });
      this.isLoading = false;
      if (response.code == 0) {
        this.$toasted.global.my_app_success({
          message: "Квиток відправлено на email",
        });
      } else {
        this.$toasted.global.my_app_error({
          message: response.msg,
        });
      }
    },
  },
};
</script>

<style scoped>
.client-tickets__link button {
  color: #3398ff;
  text-decoration: underline;
  border: none;
  background: none;
  background-color: transparent;
  margin-left: 0px;
  padding-left: 0px;
}

.client-tickets__link button:hover {
  border: none;
}
</style>
