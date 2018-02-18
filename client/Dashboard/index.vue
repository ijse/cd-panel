<template>
  <div class="dashboard">
    <nav class="level">
      <div class="level-item has-text-centered"
        v-for="stats in statsList">
        <div>
          <p class="heading">{{ stats.name }}</p>
          <p class="title">{{ stats.value }}</p>
        </div>
      </div>
    </nav>
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
        prCount: { name: 'Pull Requests', value: 23 },
        visitCount: { name: 'Visit Count', value: 21 },
        deployCount: { name: 'Deploy Times', value: 23 },
        QueueSize: { name: 'Tasks in Queue', value: 23 }
      }
    })
  }
</script>
