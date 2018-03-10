<template>
  <div class="releases">
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
      commits: []
    }),
    activated () {
      this.load()
    },
    created () {
      this.load()
    },
    methods: {
      async load () {
        const ret = await this.$http.get('/repo/master')
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
