<template>
  <div class="dropdown" :class="isActive && 'is-active'"
    @mouseleave="isActive=false">
    <div class="dropdown-trigger">
      <button class="button" :disabled="isEmpty"
        @click="isActive = !isActive">
        <span>Test In</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href class="dropdown-item" v-for="target in targetList"
          :disabled="disabled"
          @click.prevent="doDeploy(target)">
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
      setting: Object,
      disabled: Boolean
    },
    data: () => ({
      isActive: false
    }),
    computed: {
      targetList () {
        if (this.setting.deployTypes) {
          return this.setting.deployTypes.split(',')
        }
       },
      isEmpty () {
        return !this.targetList || this.targetList.length < 1
      }
    },
    methods: {
      doDeploy (target) {
        // todo: trigger deploy action
      }
    }
  }
</script>
<style scoped>
  .dropdown-item[disabled] {
    color: grey;
    pointer-events: none;
  }
</style>
