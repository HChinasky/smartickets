<template>
  <section class="ticket" ref="aircrafts">
    <div class="container">
      <div class="ticket__inner">
        <AircraftResult
            :departmentTicket="departmentTicket"
            :arrivalTicket="arrivalTicket"
        />
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from "vuex";
  import AircraftResult from "../../components/aircraft/AircraftResult";
  export default {
    name: "Aircraft",
    props: {
      'departmentTicket': Array,
      'arrivalTicket': Array
    },
    components: {
      AircraftResult
    },
    computed: {
      ...mapGetters([
        "getResultId"
      ]),
      checkTypeTicket() {
        return this.getResultId;
      }
    },
    methods: {
      handler(e) {
        this.baggageTypeIconTo = e;
      },
    },
    mounted() {

      // this.$scrollTo(this.$refs.aircrafts, 1800, {easing: "ease-in-out"})
//this.$refs.trains.scrollIntoView();
    },
    updated() {
      this.$scrollTo(this.$refs.aircrafts, 1800, {easing: "ease-in-out"})
      //this.$refs.trains.scrollIntoView();
    }

  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
   .ticket {
     .container {
       @include respond-until(xl) {
         padding: 0 15px;
       }
       @include respond-to(lg) {
         padding: 0 60px;
       }
      .ticket__inner {
        .tickets__body {
          @include respond-until(xs) {
            flex-wrap: wrap;
          }
          .ticket__block {

          }
        }
        .ts-form__submit {
          .btn {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
