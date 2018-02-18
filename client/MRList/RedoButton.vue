<template>
  <a class="button is-info is-outlined" :disabled="disabled">
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
