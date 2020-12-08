<template>
  <div class="notification">
    <img v-if="isSuburbanTrain"
      class="notification__icon"
      src="../assets/img/svg/passenger-gray-second.svg"
      alt="Passenger"
    />
    <img v-else
      class="notification__icon"
      src="../assets/img/svg/passenger-gray.svg"
      alt="Passenger"
    />
    <div class="notification__text">
      <template v-if="!isSuburbanTrain">
      <span class="notification__time">8 {{ $t("minutes") }}</span
      ><span class="notification__label">{{ $t("transferToVokzalna") }}</span>
      </template>
      <div class="notification__checkbox switch-metro">
        <input
          class="notification__input"
          id="metro"
          type="checkbox"
          name="metro"
          :checked="selectedMetro"
          @change="selectMetro()"
        />
        <label class="notification__input-label" for="metro">{{
          $t("useMetro")
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MetroNotification",
  props: {
    'isSuburbanTrain': Boolean
  },
  computed: {
    ...mapGetters(["getIsMetroActive"]),
    selectedMetro() {
      return this.getIsMetroActive;
    },
  },

  methods: {
    ...mapActions(["changeMetroStatus"]),
    selectMetro() {
      this.changeMetroStatus(!this.selectedMetro);
    },
  },
};
</script>

<style scoped>
.schedule-block .notification__input-label::after,
.buy-ticket .notification__input-label::after {
  background-image: url(../assets/img/svg/white-check.svg);
}
</style>
