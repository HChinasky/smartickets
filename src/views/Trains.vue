<template>
  <section class="ticket" ref="trains">
    <div class="container">
      <div class="ticket__inner">
        <div class="ticket__header">
          <h2 class="ticket__title">
            {{$t("searchResults")}}:
            <span>{{ allTrains.length }}</span>
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
              <div class="ticket__th">{{$t("availableSeats")}}</div>
            </div>
          </div>
          <TrainResult></TrainResult>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TrainResult from "../components/TrainResult";
import { mapGetters } from "vuex";
export default {
  name: "Trains",
  components: {
    TrainResult
  },

  computed: {
    ...mapGetters(["allTrains"])
  },
mounted() {
  
this.$scrollTo(this.$refs.trains, 1800, {easing: "ease-in-out"})
//this.$refs.trains.scrollIntoView(); 
},
updated() {  
  this.$scrollTo(this.$refs.trains, 1800, {easing: "ease-in-out"})
  //this.$refs.trains.scrollIntoView(); 
}  

};
</script>
<style></style>
