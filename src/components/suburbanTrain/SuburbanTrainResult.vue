<template>
  <div class="ticket__tbody">
    <div class="ticket__tr">
      <div class="ticket__td ticket__td--distination">
        <div class="ticket__car-inf">
          <div class="ticket__car-mark">857K</div>
          <div class="ticket__car-type">
            <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <use
                  :xlink:href="require('@/assets/img/sprite.svg') + '#icon-suburban-train-small'"
              />
            </svg>
          </div>
          <!--<a href="#" class="ticket__map-link">На карті</a>-->
        </div>
        
        <div class="ticket-timeline">
          <div class="ticket-timeline__list">
            <div class="ticket-timeline__item">
              <strong>КИЇВ</strong>
            </div>
            <div class="ticket-timeline__item">
              <strong>ФАСТІВ</strong>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ticket__td ticket__td--despature-time">
        <span class="ticket__mob-title">{{ $t("departure") }}</span>
        <div class="ticket__time">10:45</div>
        <div class="ticket__date">1 грудня</div>
        <div class="ticket__day">Середа</div>
      </div>
      
      <div class="ticket__td ticket__td--arrival-time">
        <span class="ticket__mob-title">{{ $t("arrival") }}</span>
        <div class="ticket__time">11:50</div>
        <div class="ticket__date">1 грудня</div>
        <div class="ticket__day">Середа</div>
      </div>
      
      <div class="ticket__td ticket__td--travel-time">
        <span class="ticket__mob-title">{{ $t("travelTime") }}:</span>
        
        <div class="ticket__travel-inf-outer">
          <div class="ticket__travel-min">
            1 год. 5 хв.
          </div>
        </div>
      </div>
      <div class="ticket__td ticket__td--type-places">
        <div class="type-places">
          <div class="type-places__item">
            <div class="type-places__desc">
              Без місця
            </div>
          </div>
        </div>
      </div>
      <template v-if="buyTicket">
        <div class="ticket__td ticket__td--cost-ticket buy-ticket-component">
          <div class="cost-ticket">
            115 грн
          </div>
        </div>
        <div class="ticket__td ticket__td--free-places buy-ticket-component">
          <div class="free-places__quantity">
            200
          </div>
        </div>
      </template>
      <template v-else>
        <div class="ticket__td ticket__td--free-places">
          <div class="free-places__quantity">
            115 грн
          </div>
        </div>
        <div class="ticket__td ticket__td--choose-train">
          <button
              class="btn btn--black ticket__select"
              v-promise-btn
              @click="getData">{{ $t("select") }}</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SuburbanTrainResult",
    props: {
      'buyTicket': Boolean
    },
    methods: {
      getData() {
        this.$router.push({
          name: 'TrainTicketsBuy',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .ticket__tbody {
    &:not(:nth-child(2)) {
      margin-top: 25px;
    }
    .ticket__tr {
      min-height: 190px;
      grid-template: "a b c d e f g";
      grid-template-columns: 23% 14% 13% 13% 10% 13% 14%;
      border: 1px solid #F6F6F6;
      box-shadow: 0px 0px 15px rgba(110, 110, 110, 0.15);
      border-radius: 5px;
      .ticket__td {
        &.ticket__td--distination  {
          justify-content: flex-start;
          .ticket__car-inf {
            .ticket__car-mark {
              color: #000;
              font-weight: 300;
              font-size: 1.7rem;
            }
            .ticket__car-type {
              svg {
                width: auto;
                height: auto;
              }
            }
          }
          .ticket-timeline {
            height: 100%;
            .ticket-timeline__list {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              height: 100%;
              &:before {
                content: "";
                position: absolute;
                width: 2px;
                height: calc(100% - 50px);
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background-color: $SECOND_FONT_COLOR;
              }
              .ticket-timeline__item {
                font-size: 2.2rem;
                color: #000;
                &:first-child {
                  &:before {
                    width: 14px;
                    height: 14px;
                    left: -6px;
                    background-color: $SECOND_FONT_COLOR;
                  }
                }
                &:last-child {
                  &:before {
                    background-image: url("data:image/svg+xml,%3Csvg width='16' height='9' viewBox='0 0 16 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.29289 8.70708C7.68342 9.09761 8.31658 9.09761 8.70711 8.70708L15.0711 2.34312C15.4616 1.9526 15.4616 1.31943 15.0711 0.928906C14.6805 0.538382 14.0474 0.538382 13.6569 0.928906L8 6.58576L2.34315 0.928906C1.95262 0.538382 1.31946 0.538382 0.928932 0.928906C0.538408 1.31943 0.538408 1.9526 0.928932 2.34312L7.29289 8.70708ZM7 0.35553L7 7.99997H9L9 0.35553H7Z' fill='%2366B2FF'/%3E%3C/svg%3E%0A");
                    left: -10px;
                    width: 22px;
                    height: 16px;
                  }
                }
                &:after {
                  background-color: $SECOND_FONT_COLOR;
                }
              }
            }
          }
        }
        &.ticket__td--despature-time,
        &.ticket__td--arrival-time {
          .ticket__time,
          .ticket__date,
          .ticket__day {
            color: #000;
          }
          .ticket__time {
            font-size: 2.8rem;
            margin-bottom: 0;
          }
          .ticket__date,
          .ticket__day {
            font-size: 1.7rem;
            font-weight: 100;
            margin-top: 10px;
          }
        }
        &.ticket__td--travel-time,
        &.ticket__td--type-places {
          .ticket__travel-min,
          .type-places__desc {
            font-size: 1.7rem;
            font-weight: 100;
          }
        }
        &.ticket__td--free-places {
          &:not(.buy-ticket-component) {
            text-align: center;
            border-right: none;
            .free-places__quantity {
              font-size: 2.2rem;
            }
          }
        }
        &.buy-ticket-component {
          .free-places__quantity,
          .cost-ticket {
            font-weight: 500;
            font-size: 2.8rem;
          }
        }
      }
    }
    .active-metro__block {
      ::v-deep .notification {
        display: flex;
      }
    }
    .metro-direction {
    
    }
  }
</style>
