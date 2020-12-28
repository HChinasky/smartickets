<template>
  <footer class="footer">
    <section class="footer__cta footer-cta">
      <div class="container">
        <div class="footer-cta__inner">
          <h2 class="footer-cta__title" style="padding-bottom: 20px;">
            {{ $t("feedback") }}
          </h2>

          <div class="footer-cta__contacts cta-contacts">
            <div class="cta-contacts__thumb">
              <svg viewBox="0 0 16 16">
                <use
                  :xlink:href="
                    require('@/assets/img/sprite.svg') + '#icon-call'
                  "
                />
              </svg>
            </div>

            <div class="cta-contacts__list">
              <div class="cta-contacts__left">
                <div class="cta-contacts__item">{{ $t("support") }}</div>
              </div>

              <div class="cta-contacts__right">
                <div class="cta-contacts__item">
                  <strong>+38 (044) 355 31 28</strong>
                  {{ $t("mondayShort") }}-{{ $t("fridayShort") }}
                  {{ $t("fromGen") }} 9:00 {{ $t("toGen") }} 18:00
                </div>
              </div>
            </div>

            <div class="cta-contacts__add-inf">
              <div class="cta-contacts__email">
                <svg viewBox="0 0 16 13">
                  <use
                    :xlink:href="
                      require('@/assets/img/sprite.svg') + '#icon-mail'
                    "
                  />
                </svg>
                Email:<a href="mailto:support@e-transport.gov.ua"
                  >support@e-transport.gov.ua</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="footer__top footer-top">
      <div class="container">
        <div class="footer-top__inner"></div>
      </div>
    </section>

    <section class="footer__bot footer-bot">
      <div class="container">
        <div class="footer-bot__inner">
          <div class="footer__brand footer-brand">
            <div class="footer-brand__logo">
              <img src="@/assets/img/icdclogo.png" style="width: 80px;" />
            </div>
            <div class="footer-brand__desc">
              <h2 class="footer-brand__title" style="margin-left: 10px;">
                {{ $t("siteOwner") }}
              </h2>
              <span class="footer-brand__subtitle"></span>
            </div>
          </div>
          <div class="footer__contacts">
            <div class="footer__socials">
              <ul class="footer-socials">
                <li class="footer-socials__item">
                  <a
                    href="https://www.facebook.com/seICDC/"
                    class="footer-socials__link"
                  >
                    <svg viewBox="0 0 30 30">
                      <use
                        :xlink:href="
                          require('@/assets/img/sprite.svg') +
                            '#icon-facebook-white'
                        "
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bot__inner" style="margin-top: 12px;">
          <div class="footer__brand footer-brand">
            <div class="footer-brand__logo">
              <img src="@/assets/img/svg/mtu_sign.svg" style="width: 60px;" />
            </div>
            <div class="footer-brand__desc">
              <h2 class="footer-brand__title" style="margin-left: 10px;">
                {{ $t("ministry") }}
              </h2>
              <span class="footer-brand__subtitle"></span>
            </div>
          </div>
        </div>

        <div class="footer-bot__inner" style="margin-top: 12px;">
          <div class="footer__brand footer-brand">
            <div class="footer-brand__logo">
              <img src="@/assets/img/svg/beta.svg" style="width: 60px;" />
            </div>
            <div class="footer-brand__desc">
              <h2 class="footer-brand__title" style="margin-left: 10px;">
                {{ $t("footerInfo1") }}<br />
                {{ $t("footerInfo2") }}
                <strong>support@e-transport.gov.ua</strong> - {{ $t("24h") }}
                <br />{{ $t("footerInfo3") }}
                <strong>+38 (044) 355 31 28</strong>, {{ $t("mondayShort") }}-{{
                  $t("fridayShort")
                }}
                {{ $t("fromGen") }} 9:00 {{ $t("toGen") }} 18:00
              </h2>
              <span class="footer-brand__subtitle"></span>
            </div>
          </div>
        </div>

        
      </div>
    </section>

    <div class="footer__copyright">
      <div class="container"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped></style>
