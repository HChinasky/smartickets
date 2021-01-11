<template>
  <section class="buy-ticket">
    <div class="container">
      <a v-back v-if="!$route.meta.clientArea" class="go-back">
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
        <span class="go-back__text">{{ $t("toSearchResult") }}</span>
      </a>
      <div class="ticket__table">
        <div class="ticket__thead">
          <div class="ticket__tr">
            <div class="ticket__th">{{$t("from")}} — {{$t("to")}}</div>
            <div class="ticket__th">{{$t("departure")}}</div>
            <div class="ticket__th">{{$t("arrival")}}</div>
            <div class="ticket__th">{{$t("travelTime")}}</div>
            <div class="ticket__th">{{$t("type")}}</div>
            <div class="ticket__th">{{$t("cost")}}</div>
            <div class="ticket__th">{{$t("numberSeats")}}</div>
          </div>
        </div>
        <SuburbanTrainResult :buyTicket="true" />
      </div>
      <div class="ticket-list__item">
        <div class="ticket-list__inner">
          <div class="ticket-list__group">
            <label for="client-email" class="ticket-list__label">{{
              $t("pleaseEnterEmail")
              }}</label>
            <input
                v-model="email"
                type="email"
                id="client-email"
                class="ticket-list__input passenger-email"
            />
            <template v-if="$v.email.$error">
              <p v-if="!$v.email.required" class="errorMessage">
                {{ $t("emailEmpty") }}
              </p>
              <p v-if="!$v.email.email" class="errorMessage">
                {{ $t("emailInvalid") }}
              </p>
            </template>
          </div>
        </div>
      </div>
      <section class="cart-table__total cart-total">
        <div class="cart-total__cost cart-total__cost_smartticket">
          {{ $t("smartTicketRegistration") }}:<strong>
          0.06 {{ $t("UAH") }}</strong
        >
        </div>
        <div class="cart-total__cost">
          {{ $t("totalPrice") }}:
          <strong>123.06 {{ $t("UAH") }}</strong>
        </div>
        <div class="cart-total__cost cart-total__cost_smartticket">
          {{ $t("additionalFeeTxt") }}<strong>
        </strong
        >
        </div>
        <button
            disabled
            class="cart-total__submit btn btn--black"
        >
          {{ $t("ticketBuy") }}
        </button>
      </section>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from "vuex";
  import SuburbanTrainResult from "../../components/suburbanTrain/SuburbanTrainResult";
  import { email,required } from "vuelidate/lib/validators";
  
  export default {
    name: "TrainTicketsBuy",
    data() {
      return {
        email: ''
      }
    },
    components: {
      SuburbanTrainResult
    },
    validations: {
      email: {
        required,
        email,
      },
    },
    computed: {
      ...mapGetters([
        "getDepartmentStation",
        "getArrivalStation",
        "getKyivStations",
      ]),
    },
    methods: {
      showMetro() {
        return (
          this.getKyivStations.includes(this.getDepartmentStation) ||
          this.getKyivStations.includes(this.getArrivalStation)
        );
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";

  .buy-ticket {
    .container {
      .go-back {
        cursor: pointer;
      }
      .ticket__table {
        .ticket__thead {
          .ticket__tr {
            grid-template: "a b c d e f g";
            grid-template-columns: 23% 14% 13% 13% 10% 13% 14%;
          }
        }
      }
      .cart-table__total {
        .cart-total__cost {
          &.cart-total__cost_smartticket {
            font-size: 1.7rem;
          }
          color: $LABEL_COLOR;
        }
      }
      .ticket-list__item {
        margin-top: 70px;
        margin-bottom: 20px;
        padding-bottom: 0;
        border-bottom: none;
        .ticket-list__inner {
          padding-left: 0;
          .ticket-list__input {
            background-color: transparent;
          }
        }
      }
    }
  }
</style>
