<template>
  <v-popover
      placement="bottom-center"
      targetClasses="dispatch-time__block"
  >
    <div class="dispatch-time__block">
      <span class="hours">{{ time.hours }}</span>
      <span class="minutes">{{ time.minutes }}</span>
    </div>
    
    <template slot="popover">
      <div class="hours">
        <button :class="{disabled : time.hours === 24}" class="button" @click="time.hours < 24 && time.hours++"></button>
        <span class="char">{{ time.hours }}</span>
        <button :class="{disabled : time.hours === 0}" class="button" @click="time.hours > 0 && time.hours--"></button>
      </div>
      <div class="minutes">
        <button  :class="{disabled : time.minutes === 59}" class="button" @click="time.minutes < 59 && time.minutes++"></button>
        <span class="char">{{ time.minutes }}</span>
        <button :class="{disabled : time.minutes === 0}" class="button" @click="time.minutes > 0 && time.minutes--"></button>
      </div>
    </template>
  </v-popover>
</template>

<script>
  export default {
    name: "timePicker",
    data() {
      return {
        time: {
          hours: 12,
          minutes: 30
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dispatch-time__block {
    margin-top: 10px;
    cursor: pointer;
    .hours,
    .minutes {
      height: 60px;
      font-size: 20px;
      padding: 0 15px;
      margin-top: 10px;
      border-bottom: 2px solid #000;
    }
    .minutes {
      left: 35px;
      position: relative;
      &:before {
        content: ':';
        position: absolute;
        left: -20px;
      }
      &:after {
        content: '';
        background-image: url("data:image/svg+xml,%3Csvg width='26' height='27' viewBox='0 0 26 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 25.2148C10.7502 25.2148 8.551 24.5477 6.68039 23.2978C4.80978 22.0479 3.35182 20.2714 2.49088 18.1929C1.62993 16.1144 1.40467 13.8272 1.84357 11.6207C2.28248 9.41416 3.36584 7.38733 4.95667 5.79651C6.54749 4.20569 8.57432 3.12232 10.7809 2.68342C12.9874 2.24451 15.2745 2.46977 17.353 3.33072C19.4315 4.19167 21.2081 5.64963 22.458 7.52024C23.7079 9.39085 24.375 11.5901 24.375 13.8398C24.375 16.8567 23.1766 19.75 21.0433 21.8832C18.9101 24.0164 16.0168 25.2148 13 25.2148ZM13 4.08985C11.0716 4.08985 9.18657 4.66168 7.5832 5.73302C5.97982 6.80436 4.73013 8.32711 3.99218 10.1087C3.25423 11.8903 3.06114 13.8507 3.43735 15.742C3.81355 17.6333 4.74215 19.3706 6.10571 20.7341C7.46928 22.0977 9.20656 23.0263 11.0979 23.4025C12.9892 23.7787 14.9496 23.5856 16.7312 22.8477C18.5127 22.1097 20.0355 20.86 21.1068 19.2567C22.1782 17.6533 22.75 15.7682 22.75 13.8398C22.75 11.254 21.7228 8.77404 19.8943 6.94556C18.0658 5.11708 15.5859 4.08985 13 4.08985Z' fill='%233398FF'/%3E%3Cpath d='M16.7294 18.7148L12.1875 14.173V6.52734H13.8125V13.4986L17.875 17.5692L16.7294 18.7148Z' fill='%233398FF'/%3E%3C/svg%3E%0A");
        position: absolute;
        top: 0;
        right: -35px;
        width: 26px;
        height: 27px;
        display: block;
      }
    }
  }

  .tooltip {
    background-color: red;
    &.popover {
      color: #f9f9f9;
      .wrapper {
        min-height: auto;
        .popover-inner {
          background: #3791ff;
          color: black;
          padding: 24px;
          border-radius: 5px;
          box-shadow: 0 5px 30px rgba(black, .1);
        }
  
        .popover-arrow {
          border-color: #3791ff;
        }
        
      }
    }
  }
</style>
