const crdata = document.querySelector('.crdata')
const crquest = document.querySelector('.crquest')
const question = document.querySelector('#quest')
const answer = document.querySelector('#answ')
const createbtn = document.querySelector('.createbtn')
const questions = document.querySelector('.questions')
const questcontainer = document.querySelector('.questcontainer')
let counter = 0
const testradio = document.querySelector('#test')
const radiostype = document.querySelectorAll('input[name="type"]')
const openblock = document.querySelector('#openblock')
const testblock = document.querySelector('#testblock')
const answ1 = document.querySelector('#input1')
const answ2 = document.querySelector('#input2')
const answ3 = document.querySelector('#input3')
const answ4 = document.querySelector('#input4')
const correctanswers = document.querySelectorAll('input[name="correctansw"]')
let correctansw = '1'
const savebtn = document.querySelector('.savebtn')
const testname = document.querySelector('#testname')
const classnumber = document.querySelector('#classnumber')
const enterbtn = document.querySelector('.enterbtn')
let classtitle = 0
let results = []
let answblock = ''

const findSelected = (name) => {
  let selected = document.querySelector(`input[name="${name}"]:checked`).value
  return selected
}

const createinfo = () => {
  crdata.style.display = 'none'
  crquest.style.display = 'block'
  const info = document.createElement('div')
  info.className = 'info'
  const testnametitle = document.createElement('div')
  testnametitle.className = 'testname'
  testnametitle.textContent = testname.value
  const classnumbertitle = document.createElement('div')
  classnumbertitle.className = 'classnumber'
  classtitle = classnumber.value
  classnumbertitle.textContent = `${classtitle} класс`
  info.append(testnametitle, classnumbertitle)
  return info
}

const upload = (selector, options) => {
  const input = document.querySelector(selector)
  const preview = document.querySelector('.preview')

  const downloadbtn = document.createElement('button')
  downloadbtn.type = 'button'
  downloadbtn.classList.add('downloadbtn', 'btn')
  downloadbtn.textContent = 'Загрузить'

  input.insertAdjacentElement('afterend', downloadbtn)

  if (options.multi) {
    input.setAttribute('multiple', true)
  }
  if (options.ext && Array.isArray(options.ext)) {
    input.setAttribute('accept', ...options.ext)
  }

  const clicktrigger = () => input.click()
  const imgchanged = (event) => {
    const { files } = event.target
    if (!files.length) {
      return
    }

    preview.innerHTML = ''
    const filesarray = Array.from(files)
    filesarray.forEach((file) => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()

      reader.onload = (read) => {
        const { result } = read.target
        results.push(result)
        const previewimg = document.createElement('div')
        previewimg.classList.add('previewimg')
        const img = document.createElement('img')
        img.classList.add('previewimg')
        img.src = result
        img.alt = file.name
        previewimg.append(img)
        preview.append(previewimg)
      }

      reader.readAsDataURL(file)
    })
  }


  downloadbtn.addEventListener('click', clicktrigger)
  input.addEventListener('change', imgchanged)

}

upload('.inputimg', {
  multi: true,
  ext: ['.png', '.jpg', '.jpeg', '.gif'],
})



const createopentask = () => {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = answer.value
  input.className = 'answer'
  const openanswer = document.createElement('div')
  openanswer.className = 'correct'
  openanswer.textContent = answer.value
  openanswer.style.display = 'none'
  return [input, openanswer]
}

const createtesttask = (i) => {
  const option = document.createElement('div')
  option.className = 'option'
  if (i == correctansw) {
    option.classList.add('correct')
  }
  const input = document.createElement('input')
  input.type = 'radio'
  input.className = 'radio'
  input.classList.add('radio-quest')
  input.value = `answer${i}`
  input.id = `answer${i}${counter}`
  input.name = `task${counter}`
  const label = document.createElement('label')
  label.className = 'label'
  label.setAttribute('for', `answer${i}${counter}`)
  label.textContent = document.querySelector(`#input${i}`).value
  option.append(input, label)
  return option
}

const createtask = (type) => {
  counter += 1
  const task = document.createElement('div')
  task.className = 'question'
  const title = document.createElement('div')
  title.className = 'title'
  title.classList.add('quest-title')
  title.textContent = `${counter}. ${question.value}`
  task.append(title)
  if (results.length) {
    const imges = document.createElement('div')
    imges.classList.add('imges')
    results.forEach((result) => {
      const img = document.createElement('img')
      img.classList.add('taskimg')
      img.src = result
      img.id = `img${counter}` 
      imges.append(img)
    })
    task.append(imges)
    const preview = document.querySelector('.preview')
    preview.innerHTML = ''
    results = []
  }
  const answerblock = document.createElement('div')
  answerblock.className = 'answerblock'
  if (type === 'open') {
    task.classList.add('open') 
    answerblock.append(...createopentask())
  } else {
    task.classList.add('test') 
    for (let i = 1; i < 5; i++) {
      answerblock.append(createtesttask(i))
    }
  }
  task.append(answerblock)
  question.value = ''
  answer.value = ''
  answ1.value = ''
  answ2.value = ''
  answ3.value = ''
  answ4.value = ''
  return task
}

radiostype.forEach((radiotype) => {
  radiotype.addEventListener('change', () => {
    if (findSelected('type') === 'test') {
      testblock.style.display = 'block'
      openblock.style.display = 'none'
    } else {
      testblock.style.display = 'none'
      openblock.style.display = 'block'
    }})
})

correctanswers.forEach((coransw) => {
  coransw.addEventListener('change', () => {
    correctansw = findSelected('correctansw')
  })
})

const getalltest = () => {
  const testtitle = document.querySelector('.testname').textContent
  const testquestions = document.querySelectorAll('.quest-title')
  const questvalues = Object.values(testquestions)
  const texttestquestions = questvalues.map((el) => {
    const textquest = el.textContent
    return textquest
  })
  const questquantity = testquestions.length
  const allcoranswers = document.querySelectorAll('.correct')
  const coranswvalues = Object.values(allcoranswers)
  const textallcoranswers = coranswvalues.map((el) => {
    const coransw = el.textContent.toString()
    return coransw.replaceAll(' ', '').toLowerCase()
  })
  const allquestions = document.querySelectorAll('.question')
  let questtipes = []
  let allanswers = []
  let questanswers = []
  let imagearray = []
  allquestions.forEach((quest) => {
    if(quest.classList.contains('test')) {
      questtipes.push('test')
      for (const child of quest.children) {
        if(child.className == 'answerblock') {
          answblock = child
        }
      }
      for (let i = 0; i < 4; i++) {
        questanswers.push(answblock.children[i].textContent)
      }
      allanswers.push({
        id: quest.children[0].textContent.split('.')[0],
        answers: questanswers
      })
      questanswers = []
    } else {
      questtipes.push('open')
    }
  })
  allimages = document.querySelectorAll('.taskimg')
  allimages.forEach((img) => {
    const image = {
      id: img.id[3],
      src: img.src
    }
    imagearray.push(image)
  })
  const data = {
    id: Date.now(),
    testtitle: testtitle,
    classnumber: classtitle,
    quantity: questquantity,
    types: questtipes,
    questions: texttestquestions,
    imges: imagearray,
    allansw: allanswers,
    correctansw: textallcoranswers
  }
  return data
}

createbtn.addEventListener('click', () => {
  if (findSelected('type') === 'test') {
    questions.append(createtask('test'))
  } else {
    questions.append(createtask('open'))
  }
})

enterbtn.addEventListener('click', () => {
  questcontainer.prepend(createinfo())
})

savebtn.addEventListener('click', async () => {
  try {
    await fetch(
      '/createtest',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getalltest())
      }
    )
    location.reload()
  } catch (error) {
    console.error("Ошибка:", error)
  }
})

