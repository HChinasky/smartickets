import includes from "lodash/includes";
import { mapActions, mapGetters } from "vuex";

export const wagonTemplateMixin = {
  inheritAttrs: false,
  props: ["name", "number"],
  data() {
    return {
      componentIndex: 1,
      selected: [],
    };
  },
  computed: {
    ...mapGetters([
      "getWagon",
      "getCart",
      "getWagonByNumber",
      "getIsMetroActive",
      "getMetroStationTo",
      "getMetroStationFrom",
    ]),
    freePlaces() {
      return this.getWagon.places;
    },
  },
  methods: {
    ...mapActions(["addItemToCart", "removeItemFromCart"]),
    styles(number) {
      return {
        seat_taken: !includes(this.freePlaces, number),
        seat_selected: includes(this.selected, number),
      };
    },

    select(e) {
      let number = parseInt(e.textContent, 10);
      let placeType = "bottom";
      if (e.classList.contains("seat-top")) {
        placeType = "top";
      }

      if (includes(this.selected, number)) {
        this.removeFromCart(number);
        this.selected = this.getSelectePlacesFromCart();
      } else {
        if (includes(this.freePlaces, number)) {
          this.addToCart(number, placeType);
          this.selected = this.getSelectePlacesFromCart();
        }
      }
    },

    addToCart(number, place_type) {
      const wagon = this.getWagonByNumber(this.number);
      const metro = {
        from: this.getMetroStationFrom,
        to: this.getMetroStationTo,
        price: this.$appConfig.services.cost.metroTicket,
        selected: this.getIsMetroActive,
      };

      this.addItemToCart({
        place: number,
        place_type,
        wagon_num: parseInt(this.number),
        train_num: this.$route.params.trainNumber,
        price: wagon.cost.value,
        type: wagon.type.code,
        wagon_class: wagon.class.code,
        metro: metro,
      });
    },
    removeFromCart(number) {
      this.removeItemFromCart({
        place: number,
        wagon_num: parseInt(this.number),
      });
    },

    getSelectePlacesFromCart() {
      var places = [];
      var items = this.getCart.filter(
        (item) =>
          item.train.train_num === this.$route.params.trainNumber &&
          item.train.wagon_num === parseInt(this.number)
      );

      items.forEach((element) => places.push(element.train.place));
      return places;
    },
  },
  beforeUpdate() {
    this.selected = this.getSelectePlacesFromCart();
  },
  created() {
    this.selected = this.getSelectePlacesFromCart();
  },
};
