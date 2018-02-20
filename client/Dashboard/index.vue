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
      mrs (list) {
        this.statsList.prCount.value = list.length
      }
    },
    data: () => ({
      statsList: {
        prCount: 0,
        visitCount: 0,
        deployCount: 0,
        queueSize: 0
      }
    }),
    sockets: {
      'stats-refresh' (data) {
        this.statsList = data || {}
      }
    },
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
