<template>
  <div class="board">
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Stats</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!list.length">
          <td colspan="4">
            <p class="has-text-centered">Empty for now.</p>
          </td>
        </tr>
        <tr v-for="mr in list">
          <td>
            <a :href="mr.html_url" target="_blank">
              <strong>#{{ mr.number }}</strong> {{ mr.title }}
            </a>
            <div class="tags is-inline-block is-marginless">
              <span class="tag is-rounded"
                :style="{ 'border-color': '#' + label.color }"
                v-for="label in mr.labels"> {{ label.name }} </span>
            </div>
            <footer>
              <small>
                <a :href="mr.user.html_url" target="_blank">
                  <img :src="mr.user.avatar_url" class="avatar" />
                  {{ mr.user.login }}
                </a>
                update
                <time :datetime="mr.updated_at" :title="mr.updated_at | format">
                  {{ mr.updated_at | timeToNow }}</time>
              </small>
            </footer>
          </td>
          <td>
            <BuildStats :stats="mr.buildStats"></BuildStats>
          </td>
          <td>
            <RedoButton :disabled="!canRestart(mr)"
              @click.native="restart(mr)"></RedoButton>
            <DeployButton :disabled="!canDeploy(mr)"
              @deploy="deployTo(mr, arguments[0])" :setting="setting"></DeployButton>
            <ReleaseButton :disabled="!canDeploy(mr)"></ReleaseButton>
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
  import moment from 'moment'

  export default {
    name: 'Board',
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
    filters: {
      timeToNow (dateStr) {
        return moment(dateStr).toNow()
      },
      format (dateStr) {
        return moment(dateStr).format()
      }
    },
    created () {
      this.loadList()
      this.loadSetting()
    },
    methods: {
      canRestart (mr) {
        // return ['Error', 'Pending'].includes(mr.buildStats)
        return true
      },
      canDeploy (mr) {
        return mr.buildStats === 'Ready'
      },
      async loadList () {
        const resp = await this.$http.get('/mr')
        this.list = resp.data
      },
      async loadSetting () {
        const resp = await this.$http.get('/setting')
        this.setting = resp.data
      },
      async restart (mr) {
        if (!this.canRestart(mr)) return
        await this.$http.post('/restart', { number: mr.number })
      },
      async deployTo (mr, target) {
        await this.$http.post('/deploy', {
          number: mr.number,
          target
        })
      }
    }
  }
</script>
<style scoped>
  .avatar {
    width: 1.2em;
    height: 1.2em;
    margin: 1px;
    vertical-align: middle;
  }
  td .tags .tag {
    border: 1px solid;
    box-shadow: 0 0 1px currentColor;
  }
</style>
