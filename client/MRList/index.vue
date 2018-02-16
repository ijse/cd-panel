<template>
  <div class="mrlist">
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Stats</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mr in list">
          <td>#{{ mr.number }} {{ mr.title }}</td>
          <td>{{ mr.user.login }}</td>
          <td>
            <BuildStats :stats="mr.buildStats"></BuildStats>
          </td>
          <td>
            <RedoButton :mr="mr"></RedoButton>
            <DeployButton></DeployButton>
            <ReleaseButton></ReleaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import DeployButton from './DeployButton'
  import ReleaseButton from './ReleaseButton'
  import BuildStats from './BuildStats'
  import RedoButton from './RedoButton'

  export default {
    name: 'MRList',
    components: {
      DeployButton,
      ReleaseButton,
      RedoButton,
      BuildStats
    },
    data: () => ({
      list: []
    }),
    created () {
      this.load()
    },
    methods: {
      async load () {
        const resp = await this.$http.get('/mr')
        this.list = resp.data
      }
    }
  }
</script>
