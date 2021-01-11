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
                @click="dwnTicket(item.pack_num, item.pay_time, item)"
              >
                {{ $t("downloadTicket") }}
              </button>
            </div>
            <div class="client-tickets__link">
              <button
                @click="sendToEmail(item.pack_num, item.pay_time, item)"
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
    ...mapActions(["downloadTicket", "sendTicketToEmail", "fetchUserTicket"]),
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
      win.document.body.innerHTML = item.html_data.slice(0).reverse().map((html) => decode(this.removeSecondHeader(html, item.ticketLength)));
    },
    
    removeSecondHeader(html, countTickets) {
      var fragment = document
        .createRange()
        .createContextualFragment(decode(html)),
      lastHeader = fragment.querySelector(".ticket-container:last-child [class=ticket__header]"),
      lastSmartTicketInfo = fragment.querySelector(".ticket-container:last-child [class=ticket-description__block]"),
      
      text_info = fragment.getElementById("text_info");
      if(text_info) {
        fragment.getElementById("text_info").innerHTML = text_info
          .innerHTML.trim()
          .slice(1, -1);

        var textInfoHTML = text_info.innerHTML;
        var linesCount = textInfoHTML.match(/br/g).length + 1;
      }
      var margin = 0;
      switch (linesCount) {
        case 2:
          margin = 0;
          break;
        case 3:
          margin = 0;
          break;
        case 4:
          margin = 55;
          break;
        default:
          break;
      }

      var elem = fragment.querySelector("#ticketTableFooter"),
          get_wagon_num = fragment.getElementById("get_wagon_num"),
          get_place = fragment.getElementById("get_place");
      if(elem) {
        elem.style.marginBottom = `${margin}px`;
      }
      if(text_info) {
        text_info.innerHTML = text_info.innerText;
      }
      if(get_wagon_num) {
        get_wagon_num.innerHTML = this.addFirstZero(
          get_wagon_num.innerText,
          2
        );
      }
      if(get_place) {
        get_place.innerHTML = this.addFirstZero(
          get_place.innerText,
          3
        );
      }
 
      if(fragment.getElementById("get_uuid")) {
        let uuid = fragment.getElementById("get_uuid").innerHTML;
        let first_uuid = uuid.substring(0, uuid.length - 14),
          second_uuid = uuid.substring(uuid.length - 14, uuid.length);
        fragment.getElementById("get_uuid").innerHTML =
          first_uuid + "<p style='font-size:14px;font-weight: 600'>" + second_uuid + "</p>";
      }


      if(fragment.getElementById("get_special_num")) {
        let special_num = fragment.getElementById("get_special_num").innerText;
        let first_special_num = special_num.substring(0, special_num.length - 14),
          second_special_num = special_num.substring(
            special_num.length - 14,
            special_num.length
          );
        fragment.getElementById("get_special_num").innerHTML =
          first_special_num +
          "<b style='font-size:14px;'>" +
          second_special_num +
          "</b>";
      }


      if (fragment.getElementById("wagon_class") && fragment.getElementById("wagon_class").value != "")
        fragment.getElementById("get_wagon_class").innerHTML =
          "/" + fragment.getElementById("wagon_class").value + " КЛ";

      if(lastHeader && lastSmartTicketInfo && countTickets > 1) {
        lastHeader.innerHTML = "";
        lastSmartTicketInfo.innerHTML = "";
        lastHeader.classList.add("mt-20")
        lastHeader.classList.add("mt-20")
      }
      return encode(
        [].map.call(fragment.children, (e) => e.outerHTML).join("\n")
      );
    },
    
    async dwnTicket(pack_num, trn_date, item) {
      var htmlArr = [],
          html = "";
      htmlArr.push(item.ticketLength > 1 ? item.html_data.slice(0).reverse().map((htmlArr) => decode(this.removeSecondHeader(htmlArr, item.ticketLength))) : item.html_data.map((htmlArr) => decode(htmlArr)))
      html = encode(htmlArr.join());
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
    async sendToEmail(pack_num, trn_date, item) {
      this.isLoading = true;
      var htmlArr = [], html = "";
      htmlArr.push(item.ticketLength > 1 ? item.html_data.slice(0).reverse().map((htmlArr) => decode(this.removeSecondHeader(htmlArr, item.ticketLength))) : item.html_data.map((htmlArr) => decode(htmlArr)))
      html = encode(htmlArr.join());
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
    await api.fetchUserTicket(
      this.$route.query.pack_num,
      this.$route.query.trn_date
    ).then((response) => {
      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        let infoArr = {},
          htmlData = [];
        for (const key in response.data.tickets) {
          htmlData.push(response.data.tickets[key][0].html_data);
          infoArr = [{
            fio: response.data.tickets[key][0].fio,
            pay_time: response.data.tickets[key][0].pay_time,
            pack_num: response.data.tickets[key][0].pack_num,
            payment_no: response.data.tickets[key][0].payment_no,
            html_data: htmlData,
            ticketLength: Object.keys(response.data.tickets).length
          }];
        }
        this.tickets = infoArr;
      }
    }).catch((error) => {
      this.$toasted.global.my_app_error({
        message: error,
      });
    })
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
