<template>
  <span class="tag" :class="cls"> {{ stats }} </span>
</template>
<script>
  export default {
    name: 'BuildStats',
    props: {
      stats: {
        type: String,
        default: 'halt'
      }
    },
    computed: {
      cls () {
        const statsMap = {
          'halt': 'is-white',
          'Waiting': 'is-warning',
          'Downloading': 'is-warning',
          'Building': 'is-warning',
          'Processing': 'is-warning',
          'Error': 'is-danger',
          'Ready': 'is-success'
        }
        return statsMap[this.stats]
      }
    }
  }
</script>
