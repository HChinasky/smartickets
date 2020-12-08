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
              class="seat seat"
              :class="styles(1)"
              @click="select($event.target)"
            >
              1
            </div>
            <div
              class="seat seat"
              :class="styles(2)"
              @click="select($event.target)"
            >
              2
            </div>
            <div
              class="seat seat"
              :class="styles(3)"
              @click="select($event.target)"
            >
              3
            </div>
            <div
              class="seat seat"
              :class="styles(4)"
              @click="select($event.target)"
            >
              4
            </div>
            <div
              class="seat seat"
              :class="styles(5)"
              @click="select($event.target)"
            >
              5
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(6)"
              @click="select($event.target)"
            >
              6
            </div>
            <div
              class="seat seat"
              :class="styles(7)"
              @click="select($event.target)"
            >
              7
            </div>
            <div
              class="seat seat"
              :class="styles(8)"
              @click="select($event.target)"
            >
              8
            </div>
            <div
              class="seat seat"
              :class="styles(9)"
              @click="select($event.target)"
            >
              9
            </div>
            <div
              class="seat seat"
              :class="styles(10)"
              @click="select($event.target)"
            >
              10
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(11)"
              @click="select($event.target)"
            >
              11
            </div>
            <div
              class="seat seat"
              :class="styles(12)"
              @click="select($event.target)"
            >
              12
            </div>
            <div
              class="seat seat"
              :class="styles(13)"
              @click="select($event.target)"
            >
              13
            </div>
            <div
              class="seat seat"
              :class="styles(14)"
              @click="select($event.target)"
            >
              14
            </div>
            <div
              class="seat seat"
              :class="styles(15)"
              @click="select($event.target)"
            >
              15
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(16)"
              @click="select($event.target)"
            >
              16
            </div>
            <div
              class="seat seat"
              :class="styles(17)"
              @click="select($event.target)"
            >
              17
            </div>
            <div
              class="seat seat"
              :class="styles(18)"
              @click="select($event.target)"
            >
              18
            </div>
            <div
              class="seat seat"
              :class="styles(19)"
              @click="select($event.target)"
            >
              19
            </div>
            <div
              class="seat seat"
              :class="styles(20)"
              @click="select($event.target)"
            >
              20
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(21)"
              @click="select($event.target)"
            >
              21
            </div>
            <div
              class="seat seat"
              :class="styles(22)"
              @click="select($event.target)"
            >
              22
            </div>
            <div
              class="seat seat"
              :class="styles(23)"
              @click="select($event.target)"
            >
              23
            </div>
            <div
              class="seat seat"
              :class="styles(24)"
              @click="select($event.target)"
            >
              24
            </div>
            <div
              class="seat seat"
              :class="styles(25)"
              @click="select($event.target)"
            >
              25
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(26)"
              @click="select($event.target)"
            >
              26
            </div>
            <div
              class="seat seat"
              :class="styles(27)"
              @click="select($event.target)"
            >
              27
            </div>
            <div
              class="seat seat"
              :class="styles(28)"
              @click="select($event.target)"
            >
              28
            </div>
            <div
              class="seat seat"
              :class="styles(29)"
              @click="select($event.target)"
            >
              29
            </div>
            <div
              class="seat seat"
              :class="styles(30)"
              @click="select($event.target)"
            >
              30
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(31)"
              @click="select($event.target)"
            >
              31
            </div>
            <div
              class="seat seat"
              :class="styles(32)"
              @click="select($event.target)"
            >
              32
            </div>
            <div
              class="seat seat"
              :class="styles(33)"
              @click="select($event.target)"
            >
              33
            </div>
            <div
              class="seat seat"
              :class="styles(34)"
              @click="select($event.target)"
            >
              34
            </div>
            <div
              class="seat seat"
              :class="styles(35)"
              @click="select($event.target)"
            >
              35
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(36)"
              @click="select($event.target)"
            >
              36
            </div>
            <div
              class="seat seat"
              :class="styles(37)"
              @click="select($event.target)"
            >
              37
            </div>
            <div
              class="seat seat"
              :class="styles(38)"
              @click="select($event.target)"
            >
              38
            </div>
            <div
              class="seat seat"
              :class="styles(39)"
              @click="select($event.target)"
            >
              39
            </div>
            <div
              class="seat seat"
              :class="styles(40)"
              @click="select($event.target)"
            >
              40
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(41)"
              @click="select($event.target)"
            >
              41
            </div>
            <div
              class="seat seat"
              :class="styles(42)"
              @click="select($event.target)"
            >
              42
            </div>
            <div
              class="seat seat"
              :class="styles(43)"
              @click="select($event.target)"
            >
              43
            </div>
            <div
              class="seat seat"
              :class="styles(44)"
              @click="select($event.target)"
            >
              44
            </div>
            <div
              class="seat seat"
              :class="styles(45)"
              @click="select($event.target)"
            >
              45
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(46)"
              @click="select($event.target)"
            >
              46
            </div>
            <div
              class="seat seat"
              :class="styles(47)"
              @click="select($event.target)"
            >
              47
            </div>
            <div
              class="seat seat"
              :class="styles(48)"
              @click="select($event.target)"
            >
              48
            </div>
            <div
              class="seat seat"
              :class="styles(49)"
              @click="select($event.target)"
            >
              49
            </div>
            <div
              class="seat seat"
              :class="styles(50)"
              @click="select($event.target)"
            >
              50
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(51)"
              @click="select($event.target)"
            >
              51
            </div>
            <div
              class="seat seat"
              :class="styles(52)"
              @click="select($event.target)"
            >
              52
            </div>
            <div
              class="seat seat"
              :class="styles(53)"
              @click="select($event.target)"
            >
              53
            </div>
            <div
              class="seat seat"
              :class="styles(54)"
              @click="select($event.target)"
            >
              54
            </div>
            <div
              class="seat seat"
              :class="styles(55)"
              @click="select($event.target)"
            >
              55
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(56)"
              @click="select($event.target)"
            >
              56
            </div>
            <div
              class="seat seat"
              :class="styles(57)"
              @click="select($event.target)"
            >
              57
            </div>
            <div
              class="seat seat"
              :class="styles(58)"
              @click="select($event.target)"
            >
              58
            </div>
            <div
              class="seat seat"
              :class="styles(59)"
              @click="select($event.target)"
            >
              59
            </div>
            <div
              class="seat seat"
              :class="styles(60)"
              @click="select($event.target)"
            >
              60
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(61)"
              @click="select($event.target)"
            >
              61
            </div>
            <div
              class="seat seat"
              :class="styles(62)"
              @click="select($event.target)"
            >
              62
            </div>
            <div
              class="seat seat"
              :class="styles(63)"
              @click="select($event.target)"
            >
              63
            </div>
            <div
              class="seat seat"
              :class="styles(64)"
              @click="select($event.target)"
            >
              64
            </div>
            <div
              class="seat seat"
              :class="styles(65)"
              @click="select($event.target)"
            >
              65
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(66)"
              @click="select($event.target)"
            >
              66
            </div>
            <div
              class="seat seat"
              :class="styles(67)"
              @click="select($event.target)"
            >
              67
            </div>
            <div
              class="seat seat"
              :class="styles(68)"
              @click="select($event.target)"
            >
              68
            </div>
            <div
              class="seat seat"
              :class="styles(69)"
              @click="select($event.target)"
            >
              69
            </div>
            <div
              class="seat seat"
              :class="styles(70)"
              @click="select($event.target)"
            >
              70
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(71)"
              @click="select($event.target)"
            >
              71
            </div>
            <div
              class="seat seat"
              :class="styles(72)"
              @click="select($event.target)"
            >
              72
            </div>
            <div
              class="seat seat"
              :class="styles(73)"
              @click="select($event.target)"
            >
              73
            </div>
            <div
              class="seat seat"
              :class="styles(74)"
              @click="select($event.target)"
            >
              74
            </div>
            <div
              class="seat seat"
              :class="styles(75)"
              @click="select($event.target)"
            >
              75
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(76)"
              @click="select($event.target)"
            >
              76
            </div>
            <div
              class="seat seat"
              :class="styles(77)"
              @click="select($event.target)"
            >
              77
            </div>
            <div
              class="seat seat"
              :class="styles(78)"
              @click="select($event.target)"
            >
              78
            </div>
            <div
              class="seat seat"
              :class="styles(79)"
              @click="select($event.target)"
            >
              79
            </div>
            <div
              class="seat seat"
              :class="styles(80)"
              @click="select($event.target)"
            >
              80
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(81)"
              @click="select($event.target)"
            >
              81
            </div>
            <div
              class="seat seat"
              :class="styles(82)"
              @click="select($event.target)"
            >
              82
            </div>
            <div
              class="seat seat"
              :class="styles(83)"
              @click="select($event.target)"
            >
              83
            </div>
            <div
              class="seat seat"
              :class="styles(84)"
              @click="select($event.target)"
            >
              84
            </div>
            <div
              class="seat seat"
              :class="styles(85)"
              @click="select($event.target)"
            >
              85
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(86)"
              @click="select($event.target)"
            >
              86
            </div>
            <div
              class="seat seat"
              :class="styles(87)"
              @click="select($event.target)"
            >
              87
            </div>
            <div
              class="seat seat"
              :class="styles(88)"
              @click="select($event.target)"
            >
              88
            </div>
            <div
              class="seat seat"
              :class="styles(89)"
              @click="select($event.target)"
            >
              89
            </div>
            <div
              class="seat seat"
              :class="styles(90)"
              @click="select($event.target)"
            >
              90
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(91)"
              @click="select($event.target)"
            >
              91
            </div>
            <div
              class="seat seat"
              :class="styles(92)"
              @click="select($event.target)"
            >
              92
            </div>
            <div
              class="seat seat"
              :class="styles(93)"
              @click="select($event.target)"
            >
              93
            </div>
            <div
              class="seat seat"
              :class="styles(94)"
              @click="select($event.target)"
            >
              94
            </div>
            <div
              class="seat seat"
              :class="styles(95)"
              @click="select($event.target)"
            >
              95
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(96)"
              @click="select($event.target)"
            >
              96
            </div>
            <div
              class="seat seat"
              :class="styles(97)"
              @click="select($event.target)"
            >
              97
            </div>
            <div
              class="seat seat"
              :class="styles(98)"
              @click="select($event.target)"
            >
              98
            </div>
            <div
              class="seat seat"
              :class="styles(99)"
              @click="select($event.target)"
            >
              99
            </div>
            <div
              class="seat seat"
              :class="styles(100)"
              @click="select($event.target)"
            >
              100
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(101)"
              @click="select($event.target)"
            >
              101
            </div>
            <div
              class="seat seat"
              :class="styles(102)"
              @click="select($event.target)"
            >
              102
            </div>
            <div
              class="seat seat"
              :class="styles(103)"
              @click="select($event.target)"
            >
              103
            </div>
            <div
              class="seat seat"
              :class="styles(104)"
              @click="select($event.target)"
            >
              104
            </div>
            <div
              class="seat seat"
              :class="styles(105)"
              @click="select($event.target)"
            >
              105
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(106)"
              @click="select($event.target)"
            >
              106
            </div>
            <div
              class="seat seat"
              :class="styles(107)"
              @click="select($event.target)"
            >
              107
            </div>
            <div
              class="seat seat"
              :class="styles(108)"
              @click="select($event.target)"
            >
              108
            </div>
            <div
              class="seat seat"
              :class="styles(109)"
              @click="select($event.target)"
            >
              109
            </div>
            <div
              class="seat seat"
              :class="styles(110)"
              @click="select($event.target)"
            >
              110
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(111)"
              @click="select($event.target)"
            >
              111
            </div>
            <div
              class="seat seat"
              :class="styles(112)"
              @click="select($event.target)"
            >
              112
            </div>
            <div
              class="seat seat"
              :class="styles(113)"
              @click="select($event.target)"
            >
              113
            </div>
            <div
              class="seat seat"
              :class="styles(114)"
              @click="select($event.target)"
            >
              114
            </div>
            <div
              class="seat seat"
              :class="styles(115)"
              @click="select($event.target)"
            >
              115
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(116)"
              @click="select($event.target)"
            >
              116
            </div>
            <div
              class="seat seat"
              :class="styles(117)"
              @click="select($event.target)"
            >
              117
            </div>
            <div
              class="seat seat"
              :class="styles(118)"
              @click="select($event.target)"
            >
              118
            </div>
            <div
              class="seat seat"
              :class="styles(119)"
              @click="select($event.target)"
            >
              119
            </div>
            <div
              class="seat seat"
              :class="styles(120)"
              @click="select($event.target)"
            >
              120
            </div>
          </div>

          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(121)"
              @click="select($event.target)"
            >
              121
            </div>
            <div
              class="seat seat"
              :class="styles(122)"
              @click="select($event.target)"
            >
              122
            </div>
            <div
              class="seat seat"
              :class="styles(123)"
              @click="select($event.target)"
            >
              123
            </div>
            <div
              class="seat seat"
              :class="styles(124)"
              @click="select($event.target)"
            >
              124
            </div>
            <div
              class="seat seat"
              :class="styles(125)"
              @click="select($event.target)"
            >
              125
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(126)"
              @click="select($event.target)"
            >
              126
            </div>
            <div
              class="seat seat"
              :class="styles(127)"
              @click="select($event.target)"
            >
              127
            </div>
            <div
              class="seat seat"
              :class="styles(128)"
              @click="select($event.target)"
            >
              128
            </div>
            <div
              class="seat seat"
              :class="styles(129)"
              @click="select($event.target)"
            >
              129
            </div>
            <div
              class="seat seat"
              :class="styles(130)"
              @click="select($event.target)"
            >
              130
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(131)"
              @click="select($event.target)"
            >
              131
            </div>
            <div
              class="seat seat"
              :class="styles(132)"
              @click="select($event.target)"
            >
              132
            </div>
            <div
              class="seat seat"
              :class="styles(133)"
              @click="select($event.target)"
            >
              133
            </div>
            <div
              class="seat seat"
              :class="styles(134)"
              @click="select($event.target)"
            >
              132
            </div>
            <div
              class="seat seat"
              :class="styles(135)"
              @click="select($event.target)"
            >
              135
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(136)"
              @click="select($event.target)"
            >
              136
            </div>
            <div
              class="seat seat"
              :class="styles(137)"
              @click="select($event.target)"
            >
              137
            </div>
            <div
              class="seat seat"
              :class="styles(138)"
              @click="select($event.target)"
            >
              138
            </div>
            <div
              class="seat seat"
              :class="styles(139)"
              @click="select($event.target)"
            >
              139
            </div>
            <div
              class="seat seat"
              :class="styles(140)"
              @click="select($event.target)"
            >
              140
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(141)"
              @click="select($event.target)"
            >
              141
            </div>
            <div
              class="seat seat"
              :class="styles(142)"
              @click="select($event.target)"
            >
              142
            </div>
            <div
              class="seat seat"
              :class="styles(143)"
              @click="select($event.target)"
            >
              143
            </div>
            <div
              class="seat seat"
              :class="styles(144)"
              @click="select($event.target)"
            >
              144
            </div>
            <div
              class="seat seat"
              :class="styles(145)"
              @click="select($event.target)"
            >
              145
            </div>
          </div>
          <div class="seat-row">
            <div
              class="seat seat"
              :class="styles(146)"
              @click="select($event.target)"
            >
              146
            </div>
            <div
              class="seat seat"
              :class="styles(147)"
              @click="select($event.target)"
            >
              147
            </div>
            <div
              class="seat seat"
              :class="styles(148)"
              @click="select($event.target)"
            >
              148
            </div>
            <div
              class="seat seat"
              :class="styles(149)"
              @click="select($event.target)"
            >
              149
            </div>
            <div
              class="seat seat"
              :class="styles(150)"
              @click="select($event.target)"
            >
              150
            </div>
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
  name: "p51",
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
