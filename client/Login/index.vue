<template>
  <div class="container is-overlay has-text-centered">
    <div class="column is-4 is-offset-4">
      <div class="box">
        <figure class="avatar">
          <img src="https://placehold.it/128x128">
        </figure>
        <form>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="text" placeholder="Your Name" autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input is-large" type="password" placeholder="Your Password">
            </div>
          </div>
          <div class="field">
            <label class="checkbox">
              <input type="checkbox">
              Remember me
            </label>
          </div>
          <button class="button is-block is-info is-large is-fullwidth">Login</button>
        </form>
      </div>
      <p class="has-text-grey">
        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>
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
