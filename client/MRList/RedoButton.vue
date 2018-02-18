<template>
  <a class="button" @click="restart()"
    :disabled="disabled">
    <span class="icon is-small">
      <i class="fas fa-redo"></i>
    </span>
  </a>
</template>
<script>
  export default {
    name: 'RedoButton',
    props: {
      disabled: Boolean
    }
  }
</script>
