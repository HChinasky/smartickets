<template>
  <section class="cart-table">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :loader="loader"
      :color="color"
      :is-full-page="fullPage"
    ></loading>

    <div class="container">
      <div class="ticket__inner">
        <div class="ticket__header">
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
          
        </div>
      </div>

      <div class="cart-table__inner">
        <h2 ref="selectedTickets" class="cart-table__title" v-if="!$route.meta.clientArea">
          {{ $t("selectedTickets") }}:
        </h2>
        <NotificationBar
          v-if="allTicketsBooked"
          :notification="allTicketsBookedMsg"
        />
        <div
          class="ticket-list"
          v-for="(ticket, index) in $store.getters.getCart"
          :key="index"
        >
          <CartItem ref="cartItems" :ticket="ticket" :index="index"></CartItem>

          <!--ticket__item-->
        </div>

        <template v-if="getIsDevLoginRequired">
          <div class="ticket-list__header">
            <h3 style="margin-left: 20px;">{{ $t("forTest") }}</h3>
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

        <div class="ticket-list__item">
          <div class="ticket-list__inner">
            <div class="ticket-list__group">
              <label for="client-email" class="ticket-list__label">{{
                $t("email")
              }}</label>
              <input
                v-model="email"
                type="email"
                @change="changeEmail($event.target.value)"
                @blur="$v.email.$touch()"
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
        <!--ticket__list-->
        <section class="cart-table__total cart-total">
          <div class="cart-total__cost cart-total__cost_smartticket">
            {{ $t("smartTicketRegistration") }}:<strong>
              0.06 {{ $t("UAH") }}</strong
            >
          </div>
          <div class="cart-total__cost">
            {{ $t("totalPrice") }}:
            <strong>{{ getTotalPrice }} {{ $t("UAH") }}</strong>
          </div>
           <div class="cart-total__cost cart-total__cost_smartticket">
            {{ $t("additionalFeeTxt") }}<strong>
              </strong
            >
          </div>
          <span v-if="!allTicketsBooked">
            <button
              class="cart-total__submit btn btn--black"
              :disabled="$store.state.cart.cart.length == 0"
              v-promise-btn
              @click="tryBookTickets"
            >
              {{ $t("bookTickets") }}
            </button>
          </span>

          &nbsp;
          <button
            v-if="allTicketsBooked"
            class="cart-total__submit btn btn--black"
            @click="buyTickets()"
          >
            {{ $t("buyTickets") }}
          </button>
        </section>
      </div>
    </div>

    <form ref="formRef" action method="POST" id="paymentForm">
      <input type="hidden" ref="inputRef" value name="payment_no" />
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import required from "vuelidate/lib/validators/required";
import requiredIf from "vuelidate/lib/validators/requiredIf";
import email from "vuelidate/lib/validators/email";
import CartItem from "../components/CartItem";
import NotificationBar from "../components/NotificationBar";
import i18n from "../i18n";
import Loading from "vue-loading-overlay";
//import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Cart",
  components: {
    CartItem,
    NotificationBar,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: "spinner",
      color: "#1b73cd",
    };
  },

  computed: {
    ...mapGetters([
      "getTotalPrice",
      "getCart",
      "getEmail",
      "getDevLogin",
      "getDevPassword",
      "getIsDevLoginRequired",
    ]),
    allTicketsBooked() {
      return (
        this.getCart.length > 0 &&
        this.getCart.every((item) => item.booked === true)
      );
    },
    allTicketsBookedMsg() {
      const cart = this.getCart;
      if (cart.length > 0 && cart.every((item) => item.booked === true)) {
        if (i18n.locale == "en") {
          return {
            message: `Train tickets №${cart[0].train.train_num} in the number of  ${cart.length} pieces successfully booked! Click on the "Buy Tickets" button to proceed to payment`,
            type: "success",
          };
        } else {
          return {
            message: `Квитки на потяг №${cart[0].train.train_num} в кількості ${cart.length} шт успішно оформлені! Натисніть на кнопку "Купити квитки", щоб перейти до оплати`,
            type: "success",
          };
        }
      } else {
        return null;
      }
    },
    email: {
      get() {
        return this.getEmail;
      },
      set(value) {
        this.updateEmail(value);
      },
    },
    devLogin: {
      get() {
        return this.getDevLogin;
      },
      set(value) {
        this.updateDevLogin(value);
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
  },
  validations: {
    email: {
      required,
      email,
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
    },
  },
  methods: {
    ...mapActions([
      "bookTickets",
      "startPayment",
      "updateEmail",
      "updateDevLogin",
      "updateDevPassword",
    ]),
    changeEmail(value) {
      this.updateEmail(value);
    },
    changeDevLogin(value) {
      this.updateDevLogin(value);
    },
    changeDevPassword(value) {
      this.updateDevPassword(value);
    },
    async tryBookTickets() {
      var isValid = false;
      var isValidAdditional = false;

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

      if (!isValid || !isValidAdditional) {
        this.$toasted.global.my_app_error({
          message: this.$t("orderErrors"),
        });
        return;
      } else {
        await this.bookTickets()
          .then(() => {
            this.$refs.selectedTickets.scrollIntoView({
              block: "end",
              scrollBehavior: "smooth",
            });
          })
          .catch((error) => {
            this.$toasted.global.my_app_error({
              message: error.message,
            });
          });
      }
    },

    buyTickets() {
      this.isLoading = true;
      this.startPayment()
        .then((response) => {
          var el = document.createElement("p");
          el.innerHTML = response;
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
    },
  },
};
</script>

<style scoped>
.cart-total__cost_smartticket {
  font-size: 2rem !important;
}

a:hover {
  cursor: pointer;
}
.errorMessage {
  color: red;
}
</style>
