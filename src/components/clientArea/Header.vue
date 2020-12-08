<template>
  <header class="header-client-area">
    <div class="logo-block">
      <svg data-v-bb50a5e4="" viewBox="0 0 108 52"><use :xlink:href="require('@/assets/img/sprite.svg') + '#icon-logo'" /></svg>
    </div>
      <a v-back class="back-to-site__link">
        <svg
            width="36"
            height="23"
            viewBox="0 0 36 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M36 11.5L2 11.5M2 11.5L13.4815 22M2 11.5L13.4815 0.999998"
              stroke="#3398ff"
              stroke-width="2"
          />
        </svg>
        {{ stepBackLink }}
      </a>
  </header>
</template>

<script>
  export default {
    name: "Header",
    props: ['stepBackLink']
  }
</script>

<style scoped>

</style>
