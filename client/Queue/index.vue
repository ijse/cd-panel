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
              {{ task[1].toString() }}
              <span class="icon is-pulled-right" v-if="!index"><i class="fas fa-spinner"></i></span>
            </span>
            <a :href="task[2].html_url">{{ task[2].title }}</a>
          </td>
          <td>
            <button class="delete has-text-danger">
            </button>
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
    methods: {
      async load () {
        const ret = await this.$http.get('/queue')
        this.list = ret.data
      }
    }
  }
</script>
<style scoped>
  .tag.task-action {
    width: 100px;
  }
</style>
