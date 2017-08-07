function findChildComponents (vnode, childName) {
  const components = []
  const childrens = vnode.$children
  if (childrens.length) {
    childrens.forEach(child => {
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
