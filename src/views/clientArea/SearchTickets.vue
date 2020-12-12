<template>
  <div class="full-container">
    <LeftSidebar />
    <div class="content">
      <Header :step-back-link="$t('backToSite')"  />
      <div class="search-tickets-content">
        <h1 class="search-tickets__title">{{ $t('ticketSearch') }}</h1>
        <svg width="1103" height="1" viewBox="0 0 1103 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="-8.15169e-08" y1="0.5" x2="1103" y2="0.499948" stroke="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="1" x2="1103" y2="1.00811" gradientUnits="userSpaceOnUse">
              <stop offset="0.0104167" stop-color="#3B76BB" stop-opacity="0"/>
              <stop offset="0.511111" stop-color="#3B76BB"/>
              <stop offset="1" stop-color="#3B76BB" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="tickets-properties">
          <div class="tickets-departure">
            <span class="ticket-departure__label">{{ $t("from") }}</span>
            <SelectDepartment ref="departmentSelect" />
            <div class="datepicker-department">
              <span class="ticket-datepicker-departure__label">{{ $t("departureDateShort") }}</span>
              <DatepickerDeparture />
            </div>
          </div>
          <div class="switch-direction">
            <button
                class="tickets-switch__btn"
                type="button"
                @click="switchStations()"
            >
              <svg width="55" height="52" viewBox="0 0 55 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4545 49.0909L2 39.0455L11.4545 29" stroke="#66B2FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.59089 39.0459L52.5 39.0459" stroke="#66B2FF" stroke-width="4" stroke-linecap="round"/>
                <path d="M43.0455 1.99991L52.5 12.0454L43.0455 22.0908" stroke="#66B2FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M51.9091 12.0449L2 12.0449" stroke="#66B2FF" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="tickets-arrival">
            <span class="ticket-arrival__label">{{ $t("to") }}</span>
            <SelectArrival />
            <div class="datepicker-arrival">
              <span class="ticket-datepicker-arrival__label">{{ $t("comebackDate") }}</span>
              <DatepickerArrival />
            </div>
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

<script>
  import LeftSidebar from "../../components/clientArea/LeftSidebar"
  import Header from "../../components/clientArea/Header"
  import SelectDepartment from "../../components/SelectDepartment"
  import SelectArrival from "../../components/SelectArrival"
  import DatepickerDeparture from "../../components/DatepickerDeparture";
  import DatepickerArrival from "../../components/DatepickerArrival";
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "SearchTickets",
    components: {
      LeftSidebar,
      Header,
      SelectDepartment,
      SelectArrival,
      DatepickerDeparture,
      DatepickerArrival
    },
    computed: {
      ...mapGetters([
        "getStations",
        "getArrivalStation",
        "getDepartmentStation",
        "getDepartmentDate",
        "getMetroStations",
        "allTrains",
      ]),
    },
    mounted() {
      this.$store.dispatch('fetchStations');
      this.$store.dispatch('fetchTrains');
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
        "clearSelectedTrains",
      ]),
      ...mapMutations(["setStations"]),
      
      async getData() {
        this.fetchStations();
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
                name: "TrainList",
              })
              .catch(() => {});

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
  }
</script>

<style lang="scss" scoped>
  .ts-form__help-links {
    justify-content: space-between;
  }
  .full-container {
    .content {
      .search-tickets-content {
        .search-tickets__title {
          color: #2A2A2A;
          font-weight: 500;
          font-size: 42px;
          text-align: center;
          margin: 0;
        }
        .tickets-properties {
          display: flex;
          justify-content: space-between;
          margin-top: 150px;
          .tickets-departure,
          .tickets-arrival {
            .ticket-departure__label,
            .ticket-arrival__label,
            .ticket-datepicker-departure__label,
            .ticket-datepicker-arrival__label {
              font-weight: 200;
              font-size: 22px;
              color: #6e6e6e;
              display: block;
            }
            .ticket-departure__label,
            .ticket-arrival__label {
              margin-bottom: 30px;
            }
            .datepicker-department,
            .datepicker-arrival{
              margin-top: 100px;
              .mx-datepicker {
                width: 100%;
              }
            }
            width: 510px;
          }
          .switch-direction {
            margin-top: 25px;
            .tickets-switch__btn {
              border: none;
              background-color: transparent;
              width: 85px;
              height: 85px;
              outline: none;
              svg {
                width: 100%;
                path {
                  transition: all .3s;
                }
              }
              &:hover {
                svg {
                  path:first-child,
                  path:nth-child(2) {
                    transform: translateX(-8px);
                  }
                  path:nth-child(3),
                  path:last-child {
                    transform: translateX(8px);
                  }
                }
              }
            }
          }
        }
      }
      .ts-form__submit {
        .btn--black {
          border-radius: 45px;
          width: 285px;
          height: 95px;
          margin-top: 105px;
        }
      }
    }
  }
</style>
