const morebtns = document.querySelectorAll('.more')
const deletebtns = document.querySelectorAll('.delete')
const alldelbtn = document.querySelector('.alldelbtn')
const results = document.querySelectorAll('.test')

morebtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const answinfo = btn.closest('.test').children[1]
    answinfo.classList.toggle('answinfo')
  })
})

deletebtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector(`#test${btn.id}`).remove()
    remove(btn.id)
  })
})

alldelbtn.addEventListener('click', () => {
  results.forEach((result) => {
    removeall()
    result.remove()
  })
})

const remove = async (id) => {
  fetch(`/deleteresult${id}`, {
    method: 'DELETE'
  })
}

const removeall = async (id) => {
  fetch(`/deleteall`, {
    method: 'DELETE'
  })
}