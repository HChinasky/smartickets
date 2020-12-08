<template>
  <main class="main" ref="trainView">
    <section class="ticket ticket--inner">
      <div class="container">
        <div class="ticket__inner">
          <div class="ticket__header">
            <router-link v-if="!$route.meta.clientArea" :to="{ name: 'trainsList', params: { return: true }}" class="go-back">
              <!-- <a class="go-back" href="#"> -->
              <svg
                  width="36"
                  height="23"
                  viewBox="0 0 36 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M36 11.5L2 11.5M2 11.5L13.4815 22M2 11.5L13.4815 0.999998"
                    stroke="#3398ff"
                    stroke-width="2"
                />
              </svg>
              <!-- <a class="go-back__text" @click="$router.go(-1)">{{$t("toSearchResults")}}</a>-->
              {{
              $t("toSearchResults")
              }}</router-link>
            
            <!--  </a> -->
          </div>
          <div class="ticket__table">
            <div class="ticket__thead">
              <div class="ticket__tr ticket__tr--transfer">
                <div class="ticket__th">{{ $t("from") }} — {{ $t("to") }}</div>
                <div class="ticket__th">{{ $t("departure") }}</div>
                <div class="ticket__th">{{ $t("arrival") }}</div>
                <div class="ticket__th">{{ $t("travelTime") }}</div>
                <div class="ticket__th">{{ $t("cost") }}</div>
                <div class="ticket__th">{{ $t("availableSeats") }}</div>
              </div>
            </div>
            <div class="ticket__tbody">
              <div class="ticket__tr ticket__tr--transfer">
                <div class="ticket__td ticket__td--distination">
                  <div class="ticket__car-inf">
                    <div class="ticket__car-mark">{{ getTrain.number }}</div>
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
                      <span class="car-type car-type--blue">ІС+</span>
                    </div>
                    <!--<a class="ticket__map-link" href="#">{{$t("onMap")}}</a>-->
                  </div>
                  <div class="ticket-timeline">
                    <div class="ticket-timeline__list">
                      <div class="ticket-timeline__item">
                        <strong>{{
                          getStationNameById(getDepartmentStation)
                          }}</strong>
                      </div>
                      
                      <div class="ticket-timeline__item">
                        <strong>{{
                          getStationNameById(getArrivalStation)
                          }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ticket__td ticket__td--despature-time">
                  <span class="ticket__mob-title">{{ $t("departure") }}</span>
                  <div class="ticket__time">
                    {{
                    formattedTime(
                    getTrainByNumber(getTrain.number).departure_date
                    )
                    }}
                  </div>
                  <div class="ticket__date">
                    {{
                    formattedDate(
                    getTrainByNumber(getTrain.number).departure_date
                    )
                    }}
                  </div>
                </div>
                <div class="ticket__td ticket__td--arrival-time">
                  <span class="ticket__mob-title">{{ $t("arrival") }}</span>
                  <div class="ticket__time">
                    {{
                    formattedTime(
                    getTrainByNumber(getTrain.number).arrival_date
                    )
                    }}
                  </div>
                  <div class="ticket__date">
                    {{
                    formattedDate(
                    getTrainByNumber(getTrain.number).arrival_date
                    )
                    }}
                  </div>
                </div>
                <div class="ticket__td ticket__td--travel-time">
                  <span class="ticket__mob-title">{{ $t("travelTime") }}:</span>
                  <div class="ticket__travel-inf-outer">
                    <div class="ticket__travel-min">{{ travelTime }}</div>
                  </div>
                </div>
                <div class="ticket__td ticket__td--cost">
                  <span class="ticket__mob-title">{{ $t("cost") }}:</span>
                  <div class="ticket__cost">
                    {{ $t("costFrom") }}&nbsp; <span>{{ minTicketCost }}</span
                  >&nbsp;{{ $t("UAH") }}
                  </div>
                </div>
                <div class="ticket__td ticket__td--transfer">
                  <span class="ticket__mob-title"
                  >{{ $t("availableSeats") }}:</span
                  >
                  <div class="ticket__travel-inf-outer">
                    <div class="ticket__travel-hours">
                      {{ freePlacesQuantity }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
  import { mapGetters } from "vuex";
  import moment from "moment";
  import sum from "lodash/sum";
  import min from "lodash/min";
  export default {
    name: "Train",
    props: ["trainNumber", "wagonType"],
    computed: {
      ...mapGetters([
        "getTrain",
        "getStationNameById",
        "getTrainByNumber",
        "getWagonsByType",
        "getArrivalStation",
        "getDepartmentStation",
      ]),

      freePlacesQuantity() {
        const wagons = this.getTrain.wagons;
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
      minTicketCost() {
        const wagons = this.getTrain.wagons;
        let prices = [];

        wagons.forEach((wagon) => {
          let cost = wagon.cost.value;
          prices.push(cost);
        });
        return min(prices);
      },
      travelTime() {
        const departure = this.getTrainByNumber(this.$route.params.trainNumber)
          .departure_date;

        const arrival = this.getTrainByNumber(this.$route.params.trainNumber)
          .arrival_date;
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
    methods: {
      station(code) {
        return this.getStationNameById(code);
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
    },
    /*
    mounted() {
      this.$scrollTo(this.$refs.trainView, 1200);
    },
    updated() {
      this.$scrollTo(this.$refs.trainView, 1200);
    },
    */
  };
</script>

<style scoped>
  .ticket-timeline__substract {
    background-image: url(../assets/img/svg/subtract.svg);
  }
  
  .ticket-timeline__item:last-child::before {
    background-image: url(../assets/img/svg/direction-arrow-down-short.svg);
  }
  
  .ticket-timeline__item--transfer::before {
    background-image: url(../assets/img/svg/bordered-point.svg);
  }
  
  a {
    color: inherit;
  }
</style>
