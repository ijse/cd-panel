<template>
  <div class="queue">
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th> Task </th>
          <th> Action </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in list">
          <td>
            <code> {{ index }} </code>
            <span class="tag task-action is-info has-text-justified"
              :class="!index ? 'is-success' : ''">
              {{ task.name }}
              <span class="icon is-pulled-right" v-if="!index"><i class="fas fa-spinner"></i></span>
            </span>
            <a :href="task.pr.html_url">#{{ task.number }} {{ task.pr.title }}</a>
          </td>
          <td>
            <button class="delete has-text-danger" @click="remove(task)"></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="has-text-centered" v-if="!list.length">
        Empty for now.
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Queue',
    data: () => ({
      list: []
    }),
    activated () {
      this.load()
    },
    sockets: {
      'queue-update' (newList) {
        this.list = newList
        console.log('list updated')
      }
    },
    methods: {
      async load () {
        const ret = await this.$http.get('/queue')
        this.list = ret.data
      },
      async remove (task) {
        await this.$http({
          method: 'delete',
          url: `/queue/remove/${task.id}`
        })
      }
    }
  }
</script>
<style scoped>
  .tag.task-action {
    width: 100px;
  }
</style>
