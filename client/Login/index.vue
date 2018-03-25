<template>
  <div class="container is-overlay has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <h2 class="title"> CDPanel </h2>
        <form>
          <div class="notification is-danger" v-if="error">
            Login Fail.
          </div>
          <div class="field">
            <div class="control">
              <input class="input is-large" v-model="user.username" type="text" placeholder="Your Name" autofocus>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input is-large" v-model="user.password" type="password" placeholder="Your Password">
            </div>
          </div>
          <div class="field">
            <label class="checkbox">
              <input type="checkbox">
              Remember me
            </label>
          </div>
          <button class="button is-block is-info is-large is-fullwidth"
            @click.prevent="login()">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data: () => ({
      user: {},
      error: false
    }),
    watch: {
      'user.username' () {
        this.error = false
      }
    },
    methods: {
      async login () {
        this.error = false
        const rest = await this.$http.post('/login', this.user)
          .catch(e => {
            this.error = true
          })
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
