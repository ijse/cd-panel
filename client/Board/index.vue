<template>
  <div class="board">
      <Tabs v-model="tabIndex"
        :items="[ 'PR', 'Releases' ]"></Tabs>
    <keep-alive>
      <PR v-if="tabIndex === 0"></PR>
      <Releases v-if="tabIndex === 1"></Releases>
    </keep-alive>
  </div>
</template>
<script>
  import Tabs from './tabs'
  import PR from './PR'
  import Releases from './Releases'

  export default {
    name: 'Board',
    components: {
      PR,
      Tabs,
      Releases
    },
    data: () => ({
      tabIndex: 0
    })
  }
</script>
