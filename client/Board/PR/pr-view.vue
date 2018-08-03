<template>
  <div class="quickview" :class="{ 'is-active': isActive }">
    <template v-if="data">
      <header class="quickview-header">
        <p class="has-text-weight-bold has-text-centered">
          PR #{{data.number}} by {{ data.user.name }}
        </p>
        <div class="tooltip is-tooltip-left" data-tooltip="ESC to close">
          <span class="delete" @click="$emit('close')"></span>
        </div>
      </header>
      <div class="quickview-body">
        <h2 class="title">
          <a :href="data.html_url" target="_blank"
            class="title is-size-5"> {{ data.title }} </a>
        </h2>

        <div class="content">
          <pre>{{ data.body | removeHeadSpaces }}</pre>
        </div>

        <table class="table is-fullwidth is-narrow">
          <tr>
            <th> Status </th>
            <td>
              <BuildStats :data="data"></BuildStats>
            </td>
          </tr>
          <tr>
            <th> Branch </th>
            <td> <code>{{ data.head.ref }}</code></td>
          </tr>
          <tr>
            <th> Reviewers </th>
            <td class="tags">
              <a class="tag tooltip" :key="name" :data-tooltip="state" style="cursor: pointer;"
                :class="{ 'has-text-danger': state !== 'APPROVED', 'has-text-success': state === 'APPROVED' }"
                :href="ding | ding"
                v-for="({state, ding, name}, login) in data.reviewers">
                {{ name }}
              </a>
            </td>
          </tr>
          <tr>
            <th width="100"> Create At </th>
            <td>
              <time :datetime="data.created_at" :title="data.created_at">
                {{ data.created_at | datetime}}
              </time>
            </td>
          </tr>
          <tr>
            <th width="100"> Update At </th>
            <td>
              <time :datetime="data.updated_at" :title="data.updated_at">
                {{ data.updated_at | toNow }}
              </time>
            </td>
          </tr>
        </table>
      </div>
      <div class="quickview-footer">
        <RestartButton :data="data"></RestartButton>
        <DeployButton :data="data"
          :class="{ tooltip: !data.isApproved }"
          class="is-tooltip-danger is-up"
          data-tooltip="Not Approved"></DeployButton>
        <MergeButton :data="data"></MergeButton>
      </div>
    </template>
  </div>
</template>
<script>
import moment from 'moment'
import DeployButton from './DeployButton'
import MergeButton from './MergeButton'
import BuildStats from './BuildStats'
import RestartButton from './RestartButton'

export default {
  name: 'PRView',
  components: {
    DeployButton,
    MergeButton,
    RestartButton,
    BuildStats
  },
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
    & .title {
      line-height: .75;
    }
    & .table th {
      font-size: .8em;
    }
    & .content pre {
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
  .quickview-footer {
    background-color: unset;
  }
</style>
