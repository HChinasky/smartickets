<template>
  <modal
      name="baggageType"
      transition="pop-out"
      :adaptive="true"
      width="1200"
      height="660"
      @before-open="beforeOpen"
  >
    <div class="box">
      <span @click="$modal.hide('baggageType')" class="close-popup"></span>
      <swiper class="swiper mobile" :options="swiperOption">
        <swiper-slide
            v-for="baggageType in baggageTypes"
            :key="baggageType.baggageId">
          
          <div class="card__block">
            <div class="card__content">
              <div class="card__name">
                <div class="card__title">
                  {{ baggageType.icon.title }}
                  <a  :href="'https://skyup.aero/'+$i18n.locale+'/faq/rates'" target="_blank">
                    
                    <svg width="53" height="53" viewBox="0 0 53 53"  fill="none" xmlns="http://www.w3.org/2000/svg">
                      <use
                          :xlink:href="require('@/assets/img/sprite.svg') + '#icon-open-link'"
                      />
                    </svg>
                  </a>
                </div>
                <div class="card__price">{{ getPriceForOneTicket(baggageType.icon.price) }} {{ $t('UAH') }}</div>
              </div>
              <div class="card__info">
                <div class="card__icon">
                  <svg :width="baggageType.icon.width" :height="baggageType.icon.height" :viewBox="'0 0 ' + baggageType.icon.width + ' ' + baggageType.icon.height">
                    <use :xlink:href="require('@/assets/img/sprite.svg') + baggageType.icon.iconId" />
                  </svg>
                </div>
                <ul class="allowed__list">
                  <template v-for="(item, index) in baggageType.allowedList">
                    <li :key="index" :class="{'d-flex' : item.tooltip}">
                      <p v-html="item.text"></p>
                      <span
                          v-if="item.tooltip"
                          v-tooltip="{
                              content: 'До вильоту - 1 407 грн<br>Після вильоту -  заборонено',
                              placement: 'bottom-center',
                              classes: ['info'],
                              trigger: 'hover focus click',
                            }">і</span>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="card__btn">
                <button class="btn btn--black" @click="clickBtn(baggageType.icon)">{{ $t("select") }}</button>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
      <div
          class="card__block desktop"
          v-for="baggageType in baggageTypes"
          :key="baggageType.baggageId"
      >
        <div class="card__content">
          <div class="card__name">
            <div class="card__title">
              {{ baggageType.icon.title }}
              <a :href="'https://skyup.aero/'+$i18n.locale+'/faq/rates'" target="_blank">
                <svg width="53" height="53" viewBox="0 0 53 53"  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use
                      :xlink:href="require('@/assets/img/sprite.svg') + '#icon-open-link'"
                  />
                </svg>
              </a>
            </div>
            <div class="card__price">{{ getPriceForOneTicket(baggageType.icon.price) }} {{ $t('UAH') }}</div>
          </div>
          <div class="card__info">
            <div class="card__icon">
              <svg :width="baggageType.icon.width" :height="baggageType.icon.height" :viewBox="'0 0 ' + baggageType.icon.width + ' ' + baggageType.icon.height">
                <use :xlink:href="require('@/assets/img/sprite.svg') + baggageType.icon.iconId" />
              </svg>
            </div>
            <ul class="allowed__list">
              <template v-for="(item, index) in baggageType.allowedList">
                <li :key="index" :class="{'d-flex' : item.tooltip}">
                  <p v-html="item.text"></p>
                  <span
                      v-if="item.tooltip"
                      v-tooltip="{
                      content: $t('bookRemoveLabel'),
                      placement: 'bottom-center',
                      classes: ['info'],
                      trigger: 'hover focus click',
                      }">і</span>
                </li>
              </template>
            </ul>
          </div>
          <div class="card__btn">
            <button class="btn btn--black" @click="clickBtn(baggageType.icon)">{{ $t("select") }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "TariffType",
    props:["backward", "aircraftTariff"],
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        modalId: null,
        baggageTypes: null,
        checkSelectTariff: [],
        tariffDepartment: "Basic",
        tariffArrival: "Basic",
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          direction: 'horizontal',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        },
      }
    },
    computed: {
      ...mapGetters(["getTicketsFromCart"])
    },
    methods: {
      ...mapActions([
        "setResultId",
        "setSearchId",
        "setTicketPrice",
        "setTicketDepartmentPrice",
        "setTicketArrivalPrice",
        "setPersons",
        "setTicketsList",
        "setFromTariffType",
        "setToTariffType"
      ]),
      getPriceForOneTicket(price) {
        return price;
      },
      clickBtn: function (iconArr) {
        iconArr['modalId'] = this.modalId;
        this.$emit('baggageTypeData', iconArr);
        this.$modal.hide('baggageType');
        
        if(this.modalId == 0) {
          this.tariffDepartment = iconArr.title;
          this.checkSelectTariff.push(iconArr.title)
        } else {
          this.tariffArrival = iconArr.title;
          this.checkSelectTariff.push(iconArr.title)
        }
        this.aircraftTariff.flights.filter((aircraft) => {
          if(aircraft.routes[1]) {
            if (aircraft.routes[0].fareName == this.tariffDepartment && aircraft.routes[1].fareName == this.tariffArrival) {
              
              this.setFromTariffType(aircraft.routes[0].fareName)
              this.setToTariffType(aircraft.routes[1].fareName)
                this.setResultId(aircraft.resultId);
                this.setSearchId(aircraft.searchId);

                this.getTicketsFromCart.filter((ticket) => {
                  
                  if(ticket.type.toLowerCase() === "skyup") {
                    ticket.selectSeat = true;
                    ticket.bookedSkyUp = false;
                    this.setTicketsList(ticket)
                  }
                });
                this.setTicketPrice(aircraft.amount.UAH.toFixed(2));
                if(this.modalId == 0) {
                  this.setTicketDepartmentPrice(parseFloat(aircraft.routes[this.modalId].amount.UAH).toFixed(2));
                } else {
                  this.setTicketArrivalPrice(parseFloat(aircraft.routes[this.modalId].amount.UAH).toFixed(2));
                }
            }
          } else  {
            if(aircraft.routes[0].fareName == this.tariffDepartment) {
              this.setFromTariffType(aircraft.routes[0].fareName)
              this.setResultId(aircraft.resultId);
              this.setSearchId(aircraft.searchId);
              this.getTicketsFromCart.filter((ticket) => {
                if(ticket.type.toLowerCase() === "skyup") {
                  ticket.selectSeat = true;
                  ticket.bookedSkyUp = false;
                  this.setTicketsList(ticket)
                }
              });
              this.setTicketDepartmentPrice(parseFloat(aircraft.routes[this.modalId].amount.UAH).toFixed(2));
            }
          }
        });
      },
      beforeOpen (event) {
        this.modalId = event.params.item;
        this.baggageTypes = event.params.baggageTypes;
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  @import "@/assets/scss/grid-mixins";
  
  .vm--container {
    ::v-deep .vm--overlay {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(6px);
    }
    
    ::v-deep .vm--modal {
      background-color: transparent;
      box-shadow: none;
      overflow: visible;
      
      .box {
        @include row(0, 0, 0, 0, 0);
        height: 100%;
        justify-content: center;
        .close-popup {
          display: flex;
          justify-content: flex-end;
          position: relative;
          top: 20px;
          left: 20px;
          @include respond-to(sm) {
            left: -20px;
          }
          @include respond-until(sm) {
            left: inherit;
            right: 30px;
          }
  
          &:after {
            content: "\00d7";
            color: $DANGER_COLOR;
            font-size: 47px;
            font-weight: 100;
            cursor: pointer;
          }
        }
        .swiper {
          &.mobile {
            display: none;
            @include respond-until(sm) {
              display: block;
            }
          }
          .swiper-wrapper {
            width: 80%;
          }
          .swiper-scrollbar {
            width: calc(98% - 95px);
            left: 45px;
            background: #C4C4C4;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            bottom: 20px;
            .swiper-scrollbar-drag {
              position: absolute;
              background: #000000;
            }
          }
        }
        .card__block {
          @include make-col(1, 3, 30px);
          @include respond-until(sm) {
            @include make-col(23, 24, 0 );
            padding: 20px 0;
          }
          &.desktop {
            display: block;
            @include respond-until(sm) {
              display: none;
            }
          }
          
          .card__content {
            background-color: #fff;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            height: 100%;
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .card__name {
              .card__title {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 35px;
                font-weight: 500;
                font-size: 28px;
                text-transform: uppercase;
                color: #000;
                text-align: center;
                a {
                  outline: none;
                }
              }
              .card__price {
                font-size: 24px;
                font-weight: 200;
                text-align: center;
                color: $LABEL_COLOR;
                margin-top: 15px;
                &:after {
                  content: '';
                  border-bottom: 1px solid $SECOND_FONT_COLOR;
                  max-width: 285px;
                  display: block;
                  margin: 15px auto;
                }
              }
            }
            .card__info {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding: 25px 0;
              height: 260px;
              .card__icon {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .allowed__list {
                padding-left: 0;
                list-style: none;
                text-align: center;
                li {
                  font-weight: 300;
                  font-size: 15px;
                  color: $LABEL_COLOR;
                  margin-bottom: 15px;
                  @include respond-to(sm) {
                    font-size: 14px;
                  }
                  &.d-flex {
                    display: flex;
                    align-content: center;
                  }
                  p {
                    margin: 0;
                  }
                  span {
                    font-weight: 500;
                    color: $BORDER_BOTTOM_LINK_COLOR;
                    &.has-tooltip {
                      color: $SECOND_FONT_COLOR;
                      display: flex;
                      font-size: 17px;
                      justify-content: center;
                      align-items: center;
                      background-color: #F6F6F6;
                      border-radius: 50%;
                      margin-left: 10px;
                      position: relative;
                      bottom: 3px;
                      width: 24px;
                      height: 24px;
                      cursor: pointer;
                      transition: all .2s;
                      @include respond-to(sm) {
                        width: 28px;
                        height: 20px;
                      }
                      &:hover {
                        color: #fff;
                        background-color: $SECOND_FONT_COLOR;
                      }
                    }
                  }
                }
              }
            }
          }
          &:last-child {
            .card__content {
              .card__info {
                .allowed__list {
                  li {
                    margin-bottom: 8px;
                  }
                }
              }
            }
          }
          .card__btn {
            .btn {
              padding: 17px 35px;
            }
          }
        }
      }
    }
  }
</style>
