<template>
  <span class="tag" :class="cls"> {{ stats }} </span>
</template>
<script>
  export default {
    name: 'BuildStats',
    props: {
      data: Object
    },
    computed: {
      cls () {
        const statsMap = {
          'Pending': 'is-warning',
          'Waiting': 'is-white',
          'Downloading': 'is-warning',
          'Building': 'is-warning',
          'Processing': 'is-warning',
          'Error': 'is-danger',
          'Ready': 'is-success'
        }
        return statsMap[this.stats]
      },
      stats () {
        return this.data.buildStats || 'halt'
      }
    },
    watch: {
      'data.buildStats' (cur, old) {
        const pr = this.data
        if (cur === 'Ready') {
          this.$notification.show(`PR#${pr.number} is Ready.`, {
            body: pr.title,
            requireInteraction: true
          }, {})
        }
        if (cur === 'Error') {
          this.$notification.show(`PR#${pr.number} is Error.`, {
            body: pr.title,
            requireInteraction: true
          }, {})
        }
      }
    }
  }
</script>
