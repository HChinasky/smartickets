<template>
  <div class="ticket__tbody">
    <div v-for="(item, index) in allTrains" :key="index" class="ticket__tr">
      <div class="ticket__td ticket__td--distination">
        <div class="ticket__car-inf">
          <div class="ticket__car-mark">{{ item.number }}</div>
          <div class="ticket__car-type">
            <svg viewBox="0 0 27 32">
              <use
                v-if="!$route.meta.clientArea"
                :xlink:href="require('@/assets/img/sprite.svg') + '#icon-train'"
              />
              <use
                v-else
                :xlink:href="require('@/assets/img/sprite.svg') + '#icon-train-client-area'"
              />
            </svg>
            <span v-if="item.is_intercity_plus" class="car-type car-type--blue"
              >ІС+</span
            >
          </div>
          <!--<a href="#" class="ticket__map-link">На карті</a>-->
        </div>

        <div class="ticket-timeline">
          <div class="ticket-timeline__list">
            <div class="ticket-timeline__item">
              <strong>{{ station(item.station_from.code) }}</strong>
            </div>
            <div class="ticket-timeline__item">
              <strong>{{ station(item.station_to.code) }}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="ticket__td ticket__td--despature-time">
        <span class="ticket__mob-title">{{ $t("departure") }}</span>
        <div class="ticket__time">{{ formattedTime(item.departure_date) }}</div>
        <div class="ticket__date">{{ formattedDate(item.departure_date) }}</div>
      </div>

      <div class="ticket__td ticket__td--arrival-time">
        <span class="ticket__mob-title">{{ $t("arrival") }}</span>
        <div class="ticket__time">{{ formattedTime(item.arrival_date) }}</div>
        <div class="ticket__date">{{ formattedDate(item.arrival_date) }}</div>
      </div>

      <div class="ticket__td ticket__td--travel-time">
        <span class="ticket__mob-title">{{ $t("travelTime") }}:</span>

        <div class="ticket__travel-inf-outer">
          <div class="ticket__travel-min">
            {{ travelTime(item.departure_date, item.arrival_date) }}
          </div>
        </div>
      </div>
      <div class="ticket__td ticket__td--free-places">
        <div class="free-places">
          <div
            v-for="(item2, index) in item.places.wagons"
            :key="index"
            class="free-places__item"
          >
            <div class="free-places__desc">
              <div class="free-places__type">
                {{
                  item2.type.code == "С"
                    ? item2.type.code + item2.type.class
                    : item2.type.code
                }}
              </div>
              <div class="free-places__quantity">
                {{ freePlacesQuantity(item2) }}
              </div>
            </div>

            <button
              class="btn btn--black ticket__select"
              v-promise-btn
              @click="
                getData(
                  item.number,
                  item2.type.code == 'С'
                    ? item2.type.code + item2.type.class
                    : item2.type.code,
                    $route.meta.clientArea ? 'wagonClientArea' : 'wagon'
                )
              ">{{ $t("select") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import ukLocale from "moment/locale/uk";
moment.locale("uk", [ukLocale]);

export default {
  name: "TrainResult",
  computed: {
    ...mapGetters([
      "allTrains",
      "getDepartmentStation",
      "getArrivalStation",
      "getStationNameById",
      "getSelectedWagon",
    ]),
  },
  methods: {
    ...mapActions(["setCurrentWagon", "fetchTrain", "updateSelectedTab"]),
    station(code) {
      return this.getStationNameById(code);
    },
    fetchData(trainNumber) {
      this.fetchTrain(trainNumber);
     
    },

    async getData(trainNumber, wagonType, nameRouter) {
      await this.fetchTrain(trainNumber)
        .then(() => {
          this.updateSelectedTab(null);
          this.$store.commit("UNSET_CART");
          this.$store.commit("SET_REUSE_PAYMENT_SID", false);
            return this.$router.push({
              name: nameRouter,
              params: {
                trainNumber: trainNumber,
                wagonType: wagonType,
              },
            });
        })
        .catch((error) => {
          
          if (error.toString().includes("[PPCODE:104]")) {
            this.$toasted.global.my_app_error({
              type: "error",
              message: this.$t("trainNotFoundMsg"),
            });
          } else {
            this.$toasted.global.my_app_error({
              message: error.message,
            });
          }
        });
    },
    updateCurrentWagonState() {
      this.setCurrentWagon(0);
    },
    formattedDate(date) {
      if (this.$route.meta.clientArea)
        return moment(date).format("LL, dddd");
      else
        return moment(date).format("ll, dd");
    },
    formattedTime(date) {
      return moment(date).format("HH:mm");
    },

    freePlacesQuantity(wagon) {
      return (
        wagon.lower +
        wagon.top +
        wagon.side_lower +
        wagon.side_top +
        wagon.sitting_class_1 +
        wagon.sitting_class_2 +
        wagon.sitting_class_3
      );
    },

    travelTime(departure, arrival) {
      let start = moment.utc(departure);
      let end = moment.utc(arrival);
      let diff = end.diff(start) / 1000;

      if (diff > 86400) {
        let days = Math.trunc(diff / 86400);
        let h = Math.trunc((diff % 86400) / 3600);
        let m = Math.trunc(((diff % 86400) % 3600) / 60);
        return `${days} днів ${h} год. ${m} хв.`;
      } else {
        let h = Math.trunc((diff % 86400) / 3600);
        let m = Math.trunc(((diff % 86400) % 3600) / 60);
        return `${h} год. ${m} хв.`;
      }
    },
  },
};
</script>

<style scoped>
.btn--router_link {
  text-decoration: none;
}

.ticket-timeline__substract {
  background-image: url("../assets/img/svg/subtract.svg");
}

.ticket-timeline__item--transfer::before {
  background-image: url("../assets/img/svg/bordered-point.svg");
}

.ticket-timeline__item:last-child::before {
  background-image: url(../assets/img/svg/direction-arrow-down-short.svg);
}
</style>
