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
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">11</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">15</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">12</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">16</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">21</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">25</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">22</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">26</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">31</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">35</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">32</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">36</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">41</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">45</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">42</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">46</div>
            </div>
          </div>
          <div class="coupe coupe-slim">
            <div class="coupe-row coupe-row-right">
              <div class="coupe-seat coupe-seat-single">51</div>
            </div>
            <div class="coupe-row coupe-row-left">
              <div class="coupe-seat coupe-seat-single">55</div>
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
  name: "l07",
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
