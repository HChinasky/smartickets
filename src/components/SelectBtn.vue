<template>
  <span>
    <button
        :class="{active : objKey == activeKey}"
        @click="updateActiveDate('tomorrow', objKey);">
        {{ getNameDate(objKey) }}
    </button>
    </span>
</template>

<script>

  import { mapGetters, mapActions } from "vuex";
  import moment from "moment";

  export default {
    name: "SelectBtn",
    props: {
      'objKey': String,
      'activeKey': String,
      'title': String,
      'updateDate': String,
    },
    computed: {
      ...mapGetters([
        "getCityDepartmentDate",
        "getCityArrivalDate",
      ]),
    },
    methods: {
      ...mapActions([
        "fetchAircrafts",
      ]),
      getNameDate(objKey) {
        return moment(this.getDate).add(objKey, "days").format('DD MMMM')
      },
      async updateActiveDate(date, objKey) {
        this.$emit('onUpdateKey', this.objKey);
        // const now = Date.now();
        this.$store.commit(
          this.updateDate,
          moment(this.getDate).add(objKey, "days")
        );
        switch (date) {
          case "tomorrow":
            this.$store.commit(
              this.updateDate,
              moment(this.getDate).add(objKey, "days")
            );
            break;
          case "after_tomorrow":
            this.$store.commit(
              this.updateDate,
              moment(this.getDate).add(objKey, "days")
            );
            break;

          default:
            break;
        }
        await this.fetchAircrafts();
      },
      updateActiveIndex() {
        this.$emit('onUpdateKey', this.objKey);
      }
    }
  }
</script>

<style lang="scss" scoped>
  span {
    &:first-child {
      button {
        margin-left: 0;
      }
    }
    button {
      font-weight: 200;
      font-size: 17px;
      color: #000;
      background-color: transparent;
      outline: none;
      text-decoration: none;
      padding-bottom: 5px;
      border-left: none;
      border-right: none;
      border-top: none;
      border-bottom: 2px dashed #3398FF;
      transition: color .2s;
      text-transform: capitalize;
      margin-left: 25px;
      
      &.active {
        font-weight: normal;
        color: #3398FF;
      }
    }
  }
</style>
