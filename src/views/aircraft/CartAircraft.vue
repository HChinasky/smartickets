<template>
  <section class="card-aircraft">
    <div class="container">
      <div class="step-back__block">
        <router-link class="back-to-site__link" :to="{name : 'SearchAircraftTicket'}">
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
          {{ $t('toSearchPage') }}
        </router-link>
      </div>
      <h1>{{ $t('whoFlies') }}</h1>
      <passengerCart @checkinput="handlerIcon" />
      <div class="d-flex">
        <template v-if="fullPrice !== getPrice">
          <div class="total-amount">
            <span class="label">{{ $t('cost') }}:</span>
            <span class="price">{{ (+fullPrice).toFixed(2) }} {{ $t('UAH') }}</span>
          </div>
          <div class="total-amount">
            <span class="label">{{ $t('discount') }}:</span>
            <span class="price">-{{(+fullPrice - +getPrice).toFixed(2) }} {{ $t('UAH') }}</span>
          </div>
          <div class="total-amount">
            <span class="label">{{ $t('totalPriceSecond') }}:</span>
            <span class="price">{{ getPrice }} {{ $t('UAH') }}</span>
          </div>
        </template>
        <template v-else>
          <div class="total-amount">
            <span class="label">{{ $t('cost') }}:</span>
            <span class="price">{{ getPrice }}</span>
          </div>
        </template>
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
  import { mapMultiRowFields } from 'vuex-map-fields';
  import { mapGetters, mapActions } from "vuex";
  import PassengerCart from '../../components/aircraft/PassengerCart';
  
  export default {
    name: "CartAircraft",
    components: {
      PassengerCart
    },
    data() {
      return {
        validationHandler: "",
        links: "",
        promo: "GL-GC2Q2ZT",
        fullPrice: "",
      }
    },
    computed: {
      ...mapMultiRowFields(["passengers"]),
      ...mapGetters([
        "getTicketPrice",
        "getTicketDepartmentPrice",
        "getField",
        "getTicketsFromCart",
      ]),
      getPrice() {
        if(this.getTicketPrice) {
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
        var isValid = false;
        for(var i=0; i<this.passengers.length;i++) {
          this.validationHandler.passengers.$each.$touch();
          if(this.validationHandler.passengers.$each[i].lastName.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].firstName.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].birthDay.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].birthMonth.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].birthYear.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].genders.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].country.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].passportCode.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].passportDay.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].passportMonth.$invalid) {
            isValid = false;
          } else if(this.validationHandler.passengers.$each[i].passportYear.$invalid) {
            isValid = false;
          } else {
            isValid = true;
          }
        }
        if(isValid) {
          let nextLink = {};
          this.getTicketsFromCart.filter((ticket) => {
            if(ticket.name.toLowerCase() === this.$options.name.toLowerCase()) {
              ticket.selectSeat = true;
              this.setTicketsList(ticket)
            } else {
              nextLink = ticket;
            }
          });
          if(this.getTicketsFromCart.length > 1) {
            this.$router.push({
              name: nextLink && !this.getTicketsFromCart.every((item) => item.selectSeat === true) ? nextLink.name : 'GeneralCart',
            });
          } else {
            this.$router.push({
              name: 'payment'
            })
          }
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
      h1 {
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
          max-width: 300px;
          width: 100%;
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
