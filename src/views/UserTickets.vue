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
                @click="sendToEmail(item.pack_num, item.pay_time, item.html_data)"
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
import { mapActions } from "vuex";
import { encode, decode } from "js-base64";
import api from "../api/api";
import Loading from "vue-loading-overlay";

export default {
  name: "UserTickets",
  components: {
    Loading
  },
  data() {
    return {
      tickets: null,
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
    };
  },
  methods: {
    ...mapActions(["downloadTicket", "sendTicketToEmail", "fetchUserTickets"]),
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
      win.document.body.innerHTML = decode(this.templateFormat(item.html_data));
    },
    templateFormat(html) {
      var fragment = document
        .createRange()
        .createContextualFragment(decode(html));

      fragment.getElementById("text_info").innerHTML = fragment
        .getElementById("text_info")
        .innerHTML.trim()
        .slice(1, -1);

      var textInfoHTML = fragment.getElementById("text_info").innerHTML;
      var linesCount = textInfoHTML.match(/br/g).length + 1;
      var margin = 0;
      switch (linesCount) {
        case 2:
          margin = 0;
          break;
        case 3:
          margin = 110;
          break;
        case 4:
          margin = 55;
          break;
        default:
          break;
      }

      var elem = fragment.querySelector("#ticketTableFooter");
      elem.style.marginBottom = `${margin}px`;

      fragment.getElementById("text_info").innerHTML = fragment.getElementById(
        "text_info"
      ).innerText;

      fragment.getElementById("get_wagon_num").innerHTML = this.addFirstZero(
        fragment.getElementById("get_wagon_num").innerText,
        2
      );
      fragment.getElementById("get_place").innerHTML = this.addFirstZero(
        fragment.getElementById("get_place").innerText,
        3
      );

      let uuid = fragment.getElementById("get_uuid").innerHTML;
      let first_uuid = uuid.substring(0, uuid.length - 14);
      let second_uuid = uuid.substring(uuid.length - 14, uuid.length);

      fragment.getElementById("get_uuid").innerHTML =
        first_uuid + "<b style='font-size:20px;'>" + second_uuid + "</b>";

      let special_num = fragment.getElementById("get_special_num").innerHTML;
      let first_special_num = special_num.substring(0, special_num.length - 14);
      let second_special_num = special_num.substring(
        special_num.length - 14,
        special_num.length
      );

      fragment.getElementById("get_special_num").innerHTML =
        first_special_num +
        "<b style='font-size:20px;'>" +
        second_special_num +
        "</b>";

      if (fragment.getElementById("wagon_class").value != "")
        fragment.getElementById("get_wagon_class").innerHTML =
          "/" + fragment.getElementById("wagon_class").value + " КЛ";

      return encode(
        [].map.call(fragment.children, (e) => e.outerHTML).join("\n")
      );
    },

    async dwnTicket(pack_num, trn_date, html_data) {
      var html = this.templateFormat(html_data);
      const response = await this.downloadTicket({
        pack_num,
        trn_date,
        html,
      });
      const source = "data:application/pdf;base64," + response.pdf;
      const fileName = "SmartTicket_" + response.file_name + ".pdf";
      this.$refs.dwn.href = source;
      this.$refs.dwn.download = fileName;
      this.$refs.dwn.click();
    },
    async sendToEmail(pack_num, trn_date, html_data) {  
      this.isLoading = true;    
      var html = this.templateFormat(html_data);
      const response = await this.sendTicketToEmail({
        pack_num,
        trn_date,
        html,
      });
      this.isLoading = false      
      if(response.code == 0) {
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
  async created() {
    try {
      const response = await api.fetchUserTicket(
        this.$route.query.pack_num,
        this.$route.query.trn_date
      );
      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        this.tickets = response.data.tickets;
      }
    } catch (error) {
      this.$toasted.global.my_app_error({
        message: error,
      });
    }
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
