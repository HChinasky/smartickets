<template>
  <span>
    <div class="persons-info"
         v-for="(passenger, index) in passengers"
         :key="index">
            <div class="person-info__age">
        <p>
          {{
            passenger.type === "ADT" ? "Дорослий" :
            passenger.type === "CHD" ? "Дитина" :
            "Немовля"
          }} {{index + 1}}
        </p>
      </div>
      <div class="person-info__card">
        <div class="form-list">
          <div class="form-list__group">
            <label class="ticket-list__label">Призвіще (латинськими)</label>
            <input
                class="ticket-list__input"
                type="text"
                v-model="passenger.lastName"
                @blur="$v.passengers.$each[index].lastName.$touch()"
                @keydown.space.prevent
            />
            <template v-if="$v.passengers.$each[index].lastName.$error">
              <p v-if="!$v.passengers.$each[index].lastName.required" class="errorMessage">
                {{ $t("lastNameEmpty") }}
              </p>
              <p v-if="!$v.passengers.$each[index].lastName.alpha" class="errorMessage">
                {{ $t("firstnameLatinAlpha") }}
              </p>
              <p v-if="!$v.passengers.$each[index].lastName.minLength" class="errorMessage">
                {{ $t('firstnameMinLength') }}
              </p>
            </template>
          </div>
          <div class="form-list__group">
            <label class="ticket-list__label">Ім’я (латинськими)</label>
            <input
                class="ticket-list__input"
                type="text"
                v-model="passenger.firstName"
                @blur="$v.passengers.$each[index].firstName.$touch()"
                @keydown.space.prevent
            />
            
          </div>
          <template v-if="$v.passengers.$each[index].firstName.$error">
            <p v-if="!$v.passengers.$each[index].firstName.required" class="errorMessage">
              {{ $t("firstNameEmpty") }}
            </p>
            <p v-if="!$v.passengers.$each[index].firstName.alpha" class="errorMessage">
              {{ $t("firstnameLatinAlpha") }}
            </p>
            <p v-if="!$v.passengers.$each[index].firstName.minLength" class="errorMessage">
              {{ $t('firstnameMinLength') }}
            </p>
          </template>
        <label class="ticket-list__label">Дата народження</label>
        <div class="form-date-birth">
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="days(passenger.birthMonth, passenger.birthYear)"
                v-model="passenger.birthDay"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="months()"
                v-model="passenger.birthMonth"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="years()"
                v-model="passenger.birthYear"
                :clearable="false"
            />
          </div>
        </div>
          <div class="genders-link">
            <span>Стать</span>
            <div class="d-flex">
              <div class="form-group">
                <input type="radio" :id="[`male-${index}`]" v-model="passenger.genders" value="m">
                <label :for="[`male-${index}`]" class="male">Чоловіча</label>
              </div>
              <div class="form-group">
                <input type="radio" :id="[`female-${index}`]" v-model="passenger.genders" value="f">
                <label :for="[`female-${index}`]" class="female">Жіноча</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="person-info__card">
      <div class="form-list">
        <div class="form-list__group">
          <label class="ticket-list__label">Громадянство</label>
          <v-select
              class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
              :options="options"
              v-model="passenger.country"
              :clearable="false"
          />
        </div>
        <div class="form-list__group">
          <label class="ticket-list__label">Паспорт (номер)</label>
          <input
              class="ticket-list__input"
              type="text"
              v-model="passenger.passportCode"
              @blur="$v.passengers.$each[index].passportCode.$touch()"
              @keydown.space.prevent
          />
          <template v-if="$v.passengers.$each[index].passportCode.$error">
            <p v-if="!$v.passengers.$each[index].passportCode.required" class="errorMessage">
              {{ $t("passportNumber") }}
            </p>
          </template>
        </div>
        <label class="ticket-list__label">Термін дії паспорта</label>
        <div class="form-date-birth">
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="days(passenger.passportMonth, passenger.passportYear)"
                v-model="passenger.passportDay"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="months()"
                v-model="passenger.passportMonth"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="betweenYears()"
                v-model="passenger.passportYear"
                :clearable="false"
                :filterable="true"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    
    
    </span>
</template>

<script>
  import {mapMultiRowFields} from 'vuex-map-fields';
  import countries from '../../assets/country';
  import {
    required,
    minLength,
    helpers,
  } from "vuelidate/lib/validators";

  const alpha = helpers.regex(
    "alpha",
    /^[A-Za-z']+$/i
  );
  export default {
    name: "adultCart",
    validations: {
      passengers: {
        $each: {
          lastName: {
            required,
            minLength: minLength(3),
            alpha
          },
          firstName: {
            required,
            minLength: minLength(3),
            alpha
          },
          passportCode: {
            required,
          },
        },
      },
    },
    computed: {
      ...mapMultiRowFields(["passengers"]),
      options() {
        return countries
      },
    },

    methods: {
      betweenYears() {
        const year = new Date().getFullYear();
        return Array.from({length: 35}, (value, index) => year + index)
      },
      years() {
        const year = new Date().getFullYear();
        return Array.from({length: year - 1900}, (value, index) => year - index)
      },
      months() {
        var xs = [];
        for (var i = 1; i <= 12; i++) {
          xs.push(i);
        }
        return xs;
      },
      days(month, year) {
        const date = new Date(year, month - 1),
          days = [];
        while (date.getMonth() === month - 1) {
          days.push(new Date(date).getDate());
          date.setDate(date.getDate() + 1);
        }
        return days;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  @import "@/assets/scss/grid-mixins";
  
  .persons-info {
    @include row(0, 0, 0, 0, 0, 0);
    
    .person-info__age {
      background-image: url('/img/adult-ticket.5535648a.svg');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 20px;
      margin-bottom: 45px;
      @include respond-until(sm) {
        margin-bottom: 15px;
      }
      
      p {
        font-weight: normal;
        font-size: 28px;
        margin-left: 40px;
        @include respond-until(sm) {
          font-size: 22px;
        }
      }
    }
    &:not(:first-child) {
      margin-top: 60px;
    }
    .person-info__card {
      @include make-col(6, $grid-columns, 0);
      @include respond-until(sm) {
        @include make-col(12, $grid-columns, 0);
      }
      
      .form-list {
        min-width: 300px;
        max-width: 420px;
        @include respond-until(sm) {
          width: 100%;
          min-width: inherit;
          max-width: inherit;
        }
        @include respond-to(sm) {
          max-width: 320px;
        }
        
        .genders-link {
          display: flex;
          flex-direction: column;
          span {
            font-size: 17px;
            font-weight: 100;
            color: $LABEL_COLOR;
            margin-bottom: 25px;
          }
          input[type=radio] {
            visibility:hidden;
            position: absolute;
          }
          .form-group {
            input:checked ~ label {
              font-weight: normal;
              color: $BORDER_BOTTOM_LINK_COLOR;
            }
            &:last-child {
              margin-left: 15px;
            }
          }
          label {
            font-weight: 200;
            font-size: 17px;
            color: #000;
            background-color: transparent;
            outline: none;
            text-decoration: none;
            padding-bottom: 5px;
            border-left: none;
            border-right: none;
            border-top: none;
            border-bottom: 2px dashed $BORDER_BOTTOM_LINK_COLOR;
            transition: color .2s;
            text-transform: capitalize;
            cursor: pointer;
          }
          
          .d-flex {
            display: flex;
          }
        }
        
        .form-date-birth {
          display: flex;
        }
        
        .form-date-birth {
          .form-list__group {
            &.ts-form__select {
              &:not(:first-child) {
                margin-left: 15px;
              }
            }
            
            &:first-child, &:nth-child(2) {
              .ts-form__input {
                width: 85px;
              }
            }
            
            &:last-child {
              .ts-form__input {
                width: 110px;
              }
            }
          }
        }
        
        .form-list__group {
          margin-bottom: 45px;
          @include respond-until(sm) {
            margin-bottom: 30px;
          }
          
          .ts-form__input {
            ::v-deep .vs__dropdown-toggle {
              border: none;
              
              .vs__actions {
                svg {
                  fill: #000;
                }
              }
              
              .dropdown-toggle {
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              
              input.form-control {
                position: absolute;
              }
            }
          }
          
          .ticket-list__input {
            height: 40px;
            text-transform: uppercase;
          }
          
          .errorMessage {
            font-size: 14px;
            font-weight: 100;
            color: $DANGER_COLOR;
            
            &:nth-child(2) {
              top: 15px;
            }
          }
        }
      }
    }
  }
</style>
