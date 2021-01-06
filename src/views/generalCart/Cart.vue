<template>
  <section class="card-aircraft">
    <div class="container">
      <h2>SkyUp</h2>
      <passengerCart @checkinput="handlerIcon"/>
      <div class="d-flex">
        <div class="total-amount">
          <span class="label">{{ $t('discountPrice') }}:</span>
          <span class="price">{{ getPrice }} {{ $t('UAH') }}</span>
        </div>
        <div class="total-amount">
          <template v-if="fullPrice !== getPrice">
            <span class="label">{{ $t('totalPrice') }}:</span>
            <span class="price">{{ (+fullPrice).toFixed(2) }} {{ $t('UAH') }}</span>
          </template>
          <template v-else>
            <span class="label">{{ $t('totalPrice') }}:</span>
            <span class="price">{{ getPrice }}</span>
          </template>
        </div>
      </div>
      <template v-if="getCart.length !== 0">
        <div class="border-bottom"></div>
        <h2>{{ $t('train') }}</h2>
        <div
            class="ticket-list"
            v-for="(ticket, index) in getCart"
            :key="index"
        >
          <CartItem ref="cartItems" :ticket="ticket" :index="index" :showPlaceDetails="false"></CartItem>
        
        </div>
        <div class="d-flex">
          <div class="total-amount">
            <span class="label">{{ $t('cost') }}:</span>
            <span class="price">{{ getTotalPrice }} {{ $t('UAH') }}</span>
            <div class="cart-total__cost cart-total__commission-sum">
              {{ $t("commissionSum") }} -  0,06 {{ $t("UAH") }}
            </div>
          </div>
        </div>
      </template>
      <div class="d-flex">
        <button
            class="cart-submit btn btn--black"
            @click="getValidate"
        >
          {{ $t("next") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapMultiRowFields} from 'vuex-map-fields';
  import {mapGetters, mapActions} from "vuex";
  import {required, email} from "vuelidate/lib/validators";
  import PassengerCart from '../../components/aircraft/PassengerCart';
  import CartItem from "../../components/CartItem";

  export default {
    name: "CartAircraft",
    components: {
      PassengerCart,
      CartItem
    },
    data() {
      return {
        validationHandler: "",
        promo: "GL-GC2Q2ZT",
        fullPrice: "",
      }
    },
    validations: {
      email: {
        required,
        email,
      }
    },
    computed: {
      ...mapMultiRowFields(["passengers"]),
      ...mapGetters([
        "getTotalPrice",
        "getCart",
        "getEmail",
        "getTicketPrice",
        "getTicketDepartmentPrice",
        "getField",
        "getTicketsFromCart",
      ]),
      getPrice() {
        if (this.getTicketPrice) {
          return this.getTicketPrice;
        }
        return this.getTicketDepartmentPrice
      },
    },
    methods: {
      ...mapActions(["setTicketsList", "getCurrentPrice"]),
      handlerIcon($v) {
        this.validationHandler = $v;
      },
      
      getValidate() {
        let isValidAdditional = false,
          isValid             = false,
          isValidTrain        = false;
        for (var i = 0; i < this.passengers.length; i++) {
          this.validationHandler.passengers.$each.$touch();
          if (this.validationHandler.passengers.$each[i].lastName.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].firstName.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].birthDay.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].birthMonth.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].birthYear.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].genders.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].country.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].passportCode.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].passportDay.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].passportMonth.$invalid) {
            isValid = false;
          } else if (this.validationHandler.passengers.$each[i].passportYear.$invalid) {
            isValid = false;
          } else {
            isValid = true;
          }
        }
        
        this.$nextTick(() => {
          let domRect = document.querySelector('.input--error');
          this.$scrollTo(domRect, 1800, {easing: "ease-in-out"});
        });
        
        this.$refs.cartItems.forEach(function(item) {
          item.$v.$touch();
          if (item.$v.$invalid) {
            isValidTrain = false;
          } else {
            isValidTrain = true;
          }
        });

        this.$v.$touch();
        if (this.$v.$invalid) {
          isValidAdditional = false;
        } else {
          isValidAdditional = true;
        }
        if (isValid && isValidTrain || isValidAdditional) {
          let nextLink = {};
          this.getTicketsFromCart.filter((ticket) => {
            if (ticket.name.toLowerCase() === this.$options.name.toLowerCase()) {
              ticket.selectSeat = true;
              this.setTicketsList(ticket)
            } else {
              nextLink = ticket;
            }
          });
          this.$router.push({
            name: nextLink && !this.getTicketsFromCart.every((item) => item.selectSeat === true) ? nextLink.name : 'payment',
          }).catch(() => {});
        }
      }
    },
    beforeMount() {
      this.getCurrentPrice(this.promo).then((res) => {
        let priceWithDiscount = res.data.data.price_with_discount,
          priceWithoutDiscount = res.data.data.price_without_discount;
        this.fullPrice = priceWithoutDiscount;
        if(res.data.errors.length !== 0) {
          res.data.errors.forEach((err) => {
            this.$toasted.global.my_app_error({
              message: err.error,
            });
          })
        } else {
          if(priceWithDiscount !== priceWithoutDiscount) {
            this.beforeMountPriceDiscount = (priceWithoutDiscount - priceWithDiscount).toFixed(2);
            var getPercent = Math.floor(((priceWithoutDiscount - priceWithDiscount) / priceWithDiscount) * 100);

            this.$toasted.global.my_app_success({
              message: this.$t('discountSkyUpAlert') + getPercent.toFixed(0) + "%",
            });
          } else {
            this.beforeMountPriceDiscount = false;
            this.$toasted.global.my_app_error({
              message: this.$t("errorPromoCode"),
            });
          }
        }
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
  
  .card-aircraft {
    background-color: #fff;
    padding: 20px 0 150px 0;
    
    .container {
      .border-bottom {
        padding-top: 25px;
        border-bottom: 1px solid #ececec;
      }
      .step-back__block {
        margin-bottom: 40px;
        
        .back-to-site__link {
          cursor: pointer;
          display: flex;
          color: #000;
          text-decoration: none;
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
      
      h2 {
        font-weight: normal;
        font-size: 48px;
        color: #000;
        @include respond-until(sm) {
          font-size: 26px;
        }
      }
      
      > .d-flex {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        @include respond-until(sm) {
          align-items: center;
        }
        
        .total-amount {
          width: 460px;
          &:first-child {
            margin-top: 50px;
          }
          @include respond-until(sm) {
            margin-top: 30px;
          }
          
          span {
            font-weight: 300;
            font-size: 22px;
            
            &.price {
              font-size: 26px;
              margin-left: 10px;
              color: $LINK_COLOR;
              font-weight: bold;
            }
          }
          .cart-total__commission-sum {
            font-size: 14px;
            font-style: italic;
            margin-top: 10px;
          }
        }
        
        .cart-submit {
          width: 310px;
          height: 65px;
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          @include respond-until(sm) {
            margin-top: 25px;
          }
          
          &:disabled {
            color: #fff;
          }
        }
      }
    }
  }
</style>
