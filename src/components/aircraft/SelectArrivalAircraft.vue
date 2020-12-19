<template>
  <span>
    <v-select
        class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
        v-model="selected"
        :options="paginated"
        :filter="fuseSearch"
        :clearable="false"
        :limit="limit"
        :placeholder="$t('flyFrom')"
        @open="onOpen"
        @close="onClose"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader"></li>
      </template>
      <template #option="{ code, is_new}">
          <span class="label">{{ getCityNameByCode(code) }} / {{ getCityCountryByCode(code) }}</span>
          <small class="code">({{ code }})</small>
          <span class="in-new" v-show="is_new == '1'">new</span>
      </template>
    </v-select>
  </span>
</template>

<script>
  import Fuse from "fuse.js";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "SelectArrivalAircraft",
    data: () => ({
      observer: null,
      limit: 10,
      search: "",
    }),
    mounted() {
      this.observer = new IntersectionObserver(this.infiniteScroll);
    },
    computed: {
      ...mapGetters([
        "getAirports",
        "getArrivalCityCode",
        "getDepartmentCityCode",
        "getCityNameByCode",
        "getCityCountryByCode"
      ]),
      selected: {
        get() {
          if (this.getArrivalCityCode) {
            return this.getCityNameByCode(this.getArrivalCityCode) + ' / ' +
              this.getCityCountryByCode(this.getArrivalCityCode) + '(' + this.getArrivalCityCode + ')';
          } else {
            return null;
          }
        },
        set(value) {
          this.setArrivalCityCode(value.code);
          this.setArrivalCountry(this.getCityCountryByCode(this.getArrivalCityCode));
          if(value.city_code) {
            this.setArrivalMainCityCode(value.city_code)
          }
      },
      },
      findRelated() {
        if(this.getDepartmentCityCode) {
          return this.getAirports.find((airport) => airport.code == this.getDepartmentCityCode)?.connection
        } else {
          return this.getAirports;
        }
        
      },
      paginated() {
        return this.findRelated.slice(0, this.limit);
      },
      hasNextPage() {
        return this.paginated.length < this.findRelated.length;
      },
    },
    methods: {
      ...mapActions(["setArrivalCityCode","setArrivalMainCityCode","setArrivalCountry"]),

      fuseSearch(options, search) {
        console.log(options)
        const fuse = new Fuse(options, {
          keys: ["code", "is_new", "city_name_uk", "city_name_en", "country_name_en", "country_name_uk"],
          shouldSort: true,
          threshold: 0.0,
          includeMatches: true,
        });
        return search.length
          ? fuse.search(search).map(({ item }) => item)
          : fuse.list;
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
  .label {
    margin-bottom: 0;
    font-size: 14px;
  }
  .in-new {
    font-size: 9px;
    padding: 3px;
    margin-left: 5px;
    background-color: #1B73CD;
    border-radius: 5px;
    color: #fff;
  }
  .code {
    font-size: 12px;
    margin-left: 5px;
  }
</style>
