<template>
  <div class="ticket-list__ticket-type ticket-type">
    <div class="ticket-type__name">
      {{ $t("metroTicket") }} ({{ $t("Kyiv") }})
    </div>
    <div class="ticket-type__cost">
      {{ $t("cost") }}:
      <strong>{{ price }} {{ $t("UAH") }}</strong>
    </div>
    <div class="ticket-list__remove">
      <div :class="{ 'ticket-list__remove': !$route.meta.clientArea }" v-if="!isBooked">
      <a @click="removeMetroFromCart()">
        <svg viewBox="0 0 12 12">
          <use
            :xlink:href="require('@/assets/img/sprite.svg') + '#icon-cancel'"
          />
        </svg>
      </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CartMetroItem",
  props: {
    price: {
      required: true,
    },
    place: {
      required: true,
    },
    wagon_num: {
      required: true,
    },
    isBooked: {
      required: true,
    },
  },
  methods: {
    ...mapActions(["setMetroFalse", "unsetBookedStatus"]),
    removeMetroFromCart() {
      this.setMetroFalse({ wagon_num: this.wagon_num, place: this.place });
      this.unsetBookedStatus({ wagon_num: this.wagon_num, place: this.place });
    },
  },
};
</script>

<style scoped></style>
