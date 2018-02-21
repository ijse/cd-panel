<template>
  <div class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" title="Dashboard">
        / CDPanel /
      </router-link>
      <div class="navbar-burger" :class="{ 'is-active': burgerOn }"
        @click="burgerOn = !burgerOn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': burgerOn }">
      <div class="navbar-start">
        <router-link to="/mr" class="navbar-item"> MR </router-link>
        <router-link to="/backlog" class="navbar-item"> Backlog </router-link>
        <router-link to="/setting" class="navbar-item"> Setting </router-link>
        <router-link to="/help" class="navbar-item"> Help </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown"
          :class="{ 'is-active': themeOn }"
          @mouseleave="themeOn = false">
          <a class="navbar-link" @click.prevent="themeOn = !themeOn">Theme</a>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item"
              @click.prevent="switchTheme(theme)"
              v-for="theme in themeList">{{ theme.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data: () => ({
      themeOn: false,
      burgerOn: false,
      themes: [
        'Default',
        'Cerulean',
        'Cosmo',
        'Cyborg',
        'Darkly',
        'Flatly',
        'Journal',
        'Litera',
        'Lumen',
        'Materia',
        'Minty',
        'Nuclear',
        'Pulse',
        'Slate',
        'Simplex',
        'Solar',
        'Superhero',
        'Spacelab'
      ]
    }),
    created () {
      const themeName = localStorage.getItem('theme') || 'Default'
      const theme = this.themeList.find(t => t.name === themeName)
      this.switchTheme(theme || themeList[0])
    },
    computed: {
      themeList () {
        return this.themes.map(name => ({
          name,
          style: `https://jenil.github.io/bulmaswatch/${name.toLowerCase()}/bulmaswatch.min.css`
        }))
      }
    },
    methods: {
      switchTheme (theme) {
        document.body.style.opacity = 0
        document.body.style.visibility = 'hidden'

        localStorage.setItem('theme', theme.name)
        this.themeOn = false

        const head = document.querySelector('head')
        const oldLink = document.querySelector('link[theme]')
        const newLink = document.createElement('link')
        newLink.setAttribute('rel', 'stylesheet')
        newLink.setAttribute('type', 'text/css')
        newLink.setAttribute('href', theme.style)
        newLink.setAttribute('theme', true)
        newLink.onload = () => {
        document.body.style.visibility = 'visible'
          document.body.style.opacity = 1
        }
        head.replaceChild(newLink, oldLink)
      }
    }
  }
</script>
<style>
  body {
    opacity: 0;
    transition: opacity .5s;
  }
</style>
