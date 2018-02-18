<template>
  <a class="button" @click="restart()"
    :disabled="isDisabled">
    <span class="icon is-small">
      <i class="fas fa-redo"></i>
    </span>
  </a>
</template>
<script>
  export default {
    name: 'RedoButton',
    props: {
      mr: Object
    },
    computed: {
      isDisabled () {
        return [ 'Error', 'Halt' ].includes(this.mr.buildStats)
      }
    },
    methods: {
      async restart () {
        if (this.isDisabled) return
        const newPr = await this.$http
          .post('/build/restart', {
            number: this.mr.number
          })
        return newPr
      }
    }
  }
</script>
