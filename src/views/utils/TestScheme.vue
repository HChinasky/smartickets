<template>
  
    <div align="center" >
    <template>
    <!--<template v-if="isEticket">-->
      <vuescroll :ops="ops">
        <!--<component :is="componentName" v-bind="componentProps"></component>-->
        <component :is="$route.params.scheme" v-bind="componentProps"></component>
      </vuescroll>

    </template>

</div>  
 
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import "moment/locale/uk";
import vuescroll from "vuescroll";

import k22 from "../../components/schemes/schemes/k22";
import k01 from "../../components/schemes/schemes/k01";
import l20 from "../../components/schemes/schemes/l20";
import l06 from "../../components/schemes/schemes/l06";
import l60 from "../../components/schemes/schemes/l60";
import p01 from "../../components/schemes/schemes/p01";
import k65 from "../../components/schemes/schemes/k65";
import k68 from "../../components/schemes/schemes/k68";
import k66 from "../../components/schemes/schemes/k66";
import k67 from "../../components/schemes/schemes/k67";
import k55 from "../../components/schemes/schemes/k55";
import k40 from "../../components/schemes/schemes/k40";
import p65 from "../../components/schemes/schemes/p65";
import p66 from "../../components/schemes/schemes/p66";
import p67 from "../../components/schemes/schemes/p67";
import p68 from "../../components/schemes/schemes/p68";
import p43 from "../../components/schemes/schemes/p43";
import p55 from "../../components/schemes/schemes/p55";
import p77 from "../../components/schemes/schemes/p77";
import p78 from "../../components/schemes/schemes/p78";
import p73 from "../../components/schemes/schemes/p73";
import p41 from "../../components/schemes/schemes/p41";
import k02 from "../../components/schemes/schemes/k02";
import k05 from "../../components/schemes/schemes/k05";
import k07 from "../../components/schemes/schemes/k07";
import k11 from "../../components/schemes/schemes/k11";
import k21 from "../../components/schemes/schemes/k21";
import k32 from "../../components/schemes/schemes/k32";
import k41 from "../../components/schemes/schemes/k41";
import k42 from "../../components/schemes/schemes/k42";
import k43 from "../../components/schemes/schemes/k43";
import k44 from "../../components/schemes/schemes/k44";
import k46 from "../../components/schemes/schemes/k46";
import k47 from "../../components/schemes/schemes/k47";
import k48 from "../../components/schemes/schemes/k48";
import k53 from "../../components/schemes/schemes/k53";
import k54 from "../../components/schemes/schemes/k54";
import k56 from "../../components/schemes/schemes/k56";
import k69 from "../../components/schemes/schemes/k69";
import l01 from "../../components/schemes/schemes/l01";
import l02 from "../../components/schemes/schemes/l02";
import l07 from "../../components/schemes/schemes/l07";
import l08 from "../../components/schemes/schemes/l08";
import p33 from "../../components/schemes/schemes/p33";
import p44 from "../../components/schemes/schemes/p44";
import p45 from "../../components/schemes/schemes/p45";
import p46 from "../../components/schemes/schemes/p46";
import p47 from "../../components/schemes/schemes/p47";
import p48 from "../../components/schemes/schemes/p48";
import p49 from "../../components/schemes/schemes/p49";
import p50 from "../../components/schemes/schemes/p50";
import p52 from "../../components/schemes/schemes/p52";
import p54 from "../../components/schemes/schemes/p54";
import p70 from "../../components/schemes/schemes/p70";
import p74 from "../../components/schemes/schemes/p74";
import p75 from "../../components/schemes/schemes/p75";
import p76 from "../../components/schemes/schemes/p76";
import p72 from "../../components/schemes/schemes/p72";
import s10 from "../../components/schemes/schemes/s10";
import s21 from "../../components/schemes/schemes/s21";
import s23 from "../../components/schemes/schemes/s23";
import s24 from "../../components/schemes/schemes/s24";
import s25 from "../../components/schemes/schemes/s25";
import s26 from "../../components/schemes/schemes/s26";
import s27 from "../../components/schemes/schemes/s27";
import s29 from "../../components/schemes/schemes/s29";
import p40 from "../../components/schemes/schemes/p40";
import p42 from "../../components/schemes/schemes/p42";
import k45 from "../../components/schemes/schemes/k45";
import p51 from "../../components/schemes/schemes/p51";
import p79 from "../../components/schemes/schemes/p79";
import p71 from "../../components/schemes/schemes/p71";
import s22 from "../../components/schemes/schemes/s22";
import s28 from "../../components/schemes/schemes/s28";
import s30 from "../../components/schemes/schemes/s30";
import s31 from "../../components/schemes/schemes/s31";
import s41 from "../../components/schemes/schemes/s41";

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
    k67,
    s22,
    s28,
    s30,
    s31,
    s41
  },
  data() {
    return {
      componentIndex: 0,
      // componentName: null,
      price: 0,
      eticketSupported: true,
      ops: {
        vuescroll: {
          mode: "slide",
          sizeStrategy: "percent",
          //sizeStrategy: "number",
          detectResize: true,
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
/*
  props: {
    schemeType: { required: true },
    number: { required: true },
  },
  */

  methods: {
    ...mapActions(["fetchWagon"]),
    formattedTime(date) {
      return moment(date).format("HH:mm");
    },
  },
  /*
  asyncComputed: {
    async componentName() {
      await this.fetchWagon({
        train_num: this.$route.params.trainNumber,
        wagon_num: this.number,
        wagon_type: this.schemeType,
      });
      const wagon = this.getWagon;
      //var wagonName = wagon.mockup.name.replace(" ", "_");
      //var wagonName = wagon.scheme_id
      //return `${wagon.type.name}_${wagonName}`;
      return `${wagon.scheme_id}`;
    },
  },
  */
  computed: {
    ...mapGetters([
      "getWagon",
      "getWagonByNumber",
      "getTrainByNumber",
      "getStationNameById",
      "getArrivalStation",
    ]),

    componentProps() {
      if (this.componentIndex == 0) {
        return {
          name: this.name,
          number: this.number,
        };
      }
      return {}; // return empty object
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
