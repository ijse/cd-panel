<template>
  <div class="dropdown" :class="isActive && 'is-active'"
    @mouseleave="isActive=false">
    <div class="dropdown-trigger">
      <button class="button" :disabled="isEmpty"
        @click="isActive = !isActive">
        <span v-if="data.isApproved">Test In</span>
        <span v-else class="has-text-danger">Test In</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>

    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href class="dropdown-item"
          v-for="target in targetList"
          :disabled="isDisabled"
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
      data: Object
    },
    data: () => ({
      setting: null,
      isActive: false
    }),
    computed: {
      targetList () {
        if (this.setting && this.setting.deployTypes) {
          return this.setting.deployTypes.split(',')
        }
       },
      isEmpty () {
        return !this.targetList || this.targetList.length < 1
      },
      isDisabled () {
        return this.data.buildStats !== 'Ready' || !this.data.isApproved
      }
    },
    created () {
      this.loadSetting()
    },
    methods: {
      async deployTo (target) {
        await this.$http.post('/deploy', {
          number: this.data.number,
          target
        })
      },
      async loadSetting () {
        const resp = await this.$http.get('/setting')
        this.setting = resp.data
      },
      doDeploy (target) {
        this.$emit('deploy', target)
        this.isActive = false
        this.deployTo(target)
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
