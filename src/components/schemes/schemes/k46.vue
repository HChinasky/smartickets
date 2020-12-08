<template>
  <div class="wagon-wrap mt-5">
    <div class="wagon">
      <div class="wagon-head">
        <span class="wagon-number">{{ number }}</span>
      </div>
      <div class="wagon-body">
        <div class="wagon-row wagon-row-top">
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(6)"
              @click="select($event.target)"
            >
              6
            </div>
            <div
              class="seat seat-left"
              :class="styles(5)"
              @click="select($event.target)"
            >
              5
            </div>
            <div
              class="seat seat-left"
              :class="styles(4)"
              @click="select($event.target)"
            >
              4
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(12)"
              @click="select($event.target)"
            >
              12
            </div>
            <div
              class="seat seat-right"
              :class="styles(11)"
              @click="select($event.target)"
            >
              11
            </div>
            <div
              class="seat seat-right"
              :class="styles(10)"
              @click="select($event.target)"
            >
              10
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(18)"
              @click="select($event.target)"
            >
              18
            </div>
            <div
              class="seat seat-left"
              :class="styles(17)"
              @click="select($event.target)"
            >
              17
            </div>
            <div
              class="seat seat-left"
              :class="styles(16)"
              @click="select($event.target)"
            >
              16
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(24)"
              @click="select($event.target)"
            >
              24
            </div>
            <div
              class="seat seat-right"
              :class="styles(23)"
              @click="select($event.target)"
            >
              23
            </div>
            <div
              class="seat seat-right"
              :class="styles(22)"
              @click="select($event.target)"
            >
              22
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(29)"
              @click="select($event.target)"
            >
              29
            </div>
            <div
              class="seat seat-right"
              :class="styles(28)"
              @click="select($event.target)"
            >
              28
            </div>
            <div
              class="seat seat-right"
              :class="styles(27)"
              @click="select($event.target)"
            >
              27
            </div>
          </div>
          <div class="section-wc section-wc-3">WC</div>
          <div class="spacer spacer-1"></div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(39)"
              @click="select($event.target)"
            >
              39
            </div>
            <div
              class="seat seat-right"
              :class="styles(38)"
              @click="select($event.target)"
            >
              38
            </div>
            <div
              class="seat seat-right"
              :class="styles(37)"
              @click="select($event.target)"
            >
              37
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(45)"
              @click="select($event.target)"
            >
              45
            </div>
            <div
              class="seat seat-left"
              :class="styles(44)"
              @click="select($event.target)"
            >
              44
            </div>
            <div
              class="seat seat-left"
              :class="styles(43)"
              @click="select($event.target)"
            >
              43
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(51)"
              @click="select($event.target)"
            >
              51
            </div>
            <div
              class="seat seat-right"
              :class="styles(50)"
              @click="select($event.target)"
            >
              50
            </div>
            <div
              class="seat seat-right"
              :class="styles(49)"
              @click="select($event.target)"
            >
              49
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(57)"
              @click="select($event.target)"
            >
              57
            </div>
            <div
              class="seat seat-left"
              :class="styles(56)"
              @click="select($event.target)"
            >
              56
            </div>
            <div
              class="seat seat-left"
              :class="styles(55)"
              @click="select($event.target)"
            >
              55
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(63)"
              @click="select($event.target)"
            >
              63
            </div>
            <div
              class="seat seat-right"
              :class="styles(62)"
              @click="select($event.target)"
            >
              62
            </div>
            <div
              class="seat seat-right"
              :class="styles(61)"
              @click="select($event.target)"
            >
              61
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(69)"
              @click="select($event.target)"
            >
              69
            </div>
            <div
              class="seat seat-left"
              :class="styles(68)"
              @click="select($event.target)"
            >
              68
            </div>
            <div
              class="seat seat-left"
              :class="styles(67)"
              @click="select($event.target)"
            >
              67
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(75)"
              @click="select($event.target)"
            >
              75
            </div>
            <div
              class="seat seat-right"
              :class="styles(74)"
              @click="select($event.target)"
            >
              74
            </div>
            <div
              class="seat seat-right"
              :class="styles(73)"
              @click="select($event.target)"
            >
              73
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(81)"
              @click="select($event.target)"
            >
              81
            </div>
            <div
              class="seat seat-left"
              :class="styles(80)"
              @click="select($event.target)"
            >
              80
            </div>
            <div
              class="seat seat-left"
              :class="styles(79)"
              @click="select($event.target)"
            >
              79
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(87)"
              @click="select($event.target)"
            >
              87
            </div>
            <div
              class="seat seat-right"
              :class="styles(86)"
              @click="select($event.target)"
            >
              86
            </div>
            <div
              class="seat seat-right"
              :class="styles(85)"
              @click="select($event.target)"
            >
              85
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(91)"
              @click="select($event.target)"
            >
              91
            </div>
            <div
              class="seat seat-left"
              :class="styles(90)"
              @click="select($event.target)"
            >
              90
            </div>
            <div class="seat seat-left seat-empty"></div>
          </div>
        </div>
        <div class="wagon-row wagon-row-bottom">
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(1)"
              @click="select($event.target)"
            >
              1
            </div>
            <div
              class="seat seat-left"
              :class="styles(2)"
              @click="select($event.target)"
            >
              2
            </div>
            <div
              class="seat seat-left"
              :class="styles(3)"
              @click="select($event.target)"
            >
              3
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(7)"
              @click="select($event.target)"
            >
              7
            </div>
            <div
              class="seat seat-right"
              :class="styles(8)"
              @click="select($event.target)"
            >
              8
            </div>
            <div
              class="seat seat-right"
              :class="styles(9)"
              @click="select($event.target)"
            >
              9
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(13)"
              @click="select($event.target)"
            >
              13
            </div>
            <div
              class="seat seat-left"
              :class="styles(14)"
              @click="select($event.target)"
            >
              14
            </div>
            <div
              class="seat seat-left"
              :class="styles(15)"
              @click="select($event.target)"
            >
              15
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(19)"
              @click="select($event.target)"
            >
              19
            </div>
            <div
              class="seat seat-right"
              :class="styles(20)"
              @click="select($event.target)"
            >
              20
            </div>
            <div
              class="seat seat-right"
              :class="styles(21)"
              @click="select($event.target)"
            >
              21
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(25)"
              @click="select($event.target)"
            >
              25
            </div>
            <div
              class="seat seat-left"
              :class="styles(26)"
              @click="select($event.target)"
            >
              26
            </div>
            <div class="seat seat-left seat-empty">3</div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(30)"
              @click="select($event.target)"
            >
              30
            </div>
            <div
              class="seat seat-right"
              :class="styles(31)"
              @click="select($event.target)"
            >
              31
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(32)"
              @click="select($event.target)"
            >
              32
            </div>
            <div
              class="seat seat-left"
              :class="styles(33)"
              @click="select($event.target)"
            >
              33
            </div>
          </div>
          <div class="spacer spacer-1"></div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(34)"
              @click="select($event.target)"
            >
              34
            </div>
            <div
              class="seat seat-right"
              :class="styles(35)"
              @click="select($event.target)"
            >
              35
            </div>
            <div
              class="seat seat-right"
              :class="styles(36)"
              @click="select($event.target)"
            >
              36
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(40)"
              @click="select($event.target)"
            >
              40
            </div>
            <div
              class="seat seat-left"
              :class="styles(41)"
              @click="select($event.target)"
            >
              41
            </div>
            <div
              class="seat seat-left"
              :class="styles(42)"
              @click="select($event.target)"
            >
              42
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(46)"
              @click="select($event.target)"
            >
              46
            </div>
            <div
              class="seat seat-right"
              :class="styles(47)"
              @click="select($event.target)"
            >
              47
            </div>
            <div
              class="seat seat-right"
              :class="styles(48)"
              @click="select($event.target)"
            >
              48
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(52)"
              @click="select($event.target)"
            >
              52
            </div>
            <div
              class="seat seat-left"
              :class="styles(53)"
              @click="select($event.target)"
            >
              53
            </div>
            <div
              class="seat seat-left"
              :class="styles(54)"
              @click="select($event.target)"
            >
              54
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(58)"
              @click="select($event.target)"
            >
              58
            </div>
            <div
              class="seat seat-right"
              :class="styles(59)"
              @click="select($event.target)"
            >
              59
            </div>
            <div
              class="seat seat-right"
              :class="styles(60)"
              @click="select($event.target)"
            >
              60
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(64)"
              @click="select($event.target)"
            >
              64
            </div>
            <div
              class="seat seat-left"
              :class="styles(65)"
              @click="select($event.target)"
            >
              65
            </div>
            <div
              class="seat seat-left"
              :class="styles(66)"
              @click="select($event.target)"
            >
              66
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(70)"
              @click="select($event.target)"
            >
              70
            </div>
            <div
              class="seat seat-right"
              :class="styles(71)"
              @click="select($event.target)"
            >
              71
            </div>
            <div
              class="seat seat-right"
              :class="styles(72)"
              @click="select($event.target)"
            >
              72
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(76)"
              @click="select($event.target)"
            >
              76
            </div>
            <div
              class="seat seat-left"
              :class="styles(77)"
              @click="select($event.target)"
            >
              77
            </div>
            <div
              class="seat seat-left"
              :class="styles(78)"
              @click="select($event.target)"
            >
              78
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-right"
              :class="styles(82)"
              @click="select($event.target)"
            >
              82
            </div>
            <div
              class="seat seat-right"
              :class="styles(83)"
              @click="select($event.target)"
            >
              83
            </div>
            <div
              class="seat seat-right"
              :class="styles(84)"
              @click="select($event.target)"
            >
              84
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat-left"
              :class="styles(88)"
              @click="select($event.target)"
            >
              88
            </div>
            <div
              class="seat seat-left"
              :class="styles(89)"
              @click="select($event.target)"
            >
              89
            </div>
            <div class="seat seat-left seat-empty">3</div>
          </div>
        </div>
      </div>
      <div class="wagon-tail"></div>
    </div>
  </div>
</template>
<script>
import { wagonTemplateMixin } from "../../../mixins/wagonTemplateMixin";
export default {
  name: "k46",
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
