<template>
  <span>
    <v-select
        class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
        v-model="selected"
        :options="paginated"
        :filterable="true"
        :clearable="false"
        :limit="limit"
        :placeholder="$t('flyFrom')"
        @open="onOpen"
        @close="onClose"
        @search="(query) => (search = query)"
        @search:blur="$v.selected.$touch()"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>
  </span>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { required } from "vuelidate/lib/validators";
  
  export default {
    name: "SelectDepartmentAircraft",
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
    computed: {
      ...mapGetters([
        "getCities",
        "getDepartmentCity",
        "getCityNameById",
        "getCityCodeById"
      ]),
      selected: {
        get() {
          if (this.getDepartmentCity) {
            return this.getCityNameById(this.getDepartmentCity);
          } else {
            return null;
          }
        },
        set(value) {
          this.setDepartmentCity(value.id);
          this.setDepartmentCityCode(this.getCityCodeById(value.id));
        },
      },
      filtered() {
        return this.getCities.filter((city) =>
          city.text.toLowerCase().includes(this.search.toLowerCase())
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
      ...mapActions(["setDepartmentCity", "setDepartmentCityCode"]),
      
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
  
</style>
