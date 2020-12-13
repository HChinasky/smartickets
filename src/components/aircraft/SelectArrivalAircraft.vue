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
      <template v-slot:option="option">
        {{ option.label }} / {{ option.code }}
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
      ...mapGetters([
        "getAirports",
        "getArrivalCityCode",
        "getCityNameByCode"
      ]),
      selected: {
        get() {
          if (this.getArrivalCityCode) {
            return this.getCityNameByCode(this.getArrivalCityCode) + ' / ' + this.getArrivalCityCode;
          } else {
            return null;
          }
        },
        set(value) {
          this.setArrivalCityCode(value.code);
        },
      },

      filtered() {
        return this.getAirports.filter((city) =>
          city.label.toLowerCase().includes(this.search.toLowerCase())
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
      ...mapActions(["setArrivalCityCode"]),

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
