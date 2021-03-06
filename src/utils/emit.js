export default {
  emitUp (componentName, eventName, ...params) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.name
      }
    }
    if (parent) {
      parent.$emit(eventName, ...params)
      return true
    } else {
      return false
    }
  },

  emitDown: function emitDown (componentName, eventName, ...params) {
    this.$children.forEach(child => {
      let name = child.$options.name

      if (name === componentName) {
        child.$emit(eventName, ...params)
      }

      emitDown.call(child, componentName, eventName, ...params)
    })
  }
}
