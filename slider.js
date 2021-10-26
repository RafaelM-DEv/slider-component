
const imgs = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
  'https://picsum.photos/600/400?random=4',
  'https://picsum.photos/600/400?random=5',
  'https://picsum.photos/600/400?random=6',
  'https://picsum.photos/600/400?random=7',
  'https://picsum.photos/600/400?random=8',
  'https://picsum.photos/600/400?random=9',
  'https://picsum.photos/600/400?random=10'
]

const template = document.createElement('template')
template.innerHTML = `
    <div class="container">
      <button class="forward">
        <img id="forwardIcon" src="assets/arrow_forward_ios_white_24dp.svg">
      </button>
      <div class="scroll">
        
      </div>
      <button class="backward">
        <img id="backwardIcon" src="assets/arrow_back_ios_white_24dp.svg">
      </button>
    </div>
  `

class listView extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    
    const importCss = document.createElement('style')
    importCss.innerHTML = `@import \'slider.css\'`

    const importScript = document.createElement('script')
    importScript.src = 'actions.js'

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(importCss)
    this.shadowRoot.appendChild(importScript)
    
    let list = ''
    let i = 0
    imgs.forEach(component)
    
    function component (model) {
      i += 1
      if (i == 1) {
        list += `
        <section id="${i}" class="active">
          <img src="${model}">
        </section>
        `
      } else {
        list += `
        <section id="${i}">
          <img src="${model}">
        </section>
        `
      }
    }

    const scroll = this.shadowRoot.querySelector('.scroll')
    scroll.innerHTML = list
  }
}

window.customElements.define('list-view', listView)