<template>
  <section class="card-aircraft">
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
      <h1>{{ $t('whoFlies') }}</h1>
      <adultCart ref="mychild" />
      <div class="d-flex">
        <div class="total-amount">
          <span class="label">{{ $t('cost') }}:</span>
          <span class="price">{{getPrice}} {{ $t('UAH') }}</span>
        </div>
        <span @click="validationForm">checkValidate</span>
        <router-link
            :to="{ name: 'payment' }"
            tag="button"
            class="cart-submit btn btn--black"
            
        >
          {{ $t("next") }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from "vuex";
  import adultCart from '../../components/aircraft/passengerCart';
  
  export default {
    name: "CartAircraft",
    components: {
      adultCart
    },
    computed: {
      ...mapGetters([
        "getTicketPrice",
        "getField",
      ]),
      getPrice() {
        return this.getTicketPrice;
      },
    },
    methods: {
      validationForm() {
        console.log(this.$refs.mychild.$v)
      },
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
          width: 310px;
          margin-top: 50px;
          @include respond-until(sm) {
            margin-top: 30px;
          }
          span {
            font-weight: 300;
            font-size: 22px;
            &.label {
          
            }
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
