<template>
  <button class="button is-warning"
    :disabled="isDisabled"
    data-tooltip="Request Review"
    @click="request()">
    <span class="icon is-small">
      <i class="fas fa-comment"></i>
    </span>
  </button>
</template>
<script>
  export default {
    name: 'RequestReview',
    props: {
      data: Object
    },
    computed: {
      isDisabled () {
        return this.data.isApproved
      }
    },
    methods: {
      async request () {
        await this.$http.post('/request-review', this.data)
        window.alert('Review request sent to dingtalk.')
      }
    }
  }
</script>
