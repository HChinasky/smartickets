<template>
  <span>
    
    <template v-if="isEticket">
      <vuescroll :ops="ops">
        <component :is="componentName" v-bind="componentProps"></component>
      </vuescroll>
      <ul class="hints">
        <li class="hints__item hints__item--dark-blue">{{ $t("topSeat") }}</li>
        <li class="hints__item hints__item--light-blue">
          {{ $t("bottomSeat") }}
        </li>
        <li class="hints__item hints__item--gray">{{ $t("takenSeat") }}</li>
        <li class="hints__item hints__item--orange">
          {{ $t("selectedSeat") }}
        </li>
      </ul>
      <div class="info info--bottom">
        <div class="info__left">
          <b class="info__time">
            {{
              formattedTime(
                getTrainByNumber($route.params.trainNumber).arrival_date
              )
            }}
          </b>
          <span class="info__direction">{{ arrivalStationName }}</span>
        </div>
        <div class="info__price">
          <span class="info__price-label">{{ $t("ticketPrice") }}:</span>
          <b class="info__price-amount">{{ currentPrice }} {{ $t("UAH") }}</b>
        </div>
      </div>
    </template>

    <div v-if="isEticket === false">
      <h3 class="eticket_error">{{ $t("eticketErrorMsg") }}</h3>
      <div class="info info--bottom">
        <div class="info__left">
          <b class="info__time">
            {{
              formattedTime(
                getTrainByNumber($route.params.trainNumber).arrival_date
              )
            }}
          </b>
          <span class="info__direction">{{ arrivalStationName }}</span>
        </div>
      </div>
    </div>
   
  </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import "moment/locale/uk";
import vuescroll from "vuescroll";
import k22 from "./schemes/schemes/k22";
import k01 from "./schemes/schemes/k01";
import l20 from "./schemes/schemes/l20";
import l06 from "./schemes/schemes/l06";
import l60 from "./schemes/schemes/l60";
import p01 from "./schemes/schemes/p01";
import k65 from "./schemes/schemes/k65";
import k68 from "./schemes/schemes/k68";
import k66 from "./schemes/schemes/k66";
import k67 from "./schemes/schemes/k67";
import k55 from "./schemes/schemes/k55";
import k40 from "./schemes/schemes/k40";
import p65 from "./schemes/schemes/p65";
import p66 from "./schemes/schemes/p66";
import p67 from "./schemes/schemes/p67";
import p68 from "./schemes/schemes/p68";
import p43 from "./schemes/schemes/p43";
import p55 from "./schemes/schemes/p55";
import p77 from "./schemes/schemes/p77";
import p78 from "./schemes/schemes/p78";
import p73 from "./schemes/schemes/p73";
import p41 from "./schemes/schemes/p41";
import k02 from "./schemes/schemes/k02";
import k05 from "./schemes/schemes/k05";
import k07 from "./schemes/schemes/k07";
import k11 from "./schemes/schemes/k11";
import k21 from "./schemes/schemes/k21";
import k32 from "./schemes/schemes/k32";
import k41 from "./schemes/schemes/k41";
import k42 from "./schemes/schemes/k42";
import k43 from "./schemes/schemes/k43";
import k44 from "./schemes/schemes/k44";
import k46 from "./schemes/schemes/k46";
import k47 from "./schemes/schemes/k47";
import k48 from "./schemes/schemes/k48";
import k53 from "./schemes/schemes/k53";
import k54 from "./schemes/schemes/k54";
import k56 from "./schemes/schemes/k56";
import k69 from "./schemes/schemes/k69";
import l01 from "./schemes/schemes/l01";
import l02 from "./schemes/schemes/l02";
import l07 from "./schemes/schemes/l07";
import l08 from "./schemes/schemes/l08";
import p33 from "./schemes/schemes/p33";
import p44 from "./schemes/schemes/p44";
import p45 from "./schemes/schemes/p45";
import p46 from "./schemes/schemes/p46";
import p47 from "./schemes/schemes/p47";
import p48 from "./schemes/schemes/p48";
import p49 from "./schemes/schemes/p49";
import p50 from "./schemes/schemes/p50";
import p52 from "./schemes/schemes/p52";
import p54 from "./schemes/schemes/p54";
import p70 from "./schemes/schemes/p70";
import p74 from "./schemes/schemes/p74";
import p75 from "./schemes/schemes/p75";
import p76 from "./schemes/schemes/p76";
import p72 from "./schemes/schemes/p72";
import s10 from "./schemes/schemes/s10";
import s21 from "./schemes/schemes/s21";
import s23 from "./schemes/schemes/s23";
import s24 from "./schemes/schemes/s24";
import s25 from "./schemes/schemes/s25";
import s26 from "./schemes/schemes/s26";
import s27 from "./schemes/schemes/s27";
import s29 from "./schemes/schemes/s29";
import p40 from "./schemes/schemes/p40";
import p42 from "./schemes/schemes/p42";
import k45 from "./schemes/schemes/k45";
import p51 from "./schemes/schemes/p51";
import p79 from "./schemes/schemes/p79";
import p71 from "./schemes/schemes/p71";
import s22 from "./schemes/schemes/s22";
import s28 from "./schemes/schemes/s28";
import s30 from "./schemes/schemes/s30";
import s31 from "./schemes/schemes/s31";
import s41 from "./schemes/schemes/s41";

export default {
  name: "TrainScheme",
  components: {   
    vuescroll,
    k22,
    k01,
    l06,
    l20,
    l60,
    p01,
    k65,
    k68,
    k66,
    k67,
    k55,
    k40,
    p65,
    p66,
    p67,
    p68,
    p43,
    p55,
    p77,
    p78,
    p73,
    p41,
    k02,
    k05,
    k07,
    k11,
    k21,
    k32,
    k41,
    k42,
    k43,
    k44,
    k46,
    k47,
    k48,
    k53,
    k54,
    k56,
    k69,
    l01,
    l02,
    l07,
    l08,
    p33,
    p44,
    p45,
    p46,
    p47,
    p48,
    p49,
    p50,
    p52,
    p54,
    p70,
    p74,
    p75,
    p76,
    p72,
    s10,
    s21,
    s23,
    s24,
    s25,
    s26,
    s27, 
    s29,
    p40,
    p42,
    k45,
    p51,
    p79,
    p71,
    s22,
    s28,
    s30,
    s31,
    s41
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
      componentIndex: 0,      
      price: 0,
      eticketSupported: true,
      ops: {
        vuescroll: {
          mode: "slide",
          sizeStrategy: "percent",          
          zooming: false,
        },
        scrollPanel: {
          scrollingY: false,
        },
        rail: {},
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#c1c1c1",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false,
        },
      },
    };
  },

  props: {
    schemeType: { required: true },
    number: { required: true },
    scheme: { required: true },
  },

  methods: {
    ...mapActions(["fetchWagon"]),
    formattedTime(date) {
      return moment(date).format("HH:mm");
    },
  },  
  computed: {
    ...mapGetters([
      "getWagon",
      "getWagonByNumber",
      "getTrainByNumber",
      "getStationNameById",
      "getArrivalStation",
    ]),
    componentName() {    
    return this.scheme

     },

    componentProps() {
      if (this.componentIndex == 0) {
        return {
          name: this.name,
          number: this.number,
        };
      }
      return {}; 
    },
    isEticket() {
      return this.getWagon.support_eticket;
    },
    arrivalStationName() {
      return this.getStationNameById(this.getArrivalStation);
    },
    currentPrice() {
      return this.getWagonByNumber(this.number).cost.value;
    },
  },
};
</script>

<style scoped>
.eticket_error {
  padding-top: 35px;
  padding-bottom: 35px;
  display: flex;
  justify-content: center;
}
</style>
