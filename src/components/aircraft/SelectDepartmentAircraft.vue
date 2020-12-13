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
      <template v-slot:option="option">
        {{ option.label }} / {{ option.code }}
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
    watch:{
      selected:function(v){
        console.log(v)
      }
    },
    mounted() {
      this.observer = new IntersectionObserver(this.infiniteScroll);
    },
    computed: {
      ...mapGetters([
        "getAirports",
        "getDepartmentCityCode",
        "getCityNameByCode"
      ]),
      selected: {
        get() {
          if (this.getDepartmentCityCode) {
            return this.getCityNameByCode(this.getDepartmentCityCode) + ' / ' + this.getDepartmentCityCode;
          } else {
            return null;
          }
        },
        set(value) {
          this.setDepartmentCityCode(value.code);
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
      ...mapActions(["setDepartmentCityCode"]),
      
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
