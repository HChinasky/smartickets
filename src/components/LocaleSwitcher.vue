<template>
  <div class="header__lang-switch">
    <a
        @click="setLocaleUA()"
        :class="{active : this.$i18n.locale === 'uk'}"
        class="header__lang-link" >
      {{ $t("shortLanguageSwitcherUA") }}
    </a>
    <a
        @click="setLocaleEN()"
        :class="{active : this.$i18n.locale === 'en'}"
        class="header__lang-link" >
      {{ $t("shortLanguageSwitcherEN") }}
    </a>
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import { mapActions } from "vuex";
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      detectMobile: isMobile,
      activeLang: false
    };
  },
  methods: {
    ...mapActions([
      "fetchStations",
      "fetchMetroStations",
      "fetchAirports",
    ]),
    setLocaleUA() {
      this.$i18n.locale = "uk";
      this.updateStorage()
    },
    setLocaleEN() {
      this.$i18n.locale = "en";
      this.activeLang = this.$i18n.locale === "en" ? "active" : "";
      this.updateStorage()
    },
    updateStorage() {
      this.fetchStations();
      this.fetchMetroStations();
      this.fetchAirports();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  .header__lang-switch {
    display: flex;
  }
  .header__lang-link {
    position: relative;
    color: $DARK_BLUE;
    font-size: 1.6rem;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      color: $LIGHT_BLUE;
      &:before {
        border: 3px solid $LIGHT_BLUE;
      }
      &.active {
        &:after {
          background-color: $LIGHT_BLUE;
        }
      }
    }
    &:last-child {
      margin-left: 15px;
    }
    &:before {
      content: "";
      width: 22px;
      height: 22px;
      border: 3px solid $BLUE;
      margin-right: 5px;
      transition: all .3s;
    }
    &.active {
      &:after {
        content: "";
        position: absolute;
        left:6px;
        width: 10px;
        height: 10px;
        background-color: $BLUE;
        transition: all .3s;
      }
    }
  }
</style>
