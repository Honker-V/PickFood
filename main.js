const random = function () {
  return +(Math.random() * nameList.length).toFixed(0)
}

const hiddenName = document.querySelector('.name')
const title = document.querySelector('h1')
const btn = document.querySelector('button')
const lottie = document.querySelector('#lottie')

let start = false
let delay = 20
let setId = null
let ran = null
let lastNum = null
const pickNameList = []

btn.addEventListener('mousedown', () => {
  start = !start
  btn.childNodes[0].data = start ? '就吃它了' : '开始'
  title.innerText = start ? '吃什么呢' : '吃'
  title.style.top = '-10px'
  title.style.fontSize = '2.2rem'
  if (start) {
    setId = setInterval(() => {
      ran = random()

      if (lastNum === ran) {
        ran = random()
      }

      if (ran === nameList.length) {
        ran--
      }
      // console.log(ran, nameList[ran])
      hiddenName.innerText = nameList[ran]
      lastNum = ran
    }, delay)
    setTimeout(() => {
      hiddenName.style.opacity = 1
    }, 300)
    lottie.stop()
  } else {
    pickNameList.unshift(nameList[ran])
    clearInterval(setId)
    lottie.style.zIndex = 999999
    setTimeout(() => {
      lottie.style.zIndex = -999999
    }, 500)
    lottie.play()
    createNameList()
    // console.log(pickNameList)
  }
})

// 点名栏
const pickName = document.querySelector('.pickName')

function createNameList() {
  pickName.style.opacity = 1
  pickName.scrollBy({
    top: 35,
    behavior: 'smooth',
  })
  const li = document.createElement('li')
  li.innerText = pickNameList[0]
  pickName.appendChild(li)
  li.classList.add('item')
  document.querySelector('.item:nth-last-of-type(1)').style.height = 0
  setTimeout(() => {
    document.querySelector('.item:nth-last-of-type(1)').style.height = '35px'
  }, 180)
}
