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
          'is-white': 'halt',
          'is-warning': 'building',
          'is-success': 'ready',
          'is-warning': 'deploying'
        }
        return statsMap[this.stats]
      }
    }
  }
</script>
