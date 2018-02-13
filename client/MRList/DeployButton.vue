<template>
  <div class="dropdown" :class="{ 'is-active': isActive }" @mouseleave="isActive=false">
    <div class="dropdown-trigger">
      <button class="button" :disabled="isEmpty" @click="isActive = !isActive">
        <span>Deploy</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href class="dropdown-item" v-for="target in targetList">
          {{ target }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DeployButton',
    props: {
      targetList: Array
    },
    data: () => ({
      isActive: false
    }),
    computed: {
      isEmpty () {
        return !this.targetList || this.targetList.length < 1
      }
    },
    methods: {

    }
  }
</script>
