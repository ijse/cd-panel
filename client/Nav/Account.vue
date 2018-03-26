<template>
  <div class="account">
    <p v-if="user && user.username">
      <span> Welcome, {{ user.username }} </span>
      <a @click.prevent="logout()">Logout</a>
    </p>
    <template v-else>
      <router-link to="/login"> Login </router-link>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'Account',
    data: () => ({
      user: null
    }),
    created () {
      this.getStatus()
      this.$root.$on('login', () => {
        this.getStatus()
      })
    },
    methods: {
      async getStatus () {
        const ret = await this.$http.get('/user')
        this.user = ret.data
      },
      async logout () {
        await this.$http.get('/logout')
        window.location.reload()
      }
    }
  }
</script>
