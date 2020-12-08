<template>
  <section class="ticket" ref="suburbanTrain">
    <div class="container">
      <div class="ticket__inner">
        <div class="ticket__header">
          <h2 class="ticket__title">
            {{$t("searchResults")}}:
            <span>5</span>
          </h2>
          <div class="ticket__connection-type"></div>
        </div>
        <div class="ticket__table">
          <div class="ticket__thead">
            <div class="ticket__tr">
              <div class="ticket__th">{{$t("from")}} — {{$t("to")}}</div>
              <div class="ticket__th">{{$t("departure")}}</div>
              <div class="ticket__th">{{$t("arrival")}}</div>
              <div class="ticket__th">{{$t("travelTime")}}</div>
              <div class="ticket__th">{{$t("type")}}</div>
              <div class="ticket__th">{{$t("numberSeats")}}</div>
            </div>
          </div>
          <SuburbanTrainResult v-for="item in 5" :key="item"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import SuburbanTrainResult from "../../components/suburbanTrain/SuburbanTrainResult";
  export default {
    name: "SuburbanTrain",
    components: {
      SuburbanTrainResult
    },
    mounted() {

      this.$scrollTo(this.$refs.suburbanTrain, 1800, {easing: "ease-in-out"})
//this.$refs.trains.scrollIntoView();
    },
    updated() {
      this.$scrollTo(this.$refs.suburbanTrain, 1800, {easing: "ease-in-out"})
      //this.$refs.trains.scrollIntoView();
    }

  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  
  .container {
    .ticket__inner {
      .ticket__table {
        .ticket__thead {
          .ticket__tr {
            grid-template: "a b c d e f g";
            grid-template-columns: 23% 14% 13% 13% 10% 13% 14%;
            .ticket__th {
              font-size: 1.7rem;
              color: $LABEL_COLOR;
            }
          }
        }
      }
    }
  }
</style>
