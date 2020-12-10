<template>
  <div class="persons-info">
    <div class="person-info__age">
      <p>Дорослий {{passengerIndex}}</p>
    </div>
    <div class="person-info__card">
      <div class="form-list">
        <div class="form-list__group">
          <label class="ticket-list__label">Призвіще (латинськими)</label>
          <input
              class="ticket-list__input"
              type="text"
              v-model="lastname"
              @blur="$v.lastname.$touch()"
              @keydown.space.prevent
          />
          <template v-if="$v.lastname.$error">
            <p v-if="!$v.lastname.required" class="errorMessage">
              {{ $t("lastNameEmpty") }}
            </p>
            <p v-if="!$v.lastname.alpha" class="errorMessage">
              {{ $t("firstnameLatinAlpha") }}
            </p>
            <p v-if="!$v.lastname.minLength" class="errorMessage">
              {{ $t('firstnameMinLength') }}
            </p>
          </template>
        </div>
        <div class="form-list__group">
          <label class="ticket-list__label">Ім’я (латинськими)</label>
          <input
              class="ticket-list__input"
              type="text"
              v-model="personExportData.firstname"
              @blur="$v.personExportData.firstname.$touch()"
              @keydown.space.prevent
          />
          <template v-if="$v.personExportData.firstname.$error">
            <p v-if="!$v.personExportData.firstname.required" class="errorMessage">
              {{ $t("firstNameEmpty") }}
            </p>
            <p v-if="!$v.personExportData.firstname.alpha" class="errorMessage">
              {{ $t("firstnameLatinAlpha") }}
            </p>
            <p v-if="!$v.personExportData.firstname.minLength" class="errorMessage">
              {{ $t('firstnameMinLength') }}
            </p>
          </template>
        </div>
        
        <label class="ticket-list__label">Дата народження</label>
        <div class="form-date-birth">
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="days(person.birthDay.month, person.birthDay.year)"
                v-model="birthDay"
                :value="birthDay"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="months()"
                v-model="birthMonth"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="years()"
                v-model="birthYear"
                :clearable="false"
            />
          </div>
        </div>
        <div class="genders-link">
          <span>Стать</span>
          <div class="d-flex">
            <select-gender
                v-for="gender in person.genders"
                :key="gender.id"
                :obj-key="gender.id"
                :active-key="person.activeGender"
                :title="gender.name"
                @onUpdateKey="updateActiveKey"
            />
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
              v-model="country"
              :clearable="false"
          />
        </div>
        <div class="form-list__group">
          <label class="ticket-list__label">Паспорт (номер)</label>
          <input
              class="ticket-list__input"
              type="text"
              v-model="passportCode"
              @blur="$v.passportCode.$touch()"
              @keydown.space.prevent
          />
          <template v-if="$v.passportCode.$error">
            <p v-if="!$v.passportCode.required" class="errorMessage">
              {{ $t("passportNumber") }}
            </p>
          </template>
        </div>
        <label class="ticket-list__label">Термін дії паспорта</label>
        <div class="form-date-birth">
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="days(person.passport.month, person.passport.year)"
                v-model="passportDay"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="months()"
                v-model="passportMonth"
                :clearable="false"
                :filterable="true"
            />
          </div>
          <div class="form-list__group ts-form__select">
            <v-select
                class="ts-form__input ts-form__input--swap ts-form__input-dropdown dropdown-input v-select"
                :options="betweenYears()"
                v-model="passportYear"
                :clearable="false"
                :filterable="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import countries from '../../assets/country';
  import SelectGender from '../../components/SelectBtn';
  import {
    required,
    sameAs,
    minLength,
    helpers,
    email
  } from "vuelidate/lib/validators";

  const alpha = helpers.regex(
    "alpha",
    /^[A-Za-z']+$/i
  );
  export default {
    name: "adultCart",
    components: {
      SelectGender
    },
    props: {
      passengerIndex: Number
    },
    data() {
      return {
        personExportData: {},
        person: {
          activeGender: this.getGender,
          surname: "",
          name: "",
          genders: [{id: "M", name: "чоловіча"}, {id: "F", name: "жіноча"}],
          birthDay: {
            day: 1,
            month: 1,
            year: new Date().getFullYear(),
          },
          citizenship: {
            label: "УКРАЇНА",
            code: "UA"
          },
          passport: {
            number: "",
            day: 1,
            month: 1,
            year: new Date().getFullYear()
          }
        }
      }
    },
    validations: {
      personExportData: {
        firstname: {
          required,
          minLength: minLength(3),
          alpha
        },
      },
      lastname: {
        required,
        minLength: minLength(3),
        alpha
      },
      passportCode: {
        required
      },
      person: {
        surname: {
          required,
          minLength: minLength(3),
          alpha
        },
        name: {
          required,
          minLength: minLength(3),
          alpha
        },
        passport: {
          number: {required}
        }
      },
      email: {
        required,
        minLength: minLength(3),
        email
      },
      password: {
        required,
        minLength: minLength(3)
      },
      repeatPassword: {
        sameAsPassword: sameAs("password")
      }
    },
    computed: {
      ...mapGetters([
        "getLastName",
        "getFirstName",
        "getPassportCode",
        "getGender",
        "getBirthDay",
        "getBirthMonth",
        "getBirthYear",
        "getPassportDay",
        "getPassportMonth",
        "getPassportYear",
        "getCountry",
      ]),
      options() {
        return countries
      },
      savePersonData() {
        let personData = [{}],
          i          = 0;
        for(i;i<this.passengerIndex;i++) {
          personData[i] = {
            "type": "ADT",
            firstname: {
              get() {
                console.log("get")
                if (this.getFirstName) {
                  return this.getFirstName;
                } else {
                  return null;
                }
              },
              set(value) {
                console.log("set")
                this.setFirstName(value);
              },
            },
            "lastname": this.person.name,
            "birthday": this.person.birthDay.day + '-' + this.person.birthDay.month + '-' + this.person.birthDay.year,
            "gender": this.person.activeGender,
            "citizenship": "UA",
            "docnum": this.person.passport.number,
            "doc-expire": this.person.passport.day + "-" + this.person.passport.month + "-" + this.person.passport.year
          }
        }
        [...this.personExportData] = personData;
        return null;
      },
      lastname: {
        get() {
          if (this.getLastName) {
            return this.getLastName;
          } else {
            return null;
          }
        },
        set(value) {
          this.setLastName(value);
        },
      },

      passportCode: {
        get() {
          if (this.getPassportCode) {
            return this.getPassportCode;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPassportCode(value);
        },
      },
      birthDay: {
        get() {
          if (this.getBirthDay) {
            return this.getBirthDay;
          } else {
            return null;
          }
        },
        set(value) {
          this.setBirthDay(value);
        },
      },
      birthMonth: {
        get() {
          if (this.getBirthMonth) {
            return this.getBirthMonth;
          } else {
            return null;
          }
        },
        set(value) {
          this.setBirthMonth(value);
        },
      },
      birthYear: {
        get() {
          if (this.getBirthYear) {
            return this.getBirthYear;
          } else {
            return null;
          }
        },
        set(value) {
          this.setBirthYear(value);
        },
      },
      passportDay: {
        get() {
          if (this.getPassportDay) {
            return this.getPassportDay;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPassportDay(value);
        },
      },
      passportMonth: {
        get() {
          if (this.getPassportMonth) {
            return this.getPassportMonth;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPassportMonth(value);
        },
      },
      passportYear: {
        get() {
          if (this.getPassportYear) {
            return this.getPassportYear;
          } else {
            return null;
          }
        },
        set(value) {
          this.setPassportYear(value);
        },
      },
      country: {
        get() {
          if (this.getCountry) {
            return this.getCountry;
          } else {
            return null;
          }
        },
        set(value) {
          this.setCountry(value);
        },
      },
      getGender() {
        return this.getGender
      }
    },
    methods: {
      ...mapActions([
        "setPassengers",
        "setLastName",
        "setFirstName",
        "setPassportCode",
        "setGender",
        "setBirthDay",
        "setBirthMonth",
        "setBirthYear",
        "setPassportDay",
        "setPassportMonth",
        "setPassportYear",
        "setCountry",
      ]),
      updateActiveKey(index) {
        this.person.activeGender = index;
        this.setGender(index);
      },
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
        for(var i = 1; i <= 12; i++) {
          xs.push(i);
        }
        return xs;
      },
      days(month, year) {
        const date = new Date(year, month-1),
          days = [];
        while (date.getMonth() === month-1) {
          days.push(new Date(date).getDate());
          date.setDate(date.getDate() + 1);
        }
        return days;
      },
    },
    watch: {
      person: {
        handler(){
          this.savePersonData();
        },
      }
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
            margin-bottom: 40px;
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
