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
        <li ref="load" class="loader"> </li>
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
  import { required } from "vuelidate/lib/validators";

  export default {
    name: "SelectDepartmentAircraft",
    component: {
      Fuse
    },
    data() {
      return {
        observer: null,
        limit: 10,
        search: "",
      };
    },
    validations: {
      selected: { required },
    },
    mounted() {
      this.observer = new IntersectionObserver(this.infiniteScroll);
    },
    watch: {
      getDepartmentCityCode: {
        immediate: true,
        handler(newValue) {
          if(newValue) {
            this.$store.commit('updateCityDepartmentDate', null);
            this.$store.commit('updateCityArrivalDate', null);
            this.resetCartState();
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        "getAirports",
        "getDepartmentCityCode",
        "getArrivalCityCode",
        "getCityNameByCode",
        "getArrivalCityCode",
        "getDepartmentCountry",
        "getCityCountryByCode",
      ]),
      selected: {
        get() {
          if (this.getDepartmentCityCode) {
            return this.getCityNameByCode(this.getDepartmentCityCode) + ' / ' +
              this.getCityCountryByCode(this.getDepartmentCityCode) + ' (' + this.getDepartmentCityCode + ')';
          } else {
            return null;
          }
        },
        set(value) {
          this.setDepartmentCityCode(value.code);
          this.setDepartmentCountry(this.getCityCountryByCode(this.getDepartmentCityCode));
          if(value.city_code) {
            this.setDepartmentMainCityCode(value.city_code)
          }
        },
      },
      findRelated() {
        if(this.getArrivalCityCode) {
          return this.getAirports.find((airport) => airport.code == this.getArrivalCityCode)?.connection
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
      ...mapActions([
        "setDepartmentCityCode",
        "setDepartmentMainCityCode",
        "setDepartmentCountry",
        "updateCityDepartmentDate",
        "updateCityArrivalDate",
        "resetCartState"
      ]),
      fuseSearch(options, search) {
        const fuse = new Fuse(options, {
          keys: ["city_name", "country_name", "code", "is_new", "city_name_uk", "city_name_en", "country_name_en", "country_name_uk"],
          threshold: 0.1,
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

<style lang="scss" scoped>
  span {
    .dropdown-toggle {
      border: none;
    }
    .dropdown-input {
      ::v-deep .vs__dropdown-toggle {
        border: none;
        .vs__selected {
          margin-left: 0px;
          padding-left: 0px;
        }
      }
      ::v-deep .vs__open-indicator {
        fill: black;
        cursor: pointer;
      }
    }
  }
  
  .errorMessage {
    color: red;
    font-weight: bold;
  }
  
  .vs__clear, .dropdown-input__clear, .dropdown-input__clear svg
  {
    display: none;
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
