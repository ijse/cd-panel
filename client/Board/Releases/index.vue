<template>
  <div class="releases">
    <section>
      <ReleaseButton :sha="latestSHA"
        class="tooltip"
        data-tooltip="Release All"
        ></ReleaseButton>
    </section>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Time</th>
          <th>Release</th>
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
            <a :href="c.author.ding | ding">
              <img :src="c.author.avatar_url" class="avatar" />
              {{ c.author.name }}
            </a>
          </td>
          <td>
            <time :datetime="c.commit.committer.date" :title="c.commit.committer.date">
              {{ c.commit.committer.date | timeToNow }}
            </time>
          </td>
          <td>
            <ReleaseButton :sha="c.sha"></ReleaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import ReleaseButton from './Release'
  export default {
    name: 'Releases',
    components: {
      ReleaseButton
    },
    data: () => ({
      commits: []
    }),
    activated () {
      this.load()
    },
    computed: {
      latestSHA () {
        if (!this.commits || !this.commits.length) {
          return null
        }
        return this.commits[0].sha
      }
    },
    methods: {
      async load () {
        let ret
        ret = await this.$http.get('/repo/release/status')
        this.releaseButtonStatus = ret.data.status

        ret = await this.$http.get('/repo/master')
        this.commits = ret.data

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
