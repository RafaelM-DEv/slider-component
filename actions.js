const forward = document.querySelector('list-view').shadowRoot.querySelector('.forward')
const backward = document.querySelector('list-view').shadowRoot.querySelector('.backward')
const slider = document.querySelector('list-view').shadowRoot.querySelector('.scroll')
const container = document.querySelector('body')
const elements = document.querySelector('list-view').shadowRoot.querySelectorAll('section').length

let isDown = false;
let startX;
let scrollLeft;
let x = 1

// SCROLL WHIT ACTION BUTTON
forward.addEventListener("click", () => { 
  const img = document.querySelector('list-view').shadowRoot.getElementById(x)
  img.classList.remove('active')
  
  if (x < elements) {
    const next = document.querySelector('list-view').shadowRoot.getElementById(x + 1)
    next.classList.add('active')
    next.scrollIntoView({ block: 'center',  behavior: 'smooth' })
    x++
  } else {
    x = 1
    const next = document.querySelector('list-view').shadowRoot.getElementById(x)
    next.classList.add('active')
    next.scrollIntoView({ block: 'center',  behavior: 'smooth' })
  }
})

backward.addEventListener("click", () => { 
  const img = document.querySelector('list-view').shadowRoot.getElementById(x)
  img.classList.remove('active')
  if (x > 1) {
    const next = document.querySelector('list-view').shadowRoot.getElementById(x - 1)
    next.classList.add('active')
    next.scrollIntoView({ block: 'center',  behavior: 'smooth' })
    x--
  } else {
    x = elements
    const next = document.querySelector('list-view').shadowRoot.getElementById(x)
    next.classList.add('active')
    next.scrollIntoView({ block: 'center',  behavior: 'smooth' })
  }
})

// SCROLL WHIT MOUSE CLICK
slider.addEventListener('mousedown', (e) => {
  isDown = true
  startX = e.pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
})

slider.addEventListener('mouseleave', () => {
  isDown = false
})

slider.addEventListener('mouseup', () => {
  isDown = false
})

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX)
  slider.scrollLeft = scrollLeft - walk  
})

// CHECK FOR WEBP BROWSER SUPPORT
function checkWebPSupport() {
  return new Promise((resolve, reject) => {
  let img = new Image()
    img.onload = function() {
      console.log('%c Seu navegador tem suporte a WebP! ', 'background: #222; color: #bada55');
      resolve()
    }
    img.onerror = function() { 
      console.log('%c Seu navegador não tem suporte a WebP! ', 'background: #222; color: #DC2B24');
     }
    img.src = 'http://www.gstatic.com/webp/gallery/1.webp'
  })
}

checkWebPSupport() ? container.classList.add('bg-image-webp') : container.classList.add('bg-image')