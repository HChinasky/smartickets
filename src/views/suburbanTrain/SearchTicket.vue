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
        <h2 class="ticket-search__title">{{ $t("searchSuburbanTrain") }}</h2>
          <div class="ts-form__inner">
            <div class="ts-form__where-from">
              <div class="ts-form__group ts-form__group--swap">
                <label class="ts-form__label">{{
                  $t("dispatchStation")
                }}</label>

                <SelectDepartmentAircraft ref="departmentSelect"/>
              </div>
              <div class="ts-form__row">
                <div class="ts-form__group">
                  <label class="ts-form__label">{{
                    $t("departureDate")
                  }}</label>

                  <DatepickerDeparture
                      :hideHelpLinks="false"
                      :hideYear="true"
                      :get-link="'getDepartmentDate'"
                      :update-date="'updateDepartmentDate'"/>
                </div>
                <button
                    class="ts-form__switch mobile"
                    type="button"
                    @click="switchStations()"
                >
              <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.73998 35.3032L2.00012 28.1421L8.73998 20.981" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.42132 28.1421L38 28.1421" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
                <path d="M31.2601 1.73347L38 8.89457L31.2601 16.0557" stroke="#66B2FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M37.5788 8.89454L2.00012 8.89453" stroke="#66B2FF" stroke-width="3" stroke-linecap="round"/>
              </svg>

            </button>
              </div>
            </div>
            <button
                class="ts-form__switch desktop"
                type="button"
                @click="switchStations()"
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
                  $t("arrivalStation")
                }}</label>
                <SelectArrival />
              </div>
              
            <div class="time-picker">
              <div class="form-group">
                <label>{{ $t('dispatchTime') }}</label>
                <time-picker />
              </div>
            </div>
            </div>
          </div>
          <div class="ts-form__submit">
            <button class="btn btn--black" v-promise-btn @click="getData" :disabled="!getDepartmentStation || !getArrivalStation || !getDepartmentDate">
              {{ $t("findTickets") }}
            </button>
          </div>
        </div>
      </div>
      </template>
    </section>
    <div class="trains-view" ref="trainsView">
      <router-view></router-view>
    </div>
  </span>
</template>

<script>
  import SelectDepartmentAircraft from "../../components/aircraft/SelectDepartmentAircraft"
  import SelectArrival from "../../components/aircraft/SelectArrivalAircraft";
  import DatepickerDeparture from "../../components/DatepickerDeparture";
  import TimePicker from "../../components/timePicker";
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "SearchTicket",
    components: {
      SelectDepartmentAircraft,
      SelectArrival,
      DatepickerDeparture,
      TimePicker
    },
    computed: {
      ...mapGetters([
        "getArrivalStation",
        "getDepartmentStation",
        "getDepartmentDate",
      ]),
    },
    data() {
      return {
      
      }
    },
    methods: {
      ...mapActions([
        "setDepartmentStation",
        "setArrivalStation",
      ]),
      getData() {
        this.$router.push({ name: "SuburbanTrain",}).catch(()=>{});
      },

      switchStations() {
        const temp = this.getArrivalStation;
        this.setArrivalStation(this.getDepartmentStation);
        this.setDepartmentStation(temp);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .trains-view {
    background-color: #fff;
    padding-bottom: 100px;
  }
  
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
                width: 340px;
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
              ::v-deep .ts-form__help-links {
                justify-content: space-between;
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
            .time-picker {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .form-group {
                display: flex;
                flex-direction: column;
                max-width: 150px;
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
