const form = document.querySelector('.form')
const inputs = document.querySelectorAll('input[type="text"]')
const types = document.querySelector('.types').textContent.split(',')
const questions = document.querySelectorAll('.question')
const questionsblock = document.querySelector('.questions')
const error = document.querySelector('.error')
const radiobtns = document.querySelectorAll('.radio')

const validator = () => {
  let allok = true
  for (const input of inputs) {
    if (input.value === '') {
      const question = input.closest('.question')
      allok = false
      return question
    }
  }
  for (let i = 0; i < types.length; i++) {
    if (types[i] === 'test') {
      const checked = document.querySelector(`input[name="answ${i + 1}"]:checked`)
      if (checked == null) {
        const question = questions[i + 2]
        allok = false
        return question
      }
    }
  }
  if (allok) {
    error.style.display = 'none'
    return ''
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', () => {
    const question = input.closest('.question')
    question.style.background = 'transparent'
    validator()
  })
})

radiobtns.forEach((btn) => {
  btn.addEventListener('change', () => {
    const question = btn.closest('.question')
    question.style.background = 'transparent'
    if (validator()) {}
  })
})

form.addEventListener('submit', (event) => {
  const validation = validator()
  if (validation) {
    validation.style.background = 'rgba(255, 79, 79, 0.51)'
    error.style.display = 'flex'
    event.preventDefault()
  } 
})