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
                :class="styles(11)"
                @click="select($event.target)"
              >
                11
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(15)"
                @click="select($event.target)"
              >
                15
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(12)"
                @click="select($event.target)"
              >
                12
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
                :class="styles(21)"
                @click="select($event.target)"
              >
                21
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(25)"
                @click="select($event.target)"
              >
                25
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(22)"
                @click="select($event.target)"
              >
                22
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(26)"
                @click="select($event.target)"
              >
                26
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(31)"
                @click="select($event.target)"
              >
                31
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(35)"
                @click="select($event.target)"
              >
                35
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(32)"
                @click="select($event.target)"
              >
                32
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
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(41)"
                @click="select($event.target)"
              >
                41
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(45)"
                @click="select($event.target)"
              >
                45
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(42)"
                @click="select($event.target)"
              >
                42
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(46)"
                @click="select($event.target)"
              >
                46
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(51)"
                @click="select($event.target)"
              >
                51
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(55)"
                @click="select($event.target)"
              >
                55
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(52)"
                @click="select($event.target)"
              >
                52
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(56)"
                @click="select($event.target)"
              >
                56
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(61)"
                @click="select($event.target)"
              >
                61
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(65)"
                @click="select($event.target)"
              >
                65
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(62)"
                @click="select($event.target)"
              >
                62
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(66)"
                @click="select($event.target)"
              >
                66
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(71)"
                @click="select($event.target)"
              >
                71
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(75)"
                @click="select($event.target)"
              >
                75
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(72)"
                @click="select($event.target)"
              >
                72
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(76)"
                @click="select($event.target)"
              >
                76
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(81)"
                @click="select($event.target)"
              >
                81
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(85)"
                @click="select($event.target)"
              >
                85
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(82)"
                @click="select($event.target)"
              >
                82
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(86)"
                @click="select($event.target)"
              >
                86
              </div>
            </div>
          </div>
          <div class="coupe">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat"
                :class="styles(91)"
                @click="select($event.target)"
              >
                91
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(95)"
                @click="select($event.target)"
              >
                95
              </div>
            </div>

            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat"
                :class="styles(92)"
                @click="select($event.target)"
              >
                92
              </div>
              <div
                class="coupe-seat seat-top"
                :class="styles(96)"
                @click="select($event.target)"
              >
                96
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
  name: "k02",
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
