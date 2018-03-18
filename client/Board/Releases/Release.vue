<template>
  <button class="button is-primary is-pulled-right"
    :disabled="!releasable"
    @click="deploy(sha)">{{ buttonText }}</button>
</template>
<script>
  export default {
    name: 'Release',
    props: {
      sha: String
    },
    data: () => ({
      working: false,
      status: 'Release'
    }),
    sockets: {
      releasing ([period, sha]) {
        if (sha === this.sha) {
          this.status = period
          this.working = true
        } else {
          this.working = false
        }
      }
    },
    computed: {
      releasable () {
        return this.status === 'Release' || !this.working
      },
      buttonText () {
        if (this.releasable) {
          return 'Release'
        } else {
          return this.status + '...'
        }
      }
    },
    methods: {
      deploy (sha) {
        this.$http.post('/repo/release', { sha })
      }
    }
  }
</script>
