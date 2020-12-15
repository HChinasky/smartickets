<template>
  <span class="button-component">
      <button
          :class="{active : objKey == activeKey}"
          :disabled="isLoading"
          @click="updateActiveDate('tomorrow', objKey);">
          {{ getNameDate(objKey) }}
      </button>
      <span :class="{isLoading : isLoading}"></span>
    </span>
</template>

<script>

  import { mapActions } from "vuex";
  import moment from "moment";

  export default {
    name: "SelectBtn",
    props: {
      'objKey': String,
      'activeKey': String,
      'title': String,
      'updateDate': String,
      'getDate': String,
    },
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
      ...mapActions([
        "fetchAircrafts",
      ]),
      getNameDate(objKey) {
        return moment(objKey).format('DD MMMM')
      },
      async updateActiveDate(date, objKey) {
        this.isLoading = true;
        this.$emit('onUpdateKey', this.objKey);
        this.$store.commit(
          this.updateDate,
          moment(this.getDate).add(objKey, "days")
        );
        this.$store.commit(
          this.updateDate,
          moment(objKey)
        );
        await this.fetchAircrafts().then(() => {
          this.isLoading = false;
        })
          .catch((error) => {
            console.log(error);
            if (error.toString().includes("[PPCODE:104]")) {
              this.$toasted.global.my_app_error({
                type: "error",
                message: this.$t("trainNotFoundMsg"),
              });
            } else {
              this.$toasted.global.my_app_error({
                message: error.message,
              });
            }
          });;
      },
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
      position: relative;
      
      &.active {
        font-weight: normal;
        color: #3398FF;
      }
      &:disabled {
        opacity: .3;
      }

  }
  .button-component {
    position: relative;
    width: 100%;
    .isLoading {
      display: block;
      position: absolute;
      top: 0;
      left: 40%;
      transform: translatex(-50%);
      background-color: transparent;
      width: 20px;
      height: 20px;
      border: 4px solid transparent;
      border-top: 3px solid #3398FF;
      border-radius: 50%;
      animation: loading 1.5s infinite linear;
      -moz-animation: loading 1.5s infinite linear;
      -webkit-animation: loading 1.5s infinite linear;
    }
  }
  }
  @keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  @-moz-keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  @-webkit-keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>
