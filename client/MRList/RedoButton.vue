<template>
  <a class="button" @click="restart()"
    :disable="isDisabled">
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
        return this.mr.buildStats !== 'error' &&
          this.mr.buildStats !== 'halt'
      }
    },
    methods: {
      async restart () {
        const newPr = await this.$http
          .post('/build/restart', {
            number: this.mr.number
          })
        return newPr
      }
    }
  }
</script>
