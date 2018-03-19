function set (variable, value) {
  const root = document.documentElement.style
  root.setProperty(`--${variable}`, value)
}

function get (selector, variable) {
  const el = document.querySelector(selector)
  return window.getComputedStyle(el)[variable]
}

export default function updateCSS () {
  set('bg-color', get('html', 'background-color'))
}
