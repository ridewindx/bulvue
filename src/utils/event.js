export const on = function (el, event, handler) {
  el.addEventListener(event, handler, false)
}

export const off = function (el, event, handler) {
  el.removeEventListener(event, handler, false)
}

export const once = function(el, event, handler) {
  let wrapper = function() {
    handler.apply(this, arguments)
    off(el, event, wrapper)
  }
  on(el, event, wrapper)
}
