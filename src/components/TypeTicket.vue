<template>
  <div class="full-container">
    <div class="container">
      <h1>{{ $t('searchTicketsOnline') }}</h1>
      <h4>{{ $t('chooseTypeTicket')}}</h4>
      <div class="type-trips__cards">
        <div class="card" v-for="tripItem in tripTypes" :key="tripItem.id">
          <div class="type-trips__label">
            <template v-if="tripItem.name != 'svg'">
              <p>{{ tripItem.name }}</p>
            </template>
            <template v-else>
              <svg viewBox="0 0 158 30">
                <use
                    :xlink:href="
                            require('@/assets/img/sprite.svg') +
                              '#icon-sky-up'
                          "
                />
              </svg>
            </template>
          </div>
          <div class="type-trips__icon train-trip">
            <svg :width="tripItem.icon.width" :height="tripItem.icon.height" :viewBox="'0 0 ' + tripItem.icon.width + ' ' + tripItem.icon.height">
              <use
                  :xlink:href="
                            require('@/assets/img/sprite.svg') +
                              '#' + tripItem.icon.id
                          "
              />
            </svg>
          </div>
          <div class="type-trips__btn">
            <button :class="{active : tripItem.link == link[tripItem.id]}" @click="chooseTrips(tripItem.id, tripItem.link)" class="type-trips__link">{{ $t('select') }}</button>
          </div>
        </div>
      </div>
      <div class="btn-next__block">
        <router-link :class="{disabled : !returnLink}" :to="{ name: returnLink }" class="search-ticket__link btn--black">{{ $t('next') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "TypeTicket",
    data() {
      return {
        link: [],
        tripTypes: {
          0: {
            id: 1,
            name: 'Приміський поїзд',
            link: 'SearchSuburbanTrain',
            icon: {
              id: 'icon-suburban-train',
              width: 360,
              height: 58
            }
          },
          1: {
            id: 2,
            name: 'Поїзд',
            link: 'SearchForm',
            icon: {
              id: 'icon-type-train',
              width: 345,
              height: 56
            }
          },
          2: {
            id: 3,
            name: 'svg',
            link: 'SearchAircraftTicket',
            icon: {
              id: 'icon-type-aircraft',
              width: 367,
              height: 108
            }
          },
        }
      }
    },
    methods: {
      ...mapActions([
        "regClient",
        "updateClientInfo"
      ]),
      chooseTrips(id, link) {
        this.link.indexOf(link) === -1 ? this.$set(this.link, id, link) : this.$set(this.link, id, null);
      }
    },
    computed: {
      returnLink() {
        var activeLink = '';
        this.link.filter(function (el) {
          if (el != null) {
            activeLink = el
          }
        });
        return activeLink;
      }
    },
    created() {
      this.updateClientInfo();
      this.regClient()
        .then(() => {

        })
        .catch((error) => {
          this.$toasted.global.my_app_error({
            message: error.message,
          });
        });
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .full-container {
    background-color: #FCFCFC;
    padding: 70px 0;
    .container {
      @include respond-until(xs) {
        padding: 0 20px;
      }
      h1 {
        font-weight: normal;
        font-size: 48px;
        color: #000;
        margin: 15px 0;
        @include respond-until(xs) {
          font-size: 26px;
        }
      }
      h4 {
        font-weight: 200;
        font-size: 30px;
        color: $LABEL_COLOR;
        margin: 15px 0;
        @include respond-until(xs) {
          font-size: 18px;
        }
      }
      .type-trips__cards {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        @include respond-until(xs) {
          flex-wrap: wrap;
          margin-top: 0;
        }
        @include respond-until(s) {
          justify-content: center;
        }
        @include respond-until(m) {
          flex-wrap: wrap;
          margin-top: 0;
        }
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-width: 300px;
          width: 420px;
          height: 370px;
          background-color: #fff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 30px 0;
          @include respond-until(sm) {
            min-width: 48%;
            margin-top: 40px;
          }
          @include respond-until(xs) {
            min-width: 280px;
            height: 300px;
          }
          @include respond-to(s) {
            width: 48%;
            margin-top: 40px;
          }
          @include respond-to(sm) {
            width: 48%;
            margin-top: 40px;
          }
          @include respond-to(m) {
            min-width: 260px;
            width: 260px;
            margin-top: 40px;
          }
          @include respond-to(md) {
            width: 300px;
            margin-top: 40px;
          }
          @include respond-to(l) {
            width: 300px;
            margin-top: 40px;
          }
          .type-trips__label {
            display: flex;
            p {
              margin: 0;
              font-weight: 500;
              font-size: 26px;
              color: #000;
            }
            > svg {
              width: 158px;
              height: 29px;
              margin-left: 15px;
              margin-top: 5px;
            }
          }
          .type-trips__icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            svg {
              @include respond-until(xs) {
                width: 260px;
              }
              @include respond-until(l) {
                width: 270px;
              }
              @include respond-until(md) {
                width: 230px;
              }
              @include respond-to(l) {
                width: 230px;
              }
            }
            &.avia-trip {
              svg {
                width: 345px;
                height: 107px;
              }
            }
            &.train-avia-trip {
              svg {
                width: 283px;
                height: 83px;
                &:first-child {
                  width: 283px;
                  height: 83px;
                }
                &:nth-child(2) {
                  width: 19px;
                  height: 19px;
                  margin: 15px 0;
                }
                &:last-child {
                  width: 264px;
                  height: 42px;
                }
              }
            }
          }
          .type-trips__btn {
            .type-trips__link {
              text-decoration: none;
              display: block;
              padding: 16px 55px;
              border: 2px solid #000;
              color: #000;
              outline: none;
              background-color: transparent;
              border-radius: 35px;
              transition: border-color .2s, color .2s;
              &.active {
                background-image: url("data:image/svg+xml,%3Csvg width='24' height='18' viewBox='0 0 24 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.1396 14.0146L2.3271 9.2021C2.20126 9.07472 2.05138 8.97359 1.88616 8.90457C1.72094 8.83554 1.54366 8.8 1.3646 8.8C1.18555 8.8 1.00827 8.83554 0.843045 8.90457C0.677825 8.97359 0.527948 9.07472 0.402104 9.2021C0.274725 9.32795 0.173591 9.47782 0.104567 9.64304C0.0355424 9.80826 0 9.98554 0 10.1646C0 10.3437 0.0355424 10.5209 0.104567 10.6862C0.173591 10.8514 0.274725 11.0013 0.402104 11.1271L6.16335 16.8884C6.6996 17.4246 7.56585 17.4246 8.1021 16.8884L22.6771 2.3271C22.8045 2.20126 22.9056 2.05138 22.9746 1.88616C23.0437 1.72094 23.0792 1.54366 23.0792 1.3646C23.0792 1.18554 23.0437 1.00827 22.9746 0.843045C22.9056 0.677824 22.8045 0.527948 22.6771 0.402104C22.5513 0.274725 22.4014 0.173591 22.2362 0.104567C22.0709 0.0355421 21.8937 0 21.7146 0C21.5355 0 21.3583 0.0355421 21.193 0.104567C21.0278 0.173591 20.8779 0.274725 20.7521 0.402104L7.1396 14.0146Z' fill='%23413FCE'/%3E%3C/svg%3E%0A");
                background-repeat: no-repeat;
                background-position: left 20px center;
                border-color: #413FCE;
                color: #413FCE;
              }
              &.disabled {
              
              }
              &:hover {
                border-color: $BUTTON_HOVER;
                color: $BUTTON_HOVER;
              }
            }
          }
        }
      }
      .btn-next__block {
        display: flex;
        justify-content: center;
        margin-top: 65px;
        .search-ticket__link {
          text-decoration: none;
          border-radius: 45px;
          padding: 23px 98px;
          &.disabled {
            opacity: .3;
            cursor: default;
          }
          &:not(.disabled) {
            transition: all .2s;
            &:hover {
              background: #5b5aff;
              box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
            }
            &:active {
              background-color: #4140ce;
            }
          }
        }
      }
    }
  }
</style>
