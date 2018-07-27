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
        const { data: msg } = await this.$http.post('/request-review', this.data)
        window.alert([ "消息:", msg, "已经发送!"].join('\n\n'))
      }
    }
  }
</script>
