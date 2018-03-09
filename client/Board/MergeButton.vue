<template>
  <button class="button is-primary" :disabled="disabled">
    Merge
  </button>
</template>
<script>
  export default {
    name: 'ReleaseButton',
    props: {
      data: Object
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
