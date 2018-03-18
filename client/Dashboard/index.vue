<template>
  <div class="dashboard">
    <nav class="level">
      <div class="level-item has-text-centered"
        v-for="(value, name) in statsList">
        <div>
          <p class="heading">{{ name }}</p>
          <p class="title">{{ value }}</p>
        </div>
      </div>
    </nav>
    <hr />
  </div>
</template>
<script>
  export default {
    name: 'Dashboard',
    sockets: {
      'stats-refresh' (data) {
        Object.keys(this.statsList).forEach(name => {
          this.$set(this.statsList, name, data[name] || 0)
        })
      }
    },
    data: () => ({
      statsList: {
        'pr count': 0,
        'queue size': 0,
        'Online': 0,
        'Visit': 0,
        'Build Time': 0,
        'Run Tasks': 0,
        'Deploy Time': 0,
        'releases': 0
      }
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$socket.emit('load-stats')
      }
    }
  }
</script>
