<template>
  <div class="releases">
    <section>
      <button class="button is-primary is-pulled-right"
        :disabled="!releasable"
        @click="deploy()">{{ releaseButtonText }}</button>
    </section>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in commits">
          <td>
            <a :href="c.html_url">
              {{ c.commit.message | firstLine }}
            </a>
          </td>
          <td>
            <a :href="c.author.html_url" target="_blank">
              <img :src="c.author.avatar_url" class="avatar" />
              {{ c.author.login }}
            </a>
          </td>
          <td>
            <time :datetime="c.commit.committer.date" :title="c.commit.committer.date">
              {{ c.commit.committer.date | timeToNow }}
            </time>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'Releases',
    data: () => ({
      releaseButtonStatus: '',
      commits: []
    }),
    sockets: {
      releasing (period) {
        this.releaseButtonStatus = period
      }
    },
    activated () {
      this.load()
    },
    computed: {
      latestSHA () {
        if (!this.commits || !this.commits.length) {
          return null
        }
        return this.commits[0].sha
      },
      releasable () {
        return this.releaseButtonStatus === 'Release'
      },
      releaseButtonText () {
        if (this.releasable) {
          return 'Release'
        } else {
          return this.releaseButtonStatus + '...'
        }
      }
    },
    methods: {
      async load () {
        let ret
        ret = await this.$http.get('/repo/release/status')
        this.releaseButtonStatus = ret.data.status

        ret = await this.$http.get('/repo/master')
        this.commits = ret.data

      },
      deploy () {
        this.$http.post('/repo/release', {
          sha: this.latestSHA
        })
      }
    },
    filters: {
      firstLine (str) {
        return str.replace(/(.*)(\n.*)*/g, '$1')
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
</style>
