<template>
  <span>
    <v-select
        class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
        v-model="selected"
        :options="paginated"
        :filterable="true"
        :limit="limit"
        :clearable="false"
        :placeholder="$t('flyTo')"
        @open="onOpen"
        @close="onClose"
        @search="(query) => (search = query)"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>
  </span>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "SelectArrivalAircraft",
    data: () => ({
      observer: null,
      limit: 3,
      search: "",
    }),
    mounted() {
      this.observer = new IntersectionObserver(this.infiniteScroll);
    },
    computed: {
      ...mapGetters(["getCities", "getArrivalCity", "getCityNameById", "getCityCodeById"]),
      selected: {
        get() {
          if (this.getArrivalCity) {
            return this.getCityNameById(this.getArrivalCity);
          } else {
            return null;
          }
        },
        set(value) {
          this.setArrivalCity(value.id);
          this.setArrivalCityCode(this.getCityCodeById(value.id));
        },
      },

      filtered() {
        return this.getCities.filter((country) =>
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
      ...mapActions(["setArrivalCity", "setArrivalCityCode"]),
      setSelected(id) {
        this.setArrivalCity(id);
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
