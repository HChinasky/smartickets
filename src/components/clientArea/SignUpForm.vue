<template>
  <modal
      name="signUpForm"
      transition="pop-out"
      :adaptive="true"
      width="850"
      height="880"
      styles="box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.3);border-radius: 43px;"
  >
    <div class="box">
      <span @click="$modal.hide('signUpForm')" class="close-popup"></span>
      <div class="sign-up__block">
        <div
            v-if="step !== totalSteps"
            class="sign-up-title__form"
        >
          <h3 class="title">{{ $t('registerTitle') }}</h3>
          <img src="@/assets/img/svg/line-gradient.svg"/>
          <h6 class="sign-up-subtitle__form">
            {{ $t('alreadyRegistered') }}
            <button @click="$modal.hide('signUpForm');$modal.show('signInForm')" class="signIn-btn">{{ $t('signInCabinet') }}
            </button>
          </h6>
        </div>
        <div v-else class="sign-up-title__form email-activation">
          <h3 class="title">{{ $t('confirmEmail') }}</h3>
          <img src="@/assets/img/svg/line-gradient.svg"/>
          <h6 class="sign-up-subtitle__form">
            {{ $t('sendMsgOnCurrentMail') }}
          </h6>
        </div>
        <form class="sign-up__form">
          <div
              v-if="step === 1"
              class="step-by-step-block"
          >
            <label
                :class="{ 'form-group--error': $v.username.$error }"
            >
              {{ $t('shortFullName') }}
              <input
                  v-model="username"
                  @blur="$v.username.$touch()"
                  id="username"
                  type="text"
              />
              <template v-if="$v.username.$error">
                <p v-if="!$v.username.required" class="errorMessage">
                  {{ $t("firstNameEmpty") }}
                </p>
                <p v-if="!$v.username.minLength" class="errorMessage">
                  {{ $t("firstnameMinLength") }}
                </p>
                <p v-if="!$v.username.alpha" class="errorMessage">
                  {{ $t("firstnameAlpha") }}
                </p>
              </template>
            </label>
            <label
                :class="{ 'form-group--error': $v.email.$error }"
            >
              {{ $t('eMailLabel') }}
              <input
                  v-model="email"
                  @blur="$v.email.$touch()"
                  @keydown.space.prevent
                  id="email"
                  type="email"
              />
              <template v-if="$v.email.$error">
                <p v-if="!$v.email.required" class="errorMessage">
                  {{ $t("emailEmpty") }}
                </p>
                <p v-if="!$v.email.email" class="errorMessage">
                  {{ $t("emailInvalid") }}
                </p>
              </template>
            </label>
          </div>
          <div
              v-if="step === 2"
              class="step-by-step-block"
          >
            <label
                :class="{ 'form-group--error': $v.password.$error }"
            >
              {{ $t('enterPassword') }}
              <input
                  v-model.trim="$v.password.$model"
                  @blur="$v.password.$touch()"
                  @keydown.space.prevent
                  id="password"
                  type="password"
              />
              <template v-if="$v.password.$error">
                <p v-if="!$v.password.required" class="errorMessage">
                  {{ $t("passwordInvalid") }}
                </p>
                <p v-if="!$v.password.minLength" class="errorMessage">
                  {{ $t("passwordMinLength") }}
                </p>
              </template>
            </label>
            <label
                :class="{ 'form-group--error': $v.repeatPassword.$error }"
            >
              {{ $t('repeatPassword') }}
              <input
                  v-model.trim="$v.repeatPassword.$model"
                  @blur="$v.repeatPassword.$touch()"
                  @keydown.space.prevent
                  id="repeat-password"
                  type="password"
              />
              <template v-if="$v.repeatPassword.$error">
                <p v-if="!$v.repeatPassword.sameAsPassword" class="errorMessage">
                  {{ $t("repeatPasswordIdentical") }}
                </p>
              </template>
            </label>
          </div>
          <div
              v-if="step === 3"
              class="step-by-step-block">
            <span class="register-email">{{ email }}</span>
            <span class="confirm-email__label">{{ $t('confirmEmailSecond') }}</span>
            <span class="desc-confirm-btn__label" v-html="$t('pressBtn')"></span>
          </div>
          <div class="button-set">
            <button
                v-if="step == 1"
                class="next-btn"
                @click.prevent="nextStep($v)"
            >
              {{ $t('next') }}
            </button>
            <button
                v-if="step == 2"
                class="next-btn"
                @click.prevent="nextStep($v)"
            >
              {{ $t('register') }}
            </button>
            <button
                v-if="step === totalSteps"
                class="register-btn"
                @click.prevent="reSubmitForm"
            >
              {{ $t('reSend')}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
  import {
    required,
    sameAs,
    minLength,
    helpers,
    email
  } from "vuelidate/lib/validators";

  const alpha = helpers.regex(
    "alpha",
    /^[A-Za-z- а,б,в,г,ґ,д,е,є,ж,з,и,і,ї,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ь,ю,я,э,ы,ъ,-,']+$/i
  );

  export default {
    name: "SignUpForm",
    data: () => ({
      totalSteps: 3,
      step: 1,
      email: "",
      username: "",
      password: "",
      repeatPassword: ""
    }),
    validations: {
      username: {
        required,
        minLength: minLength(3),
        alpha
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
    methods: {
      nextStep: function ($v) {
        if (this.step === 1) {
          if ($v.username.$error || $v.email.$error || !this.username || !this.email) {
            return false;
          }
        }
        if (this.step === 2) {
          if ($v.password.$error || $v.repeatPassword.$error || !this.password || !this.repeatPassword) {
            return false;
          }
        }
        this.step++;
      },
      reSubmitForm: function () {
        alert("Re-submit activation");
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables";
  @import "@/assets/scss/mixins";
  
  .close-popup {
    display: flex;
    justify-content: flex-end;
    margin-right: 38px;
    margin-top: 30px;
    @include respond-until(sm) {
      margin-right: 20px;
      margin-top: 15px;
    }
    
    &:after {
      content: "\00d7";
      color: $DANGER_COLOR;
      font-size: 34px;
      font-weight: 100;
      cursor: pointer;
    }
  }
  .sign-up__block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 98px;
    @include respond-until(sm) {
      padding: 20px;
    }
  
    @include respond-to(sm) {
      padding: 15px 40px;
    }
    
    .sign-up-title__form {
      > img {
        margin: 10px auto;
        display: block;
        width: 100%;
        height: 1px;
      }
      
      &.email-activation {
        .sign-up-subtitle__form {
          color: $LABEL_COLOR;
          font-size: 26px;
          padding: 35px 45px;
          margin-bottom: 0;
          @include respond-until(sm) {
            font-size: 17px;
            padding: 0 0 30px 0;
          }
          @include respond-to(sm) {
            font-size: 22px;
          }
        }
      }
      
      .title {
        font-size: 42px;
        color: $FONT_COLOR;
        text-align: center;
        margin-bottom: 0;
        @include respond-until(sm) {
          font-size: 22px;
          margin-top: 0;
        }
        @include respond-to(sm) {
          font-size: 28px;
        }
      }
      
      .sign-up-subtitle__form {
        font-size: 26px;
        color: $LABEL_COLOR;
        text-align: center;
        margin-top: 0;
        font-weight: 200;
        @include respond-until(sm) {
          font-size: 17px;
          margin-bottom: 30px;
        }
        @include respond-to(sm) {
          font-size: 24px;
          margin-bottom: 45px;
        }
        
        .signIn-btn {
          color: $LINK_COLOR;
          font-weight: 100;
          background-color: transparent;
          border: none;
          text-decoration: none;
        }
      }
    }
    
    .sign-up__form {
      display: flex;
      flex-direction: column;
      width: 100%;
      
      .step-by-step-block {
        display: flex;
        flex-direction: column;
        
        label {
          display: flex;
          flex-direction: column;
          color: $LABEL_COLOR;
          font-size: 26px;
          font-weight: 200;
          text-align: center;
          position: relative;
          @include respond-until(sm) {
            font-size: 17px;
          }
          @include respond-to(sm) {
            font-size: 22px;
          }
          
          &:nth-child(2) {
            margin-top: 70px;
            @include respond-until(sm) {
              margin-top: 25px;
            }
            @include respond-to(sm) {
              margin-top: 25px;
            }
          }
          
          &.form-group--error {
            input {
              border: 2px solid $DANGER_COLOR;
              color: $DANGER_COLOR;
            }
          }
          
          .errorMessage {
            color: $DANGER_COLOR;
            font-size: 18px;
            position: absolute;
            bottom: -45px;
            @include respond-until(sm) {
              font-size: 12px;
              position: relative;
              bottom: 0;
              text-align: left;
              margin: 5px 0;
            }
            @include respond-to(sm) {
              font-size: 14px;
              position: relative;
              bottom: 0;
              text-align: left;
              margin: 5px 0;
            }
          }
          
          input {
            margin-top: 15px;
            height: 95px;
            border-radius: 20px;
            border: 2px solid #000;
            outline: none;
            padding: 0 45px;
            @include respond-until(sm) {
              height: 55px;
              border-radius: 10px;
              text-align: center;
              padding: 0 10px;
            }
          }
          
          &:not(.form-group--error) {
            input {
              &:focus {
                border-color: $LINK_COLOR;
                color: $LINK_COLOR;
              }
            }
          }
        }
        
        .register-email {
          font-size: 26px;
          background-color: #F6F6F6;
          border-radius: 15px;
          color: $LINK_COLOR;
          display: flex;
          justify-content: center;
          padding: 25px 55px;
          @include respond-until(sm) {
            font-size: 17px;
          }
        }
        
        .confirm-email__label {
          color: $LINK_COLOR;
          font-size: 26px;
          text-align: center;
          padding: 50px 0;
          @include respond-until(sm) {
            font-size: 17px;
            padding: 30px 0;
          }
          @include respond-to(sm) {
            padding-top: 40px;
          }
        }
        
        .desc-confirm-btn__label {
          font-size: 17px;
          color: $FONT_COLOR;
          font-weight: 200;
          padding-top: 45px;
          text-align: center;
          @include respond-until(sm) {
            padding-top: 0;
            font-size: 12px;
          }
          @include respond-to(sm) {
            padding-top: 25px;
          }
  
          span {
            color: $LINK_COLOR;
          }
        }
      }
      
      .button-set {
        display: flex;
        justify-content: center;
        margin-top: 90px;
        @include respond-until(sm) {
          margin-top: 40px;
        }
        
        .next-btn,
        .register-btn {
          text-align: center;
          background-color: #000;
          color: #fff;
          border: none;
          width: 320px;
          height: 95px;
          border-radius: 50px;
          outline: none;
          font-size: 24px;
          font-weight: 500;
          transition: background-color .3s ease-in-out;
  
          @include respond-until(sm) {
            width: 260px;
            height: 55px;
            font-size: 17px;
          }
          
          &:hover {
            background-color: $BUTTON_HOVER;
          }
          
          &:focus {
            background-color: $LINK_COLOR;
          }
        }
      }
    }
  }
  
  .vm--container {
    display: flex;
    ::v-deep .vm--overlay {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(6px);
    }
    ::v-deep .vm--modal {
      @include respond-to(sm) {
        width: 580px!important;
        height: auto!important;
        border-radius: 25px!important;
        margin: auto;
      }
      @include respond-until(sm) {
        width: 460px!important;
        height: auto!important;
        border-radius: 25px!important;
        margin: auto;
      }
      @include respond-to(xs) {
        width: 300px!important;
        height: auto!important;
        border-radius: 25px!important;
        margin: auto;
      }
    }
  }
</style>
