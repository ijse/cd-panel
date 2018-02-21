<template>
  <div class="navbar-item has-dropdown"
    :class="{ 'is-active': themeOn }"
    @mouseleave="themeOn = false">
    <a class="navbar-link" @click.prevent="themeOn = !themeOn">
      <span class="icon">
        <i class="fas fa-paint-brush"></i>
      </span>
      Theme
    </a>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item"
        @click.prevent="switchTheme(theme)"
        v-for="theme in themeList">
        {{ theme.name }}
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ThemeSwitch',
    data: () => ({
      themeOn: false,
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
  .navbar .navbar-dropdown {
    max-height: 500px;
    overflow: auto;
  }
</style>
