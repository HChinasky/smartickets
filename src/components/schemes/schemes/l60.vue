<template>
  <div class="wagon-wrap mt-5">
    <div class="wagon">
      <div class="wagon-head">
        <span class="wagon-number">{{ number }}</span>
      </div>
      <div class="wagon-body">
        <div class="wagon-row wagon-row-top">
          <div class="section-wc section-wc-3">WC</div>

          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(1)"
                @click="select($event.target)"
              >
                1
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(2)"
                @click="select($event.target)"
              >
                2
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(3)"
                @click="select($event.target)"
              >
                3
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(4)"
                @click="select($event.target)"
              >
                4
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(5)"
                @click="select($event.target)"
              >
                5
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(6)"
                @click="select($event.target)"
              >
                6
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(7)"
                @click="select($event.target)"
              >
                7
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(8)"
                @click="select($event.target)"
              >
                8
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(9)"
                @click="select($event.target)"
              >
                9
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(10)"
                @click="select($event.target)"
              >
                10
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(11)"
                @click="select($event.target)"
              >
                11
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(12)"
                @click="select($event.target)"
              >
                12
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(13)"
                @click="select($event.target)"
              >
                13
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(14)"
                @click="select($event.target)"
              >
                14
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(15)"
                @click="select($event.target)"
              >
                15
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(16)"
                @click="select($event.target)"
              >
                16
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(17)"
                @click="select($event.target)"
              >
                17
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(18)"
                @click="select($event.target)"
              >
                18
              </div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-left">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(19)"
                @click="select($event.target)"
              >
                19
              </div>
            </div>
            <div class="coupe-row coupe-row-right">
              <div
                class="coupe-seat coupe-seat-single"
                :class="styles(20)"
                @click="select($event.target)"
              >
                20
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
  name: "l60", 
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
