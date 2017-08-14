function findChildComponents (vnode, childName, callback, level = 0) {
  ++level
  const components = []
  const children = vnode.$children
  if (children && children.length) {
    children.forEach(child => {
      if (child.$options.name === childName) {
        if (callback) callback(child, level)
        components.push(child)
      }
      for (const c of findChildComponents(child, childName, callback, level)) {
        components.push(c)
      }
    })
  }
  return components
}

function findParentComponent (vnode, parentName, callback) {
  let parent = vnode.$parent
  while (parent) {
    if (parent.$options.name === parentName) {
      if (callback) callback(parent)
      return parent
    }
    parent = parent.$parent
  }
}

export { findChildComponents, findParentComponent }
