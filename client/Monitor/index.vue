<template>
  <div class="monitor">
    <nav class="level">
      <div class="leve-left"></div>
      <div class="level-right">
        <p class="level-item">
          <label class="checkbox">
            <input type="checkbox" v-model="isScroll" >
            Auto-scroll
          </label>
        </p>
        <p class="level-item">
          <button class="button is-primary" @click="clearAll()">ClearAll</button>
        </p>
      </div>
    </nav>
    <pre v-html="screen">
    </pre>
  </div>
</template>
<script>
  export default {
    name: 'Monitor',
    data: () => ({
      isScroll: false,
      screen: ''
    }),
    sockets: {
      stdout (str) {
        this.screen += str
      }
    },
    created () {
      this.$socket.emit('open-monitor')
    },
    watch: {
      screen () {
        if (this.isScroll && !this._inactive) {
          this.scrollBottom()
        }
      },
      isScroll (yes) {
        if (yes && !this._inactive) {
          this.scrollBottom()
        }
      }
    },
    methods: {
      clearAll () {
        this.screen = ''
      },
      scrollBottom () {
        document.scrollingElement.scrollTop = Number.MAX_SAFE_INTEGER
      }
    }
  }
</script>
<style>
.monitor pre {
  background-color: black;
  & .timestamp {
    padding: 0 5px;
    float: left;
    overflow: hidden;
    clear: both;
  }
}
</style>
