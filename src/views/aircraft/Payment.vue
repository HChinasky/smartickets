<template>
  <section class="payment-ticket">
    <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :loader="loader"
        :color="color"
        :is-full-page="fullPage"
    ></loading>
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
          {{ $t('beforeRegistration') }}
        </a>
      </div>
      <template v-if="getIsDevSkyUpLoginRequired === 'true'">
        <div class="ticket-list__header">
          <h3 style="margin-left: 20px;margin-top: 45px">{{ $t("forTest") }}</h3>
        </div>
        
        <div class="ticket-list__item">
          <div class="ticket-list__inner">
            <div class="ticket-list__group">
              <label for="client-login" class="ticket-list__label">{{
                $t("username")
                }}</label>
              <input
                  v-model="devLogin"
                  @blur="$v.devLogin.$touch()"
                  @change="changeDevLogin($event.target.value)"
                  type="text"
                  id="client-login"
                  class="ticket-list__input passenger-login"
              />
              <template v-if="$v.devLogin.$error">
                <p v-if="!$v.devLogin.required" class="errorMessage">
                  {{ $t("requiredFieldMsg") }}
                </p>
              </template>
            </div>
            
            <div class="ticket-list__inner">
              <div class="ticket-list__group">
                <label for="client-password" class="ticket-list__label">{{
                  $t("password")
                  }}</label>
                <input
                    v-model="devPassword"
                    @blur="$v.devPassword.$touch()"
                    @change="changeDevPassword($event.target.value)"
                    type="password"
                    id="client-password"
                    class="ticket-list__input passenger-password"
                />
                <template v-if="$v.devPassword.$error">
                  <p v-if="!$v.devPassword.required" class="errorMessage">
                    {{ $t("requiredFieldMsg") }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col-6">
          <div class="ticket__block ticket-department" v-if="getResultId">
            <h2 class="ticket-type-trips__title">SkyUp</h2>
            <div class="tickets__title">
              <h3 class="to">{{ $t('departureDateShort') }}: <span> {{cityDepartment}} - {{cityArrival}}</span></h3>
            </div>
            <div
                class="additional-services__block"
                v-for="(passenger, index) in passengers"
                :key="index"
            >
              <div class="person-full-name">
                <span class="fullname">{{ passenger.firstName }} {{ passenger.lastName }}</span>
                <router-link :to="{name: linkBack}" class="person-edit-info"></router-link>
              </div>
              <div class="ticket-date">
                {{ ticketDepartmentDate }}
              </div>
              <div class="ticket-price">
                {{ getTicketDepartmentPrice }} {{ $t('UAH') }}
              </div>
            </div>
          </div>
          <div class="ticket__block ticket-arrival" v-if="getCityArrivalDate && getResultId">
            <div class="tickets__title">
              <h3 class="from">{{ $t('back') }}: <span>{{cityArrival}} - {{cityDepartment}}</span></h3>
            </div>
            <div
                class="additional-services__block"
                v-for="(passenger, index) in passengers"
                :key="index"
            >
              <div class="person-full-name">
                <span class="fullname">{{ passenger.firstName }} {{ passenger.lastName }}</span>
                <router-link :to="{name: linkBack}" class="person-edit-info"></router-link>
              </div>
              <div class="ticket-date">
                {{ ticketArrivalDate }}
              </div>
              <div class="ticket-price">
                {{ getTicketArrivalPrice }} {{ $t('UAH') }}
              </div>
            </div>
          </div>
          <div class="ticket__block train-department" v-if="getCart.length > 0">
            <h2 class="ticket-type-trips__title">{{ $t('train') }}</h2>
            <div class="tickets__title">
              <h3 class="to">{{ $t('departureDateShort') }}: <span> {{getTrain.station_from.name}} - {{getTrain.station_to.name}}</span></h3>
            </div>
            <div
                class="additional-services__block"
                v-for="(person, index) in getCart"
                :key="index"
            >
              <div class="person-full-name">
                <span class="fullname">{{ person.passenger.name }} {{ person.passenger.surname }}</span>
                <router-link :to="{name: linkBack}" class="person-edit-info"></router-link>
              </div>
              <div class="ticket-date">
                {{ ticketTrainDepartmentDate }}
              </div>
              <div class="ticket-price">
                {{ getTotalPrice }} {{ $t('UAH') }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="payment-settings__block">
            <div class="form_part">
              <div class="form-input">
                <label>E-mail ({{ $t('ticketsBeSent') }})</label>
                <input
                    class="ticket-list__input"
                    type="email"
                    @blur="$v.email.$touch()"
                    @keydown.space.prevent
                    v-model="email"
                >
                <template v-if="$v.email.$error">
                  <p v-if="!$v.email.required" class="errorMessage">
                    {{ $t("emailEmpty") }}
                  </p>
                  <p v-if="!$v.email.email" class="errorMessage">
                    {{ $t("emailInvalid") }}
                  </p>
                </template>
              </div>
              <div class="form-input">
                <label>E-mail {{ $t('repeatIt') }}</label>
                <input
                    id=""
                    class="ticket-list__input"
                    type="email"
                    @blur="$v.repeatEmail.$touch()"
                    @keydown.space.prevent
                    v-model="repeatEmail"
                >
                <template v-if="$v.repeatEmail.$error">
                  <p v-if="!$v.repeatEmail.sameAsPassword" class="errorMessage">
                    {{ $t('errorEmailRepeat') }}
                  </p>
                </template>
              </div>
              <div class="form-input">
                <label>{{ $t('phone') }}</label>
                <input-mask
                    class="ticket-list__input"
                    v-model="phone"
                    @blur="$v.phone.$touch()"
                    @keydown.space.prevent
                    mask="+380(99)999-99-99"
                />
                <template v-if="$v.phone.$error">
                  <p v-if="!$v.phone.required" class="errorMessage">
                    {{ $t('errorEmptyPhone') }}
                  </p>
                  <p v-if="!$v.phone.minLength" class="errorMessage">
                    {{ $t('errorShortPhone') }}
                  </p>
                </template>
              </div>
<!--              <div class="form-input">-->
<!--                <label>{{ $t('promoCode') }}</label>-->
<!--                <input-->
<!--                    class="ticket-list__input"-->
<!--                    type="text"-->
<!--                    disabled-->
<!--                    v-model="promo"-->
<!--                >-->
<!--                <span class="apply-promo">{{ $t('applyPromo') }}</span>-->
<!--                <span class="promo-discount__label" v-if="priceDiscount">{{ $t('promoHaveDiscount') }} {{ priceDiscount }} {{ $t('UAH') }}</span>-->
<!--              </div>-->
            </div>
            <div class="agreement-rules">
              <button
                  :class="{active : agreementRules}"
                  @click="agreementRules = !agreementRules"
                  class="type-trips__btn">{{ $t('agreeRules') }}
              </button>
              <input
                  type="checkbox"
                  v-model.trim="agreementRules"
                  @change="$v.agreementRules.$touch()"
                  class="hidden-checkbox">
              <template v-if="$v.agreementRules.$anyDirty">
                <p class="errorMessage" v-if="!agreementRules">
                  {{ $t("errorAgreeRules") }}
                </p>
              </template>
            </div>
            <div class="payment_sum">
              <template v-if="fullPrice !== getPrice">
                <p class="total-sum">{{ $t('totalPrice') }}: <span>{{ (+fullPrice + +getTotalPrice).toFixed(2) }} {{ $t('UAH') }}</span></p>
                <p class="total-sum" v-if="fullPrice">{{ $t('discountPrice') }}: <span>{{(+getPrice + +getTotalPrice).toFixed(2) }} {{ $t('UAH') }}</span></p>
              </template>
              <template v-else>
                <p class="total-sum">{{ $t('totalPrice') }}: <span>{{ getPrice }} {{ $t('UAH') }}</span></p>
              </template>
              <p class="smart-tickets-tax">{{ $t('smartTicketRegistration') }} <span>0.06 {{ $t('UAH') }}</span></p>
              <div class="cart-total__cost cart-total__cost_skyup">
                {{ $t("additionalFeeTxt") }}
              </div>
              <button
                  @click="getBookTicket"
                  class="btn btn--black"
                  v-promise-btn>
                {{ $t('bookingTicket') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form ref="formRef" action method="POST" id="paymentForm">
      <input type="hidden" ref="inputRef" value name="payment_no" />
    </form>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {mapMultiRowFields} from 'vuex-map-fields';
  import moment from "moment";
  import {
    required,
    sameAs,
    email,
    minLength,
    requiredIf
  } from "vuelidate/lib/validators";
  import InputMask from 'vue-input-mask';
  import Loading from "vue-loading-overlay";

  export default {
    name: "Payment",
    components: {
      InputMask,
      Loading

    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        loader: "spinner",
        color: "#1b73cd",
        fullPrice: "",
        priceDiscount: "",
        beforeMountPriceDiscount: false,
        errorsList: [],

        hasBooked: false,
        paymentTypes: [{id: 2, name: "fondy"}],
        agreementRules: false,
        repeatEmail: "",
        activeAdditionalServices: "",
        additionalServices: [
          "Перевезення тварини у салоні",
          "Перевезення тварини у багажному відділенні",
          "Супровід неповнолітньої дитини"
        ],
      }
    },
    validations: {
      email: {
        required,
        email,
      },
      repeatEmail: {
        required,
        sameAsPassword: sameAs("email"),
      },
      phone: {
        required,
        minLength: minLength(17)
      },
      agreementRules: {
        required
      },
      devLogin: {
        required: requiredIf(function() {
          return this.getIsDevLoginRequired;
        }),
      },
      devPassword: {
        required: requiredIf(function() {
          return this.getIsDevLoginRequired;
        }),
      }
    },
    computed: {
      ...mapMultiRowFields(["passengers"]),
      ...mapGetters([
        "getField",
        "getDepartmentCityCode",
        "getCityNameByCode",
        "getArrivalCityCode",
        "getCityDepartmentDate",
        "getCityArrivalDate",
        "getTicketPrice",
        "getTicketDepartmentPrice",
        "getTicketArrivalPrice",
        "getPersonPhone",
        "getPersonEmail",
        "getPromoCode",
        "getDevLogin",
        "getDevPassword",
        "getIsDevSkyUpLoginRequired",
        "getTicketsFromCart",
        "getTotalPrice",
        "getCart",
        "getTrain",
        "getArrivalDate",
        "getResultId",
        "getFromTariffType",
        "getToTariffType"
      ]),
      devLogin: {
        get() {
          return this.getDevLogin;
        },
        set(value) {
          this.updateDevLogin(value);
        },
      },
      promo: {
        get() {
          return this.getPromoCode;
        },
        set(value) {
          this.setPromoCode(value);
        },
      },
      devPassword: {
        get() {
          return this.getDevPassword;
        },
        set(value) {
          this.updateDevPassword(value);
        },
      },
      linkBack() {
        if(this.getTicketsFromCart.length > 1) {
          return 'GeneralCart'
        } else {
          return 'CartAircraft'
        }
      },
      getPrice() {
        if(this.getTicketPrice) {
          return this.getTicketPrice;
        }
        return this.getTicketDepartmentPrice
      },
      cityDepartment() {
        return this.getCityNameByCode(this.getDepartmentCityCode);
      },
      cityArrival() {
        return this.getCityNameByCode(this.getArrivalCityCode);
      },
      ticketDepartmentDate() {
        return moment(this.getCityDepartmentDate).format("DD MMMM YYYY");
      },
      ticketArrivalDate() {
        return moment(this.getCityArrivalDate).format("DD MMMM YYYY");
      },
      ticketTrainDepartmentDate() {
        return moment(this.getTrain.date).format("DD MMMM YYYY");
      },
      email: {
        get() {
          if (this.getPersonEmail) {
            return this.getPersonEmail;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPersonEmail(value);
        },
      },
      phone: {
        get() {
          if (this.getPersonPhone) {
            return this.getPersonPhone;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPersonPhone(value);
        },
      },
    },
    methods: {
      ...mapActions([
        "startPayment",
        "bookTickets",
        "bookingTicketAircraft",
        "setPersonEmail",
        "setPersonPhone",
        "setPromoCode",
        "getCurrentPrice",
        "updateDevPassword",
        "updateDevLogin",
        "updateEmail",
        "resetCartStateAircraft",
        "resetStateAllCart",
        "resetStateCartAircraft",
        "resetStateTrain",
        "resetStateAirport",
        "setTicketsList",
      ]),
      changeDevLogin(value) {
        this.updateDevLogin(value);
      },
      changeDevPassword(value) {
        this.updateDevPassword(value);
      },
      async getBookTicket() {
        this.updateEmail(this.getPersonEmail);
        this.$v.$touch();
        if(!this.$v.$invalid && this.agreementRules) {
          if(!this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp) {
            await this.bookingTicketAircraft()
              .then((res) => {
                if(res.data.errors) {
                  res.data.errors.forEach((err) => {
                    this.errorsList.push(err.error ? err.error : err)
                  })
                }
                if (res.data.code === 0) {
                  this.errorsList = [];
                  this.getTicketsFromCart.filter((ticket) => {
                    if(ticket.type.toLowerCase() === "skyup") {
                      ticket.bookedSkyUp = true;
                      this.setTicketsList(ticket)
                    }
                  });
                }
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
          }
          if(this.getTicketsFromCart.filter((item) => item.type == "Train").length !== 0) {
            if(!this.getTicketsFromCart.find((item) => item.bookedTrain === true)?.bookedTrain) {
              await this.bookTickets()
                .then(() => {})
                .catch((error) => {
                  this.$toasted.global.my_app_error({
                    message: error.message,
                  });
                });
            }
          }
          this.afterBooked()
        }
      },
      afterBooked() {
        const swal = this.$swal.mixin({
          customClass: {
            confirmButton: 'btn-book-repeat',
            denyButton: 'btn-payment',
            cancelButton: 'btn-cancel'
          },
          buttonsStyling: false
        });
        let title  = "",
            text   = "",
            showPaymentBtn = true,
            ticketBooking = true,
            iconType = "warning",
            bookedLabel = true,
            
            trainCountTickets = this.getCart.length,
            trainPlaces = [],
            trainWagon = [],
          
            countSkyUpTickets = this.getCityArrivalDate ? 2 : 1,
            amountTrain = this.getTotalPrice,
            totalAmount = this.fullPrice !== this.getPrice ? (+this.getPrice + +this.getTotalPrice).toFixed(2) : '',
            tariffTypeArrival = this.getToTariffType && this.getToTariffType + `(` + this.getTicketArrivalPrice + ` ` + this.$t('UAH') + `)`;
        
        this.getCart.forEach((element) => trainPlaces.push(element.train.place));
        this.getCart.forEach((element) => trainWagon.push(element.train.wagon_num));
        
        if(this.getTicketsFromCart.filter((item) => item.type == "Train").length !== 0) {
          if(!this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp &&
            !this.getTicketsFromCart.find((item) => item.bookedTrain === true)?.bookedTrain) {
            title = this.$t("ticketsNotBookedTitle");
            text = this.$t("ticketNotBookedDesc");
            showPaymentBtn = false;
            iconType = "error";
          }
          if(!this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp &&
            this.getTicketsFromCart.find((item) => item.bookedTrain === true)?.bookedTrain) {
            title = this.$t("ticketNotBookedTitleSecond");
            text = this.$t("ticketNotBookedDescSecond");
                        text += `<ul class="errors-list">
                        <li>`+this.errorsList.map((error) => {
                          if(error == "Passport expired") {
                            return this.$t("errPassport");
                          } else if (error == "Adult age is incorrect") {
                            return this.$t("errAge");
                          }
                        })+`
                      </li>
                     </ul>`;
            text += "<span class=\"support-text\">* "+this.$t("editErrorReg")+"</span>"
            text += "<span class=\"support-text\">** "+this.$t("goToPayUZ")+"</span>"
            bookedLabel = this.errorsList !== 0 ? true : false;
            iconType = "warning";
          }
          if(this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp &&
            !this.getTicketsFromCart.find((item) => item.bookedTrain === true)?.bookedTrain) {
            title = this.$t("ticketNotBookedTitleSecond");
            text = this.$t("ticketNotBookedDescTrain");
            iconType = "warning";
          }
          if(this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp &&
            this.getTicketsFromCart.find((item) => item.bookedTrain === true)?.bookedTrain) {
            title = this.$t("ticketBookedSkyUpTitle");
            text          += "<h4>SkyUp:</h4>"
            text          += `<div class="d-flex align-items-center"><p>` + this.$t("countTickets") + `</p><p>` + countSkyUpTickets + `</p></div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("typeTariff") + ` <span>(` + this.$t("toBack") + `)</span>:</p>
                                <p>` + this.getFromTariffType + `(` + this.getTicketDepartmentPrice + ` ` + this.$t('UAH') + `) ` + tariffTypeArrival + `</p>
                              </div>`;
            text          += "<h4>" + this.$t('UkrzaliznytsiaShort') + ":</h4>"
            text          += `<div class="d-flex align-items-center"><p>` + this.$t("countTickets") + `</p><p>` + trainCountTickets + `</p></div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("wagon") + `</span>:</p>
                                <p>` + trainWagon + `</p>
                              </div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("place") + `</span>:</p>
                                <p>` + trainPlaces + `</p>
                              </div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("priceLabel") + `:</p><p> ` + amountTrain + ` ` + this.$t('UAH') + `</p>
                              </div>`
            text          += `<div class="total-sum-popup align-items-center justify-content-center"><p>`+this.$t("discountPrice")+`:</p><span>` + +totalAmount + ` ` + this.$t('UAH') + `</span></div>`;
            iconType = "success";
            ticketBooking = false;
          }
        } else {
          if(this.getTicketsFromCart.find((item) => item.bookedSkyUp === true)?.bookedSkyUp) {
            title         = this.$t("ticketBookedSkyUpTitle");
            text          = "<p>" + this.$t("ticketBookedTrainDescPartFirst") + "</p>";
            text          += "<h4>SkyUp:</h4>"
            text          += `<div class="d-flex align-items-center"><p>` + this.$t("countTickets") + `</p><p>` + countSkyUpTickets + `</p></div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("typeTariff") + ` <span>(` + this.$t("toBack") + `)</span>:</p>
                                <p>` + this.getFromTariffType + `(` + this.getTicketDepartmentPrice + ` ` + this.$t('UAH') + `) ` + tariffTypeArrival + `</p>
                              </div>`;
            text          += `<div class="d-flex align-items-center">
                                <p>` + this.$t("discountPrice") + `:</p><p> ` + this.getTicketPrice + ` ` + this.$t('UAH') + `</p>
                              </div>`
            iconType      = "success";
            ticketBooking = false;
          } else {
            title = this.$t("ticketNotBookedTitle");
            text = this.$t("ticketNotBookedDescSecond");
            text += `<ul class="errors-list">
                        <li>`+this.errorsList.map((error) => {
                          if(error == "Passport expired") {
                            return this.$t("errPassport");
                          } else if (error == "Adult age is incorrect") {
                            return this.$t("errAge");
                          }
                        })+`
                      </li>
                     </ul>`
            iconType = "warning";
            showPaymentBtn = false;
            bookedLabel = this.errorsList !== 0 ? true : false;
          }
        }
        swal.fire({
          icon: iconType,
          title: title,
          html: text,
          width: 620,
          confirmButtonText: bookedLabel ? this.$t("returnToRegistration") : this.$t("rebookTicket"),
          denyButtonText: this.$t("goToPay"),
          cancelButtonText: this.$t("continueShopping"),
          showConfirmButton: ticketBooking,
          showDenyButton: showPaymentBtn,
          showCancelButton: false,
          showLoaderOnConfirm: true,
          preDeny: () => {
            return this.paymentInit();
          },
          preConfirm: () => {
            return bookedLabel ? this.$router.push({name: this.linkBack}) : this.getBookTicket()
          },
          allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed && !bookedLabel) {
            swal.fire({
              title: this.$t("ticketBookedSkyUpTitle"),
              text: this.$t("ticketBookedSkyUpDesc"),
              width: 620,
              icon: "success"
            })
          }
        })
      },
      async paymentInit() {
        await this.startPayment()
          .then((response) => {
            var el = document.createElement("p");
            el.innerHTML = response;
            var form = el.querySelector("#returnForm");
            var payment_no = form.querySelector('input[name="payment_no"]').value;
            this.$refs.inputRef.value = payment_no;
            this.$refs.formRef.action = form.action;
            this.$refs.formRef.submit();
            this.resetCartStateAircraft()
            this.resetStateAllCart()
            this.resetStateCartAircraft()
            this.resetStateTrain()
            this.resetStateAirport()
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toasted.global.my_app_error({
              message: error.message,
            });
          });
      }
    },
    beforeMount() {
      this.getCurrentPrice(this.promo).then((res) => {
        let priceWithoutDiscount = res.data.data.price_without_discount;
        this.fullPrice = priceWithoutDiscount;
      }).catch((error) => {
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  @import "@/assets/scss/grid-mixins";
  
  .payment-ticket {
    background-color: #fff;
    padding: 20px 0 150px 0;
    
    .container {
      @include respond-until(sm) {
        padding: 0;
      }
      .step-back__block {
        margin-bottom: 40px;
        @include respond-until(sm) {
          margin-bottom: 30px;
          padding-left: 25px;
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
      
      .row {
        @include row(0, 0, 0, 0, 0, 0);
        margin-top: 80px;
        
        @include respond-until(sm) {
          margin-top: 0;
        }
        
        .col-6 {
          @include make-col(6, $grid-columns, 0);
          @include respond-until(m) {
            @include make-col(12, $grid-columns, 0);
          }
          @include respond-until(sm) {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            padding: 0 15px;
          }
        }
        
        .ticket__block {
          &.ticket-arrival, &.train-arrival {
            margin-top: 80px;
          }
          &.train-department {
            margin-top: 65px;
            border-top: 2px solid $SECOND_FONT_COLOR;
          }
          .ticket-type-trips__title {
            font-size: 32px;
            font-weight: 300;
            color: #000;
          }
        }
        
        .ticket__block {
          @include respond-until(sm) {
            width: 100%;
          }
          
          .tickets__title {
            h3.to,
            h3.from {
              font-weight: 500;
              font-size: 28px;
              color: #000;
              margin-top: 0;
              
              @include respond-until(sm) {
                font-size: 24px;
              }
              span {
                color: $SECOND_FONT_COLOR;
              }
            }
          }
          
          
          .additional-services__block {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            padding: 10px;
            border: 2px dashed $SECOND_FONT_COLOR;
            border-radius: 5px;
            
            .person-full-name {
              position: relative;
              font-size: 17px;
              font-weight: 500;
              display: block;
              width: 100%;
              height: 35px;
              padding-bottom: 5px;
              text-align: center;
              border-bottom: 1px solid $SECOND_FONT_COLOR;
              
              .fullname {
                border: none;
                text-align: center;
                outline: none;
                text-transform: uppercase;
              }
              .person-edit-info {
                position: absolute;
                right: 0;
                top: 5px;
                width: 35px;
                height: 28px;
                background-image: url('../../assets/img/svg/edit-icon.svg');
                background-repeat: no-repeat;
                background-position: right 5px top;
                background-size: 30px;
              }
            }
            
            .ticket-date {
              font-size: 17px;
              font-weight: 200;
              color: $LABEL_COLOR;
              padding: 10px 0;
            }
            .ticket-price {
              font-size: 18px;
              font-weight: 500;
              color: $SECOND_FONT_COLOR;
            }
            
            .additional-services__select {
              width: 100%;
              max-width: 480px;
              @include respond-until(sm) {
                width: 280px;
              }
              
              .v-select {
                font-size: 10px;
                ::v-deep .vs__dropdown-toggle {
                  border: none;
                  
                  .vs__open-indicator {
                    fill: #000;
                    cursor: pointer;
                  }
                  
                  .vs__selected-options {
                    height: 35px;
                    
                    .vs__selected {
                      font-size: 17px;
                      font-weight: 200;
                      color: $SECOND_FONT_COLOR;
                      width: 100%;
                      display: flex;
                      justify-content: center;
                      text-align: center;
                    }
                    
                    input {
                      &::placeholder {
                        font-size: 17px;
                        font-weight: 200;
                        color: $SECOND_FONT_COLOR;
                        text-align: center;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        
        .col-5 {
          padding-bottom: 60px;
          @include make-col(4, $grid-columns, 0);
          @include col-offset(xxl, 2, $grid-columns);
          @include col-offset(xl, 2, $grid-columns);
          @include col-offset(lg, 1, $grid-columns);
          @include respond-until(md) {
            @include make-col(5, $grid-columns, 0);
          }
          @include respond-until(m) {
            @include make-col(12, $grid-columns, 0);
          }
          @include respond-until(sm) {
            margin-top: 50px;
            padding-left: 15px;
            padding-right: 15px;
            background-color: #F6F6F6;
            width: 100%;
          }
          
          .payment-settings__block {
            .form_part {
              .form-input {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                
                .errorMessage {
                  font-size: 14px;
                  font-weight: 100;
                  color: $DANGER_COLOR;
                  
                  &:nth-child(2) {
                    top: 15px;
                  }
                }
                
                &:first-child {
                  margin-top: 55px;
                }
                
                &:last-child {
                  position: relative;
                  
                  .apply-promo {
                    font-size: 17px;
                    font-weight: 300;
                    position: absolute;
                    right: 0;
                    top: 28px;
                    padding: 6px 17px;
                    color: #000;
                    border: 1px solid #000;
                    border-radius: 45px;
                    cursor: pointer;
                    transition: all .2s;
                    
                    &:hover {
                      color: $SECOND_FONT_COLOR;
                      border-color: $SECOND_FONT_COLOR;
                    }
                    
                    &:active {
                      color: $LINK_COLOR;
                      border-color: $LINK_COLOR;
                    }
                  }
                  .promo-discount__label {
                    font-size: 14px;
                    margin-top: 15px;
                    font-weight: 500;
                    color: #25a20f;
                  }
                }
                
                label {
                  font-size: 17px;
                  font-weight: 100;
                  color: $LABEL_COLOR;
                  margin-bottom: 10px;
                }
                
                .ticket-list__input {
                  height: 40px;
                  background-color: transparent;
                }
              }
            }
            
            .payment-types {
              margin-top: 50px;
              
              .label {
                font-size: 17px;
                font-weight: 100;
                color: #6E6E6E;
                display: block;
                margin-bottom: 30px;
              }
              
              .payment__list {
                display: flex;
                justify-content: space-between;
                
                @include respond-until(m) {
                  justify-content: flex-start;
                }
                .type-trips__btn {
                  position: relative;
                  width: 220px;
                  height: 48px;
                  background-repeat: no-repeat;
                  background-position: right 20px center;
                  background-size: 140px;
                  border: none;
                  outline: none;
                  background-color: transparent;
                  @include respond-until(xl) {
                    width: 190px;
                    background-size: 130px;
                    background-position: right 0px center;
                  }
                  @include respond-until(l) {
                    width: 170px;
                    background-size: 100px;
                    background-position: right 0px center;
                  }
                  @include respond-until(m) {
                    width: 220px;
                    background-size: 140px;
                    background-position: right 20px center;
                  }
                  @include respond-until(sm) {
                    width: 155px;
                    background-size: 100px;
                    background-position: right 0px center;
                  }
                  @include respond-until(xs) {
                    background-size: 90px;
                  }
                  &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 48px;
                    height: 48px;
                    border: 2px solid #000000;
                    border-radius: 50%;
                  }
                  
                  &.active {
                    
                    &:after {
                      content: '';
                      background-image: url("data:image/svg+xml,%3Csvg width='28' height='22' viewBox='0 0 28 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.62497 17.3244L2.93747 11.6369C2.78875 11.4864 2.61162 11.3669 2.41636 11.2853C2.2211 11.2037 2.01159 11.1617 1.79997 11.1617C1.58835 11.1617 1.37884 11.2037 1.18358 11.2853C0.988321 11.3669 0.811195 11.4864 0.66247 11.6369C0.51193 11.7857 0.392409 11.9628 0.310835 12.158C0.229261 12.3533 0.187256 12.5628 0.187256 12.7744C0.187256 12.986 0.229261 13.1956 0.310835 13.3908C0.392409 13.5861 0.51193 13.7632 0.66247 13.9119L7.47122 20.7207C8.10497 21.3544 9.12872 21.3544 9.76247 20.7207L26.9875 3.51193C27.138 3.36321 27.2575 3.18608 27.3391 2.99082C27.4207 2.79556 27.4627 2.58605 27.4627 2.37443C27.4627 2.16282 27.4207 1.95331 27.3391 1.75805C27.2575 1.56278 27.138 1.38566 26.9875 1.23693C26.8387 1.08639 26.6616 0.966872 26.4664 0.885297C26.2711 0.803723 26.0616 0.761719 25.85 0.761719C25.6384 0.761719 25.4288 0.803723 25.2336 0.885297C25.0383 0.966872 24.8612 1.08639 24.7125 1.23693L8.62497 17.3244Z' fill='black'/%3E%3C/svg%3E%0A");
                      display: block;
                      width: 27px;
                      height: 22px;
                      position: relative;
                      left: 5px;
                    }
                  }
                  
                  
                  &.fondy {
                    background-image: url("../../assets/img/svg/fondy-icon.svg");
                  }
                }
              }
            }
            
            .agreement-rules {
              margin-top: 50px;
              
              .type-trips__btn {
                font-size: 17px;
                font-weight: 100;
                color: $LABEL_COLOR;
                padding-left: 50px;
                background-color: transparent;
                outline: none;
                border: none;
                position: relative;
                display: flex;
                align-items: center;
                
                @include respond-until(sm) {
                  padding-left: 45px;
                }
                &:before {
                  content: '';
                  position: absolute;
                  left: 0;
                  width: 33px;
                  height: 33px;
                  border: 2px solid $BORDER_BOTTOM_LINK_COLOR;
                  @include respond-until(sm) {
                    width: 41px;
                    height: 41px;
                    top: -8px;
                  }
                }
                
                &.active {
                  &:after {
                    content: '';
                    position: absolute;
                    left: 7px;
                    background-image: url("data:image/svg+xml,%3Csvg width='19' height='13' viewBox='0 0 19 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.87769 10.537L1.91579 6.91866C1.81219 6.82289 1.68881 6.74685 1.55279 6.69495C1.41677 6.64306 1.27082 6.61633 1.12341 6.61633C0.976002 6.61633 0.830057 6.64306 0.694039 6.69495C0.55802 6.74685 0.434634 6.82289 0.331033 6.91866C0.226167 7.01327 0.142909 7.12596 0.0860848 7.25018C0.0292604 7.3744 0 7.50769 0 7.64232C0 7.77695 0.0292604 7.91023 0.0860848 8.03446C0.142909 8.15868 0.226167 8.27137 0.331033 8.36598L5.07399 12.6976C5.51546 13.1008 6.2286 13.1008 6.67007 12.6976L18.669 1.74965C18.7738 1.65503 18.8571 1.54235 18.9139 1.41812C18.9707 1.2939 19 1.16061 19 1.02599C19 0.891359 18.9707 0.758071 18.9139 0.633849C18.8571 0.509627 18.7738 0.396941 18.669 0.302325C18.5654 0.206553 18.442 0.130515 18.306 0.078619C18.1699 0.0267226 18.024 0 17.8766 0C17.7292 0 17.5832 0.0267226 17.4472 0.078619C17.3112 0.130515 17.1878 0.206553 17.0842 0.302325L5.87769 10.537Z' fill='%233398FF'/%3E%3C/svg%3E%0A");
                    background-repeat: no-repeat;
                    background-size: contain;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 19px;
                    height: 13px;
                  }
                }
              }
              .hidden-checkbox {
                display: none;
              }
              .errorMessage {
                font-size: 14px;
                font-weight: 100;
                color: $DANGER_COLOR;
              }
            }
            
            .payment_sum {
              margin-top: 60px;
              
              @include respond-until(sm) {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .total-sum {
                font-size: 22px;
                font-weight: 300;
                color: $FONT_COLOR;
                @include respond-until(sm) {
                  font-weight: normal;
                }
                @include respond-until(xs) {
                  text-align: center;
                }
                
                span {
                  font-weight: normal;
                  color: $LINK_COLOR;
                  @include respond-until(sm) {
                    font-weight: bold;
                    font-size: 26px;
                  }
                  @include respond-until(xs) {
                    text-align: center;
                  }
                }
              }
              
              .smart-tickets-tax, .cart-total__cost_skyup {
                font-size: 17px;
                font-weight: 200;
                color: $LABEL_COLOR;
                
                span {
                  font-weight: normal;
                  color: $LINK_COLOR;
                }
              }
              
              .btn--black {
                margin-top: 40px;
                max-width: 390px;
                height: 65px;
              }
            }
          }
        }
      }
    }
  }
  
  .errorMessage {
    font-size: 14px;
    font-weight: 100;
    color: $DANGER_COLOR;
    
    &:nth-child(2) {
      top: 15px;
    }
  }
  .d-flex {
    display: flex;
  }
  
  .justify-center {
    justify-content: center;
  }
</style>
