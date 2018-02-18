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
          <td>
            <a :href="mr.html_url" target="_blank">
              <strong>#{{ mr.number }}</strong> {{ mr.title }}
            </a>
            <div class="tags is-inline-block">
              <span class="tag is-rounded"
                :style="{ 'border-color': '#' + label.color }"
                v-for="label in mr.labels"> {{ label.name }} </span>
            </div>
          </td>
          <td>
            <a :href="mr.user.html_url" target="_blank">
              <img :src="mr.user.avatar_url" class="avatar" />
              {{ mr.user.login }}
            </a>
          </td>
          <td>
            <BuildStats :stats="mr.buildStats"></BuildStats>
          </td>
          <td>
            <RedoButton :disabled="!['Error', 'Halt'].includes(mr.buildStats)"
              @click.native="restart(mr.number)"></RedoButton>
            <DeployButton :disabled="mr.buildStats !== 'Ready'"
              :setting="setting"></DeployButton>
            <ReleaseButton :disabled="mr.buildStats !== 'Ready'"></ReleaseButton>
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
      list: [],
      setting: {}
    }),
    sockets: {
      mrs (list) {
        this.list = list
      },
      'mr.buildStats' ([number, stats]) {
        const mr = this.list.find(t => t.number === number)
        mr.buildStats = stats
        this.$forceUpdate()
      }
    },
    created () {
      this.loadList()
      this.loadSetting()
    },
    methods: {
      async loadList () {
        const resp = await this.$http.get('/mr')
        this.list = resp.data
      },
      async loadSetting () {
        const resp = await this.$http.get('/setting')
        this.setting = resp.data
      },
      async restart (number) {
        await this.$http.post('/build/restart', { number })
      }
    }
  }
</script>
<style scoped>
  .avatar {
    width: 1.5em;
    height: 1.5em;
    margin: 3px;
    vertical-align: middle;
  }
  th:nth-child(2) {
    min-width: 140px;
  }
  th:nth-child(4) {
    min-width: 250px;
  }
  td .tags .tag {
    border: 1px solid;
    box-shadow: 0 0 1px currentColor;
  }
</style>
