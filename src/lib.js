
/*@__NO_SIDE_EFFECTS__*/
function _child(node) {
  return node.firstChild
}
const _txt = _child

/*@__NO_SIDE_EFFECTS__*/
function _nthChild(node, i) {
  return node.childNodes[i]
}

/*@__NO_SIDE_EFFECTS__*/
function _next(node) {
  return node.nextSibling
}

/*@__NO_SIDE_EFFECTS__*/
export const txt = (...args) => {
  return txt.impl(...args)
}
txt.impl = _txt

/*@__NO_SIDE_EFFECTS__*/
export const child = (...args) => {
  return child.impl(...args)
}
child.impl = _child

/*@__NO_SIDE_EFFECTS__*/
export const next = (...args) => {
  return next.impl(...args)
}
next.impl = _next

/*@__NO_SIDE_EFFECTS__*/
export const nthChild = (...args) => {
  return nthChild.impl(...args)
}
nthChild.impl = _nthChild
