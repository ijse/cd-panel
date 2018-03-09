<template>
  <button class="button is-primary"
    @click="merge()"
    :disabled="isDisabled">
    Merge
  </button>
</template>
<script>
  export default {
    name: 'ReleaseButton',
    props: {
      data: Object
    },
    computed: {
      isDisabled () {
        return this.data.buildStats !== 'Ready'
      }
    },
    methods: {
      async merge () {
        await this.$http.post('/merge', {
          number: this.data.number
        })
      }
    }
  }
</script>
