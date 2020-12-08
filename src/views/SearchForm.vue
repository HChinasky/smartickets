<template>
  <span>
    <section class="ticket-search">
      <template v-if="$appConfig.siteOnMaintenance">
      <div class="container">
         <h2 style="text-align: center;"><img src="/static/tech.png"><br> {{$t("maintenanceMsg")}}. <br>{{$t("maintenanceMsg2")}}!</h2>
      </div>
      </template>
      <template v-if="!$appConfig.siteOnMaintenance">
      <div class="container">
        <div class="step-back__block">
          <a v-back class="back-to-site__link">
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
            {{ $t('backToChooseTypeTrips') }}
          </a>
        </div>
        <h2 class="ticket-search__title">{{ $t("ticketSearchOnline") }}</h2>
        <div class="ts-form">
          <div class="ts-form__inner">
            <div class="ts-form__where-from">
              <div class="ts-form__group ts-form__group--swap">
                <label class="ts-form__label" for="departure-city">{{
                  $t("from")
                }}</label>

                <SelectDepartment ref="departmentSelect"></SelectDepartment>
              </div>
              <div class="ts-form__row">
                <div class="ts-form__group">
                  <label class="ts-form__label" for="departure-date">{{
                    $t("departureDate")
                  }}</label>

                  <DatepickerDeparture
                      :get-link="'getDepartmentDate'"
                      :update-date="'updateDepartmentDate'"
                  />
                </div>
                <div class="ts-form__group">
                  <label class="ts-form__label" for="return-date">{{
                    $t("comebackDate")
                  }}</label>
                  <DatepickerArrival
                      :get-link="'getArrivalDate'"
                      :update-date="'updateArrivalDate'"
                  />
                </div>
              </div>
            </div>
            <button
              class="ts-form__switch"
              type="button"
              @click="switchStations()"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-10 -15 60 60"
              >
                <path
                  fill="none"
                  stroke="#3398ff"
                  stroke-linejoin="miter"
                  stroke-linecap="butt"
                  stroke-miterlimit="4"
                  stroke-width="2.2857"
                  d="M26.286 8.571h-24M2.286 8.571l8.105-7.429M2.286 8.571l8.105 7.429"
                />
                <path
                  fill="none"
                  stroke="#3398ff"
                  stroke-linejoin="miter"
                  stroke-linecap="butt"
                  stroke-miterlimit="4"
                  stroke-width="2.2857"
                  d="M13.714 23.429h24M37.714 23.429l-8.105 7.429M37.714 23.429l-8.105-7.429"
                />
              </svg>
            </button>
            <div class="ts-form__where-to">
              <div class="ts-form__group ts-form__group--swap">
                <label class="ts-form__label" for="arrival-city">{{
                  $t("to")
                }}</label>
                <SelectArrival></SelectArrival>
              </div>
            </div>
          </div>
          <div class="ts-form__submit">
            <button class="btn btn--black" v-promise-btn @click="getData">
              {{ $t("ticketSearchBtn") }}
            </button>
          </div>
        </div>
      </div>
      </template>
    </section>
    <div ref="trainsView">
      <router-view></router-view>
    </div>
    <PopularRoutes />
  </span>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import SelectDepartment from "../components/SelectDepartment";
import SelectArrival from "../components/SelectArrival";
import DatepickerDeparture from "../components/DatepickerDeparture";
import DatepickerArrival from "../components/DatepickerArrival";
import PopularRoutes from "../components/PopularRoutes";
import { mapGetters, mapActions, mapMutations } from "vuex";

//var VueScrollTo = require('vue-scrollto');

export default {
  components: {
    SelectDepartment,
    SelectArrival,
    DatepickerDeparture,
    DatepickerArrival,
    PopularRoutes,
  },
  computed: {
    ...mapGetters([
      "getStations",
      "getArrivalStation",
      "getDepartmentStation",
      "getDepartmentDate",
      "getMetroStations",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchStations",
      "fetchTrains",
      "regClient",
      "updateClientInfo",
      "fetchMetroStations",
      "setDepartmentStation",
      "setArrivalStation",
      "clearSelectedStations",
      "clearSelectedDates",
      "clearSelectedTrains",
    ]),
    ...mapMutations(["setStations"]),

    /*
    clearStorage(route) {
      if (route === "/") {
        this.clearSelectedStations();
        this.clearSelectedDates();
      } else if (route === "/trains") {
        if(this.$route.params.return != true) {
        this.clearSelectedStations();
        this.clearSelectedDates();
        this.clearSelectedTrains();
        this.$router.replace("/")
        }
      }
    },
    */

    async getData() {
      if (!this.getDepartmentStation) {
        this.$toasted.global.my_app_error({
          message: this.$t("selectDepartureStation"),
        });
        return false;
      }

      if (!this.getArrivalStation) {
        this.$toasted.global.my_app_error({
          message: this.$t("selectArrivalStation"),
        });
        return false;
      }

      if (this.getArrivalStation == this.getDepartmentStation) {
        this.$toasted.global.my_app_error({
          message: this.$t("mustBeDifferentStations"),
        });
        return false;
      }

      if (!this.getDepartmentDate) {
        this.$toasted.global.my_app_error({
          message: this.$t("selectDepartureDate"),
        });
        return false;
      }

      await this.fetchTrains()
        .then(() => {
          //fetch trains
          //return this.$router.push({ name: "trains" });
          this.$router
            .push({
              name: "trainsList",
            })
            .catch((err) => {console.log(err)});

          // this.$scrollTo(this.$refs.trainsView, 1200, {easing: "ease-in-out"})

          /*
          return this.$router.push({
            name: "trainsList",
            query: {
              t: new Date().getTime(),
            },
          });
          */
        })
        .catch((error) => {
          console.log(error);
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

    switchStations() {
      const temp = this.getArrivalStation;
      this.setArrivalStation(this.getDepartmentStation);
      this.setDepartmentStation(temp);
    },
  },
  created() {
    /*
    window.addEventListener(
      "beforeunload",
      this.clearStorage(window.location.pathname)
    );
    */

    this.updateClientInfo();
    this.regClient()
      .then(() => {
        if (this.getStations.length == 0) {
          this.fetchStations()
            .then(() => {})
            .catch((error) => {
              this.$toasted.global.my_app_error({
                message: error.message,
              });
            });
        }
      })
      .catch((error) => {
        this.$toasted.global.my_app_error({
          message: error.message,
        });
      });

    if (this.getMetroStations.length == 0) {
      this.fetchMetroStations()
        .then(() => {})
        .catch((error) => {
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  .v-select {
    border: none;
  }

  @media (max-width: 768px) {
    .ts-form__row {
      flex-direction: column;
      align-items: flex-start;
    }
    .ts-form__group {
      padding-bottom: 16px;
    }
  }
  
  .btn--router_link {
    text-decoration: none;
  }
  .ticket-search {
      padding: 20px 0 150px 0;
      background-color: #fff;
    .step-back__block {
      margin-bottom: 40px;
      .back-to-site__link {
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: color .2s;
        &:hover {
          color: $SECOND_FONT_COLOR;
        }
        svg {
          margin-right: 20px;
        }
      }
    }
  }
  
  
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
