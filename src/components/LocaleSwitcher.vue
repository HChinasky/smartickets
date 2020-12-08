<template>
  <div class="header__lang-switch">
    <a @click="setLocale()" class="header__lang-link" >
      <svg viewBox="0 0 25 25">
        <use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-lang'" />
      </svg>
      <template v-if="$route.meta.clientArea && detectMobile">
        {{ $t('shortLanguageSwitcher') }}
      </template>
      <template v-else>
        {{ $t("languageSwitcher")}}
      </template>
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
    };
  },
  methods: {
    ...mapActions(["fetchStations", "fetchMetroStations"]),
    setLocale() {
      if (this.$i18n.locale == "uk") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "uk";
      }
      this.fetchStations();
      this.fetchMetroStations();
    },
  },
};
</script>

<style scoped>
.header__lang-switch {
    cursor: pointer;
}
</style>
