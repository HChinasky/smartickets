<template>
  <div class="wagon-wrap mt-5">
    <div class="wagon">
      <div class="wagon-head">
        <span class="wagon-number">{{ number }}</span>
      </div>
      <div class="wagon-body">
        <div class="wagon-row wagon-row-top">
          <div class="section-wc section-wc-3">WC</div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(1)"
                @click="select($event.target)"
              >
                1
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(2)"
                @click="select($event.target)"
              >
                2
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(3)"
                @click="select($event.target)"
              >
                3
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(4)"
                @click="select($event.target)"
              >
                4
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(5)"
                @click="select($event.target)"
              >
                5
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(6)"
                @click="select($event.target)"
              >
                6
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(7)"
                @click="select($event.target)"
              >
                7
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(8)"
                @click="select($event.target)"
              >
                8
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(9)"
                @click="select($event.target)"
              >
                9
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(10)"
                @click="select($event.target)"
              >
                10
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(11)"
                @click="select($event.target)"
              >
                11
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(12)"
                @click="select($event.target)"
              >
                12
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(13)"
                @click="select($event.target)"
              >
                13
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(14)"
                @click="select($event.target)"
              >
                14
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(15)"
                @click="select($event.target)"
              >
                15
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(16)"
                @click="select($event.target)"
              >
                16
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(17)"
                @click="select($event.target)"
              >
                17
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(18)"
                @click="select($event.target)"
              >
                18
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(19)"
                @click="select($event.target)"
              >
                19
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(20)"
                @click="select($event.target)"
              >
                20
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(21)"
                @click="select($event.target)"
              >
                21
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(22)"
                @click="select($event.target)"
              >
                22
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(23)"
                @click="select($event.target)"
              >
                23
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(24)"
                @click="select($event.target)"
              >
                24
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(25)"
                @click="select($event.target)"
              >
                25
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(26)"
                @click="select($event.target)"
              >
                26
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(27)"
                @click="select($event.target)"
              >
                27
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(28)"
                @click="select($event.target)"
              >
                28
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(29)"
                @click="select($event.target)"
              >
                29
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(30)"
                @click="select($event.target)"
              >
                30
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(31)"
                @click="select($event.target)"
              >
                31
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(32)"
                @click="select($event.target)"
              >
                32
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(33)"
                @click="select($event.target)"
              >
                33
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(34)"
                @click="select($event.target)"
              >
                34
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(35)"
                @click="select($event.target)"
              >
                35
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(36)"
                @click="select($event.target)"
              >
                36
              </div>
            </div>
          </div>
          <div class="section-wc section-wc-3">WC</div>
        </div>
      </div>
      <div class="wagon-tail"></div>
    </div>
  </div>
</template>
<script>
import { wagonTemplateMixin } from "../../../mixins/wagonTemplateMixin";
export default {
  name: "k01",
  сomponents: {},
  mixins: [wagonTemplateMixin],
};
</script>

<style scoped>
.seat-top {
  background-color: #1b73cd !important;
}

.seat_taken {
  background-color: #a7a7a7 !important;
  cursor: initial;
}

.seat_selected {
  background-color: #fd653a !important;
}
</style>
