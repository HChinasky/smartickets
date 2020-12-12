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
        <div class="ts-form">
        <h2 class="ticket-search__title">{{ $t("searchSkyUpTicket") }}</h2>
          <div class="ts-form__inner">
            <div class="ts-form__where-from">
              <div class="ts-form__group ts-form__group--swap">
                <label class="ts-form__label">{{
                  $t("cityOfDeparture")
                }}</label>

                <SelectDepartmentAircraft ref="departmentSelect"/>
              </div>
              <div class="ts-form__row">
                <div class="ts-form__group">
                  <label class="ts-form__label">{{
                    $t("departureDateShort")
                  }}</label>

                  <DatepickerDeparture
                      :hide-help-links="true"
                      :get-link="'getCityDepartmentDate'"
                      :update-date="'updateCityDepartmentDate'"
                  />
                </div>
                <button
                    class="ts-form__switch mobile"
                    type="button"
                    @click="switchCities()"
                >
              <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.73998 35.3032L2.00012 28.1421L8.73998 20.981" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.42132 28.1421L38 28.1421" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
                <path d="M31.2601 1.73347L38 8.89457L31.2601 16.0557" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M37.5788 8.89454L2.00012 8.89453" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
              </svg>

            </button>
                <div class="ts-form__group">
                  <label class="ts-form__label">{{
                    $t("back")
                  }}</label>
                  <DatepickerArrival
                      :hide-help-links="true"
                      :get-link="'getCityArrivalDate'"
                      :update-date="'updateCityArrivalDate'"
                  />
                </div>
              </div>
            </div>
            <button
                class="ts-form__switch desktop"
                type="button"
                @click="switchCities()"
            >
              <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.73998 35.3032L2.00012 28.1421L8.73998 20.981" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.42132 28.1421L38 28.1421" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
                <path d="M31.2601 1.73347L38 8.89457L31.2601 16.0557" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M37.5788 8.89454L2.00012 8.89453" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
              </svg>

            </button>
            <div class="ts-form__where-to">
              <div class="ts-form__group ts-form__group--swap">
                <label class="ts-form__label">{{
                  $t("cityOfArrival")
                }}</label>
                <SelectArrivalAircraft/>
              </div>
              
            <div class="count-passengers">
              <div class="form-group">
                <label>{{ $t('adults') }}</label>
                <span class="increase_btn" @click="increase('ADT');">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-increment'
                                "
                    />
                  </svg>
                </span>
                <p class="passengers adult">{{getCountAdult}}</p>
                <span
                    :class="{ disableDecr: getCountAdult === 1 }"
                    class="decrease_btn"
                    @click="decrease('ADT')">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-decrement'
                                "
                    />
                  </svg>
                </span>
              </div>
              <div class="form-group">
                <label>{{ $t('teenagers') }}</label>
                <span class="increase_btn"  @click="increase('CHD')">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-increment'
                                "
                    />
                  </svg>
                </span>
                <p class="passengers teenager">{{getCountTeenager}}</p>
                <span
                    :class="{ disableDecr: getCountTeenager === 0 }"
                    class="decrease_btn"
                    @click="decrease('CHD')">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-decrement'
                                "
                    />
                  </svg>
                </span>
              </div>
              <div class="form-group">
                <label>{{ $t('kids') }}</label>
                <span class="increase_btn" @click="increase('INF');">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-increment'
                                "
                    />
                  </svg>
                </span>
                <p class="passengers teenager">{{getCountChildren}}</p>
                <span
                    :class="{ disableDecr: getCountChildren === 0 }"
                    class="decrease_btn"
                    @click="decrease('INF')">
                  <svg viewBox="0 0 18 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use
                        :xlink:href="
                                  require('@/assets/img/sprite.svg') +
                                    '#icon-decrement'
                                "
                    />
                  </svg>
                </span>
              </div>
            </div>
            </div>
          </div>
          <div class="ts-form__submit">
            <button class="btn btn--black" v-promise-btn @click="getData" :disabled="!getDepartmentCity || !getArrivalCity || !getCityDepartmentDate">
              {{ $t("findTickets") }}
            </button>
          </div>
        </div>
      </div>
      </template>
    </section>
    <div ref="aircraftsView">
      <router-view
          :departmentTicket="departmentFlight"
          :arrivalTicket="arrivalFlight"
      />
    </div>
  </span>
</template>

<script>
  import { mapMultiRowFields } from 'vuex-map-fields';
  import SelectDepartmentAircraft from "../../components/aircraft/SelectDepartmentAircraft"
  import SelectArrivalAircraft from "../../components/aircraft/SelectArrivalAircraft";
  import DatepickerDeparture from "../../components/DatepickerDeparture";
  import DatepickerArrival from "../../components/DatepickerArrival";
  import { mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "SearchAircraftTicket",
    components: {
      SelectDepartmentAircraft,
      SelectArrivalAircraft,
      DatepickerDeparture,
      DatepickerArrival
    },
    data() {
      return {
        teenagersAge: 0,
        kidsAge: 0,
        departmentFlight: [],
        arrivalFlight: []
      }
    },
    computed: {
      ...mapMultiRowFields(['passenger']),
      ...mapGetters([
        "getArrivalCity",
        "getDepartmentCity",
        "getDepartmentCityCode",
        "getArrivalCityCode",
        "getCityDepartmentDate",
        "allAircrafts",
        "getCountAdultByType",
        "getPassengersByType",
        "aircrafts"
      ]),
      getCountAdult() {
        return this.getPassengersByType('ADT')
      },
      getCountTeenager() {
        return this.getPassengersByType('CHD')
      },
      getCountChildren() {
        return this.getPassengersByType('INF')
      },
    },
    methods: {
      ...mapMutations(["addPassengerRow", "removePassengerRow"]),
      ...mapActions([
        "fetchCity",
        "regClient",
        "fetchAircrafts",
        "setDepartmentCity",
        "setArrivalCity",
        "setArrivalCityCode",
        "setDepartmentCityCode",
        "regClient",
        "updateClientInfo"
      ]),
      increase: function(typePassenger){
        this.$store.commit("addPassengerRow", typePassenger);
      },
      decrease: function(type){
        if(type !== "ADT" && this.getPassengersByType(type) !== 0) {
          this.$store.commit("removePassengerRow", type);
        }
      },
      async getData() {
        
        if (!this.getDepartmentCity) {
          this.$toasted.global.my_app_error({
            message: this.$t("selectDepartureStation"),
          });
          return false;
        }

        if (!this.getArrivalCity) {
          this.$toasted.global.my_app_error({
            message: this.$t("selectArrivalStation"),
          });
          return false;
        }

        if (this.getArrivalCity == this.getDepartmentCity) {
          this.$toasted.global.my_app_error({
            message: this.$t("mustBeDifferentStations"),
          });
          return false;
        }

        if (!this.getCityDepartmentDate) {
          this.$toasted.global.my_app_error({
            message: this.$t("selectDepartureDate"),
          });
          return false;
        }
        
        await this.fetchAircrafts()
          .then(() => {
            this.$router
              .push({
                name: "AircraftList",
              })
              .catch(() => {});

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

        let departmentFlight = [],
            arrivalFlight    = [];
        
        if (this.allAircrafts) {
          for (var i = 0; i < this.allAircrafts.flights.length; i++) {
            for (var k = 0; k < this.allAircrafts.flights[i].routes.length; k++) {
              if (this.allAircrafts.flights[i].routes[k].backward === 1) {
                arrivalFlight.push(this.allAircrafts.flights[i].routes[k]);
                arrivalFlight[i]["amount"] = this.allAircrafts.flights[i].amount.UAH.toFixed(2);
                arrivalFlight[i]["resultId"] = this.allAircrafts.flights[i].resultId;
                arrivalFlight[i]["searchId"] = this.allAircrafts.flights[i].searchId;
              } else {
                departmentFlight.push(this.allAircrafts.flights[i].routes[k]);
                departmentFlight[i]["amount"] = this.allAircrafts.flights[i].amount.UAH.toFixed(2);
                departmentFlight[i]["resultId"] = this.allAircrafts.flights[i].resultId;
                departmentFlight[i]["searchId"] = this.allAircrafts.flights[i].searchId;
              }
            }
          }
          this.departmentFlight = departmentFlight;
          this.arrivalFlight = arrivalFlight;
        }
      },

      switchCities() {
        const temp = this.getArrivalCity;
        this.setArrivalCity(this.getDepartmentCity);
        this.setDepartmentCity(temp);

        const tempCode = this.getArrivalCityCode;
        this.setArrivalCityCode(this.getDepartmentCityCode);
        this.setDepartmentCityCode(tempCode);
      },
    },
    mounted() {
      this.$store.dispatch('fetchCity');
      this.$store.dispatch('fetchAirports');
    },
    created() {
      this.updateClientInfo();
      this.regClient()
        .then(() => {

        })
        .catch((error) => {
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .ticket-search {
    padding: 20px 0 150px 0;
    background-color: #fff;
    .container {
      @include respond-until(m) {
        padding: 0 15px;
      }
      .step-back__block {
        margin-bottom: 40px;
        @include respond-until(m) {
          display: none;
        }
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
      .ticket-search__title {
        @include respond-until(m) {
          font-size: 26px;
        }
        @include respond-to(m) {
          font-size: 32px;
        }
      }
      .ts-form {
        @include respond-until(m) {
          max-width: 750px;
          display: block;
          margin:  0 auto;
        }
        .ts-form__inner {
          flex-direction: row;
          @include respond-until(m) {
            padding-left: 0;
            flex-direction: column;
            width: 100%;
          }
          .ts-form__row {
            @include respond-until(m) {
              display: flex;
              flex-direction: column;
            }
          }
          .ts-form__where-from,
          .ts-form__where-to {
            @include respond-until(l) {
              max-width: 420px;
            }
            @include respond-until(md) {
              max-width: 380px;
            }
            @include respond-until(m) {
              max-width: 100%;
            }
            
            .ts-form__group {
              @include respond-until(m) {
                width: 100%;
              }
              ::v-deep .mx-datepicker {
                @include respond-until(l) {
                  width: 160px;
                }
                @include respond-until(md) {
                  width: 160px;
                }
                @include respond-until(m) {
                  width: 100%;
                }
              }
              label {
                color: $LABEL_COLOR;
                font-size: 1.7rem;
              }
              ::v-deep  span {
                .v-select.ts-form__input {
                  // border-color: $LABEL_COLOR;
                  input {
                    padding-left: 0;
                    &::placeholder {
                      font-weight: 100;
                      font-size: 17px;
                      color: $SECOND_FONT_COLOR;
                    }
                  }
                }
              }
            }
            .count-passengers {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .form-group {
                display: flex;
                flex-direction: column;
                width: 150px;
                position: relative;
                @include respond-until(l) {
                  width: 120px;
                }
                @include respond-until(m) {
                  width: 120px;
                }
                @include respond-until(xs) {
                  width: 95px;
                }
                @include respond-to(m) {
                  max-width: 200px;
                }
                @include respond-to(m) {
                  max-width: 200px;
                }
                @include respond-to(m) {
                  max-width: 100px;
                }
                label {
                  font-size: 1.7rem;
                  color: $LABEL_COLOR;
                  font-weight: 200;
                  white-space: nowrap;
                  @include respond-until(m) {
                    white-space: normal;
                    height: 45px;
                  }
                  @include respond-to(m) {
                    white-space: normal;
                    height: 45px;
                  }
                }
                .passengers {
                  border: none;
                  border-bottom: 2px solid #000;
                  outline: none;
                  height: 60px;
                  margin-top: 10px;
                  font-size: 36px;
                  font-weight: 500;
                  text-align: center;
                  margin-bottom: 0;
                  line-height: 1.7;
                  cursor: default;
                  &[type=number] {
                    -moz-appearance: textfield;
                  }
                  &::-webkit-outer-spin-button,
                  &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }
                }
                input.passenger {
                   border: none;
                   border-bottom: 2px solid #000;
                   outline: none;
                   height: 60px;
                   margin-top: 10px;
                   font-size: 36px;
                   font-weight: 500;
                   text-align: center;
                   &[type=number] {
                     -moz-appearance: textfield;
                   }
                   &::-webkit-outer-spin-button,
                   &::-webkit-inner-spin-button {
                     -webkit-appearance: none;
                     margin: 0;
                   }
                 }
                &:first-child {
                  .passengers {
                    background-image: url("../../assets/img/svg/adult-ticket.svg");
                    background-repeat: no-repeat;
                    background-size: 20px;
                  }
                }
                &:nth-child(2) {
                  input {
                    background-image: url("../../assets/img/svg/teenager-tickets.svg");
                    background-repeat: no-repeat;
                    background-size: 30px;
                    background-position: left bottom 10px;
                  }
                }
                &:last-child {
                  input {
                    background-image: url("../../assets/img/svg/teenager-tickets.svg");
                    background-repeat: no-repeat;
                    background-size: 20px;
                    background-position: left bottom 10px;
                  }
                }
                .increase_btn, .increase_btn,
                .decrease_btn, .decrease_btn {
                  position: absolute;
                  right: 0;
                  cursor: pointer;
                  &.disableDecr {
                    opacity: .5;
                  }
                  svg {
                    width: 18px;
                  }
                }
                .increase_btn, .increase_btn {
                  bottom: 15px;
                }
                .decrease_btn, .decrease_btn {
                  bottom: 5px;
                }
              }
            }
          }
          .ts-form__switch {
            border: none;
            background-color: transparent;
            width: 85px;
            height: 85px;
            outline: none;
            &.desktop {
              @include respond-until(m) {
                display: none;
              }
            }
            &.mobile {
              display: none;
              @include respond-until(m) {
                position: relative;
                top: 45px;
                display: flex;
                justify-content: center;
                margin: 20px 0;
              }
            }
            svg {
              width: 100%;
              height: 34px;
              @include respond-until(m) {
                height: 52px;
              }
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
        .ts-form__submit {
          margin-top: 100px;
          .btn.btn--black {
            @include respond-until(m) {
              max-width: 250px;
            }
            &:disabled {
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
