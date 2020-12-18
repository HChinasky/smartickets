<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
          <div
              class="nav-item"
              :class="{'is-active': tab.isActive}"
              @click="selectTab(tab)"
          >
            {{ tab.name }}
          </div>
        </li>
      </ul>
    </div>
    <section class="tabs-details">
      <slot></slot>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    data() {
      return {
        tabs: []
      }
    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = tab.name === selectedTab.name;
        });
      }
    },
    created() {
      this.tabs = this.$children;
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background-color: #fff;
    border: 1px solid #e1e1e1;
    padding: 10px 0;
    margin: 0 10px;
  }
  .tabs-details {
    padding: 10px;
  }
  ul {
    display: flex;
    padding: 0;
    list-style: none;
    li {
      margin-right: 40px;
    }
    .nav-item {
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
      border-bottom: 2px dashed #3398FF;
      transition: color .2s;
      text-transform: capitalize;
      margin-left: 25px;
      position: relative;
      cursor: pointer;
      
      &:hover {
        color: #3398FF;
      }
      &.is-active {
        font-weight: normal;
        color: #3398FF;
      }
    }
  }
</style>
