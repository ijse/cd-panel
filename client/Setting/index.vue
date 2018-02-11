<template>
  <div class="setting">
    <Field label="Git Repository URL">
      <input class="input" type="url" placeholder="Git Url" v-model="setting.repo"/>
    </Field>
    <Field label="Master Branch">
      <input class="input" type="text" placeholder="master" v-model="setting.master"/>
    </Field>
    <Field>
      <button class="button is-primary">
        Save
      </button>
    </Field>
  </div>
</template>
<script>
  import Field from './Field'

  export default {
    name: 'Setting',
    components: { Field },
    data: () => ({
      setting: {}
    })
  }
</script>
