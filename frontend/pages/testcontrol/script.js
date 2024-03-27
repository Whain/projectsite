const deletebtns = document.querySelectorAll('.delete')

deletebtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector(`#test${btn.id}`).remove()
    remove(btn.id)
  })
})

const remove = async (id) => {
  fetch(`/deletetest${id}`, {
    method: 'DELETE'
  })
}