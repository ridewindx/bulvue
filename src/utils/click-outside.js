const handlers = new Map()

export default {
  bind (el, binding) {
    function handler (e) {
      if (el.contains(e.target)) {
        return
      }
      binding.value(e)
    }
    handlers.set(el, handler)
    document.addEventListener('click', handler)
  },

  unbind (el, binding) {
    document.removeEventListener('click', handlers.get(el))
    handlers.delete(el)
  }
}
