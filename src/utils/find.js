function findChildComponents (vnode, childName) {
  const components = []
  const children = vnode.$children
  if (children && children.length) {
    children.forEach(child => {
      if (child.$options.name === childName) {
        components.push(child)
      }
      for (const c of findChildComponents(child, childName)) {
        components.push(c)
      }
    })
  }
  return components
}

function findParentComponent (vnode, parentName) {
  let parent = vnode.$parent
  while (parent) {
    if (parent.$options.name === parentName) {
      return parent
    }
    parent = parent.$parent
  }
}

export { findChildComponents, findParentComponent }
