<template>
  <div class="schedule schedule--metro" :class="{ disabled: !isActive }">
    <div class="info">
      <div class="info__left">
        <img
          class="info__metro-icon"
          src="../assets/img/svg/metro.svg"
          alt="Passenger"
        />
        <div class="metro-station">
          <div class="metro-station__group">
            <label class="metro-station__label" for="metro-station"
              >{{
                $store.getters.getKyivStations.includes(
                  $store.getters.getDepartmentStation
                )
                  ? $t("metroDeparture")
                  : $t("metroDestination")
              }}?</label
            >
            <SelectMetroStation />
          </div>
        </div>

        <div class="metro-route">
          <div class="metro-route__right">
            <div class="metro-route__price">
              <span class="metro-route__price-label">{{ $t("cost") }}:</span>
              <b class="metro-route__price-amount">8 {{ $t("UAH") }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectMetroStation from "./SelectMetroStation";
export default {
  name: "Metro",
  components: {
    SelectMetroStation,
  },
  computed: {
    ...mapGetters(["getIsMetroActive"]),
    isActive() {
      return this.getIsMetroActive;
    },
  },
};
</script>

<style scoped>
.schedule-block .disabled,
.buy-ticket .disabled {
  position: relative;
  border: 1px solid #e1e1e1;
}
.schedule-block .disabled .info__left,
.buy-ticket .disabled .info__left {
  opacity: 0.3;
  position: relative;
}
.schedule-block .disabled .info__left::after,
.buy-ticket .disabled .info__left::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
