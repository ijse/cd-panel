<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"> {{ label }} </label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Field',
    props: {
      label: String
    }
  }
</script>
