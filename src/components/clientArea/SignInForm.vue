<template>
  <modal
      name="signInForm"
      transition="pop-out"
      :adaptive="true"
      width="850"
      height="880"
      styles="box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.3);border-radius: 43px;"
  >
    <div class="box">
      <span @click="$modal.hide('signInForm')" class="close-popup"></span>
      <div class="sign-in__block">
        <div class="sign-in-title__form">
          <h3 class="title">{{ $t('signInCabinetSecond') }}</h3>
          <img src="@/assets/img/svg/line-gradient.svg"/>
          <h6 class="sign-in-subtitle__form">
            {{ $t('notCabinet') }}
            <button @click="$modal.hide('signInForm');$modal.show('signUpForm')" class="sign-up-btn">{{ $t('registerSecond')}}
            </button>
          </h6>
        </div>
        <form class="sign-in__form">
          <label :class="{ 'form-group--error': $v.email.$error }">
            E-mail
            <input
                v-model.trim="$v.email.$model"
                @blur="$v.email.$touch()"
                @keydown.space.prevent
                id="email"
                type="email"
            />
          </label>
          <label :class="{ 'form-group--error': $v.password.$error }">
            {{ $t('password') }}
            <input
                v-model.trim="$v.password.$model"
                @blur="$v.password.$touch()"
                @keydown.space.prevent
                id="password"
                type="password"
            />
          </label>
          <div class="button-set">
            <button
                class="sign-in-btn"
                @click.prevent="signIn"
            >
              {{ $t('signIn') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "signInForm",
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    }
  },
  methods: {
    signIn: function () {
      alert("Sign In");
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
  
  .sign-in__block {
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
    
    .sign-in-title__form {
      width: 100%;
      > img {
        margin: 10px auto;
        display: block;
        width: 100%;
        height: 1px;
      }
      
      &.last-step {
        .sign-in-subtitle__form {
          color: $LABEL_COLOR;
          font-size: 26px;
          padding: 35px 45px;
          margin-bottom: 0;
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
      
      .sign-in-subtitle__form {
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
        
        .sign-up-btn {
          color: $LINK_COLOR;
          font-weight: 100;
          background-color: transparent;
          border: none;
          text-decoration: none;
        }
      }
    }
    .sign-in__form {
      display: flex;
      flex-direction: column;
      width: 100%;
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
      
      .button-set {
        display: flex;
        justify-content: center;
        margin-top: 90px;
        @include respond-until(sm) {
          margin-top: 40px;
        }
        
        .sign-in-btn {
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
