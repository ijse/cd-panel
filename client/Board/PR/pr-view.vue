<template>
  <div class="quickview" :class="{ 'is-active': isActive }">
    <template v-if="data">
      <header class="quickview-header">
        <p class="has-text-weight-bold has-text-centered">
          PR #{{data.number}} by {{ data.user.login }}
        </p>
        <div class="tooltip is-tooltip-left" data-tooltip="ESC to close">
          <span class="delete" @click="$emit('close')"></span>
        </div>
      </header>
      <div class="quickview-body">
        <a :href="data.html_url" target="_blank"
          class="title is-size-5"> {{ data.title }} </a>
        <pre class="content">{{ data.body | removeHeadSpaces }}</pre>

        <table class="table is-fullwidth is-narrow">
          <tr>
            <th> <small>Branch</small> </th>
            <td> <code>{{ data.head.ref }}</code></td>
          </tr>
          <tr>
            <th> Reviewers </th>
            <td class="tags">
              <span class="tag"
                v-for="user in data.requested_reviewers">
                {{ user.login }}
              </span>
            </td>
          </tr>
          <tr>
            <th width="100"> <small>Create At</small> </th>
            <td>
              <time datetime="data.update_at" title="data.created_at">
                {{ data.created_at | datetime}}
              </time>
            </td>
          </tr>
          <tr>
            <th width="100"> <small>Update At</small> </th>
            <td>
              <time datetime="data.update_at" title="data.update_at">
                {{ data.update_at | toNow }}
              </time>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'PRView',
  props: {
    data: Object
  },
  computed: {
    isActive () {
      return !!this.data
    }
  },
  created () {
    document.addEventListener('keydown', this.escClose)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.escClose)
  },
  methods: {
    escClose (evt) {
      if (this.isActive && evt.keyCode === 27) {
        this.$emit('close')
      }
    }
  },
  filters: {
    removeHeadSpaces (str) {
      return str && str.replace(/^\s*/, '')
    },
    toNow (str) {
      const d = moment(str)
      return d.toNow()
    },
    datetime (str) {
      const d = moment(str)
      return d.format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style>
  .quickview {
    background-color: var(--bg-color);
  }
  .quickview-body {
    padding: .8em;
  }
</style>
