<template>
  <section class="ticket" ref="aircrafts">
    <div class="container">
      <div class="ticket__inner">
        <AircraftResult :allAircraft="test" />
      </div>
    </div>
  </section>
</template>

<script>
  import AircraftResult from "../../components/aircraft/AircraftResult";
  export default {
    name: "Aircraft",
    components: {
      AircraftResult
    },
    props: ["test"],
    watch: {
      test: {
        immediate: true,
        deep: true,
        handler(newVal) {
          if(newVal.length !== 0)
            this.$scrollTo(this.$refs.aircrafts, 1800, {easing: "ease-in-out"})
        }
      },
    },
    mounted() {
      this.$scrollTo(this.$refs.aircrafts, 1800, {easing: "ease-in-out"})
    },
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
