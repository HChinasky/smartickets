<template>
  <span>
    <v-select
      class="metro-station__input metro-station__input--swap metro-station__input-dropdown dropdown-input v-select"
      v-model="selected"
      :options="paginated"
      :filterable="true"
      :clearable="false"
      :limit="limit"
      @open="onOpen"
      @close="onClose"
      @search="(query) => (search = query)"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>
    <div class="metro-station__help-links">
      <span @click="setSelected(21)" class="metro-station__help-link">
        {{ $t("Khreshchatyk") }}</span
      >
      <span @click="setSelected(77)" class="metro-station__help-link">{{
        $t("ZolotiVorota")
      }}</span>
      <span @click="setSelected(42)" class="metro-station__help-link">{{
        $t("Pochayna")
      }}</span>
      <span @click="setSelected(58)" class="metro-station__help-link">{{
        $t("Lybidska")
      }}</span>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SelectMetroStation",
  data: () => ({
    observer: null,
    limit: 3,
    search: "",
  }),
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  computed: {
    ...mapGetters([
      "getMetroStations",      
      "getMetroStationById",
      "getSelectedMetroStation",
    ]),
    selected: {
      get() {
        return this.getMetroStationById(this.getSelectedMetroStation);        
      },
      set(value) {
        this.setMetroStation(value.id);
      },
    },
    filtered() {
      return this.getMetroStations.filter((station) =>
        station.label.toLowerCase().includes(this.search.toLowerCase())
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
    ...mapActions(["setMetroStation"]),
    setSelected(id) {      
      this.setMetroStation(id);
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
