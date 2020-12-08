<template>
  <section ref="scheduleBlock" class="schedule-block">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :loader="loader"
      :color="color"
      :is-full-page="fullPage"
    ></loading>
    <div class="container">
      <div class="schedule" :class="{ 'schedule--dashed-line': showMetro }">
        <div class="info">
          <div class="info__left">
            <b class="info__time">
              {{
                formattedTime(
                  getTrainByNumber($route.params.trainNumber).departure_date
                )
              }}
            </b>
            <span class="info__direction">{{ departmentStationName }}</span>
          </div>
        </div>

        <div class="wagon-types">
          <span class="wagon-types__label">{{ $t("wagonType") }}:</span>
          <router-link
            v-if="getWagonsByType('К').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'К' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'К',
            }"
          >
            {{ $t("coupe") }} ({{ freePlacesQuantityByType("К") }})
          </router-link>

          <router-link
            v-if="getWagonsByType('П').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'П' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'П',
            }"
            >{{ $t("seat") }} ({{ freePlacesQuantityByType("П") }})</router-link
          >

          <router-link
            v-if="getWagonsByType('Л').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'Л' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'Л',
            }"
          >
            {{ $t("suite") }} ({{ freePlacesQuantityByType("Л") }})
          </router-link>

          <router-link
            v-if="getWagonsByType('М').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'М' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'М',
            }"
          >
            {{ $t("suite") }} ({{ freePlacesQuantityByType("М") }})
          </router-link>

          <router-link
            v-if="getWagonsByType('С1').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'С1' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'С1',
            }"
          >
            {{ $t("placeFirstClass") }} ({{ freePlacesQuantityByType("С1") }})
          </router-link>

          <router-link
            v-if="getWagonsByType('С2').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'С2' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'С2',
            }"
          >
            {{ $t("placeSecondClass") }} ({{ freePlacesQuantityByType("С2") }})
          </router-link>
          <router-link
            v-if="getWagonsByType('С3').length > 0"
            :to="{ name: 'wagonTypeTab', params: { wagonType: 'С3' } }"
            class="wagon-types__item"
            type="button"
            :class="{
              'wagon-types__item--active': this.$route.params.wagonType == 'С3',
            }"
          >
            {{ $t("placeThirdClass") }} ({{ freePlacesQuantityByType("С3") }})
          </router-link>
        </div>

        <div
          class="wagon-tabs__box wagon-tabs__box--compartment wagon-tabs__box--active"
        >
          <vuescroll :ops="ops">
            <div class="wagon-tabs wagon-tabs--active">
              <div
                v-for="(wagon, index) in tabs"
                :key="index"
                class="wagon-tab"
                :class="{
                  'wagon-tab--active': wagon.number == selected,
                }"
                @click="tabSelected(wagon.number)"
              >
                <div class="wagon-tab__title">
                  {{ $t("wagon") }}:
                  <span class="wagon-tab__number">{{ wagon.number }}</span>
                </div>
                <div class="wagon-tab__place">
                  {{ $t("availableSeats") }}:
                  <span class="wagon-tab__place-amount">{{
                    freePlacesQuantity(wagon)
                  }}</span>
                </div>
              </div>
            </div>
          </vuescroll>
          <!-- wagon-tabs-->
        </div>

        <TrainScheme
          :schemeType="currentScheme"
          :number="selected"
          :scheme="scheme"
        ></TrainScheme>
      </div>

      <MetroNotification v-if="showMetro" />
      <Metro v-if="showMetro" />

      <div class="result">
        <div class="result__info">
          <span class="result__item result__label"
            >{{ $t("totalPrice") }}:</span
          >
          <span class="result__item result__amount">
            {{
              getCart.length > 0
                ? parseFloat(getTotalPrice - 0.06).toFixed(2)
                : getTotalPrice
            }}
            {{ $t("UAH") }}</span
          >
        </div>

        <router-link
          class="btn btn--black result__btn"
          type="button"
          :to="{ name: $route.meta.clientArea ? 'cart-checkout' : 'cart' }"
          tag="button"
          :disabled="
            isCartEmpty ||
              ($store.getters.getIsMetroActive &&
                $store.getters.getSelectedMetroStation === null)
          "
          >{{ $t("toCartBtn") }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import sum from "lodash/sum";
import moment from "moment";
import vuescroll from "vuescroll";
import TrainScheme from "../components/TrainScheme";
import MetroNotification from "../components/MetroNotification";
import Metro from "../components/Metro";
import Loading from "vue-loading-overlay";

export default {
  name: "TrainSchedule",
  props: ["wagonType", "trainNumber"],
  components: {
    vuescroll,
    TrainScheme,
    MetroNotification,
    Metro,
    Loading,
  },

  watch: {
    $route: function() {
      this.updateTabsRouteChg();
    },
  },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",

      scheme: null,
      tabs: [],
      ops: {
        vuescroll: {
          mode: "slide",
          sizeStrategy: "percent",
          detectResize: true,
          zooming: false,
        },
        scrollPanel: {
          scrollingY: false,
        },
        bar: {
          showDelay: 700,
          onlyShowBarOnScroll: false,
          keepShow: false,
          background: "#c1c1c1",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0.3,
          size: "6px",
          disable: false,
        },
      },
    };
  },

  computed: {
    ...mapGetters([
      "getWagonsByType",
      "getStationNameById",
      "getDepartmentStation",
      "getArrivalStation",
      "getTrainByNumber",
      "getWagonByNumber",
      "getWagon",
      "getCart",
      "getTotalPrice",
      "getKyivStations",
      "getSelectedTab",
    ]),

    selected: {
      get() {
        return this.getSelectedTab;
      },
      set(value) {
        this.updateSelectedTab(value);
      },
    },
    isCartEmpty() {
      return this.$store.state.cart.cart.length == 0;
    },
    showMetro() {
      return (
        this.getKyivStations.includes(this.getDepartmentStation) ||
        this.getKyivStations.includes(this.getArrivalStation)
      );
    },
    currentScheme() {
      return this.$route.params.wagonType;
    },
    departmentStationName() {
      return this.getStationNameById(this.getDepartmentStation);
    },

    arrivalStationName() {
      return this.getStationNameById(this.getArrivalStation);
    },
  },
  methods: {
    ...mapActions(["fetchWagon", "updateSelectedTab"]),
    fetchData() {
      this.fetchWagon({
        train_num: this.$route.params.trainNumber,
        wagon_num: this.selected,
        wagon_type: this.$route.params.wagonType,
      })
        .then(() => {
          this.scheme = this.getWagon.scheme_id;
        })
        .catch((error) => {
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    },
    formattedTime(date) {
      return moment(date).format("HH:mm");
    },

    updateTabs() {
      this.tabs = this.getWagonsByType(this.$route.params.wagonType);
      if (this.getSelectedTab) {
        this.selected = this.getSelectedTab;
      } else {
        this.selected = this.tabs[0].number;
      }
    },

    updateTabsRouteChg() {
      this.tabs = this.getWagonsByType(this.$route.params.wagonType);
      this.selected = this.tabs[0].number;
      this.fetchData();
    },

    async tabSelected(number) {
      this.isLoading = true;
      await this.fetchWagon({
        train_num: this.$route.params.trainNumber,
        wagon_num: number,
        wagon_type: this.$route.params.wagonType,
      });
      this.scheme = this.getWagon.scheme_id;
      this.updateSelectedTab(number);
      this.isLoading = false;
    },
    freePlacesQuantityByType(type) {
      const wagons = this.getWagonsByType(type);
      let places = [];
      wagons.forEach((wagon) => {
        let quantity =
          wagon.places.lower +
          wagon.places.top +
          wagon.places.side_lower +
          wagon.places.top_side +
          wagon.places.sitting_class_1 +
          wagon.places.sitting_class_2 +
          wagon.places.sitting_class_3;
        places.push(quantity);
      });
      return sum(places);
    },

    freePlacesQuantity(wagon) {
      return (
        wagon.places.lower +
        wagon.places.top +
        wagon.places.side_lower +
        wagon.places.top_side +
        wagon.places.sitting_class_1 +
        wagon.places.sitting_class_2 +
        wagon.places.sitting_class_3
      );
    },
  },
  created() {
    this.updateTabs();
    this.fetchData();
  },
};
</script>

<style scoped>
.router-link__disabled {
  background-color: #7a7a7a;
  color: #d9d9d9;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

a {
  text-decoration: none;
  border-bottom: 1px dashed #3398ff;
}
.wagon-tabs .wagon-tab--active {
  background-image: url("../assets/img/svg/wagon.svg");
}
.wagon-tabs .wagon-tab--active:not(:first-child) {
  background-image: url("../assets/img/svg/wagon-rectangle.svg");
}

.schedule-block .schedule--dashed-line::after {
  background-image: url("../assets/img/svg/line-dashed.svg");
}
</style>
