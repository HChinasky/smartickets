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
          До оформлення
        </a>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="ticket__block ticket-department">
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
              </div>
              <div class="person-birthday">
                {{ ticketDepartmentDate }}
              </div>
            </div>
          </div>
          <div class="ticket__block ticket-arrival" v-if="getCityArrivalDate">
            <div class="tickets__title">
              <h3 class="from">{{ $t('back') }}: <span>{{cityArrival}} - {{cityDepartment}}</span></h3>
            </div>
            <div class="additional-services__block">
              <div class="person-full-name">
                <span class="fullname">{{ firstname }} {{ lastname }}</span>
              </div>
              <div class="person-birthday">
                {{ ticketArrivalDate }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="payment-settings__block">
            <div class="form_part">
              <div class="form-input">
                <label>E-mail (квитки буде надіслано на цей e-mail)</label>
                <input
                    class="ticket-list__input"
                    type="text"
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
                <label>E-mail ще раз</label>
                <input
                    id=""
                    class="ticket-list__input"
                    type="text"
                    @blur="$v.repeatEmail.$touch()"
                    @keydown.space.prevent
                    v-model="repeatEmail"
                >
                <template v-if="$v.repeatEmail.$error">
                  <p v-if="!$v.repeatEmail.sameAsPassword" class="errorMessage">
                    Емейли повинні бути однаковими
                  </p>
                </template>
              </div>
              <div class="form-input">
                <label>Контактний телефон</label>
                <input-mask
                    class="ticket-list__input"
                    v-model="phone"
                    @blur="$v.phone.$touch()"
                    @keydown.space.prevent
                    mask="+380(99)999-99-99"
                />
                <template v-if="$v.phone.$error">
                  <p v-if="!$v.phone.required" class="errorMessage">
                    Будь ласка вкажіть телефон
                  </p>
                  <p v-if="!$v.phone.minLength" class="errorMessage">
                    Номер телефону повинен мати не менш 9 символів
                  </p>
                </template>
              </div>
              <div class="form-input">
                <label>Промокод (якщо маєте)</label>
                <input
                    class="ticket-list__input"
                    type="text"
                    v-model="promo"
                >
                <span class="apply-promo">Застосувати</span>
              </div>
            </div>
            <div class="payment-types">
              <span class="label">Виберіть спосіб оплати</span>
              <div class="payment__list">
                <button
                    v-for="pType in paymentTypes"
                    :key="pType.id"
                    :class="[{active : pType.id == activePayment}, 'type-trips__btn '+pType.name]"
                    @click="activePayment=pType.id"
                ></button>
              </div>
            </div>
            <div class="agreement-rules">
              <button
                  :class="{active : agreementRules}"
                  @click="agreementRules = !agreementRules"
                  class="type-trips__btn">Я ознайомлений з правилами детально
              </button>
            </div>
            <div class="payment_sum">
              <p class="total-sum">Загальна вартість: <span>{{ getPrice }} грн</span></p>
              <p class="smart-tickets-tax">Оформлення SmartTicket <span>0.06 грн</span></p>
              <button
                  @click="getBookTicket"
                  :disabled="!getPersonPhone || !getPersonEmail || $v.repeatEmail.$error"
                  class="btn btn--black">
                Перейти до оплати
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
    minLength
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
        
        activePayment: "",
        paymentTypes: [{id: 2, name: "fondy"}],
        agreementRules: false,
        repeatEmail: '',
        promo: '',
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
      }
    },
    computed: {
      ...mapMultiRowFields(["passengers"]),
      ...mapGetters([
        "getField",
        "getDepartmentCity",
        "getCityNameById",
        "getArrivalCity",
        "getCityDepartmentDate",
        "getCityArrivalDate",
        "getTicketPrice",
        "getPersonPhone",
        "getPersonEmail",
      ]),
      getPrice() {
        return this.getTicketPrice.toFixed(2);
      },
      cityDepartment() {
        return this.getCityNameById(this.getDepartmentCity);
      },
      cityArrival() {
        return this.getCityNameById(this.getArrivalCity);
      },
      ticketDepartmentDate() {
        return moment(this.getCityDepartmentDate).format("DD MMMM YYYY");
      },
      ticketArrivalDate() {
        return moment(this.getCityArrivalDate).format("DD MMMM YYYY");
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
        "bookingTicketAircraft",
        "setPersonEmail",
        "setPersonPhone"
      ]),
      async getBookTicket() {
        await this.bookingTicketAircraft()
          .then(() => {
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
        await this.startPayment()
          .then((response) => {
            var el = document.createElement("p");
            el.innerHTML = response;
            console.log(response)
            var form = el.querySelector("#returnForm");
            var payment_no = form.querySelector('input[name="payment_no"]').value;
            this.$refs.inputRef.value = payment_no;
            this.$refs.formRef.action = form.action;
            this.$refs.formRef.submit();
            //this.isLoading = false;
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toasted.global.my_app_error({
              message: error.message,
            });
          });
      }
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
          &.ticket-arrival {
            margin-top: 80px;
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
              font-size: 17px;
              font-weight: 500;
              display: block;
              width: 100%;
              height: 35px;
              padding-bottom: 5px;
              text-align: center;
              border-bottom: 1px solid $SECOND_FONT_COLOR;
              background-image: url('../../assets/img/svg/edit-icon.svg');
              background-repeat: no-repeat;
              background-position: right 5px top;
              background-size: 30px;
              
              .fullname {
                border: none;
                text-align: center;
                outline: none;
                text-transform: uppercase;
              }
            }
            
            .person-birthday {
              font-size: 17px;
              font-weight: 200;
              color: $LABEL_COLOR;
              padding: 10px 0;
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
                    bottom: 10px;
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
              
              .smart-tickets-tax {
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
  
  .d-flex {
    display: flex;
  }
  
  .justify-center {
    justify-content: center;
  }
</style>
