<template>
  <span>
    <v-select
      class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
      :class="{ error: $v.selected.$error }"
      v-model="selected"
      :options="paginated"
      :filterable="true"
      :clearable="false"
      :limit="limit"
      @open="onOpen"
      @close="onClose"
      @search="(query) => (search = query)"
      @search:blur="$v.selected.$touch()"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>

    <div class="ts-form__help-links">
      <span @click="setSelected(2200001)" class="ts-form__help-link">
        {{ $t("Kyiv") }}
      </span>
      <span @click="setSelected(2218000)" class="ts-form__help-link">
        {{ $t("Lviv") }}
      </span>
      <span @click="setSelected(2204001)" class="ts-form__help-link">
        {{ $t("Kharkiv") }}
      </span>
      <span @click="setSelected(2208001)" class="ts-form__help-link">
        {{ $t("Odesa") }}
      </span>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "SelectDepartment",
  data() {
    return {
      observer: null,
      limit: 3,
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
      "getStations",
      "getDepartmentStation",
      "getStationNameById",
    ]),
    selected: {
      get() {
        if (this.getDepartmentStation) {
          return this.getStationNameById(this.getDepartmentStation);
        } else {
          return null;
        }
      },
      set(value) {
        this.setDepartmentStation(value.id);
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
    ...mapActions(["setDepartmentStation"]),
    setSelected(id) {
      this.setDepartmentStation(id);
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
.errorMessage {
  color: red;
  font-weight: bold;
}

.dropdown-input >>> .vs__dropdown-toggle {
  border: none;
}
.dropdown-input >>> .vs__selected {
  margin-left: 0px;
  padding-left: 0px;
}
.vs__clear, .dropdown-input__clear, .dropdown-input__clear svg
 {
  display: none;
}

.dropdown-input >>> .vs__open-indicator {
  fill: black;
  cursor: pointer;
}
</style>
