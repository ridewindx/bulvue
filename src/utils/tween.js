/* t: current time
 * b: beginning value
 * c: change in value
 * d: duration
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
const tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    }
  },
  cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
      return c / 2 * ((t -= 2) * t * t + 2) + b
    }
  },
  quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    }
  },
  quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    }
  },
  sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOut: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    }
  },
  expo: {
    easeIn: function (t, b, c, d) {
      return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOut: function (t, b, c, d) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOut: function (t, b, c, d) {
      if (t === 0) return b
      if (t === d) return b + c
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    }
  },
  circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    }
  },
  elastic: {
    easeIn: function (t, b, c, d, a, p) {
      let s
      if (t === 0) return b
      if ((t /= d) === 1) return b + c
      if (p === undefined) p = d * .3
      if (!a || a < Math.abs(c)) {
        s = p / 4
        a = c
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    easeOut: function (t, b, c, d, a, p) {
      let s
      if (t === 0) return b
      if ((t /= d) === 1) return b + c
      if (p === undefined) p = d * .3
      if (!a || a < Math.abs(c)) {
        a = c
        s = p / 4
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
    },
    easeInOut: function (t, b, c, d, a, p) {
      let s
      if (t === 0) return b
      if ((t /= d / 2) === 2) return b + c
      if (p === undefined) p = d * (.3 * 1.5)
      if (!a || a < Math.abs(c)) {
        a = c
        s = p / 4
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a)
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
    }
  },
  back: {
    easeIn: function (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOut: function (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOut: function (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    }
  },
  bounce: {
    easeIn: function (t, b, c, d) {
      return c - tween.bounce.easeOut(d - t, 0, c, d) + b
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) {
        return tween.bounce.easeIn(t * 2, 0, c, d) * .5 + b
      } else {
        return tween.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b
      }
    }
  }
}

export { tween }

export default function animation (from, to, duration = 0.3, easing = 'linear', callback = function () {}) {
  if (!window.requestAnimationFrame) {
    requestAnimationFrame = function (fn) {
      setTimeout(fn, 17)
    }
  }

  let [kind, effect] = easing.split('.')
  let func = tween[kind]
  if (effect) func = func[effect]
  if (typeof func !== 'function') {
    console.error('no tween:', easing)
    return
  }

  let start = 0
  duration = Math.ceil(duration * 1000 / 17)

  let step = function () {
    let value = func(start, from, to - from, duration)

    start++
    if (start <= duration) {
      callback(value)
      requestAnimationFrame(step)
    } else {
      callback(to, true)
    }
  }

  step()
}
