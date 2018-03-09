<template>
  <a class="button is-info is-outlined"
    :class="{ 'is-loading': isRestarting }"
    @click="restart()"
    :disabled="isDisabled">
    <span class="icon is-small">
      <i class="fas fa-redo"></i>
    </span>
  </a>
</template>
<script>
  export default {
    name: 'RestartButton',
    props: {
      data: Object
    },
    data: () => ({
      isRestarting: false
    }),
    computed: {
      isDisabled () {
        return this.isRestarting
      }
    },
    methods: {
      async restart () {
        this.isRestarting = true
        await this.$http.post('/restart', {
          number: this.data.number
        })
        this.isRestarting = false
      }
    }
  }
</script>
