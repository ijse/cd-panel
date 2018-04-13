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
        return this.data.buildStats !== 'Ready' // ||
          // !this.data.isApproved
      }
    },
    methods: {
      async merge () {
        await this.$http.post('/repo/merge', {
          number: this.data.number
        })
      }
    }
  }
</script>
