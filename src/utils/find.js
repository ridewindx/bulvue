function findChildComponents (vnode, childName) {
  const components = []
  const children = vnode.$children
  if (children.length) {
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

export { findChildComponents }
