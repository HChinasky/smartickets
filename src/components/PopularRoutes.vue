<template>
  <section class="popular-direction-tags">
    <div class="container">
      <h2 class="popular-direction-tags__title">
        {{ $t("popularRoutes") }}
      </h2>

      <ul class="popular-direction-tags__list">
        <li
          class="popular-direction-tags__item"
          v-for="(route, index) in routes"
          :key="index"
        >
          <a
            href="#"
            @click="selectRoute(route)"
            class="popular-direction-tags__link"
            >{{ getStationNameById(route.from) }} - {{getStationNameById(route.to) }}</a
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PopularRoutes",
  computed: {
    ...mapGetters(["getPopularRoutes", "getStationNameById"]),
    routes() {
      return this.getPopularRoutes;
    },
  },
  methods: {
    ...mapActions(["setDepartmentStation", "setArrivalStation"]),
    selectRoute(route) {
      this.setDepartmentStation(route.from);
      this.setArrivalStation(route.to);
    },
  },
};
</script>
