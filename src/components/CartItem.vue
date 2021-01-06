<template>
  <div class="ticket-list__item">
    <NotificationBar v-if="showNotification" :notification="notification" />
    <div class="ticket-list__header">
      <svg viewBox="0 0 15 32">
        <use
          :xlink:href="require('@/assets/img/sprite.svg') + '#icon-passenger'"
        />
      </svg>
      {{ $t("passenger") }} {{ index + 1 }}
    </div>

    <div class="ticket-list__inner">
      <div class="ticket-list__passenger">
        <div class="ticket-list__group">
          <label class="ticket-list__label" for="client-name">{{
            $t("lastname")
          }}</label>
          <input
            v-model.trim="surname"
            class="ticket-list__input"
            :class="{ 'input--error': $v.surname.$error}"
            type="text"
            :disabled="ticket.booked"
            @blur="$v.surname.$touch()"
            @input="changePassengerSurname($event.target.value)"
            @keydown.space.prevent
          />
          <template v-if="$v.surname.$error">
            <p v-if="!$v.surname.required" class="errorMessage">
              {{ $t("lastNameEmpty") }}
            </p>
            <p v-if="!$v.surname.minLength" class="errorMessage">
              {{ $t("firstnameMinLength") }}
            </p>
            <p v-if="!$v.surname.alpha" class="errorMessage">
              {{ $t("firstnameAlpha") }}
            </p>
            <p v-if="!$v.surname.maxLength" class="errorMessage">
              {{ $t("firstnameMaxLength") }}
            </p>
          </template>
        </div>
        <div class="ticket-list__group">
          <label class="ticket-list__label" for="client-name">{{
            $t("firstname")
          }}</label>
          <input
            v-model.trim="name"
            class="ticket-list__input"
            :class="{ 'input--error': $v.name.$error}"
            type="text"
            :disabled="ticket.booked"
            @blur="$v.name.$touch()"
            @input="changePassengerName($event.target.value)"
            @keydown.space.prevent
          />
          <template v-if="$v.name.$error">
            <p v-if="!$v.name.required" class="errorMessage">
              {{ $t("firstNameEmpty") }}
            </p>
            <p v-if="!$v.name.minLength" class="errorMessage">
              {{ $t("firstnameMinLength") }}
            </p>
            <p v-if="!$v.name.alpha" class="errorMessage">
              {{ $t("firstnameAlpha") }}
            </p>
            <p v-if="!$v.name.maxLength" class="errorMessage">
              {{ $t("firstnameMaxLength") }}
            </p>
          </template>
        </div>

        <!--
        <div class="ticket-list__group">
          <label class="ticket-list__label" for="client-email">{{ $t("email")}}</label>
          <input class="ticket-list__input" id="client-email" name="client-email" type="email" />
        </div>
        -->
      </div>
      <div class="ticket-list__config">
        <div class="ticket-list__document-inf">
          <h3 class="ticket-list__subtitle">{{ $t("documentType") }}:</h3>
          <div class="ticket-list__group radio">
            <input
              class="radio__input"
              :id="`full-` + (index + 1)"
              :name="`doc-type-` + (index + 1)"
              type="radio"
              :checked="ticket.train.services.doc_type == 'FULL'"
              value="FULL"
              @change="changeDocumentType($event.target.value)"
            />
            <label class="radio__label" :for="`full-` + (index + 1)">{{
              $t("full")
            }}</label>
          </div>
          <!--
          <div class="ticket-list__group radio">
            <input
              class="radio__input"
              :id="`kid-` + (index + 1)"
              :name="`doc-type-` + (index + 1)"
              type="radio"
              :checked="ticket.train.services.doc_type == 'CHILD'"
              value="CHILD"
              @change="changeDocumentType($event.target.value)"
            />
            <label class="radio__label" :for="`kid-` + (index + 1)">{{ $t("kid")}}</label>
          </div>
          -->

          <!--
          <div class="ticket-list__group radio">
            <input
              class="radio__input"
              id="student-1"
              name="doc-type-1"
              type="radio"
            />
            <label class="radio__label" for="student-1">Студентський</label>
          </div>
          <div class="ticket-list__group radio">
            <input
              class="radio__input"
              id="preferential-1"
              name="doc-type-1"
              type="radio"
            />
            <label class="radio__label" for="preferential-1">Пільговий</label>
          </div>
          -->
        </div>
        <div class="ticket-list__add-services tl-add-services">
          <h3 v-if="ticket.train.wagon_type != 'С'" class="ticket-list__subtitle">{{ $t("services") }}:</h3>
          <div
            v-if="ticket.train.wagon_type != 'С'"
            class="ticket-list__group checkbox"
          >
            <input
              class="checkbox__input"
              :id="`linens-` + (index + 1)"
              :name="`bedding-` + (index + 1)"
              type="checkbox"
              ref="beddingSelected"
              :checked="ticket.train.services.bedding"
              :disabled="ticket.train.wagon_type == 'Л' || ticket.booked"
              @change="changeBedding()"
            />
            <label class="checkbox__label" :for="`linens-` + (index + 1)">{{
              $t("bedding")
            }}</label>
          </div>
          <!--
          <div class="ticket-list__group checkbox">
            <input
              ref="twoDrinks"
              :name="`drinks-2-` + (index + 1)"
              type="checkbox"
              :id="`drinks-2-` + (index + 1)"
              class="checkbox__input"
              value="M"
              :checked="ticket.train.services.drinks == 2"
              :disabled="ticket.booked"
              @change="changeTwoDrinks()"
            />
            <label :for="`drinks-2-` + (index + 1)" class="checkbox__label"
              >2 {{ $t("drinks") }}</label
            >
          </div>

          <div class="ticket-list__group checkbox">
            <input
              ref="oneDrink"
              :name="`drinks-1-` + (index + 1)"
              type="checkbox"
              :id="`drinks-1-` + (index + 1)"
              class="checkbox__input"
              value="H"
              :checked="ticket.train.services.drinks == 1"
              :disabled="ticket.booked"
              @change="changeOneDrink()"
            />
            <label :for="`drinks-1-` + (index + 1)" class="checkbox__label"
              >1 {{ $t("drink") }}</label
            >
          </div>
          -->
        </div>
      </div>
      <div class="ticket-list__trip-inf" v-if="showSeatDetails">
        <div class="ticket-list__places-inf">
          <div class="ticket-list__places">
            <span>
              {{ $t("wagon") }}:
              <strong>{{ ticket.train.wagon_num }}</strong>
            </span>
            &nbsp;
            <span v-if="!$route.meta.clientArea">|</span>
            &nbsp;
            <span>
              &nbsp;
              {{ $t("place") }}:
              <strong class="marked"
                >{{ ticket.train.place }}
                {{
                  ticket.train.wagon_class == "1" ||
                  ticket.train.wagon_class == "2"
                    ? "(" +
                      $t("wagonClass", { class: ticket.train.wagon_class }) +
                      ")"
                    : placeType(ticket.train.place_type)
                }}</strong
              >
            </span>
          </div>
          <div class="ticket-list__cost">
            {{ $t("cost") }}:
            <strong
              >{{ parseFloat(ticket.train.price).toFixed(2) }}
              {{ $t("UAH") }}</strong
            >
          </div>
          <div v-if="!ticket.booked" class="ticket-list__remove">
            <a @click="removeTicket()">
              <svg viewBox="0 0 12 12">
                <use
                  :xlink:href="
                    require('@/assets/img/sprite.svg') + '#icon-cancel'
                  "
                />
              </svg>
            </a>
          </div>
        </div>

        <CartMetroItem
          v-if="ticket.metro.selected"
          :price="ticket.metro.price"
          :wagon_num="ticket.train.wagon_num"
          :place="ticket.train.place"
          :isBooked="ticket.booked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NotificationBar from "./NotificationBar";
import CartMetroItem from "./CartMetroItem";
import required from "vuelidate/lib/validators/required";
import maxLength from "vuelidate/lib/validators/maxLength";
import minLength from "vuelidate/lib/validators/minLength";
import { helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex(
  "alpha",
  /^[A-Za-z- а,б,в,г,ґ,д,е,є,ж,з,и,і,ї,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ь,ю,я,э,ы,ъ,-,']+$/i
);

export default {
  name: "CartItem",
  components: {
    NotificationBar,
    CartMetroItem,
  },
  refs: ["beddingSelected"],
  data() {
    return {
      passenger: {
        name: "",
        surname: "",
        email: "",
      },
      services: {
        doc_type: "FULL",
        bedding: true,
        drinks: 0,
      },
      name: null,
      surname: null,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(15),
      alpha,
    },
    surname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(15),
      alpha,
    },
  },
  props: {
    ticket: Object,
    index: Number,
    showSeatDetails: Boolean
  },

  computed: {
    ...mapGetters(["getCart"]),
    showNotification() {
      if (this.ticket.order_info) {
        return (
          this.getCart.length > 0 &&
          !this.getCart.every((item) => item.booked === true)
        );
      } else {
        return false;
      }
    },
    notification() {
      const orderInfo = this.ticket.order_info;
      if (orderInfo.code == 0) {
        return {
          message: `Квиток на суму ${orderInfo.amount} грн (вагон ${orderInfo.wagon_num} місце ${orderInfo.place}) успішно оформлено`,
          type: "success",
        };
      } else {
        return {
          message: this.ticket.order_info.msg,
          type: this.ticket.booked ? "success" : "error",
        };
      }
    },
  },
  methods: {
    ...mapActions([
      "removeItemFromCart",
      "updatePassenger",
      "updateServices",
      "reduceTicketPrice",
      "increaseTicketPrice",
      "updateMetro",
      "setValidationError",
      "removeValidationError",
    ]),

    placeType(type) {
      switch (type) {
        case "top":
          return `(${this.$t("placeTop")})`;
        case "bottom":
          return `(${this.$t("placeBottom")})`;
        case "first":
          return `(${this.$t("placeFirstClass")})`;
        case "second":
          return `(${this.$t("placeSecondClass")})`;
        case "third":
          return `(${this.$t("placeThirdClass")})`;
        default:
          return null;
      }
    },
    removeTicket() {
      this.removeItemFromCart({
        place: this.ticket.train.place,
        wagon_num: this.ticket.train.wagon_num,
      });
    },
    changePassengerName(name) {
      this.passenger.name = name;
      this.updatePassenger({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        passenger: this.passenger,
      });
    },

    changePassengerSurname(surname) {
      this.passenger.surname = surname;
      this.updatePassenger({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        passenger: this.passenger,
      });
    },
    changeDocumentType(type) {
      this.services.doc_type = type;
      this.updateServices({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        services: this.services,
      });
    },
    changeBedding() {
      this.services.bedding = !this.services.bedding;
      if (["К", "П", "Л", "М"].includes(this.ticket.train.wagon_type)) {
        if (this.$refs.beddingSelected.checked == false) {
          this.reduceTicketPrice({
            wagon_num: this.ticket.train.wagon_num,
            place: this.ticket.train.place,
            price: this.$appConfig.services.cost.bedding,
          });
        }
        if (this.$refs.beddingSelected.checked == true) {
          this.increaseTicketPrice({
            wagon_num: this.ticket.train.wagon_num,
            place: this.ticket.train.place,
            price: this.$appConfig.services.cost.bedding,
          });
        }
      }
      this.updateServices({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        services: this.services,
      });
    },

    changeTwoDrinks() {
      if (this.$refs.oneDrink.checked == true) {
        this.reduceTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.oneDrink,
        });
      }

      this.$refs.oneDrink.checked = false;

      if (this.$refs.twoDrinks.checked == true) {
        this.services.drinks = 2;
        this.increaseTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.twoDrinks,
        });
      } else {
        this.services.drinks = 0;
        this.reduceTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.twoDrinks,
        });
      }

      this.updateServices({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        services: this.services,
      });
    },

    changeOneDrink() {
      if (this.$refs.twoDrinks.checked == true) {
        this.reduceTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.twoDrinks,
        });
      }
      this.$refs.twoDrinks.checked = false;
      if (this.$refs.oneDrink.checked == true) {
        this.services.drinks = 1;
        this.increaseTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.oneDrink,
        });
      } else {
        this.services.drinks = 0;
        this.reduceTicketPrice({
          wagon_num: this.ticket.train.wagon_num,
          place: this.ticket.train.place,
          price: this.$appConfig.services.cost.oneDrink,
        });
      }

      this.updateServices({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
        services: this.services,
      });
    },
  },
  created() {
    this.services.bedding = this.ticket.train.services.bedding;
    this.services.drinks = this.ticket.train.services.drinks;
    this.services.doc_type = this.ticket.train.services.doc_type;

    this.passenger.name = this.ticket.passenger.name;
    this.passenger.surname = this.ticket.passenger.surname;

    this.name = this.ticket.passenger.name;
    this.surname = this.ticket.passenger.surname;

    if (!this.ticket.booked) {
      this.updateMetro({
        wagon_num: this.ticket.train.wagon_num,
        place: this.ticket.train.place,
      });
    }
  },
  beforeUpdate() {
    this.passenger.name = this.ticket.passenger.name;
    this.passenger.surname = this.ticket.passenger.surname;
    this.name = this.ticket.passenger.name;
    this.surname = this.ticket.passenger.surname;
  },
};
</script>

<style scoped>
.checkbox__label::after {
  background-image: url(../assets/img/svg/white-check.svg);
}
.errorMessage {
  font-size: 14px;
  font-weight: 100;
  color: #f44336;
}
.ticket-list__cost_smartticket {
  font-size: 1em;
}
</style>
