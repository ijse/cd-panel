<template>
  <div class="setting">
    <Field label="Git Repository URL">
      <input class="input" type="url" placeholder="Git Url" v-model="setting.repo"/>
    </Field>
    <Field label="Master Branch">
      <input class="input" type="text" placeholder="master" v-model="setting.master"/>
    </Field>
    <Field>
      <button class="button is-primary"
        :class="{ 'is-loading': isLoading }"
        @click="save()">
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
      isLoading: false,
      setting: {}
    }),
    created () {
      this.load()
    },
    methods: {
      async load () {
        this.isLoading = true
        const resp = await this.$http.get('/setting')
          .catch(e => this.isLoading = false)
        this.setting = Object.assign({}, this.setting, resp.data)
        this.isLoading = false
      },

      async save () {
        this.isLoading = true
        await this.$http.post('/setting', this.setting)
          .catch(e => this.isLoading = false)
        this.isLoading = false
      }
    }
  }
</script>
