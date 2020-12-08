<template>
  <span>
    <v-select
      class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
      v-model="selected"
      :options="paginated"
      :filterable="true"
      :limit="limit"
      :clearable="false"
      @open="onOpen"
      @close="onClose"
      @search="(query) => (search = query)"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>

    <div class="ts-form__help-links">
      <span @click="setSelected(2200001)" class="ts-form__help-link">{{
        $t("Kyiv")
      }}</span>
      <span @click="setSelected(2218000)" class="ts-form__help-link">{{
        $t("Lviv")
      }}</span>
      <span @click="setSelected(2204001)" class="ts-form__help-link">{{
        $t("Kharkiv")
      }}</span>
      <span @click="setSelected(2208001)" class="ts-form__help-link">{{
        $t("Odesa")
      }}</span>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SelectArrival",
  data: () => ({
    observer: null,
    limit: 3,
    search: "",
  }),
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  computed: {
    ...mapGetters(["getStations", "getArrivalStation", "getStationNameById"]),
    selected: {
      get() {
        if (this.getArrivalStation) {
          return this.getStationNameById(this.getArrivalStation);
        } else {
          return null;
        }
      },
      set(value) {
        this.setArrivalStation(value.id);
      },
    },

    filtered() {
      return this.getStations.filter((country) =>
        country.text.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
  },
  methods: {
    ...mapActions(["setArrivalStation"]),
    setSelected(id) {
      this.setArrivalStation(id);
    },

    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },
  },
};
</script>

<style scoped>
.dropdown-input >>> .vs__dropdown-toggle {
  border: none;
}
.dropdown-input >>> .vs__selected {
  margin-left: 0px;
  padding-left: 0px;
}

.dropdown-input >>> .vs__open-indicator {
  fill: black;
  cursor: pointer;
}
</style>
