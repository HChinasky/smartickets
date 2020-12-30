<template>
  <section class="card-aircraft">
    <div class="container">
      <h2>SkyUp</h2>
      <passengerCart @checkinput="handlerIcon"/>
      <div class="d-flex">
        <div class="total-amount">
          <span class="label">{{ $t('cost') }}:</span>
          <span class="price">{{ getPrice }} {{ $t('UAH') }}</span>
        </div>
      </div>
      <div class="border-bottom"></div>
      <h2>{{ $t('train') }}</h2>
      <div
          class="ticket-list"
          v-for="(ticket, index) in getCart"
          :key="index"
      >
        <CartItem ref="cartItems" :ticket="ticket" :index="index" :showSeatDetails="false"></CartItem>
        
      </div>
     <div class="d-flex">
        <div class="total-amount">
          <span class="label">{{ $t('cost') }}:</span>
          <span class="price">{{ getTotalPrice }} {{ $t('UAH') }}</span>
        </div>
      </div>
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
        validationHandler: ""
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
      email: {
        get() {
          return this.getEmail;
        },
        set(value) {
          this.updateEmail(value);
        },
      },
      getPrice() {
        if (this.getTicketPrice) {
          return this.getTicketPrice;
        }
        return this.getTicketDepartmentPrice
      },
    },
    methods: {
      ...mapActions(["setTicketsList"]),
      handlerIcon($v) {
        this.validationHandler = $v;
      },
      getValidate() {
        var isValidAdditional = false,
            isValid           = false;

        this.$refs.cartItems.forEach(function(item) {
          item.$v.$touch();
          if (item.$v.$invalid) {
            isValid = false;
          } else {
            isValid = true;
          }
        });

        this.$v.$touch();
        if (this.$v.$invalid) {
          isValidAdditional = false;
        } else {
          isValidAdditional = true;
        }
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
        if (isValid || !isValidAdditional) {
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
            name: nextLink && !this.getTicketsFromCart.every((item) => item.selectSeat === true) ? nextLink.name : 'GeneralCart',
          });
        }
      }
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
          width: 310px;
          margin-top: 50px;
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
