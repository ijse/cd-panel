<template>
  <div class="dropdown" :class="isActive && 'is-active'"
    @mouseleave="isActive=false">
    <div class="dropdown-trigger">
      <button class="button" :disabled="isEmpty"
        @click="isActive = !isActive">
        <span>Deploy</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href class="dropdown-item" v-for="target in targetList"
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
    data: () => ({
      isActive: false,
      targetList: []
    }),
    computed: {
      isEmpty () {
        return !this.targetList || this.targetList.length < 1
      }
    },
    created () {
      this.loadSetting()
    },
    methods: {
      async loadSetting () {
        const setting = await this.$getSetting()
        this.targetList = setting.deployTypes.split(',')
      },
      doDeploy (target) {
        // todo: trigger deploy action
      }
    }
  }
</script>
