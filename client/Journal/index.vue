<template>
  <div class="journal">
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <p class="level-item">
          <button class="button is-primary"
            @click="load()">Reload</button>
        </p>
      </div>
    </nav>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td> {{ item.ts | format }} </td>
          <td> {{ item.type }} </td>
          <td> {{ item.desc }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'Journal',
    data: () => ({
      list: null
    }),
    activated () {
      this.load()
    },
    methods: {
      async load () {
        const ret = await this.$http.get('/journal')
        this.list = ret.data
      }
    },
    filters: {
      format (str) {
        return moment(str).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>
