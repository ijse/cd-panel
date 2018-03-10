<template>
  <div class="board-tabs tabs is-boxed" v-if="items && items.length">
    <ul>
      <li v-for="(name, index) in items"
        @click="setActive(index)"
        :class="{ 'is-active': value === index }">
        <a> {{ name }} </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'BoardTabs',
    props: {
      value: Number,
      items: {
        type: Array,
        default: []
      }
    },
    methods: {
      setActive (index) {
        this.$emit('input', index)
      }
    }
  }
</script>
