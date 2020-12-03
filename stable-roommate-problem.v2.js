// From wiki.
const preferences = {
  1: [3, 4, 2, 6, 5],
  2: [6, 5, 4, 1, 3],
  3: [2, 4, 5, 1, 6],
  4: [5, 2, 3, 6, 1],
  5: [3, 1, 2, 4, 6],
  6: [5, 1, 3, 4, 2]
}

// From youtube. Search for Irving's algorithm.
const preferences1 = {
  a: 'b d f c e'.split(' '),
  b: 'd e f a c'.split(' '),
  c: 'd e f a b'.split(' '),
  d: 'f c a e b'.split(' '),
  e: 'f c d b a'.split(' '),
  f: 'a b d c e'.split(' '),
}

// http://www.dcs.gla.ac.uk/~pat/jchoco/roommates/papers/Comp_sdarticle.pdf
const preferences2 = {
  1: [2, 5, 4, 6, 7, 8, 3],
  2: [3, 6, 1, 7, 8, 5, 4],
  3: [4, 7, 2, 8, 5, 6, 1],
  4: [1, 8, 3, 5, 6, 7, 2],
  5: [6, 1, 8, 2, 3, 4, 7],
  6: [7, 2, 5, 3, 4, 1, 8],
  7: [8, 3, 6, 4, 1, 2, 5],
  8: [5, 4, 7, 1, 2, 3, 6]
}

const preferences3 = {
  1: [28, 4, 11, 5, 30, 7, 12, 2, 3, 9, 10, 15, 20, 21, 24, 25, 23, 13, 19, 6, 8, 14, 16, 17, 18, 22, 26, 27, 29],
  2: [22, 24, 14, 27, 10, 8, 26, 29, 6, 16, 17, 12, 21, 5, 13, 18, 19, 23, 15, 1, 4, 9, 11, 25, 30, 3, 7, 20, 28],
  3: [22, 18, 26, 6, 16, 17, 23, 29, 24, 5, 8, 13, 14, 19, 27, 2, 15, 20, 28, 1, 4, 7, 9, 10, 11, 12, 21, 25, 30],
  4: [11, 28, 10, 15, 21, 14, 23, 1, 2, 3, 7, 9, 12, 20, 24, 25, 30, 8, 29, 26, 5, 6, 13, 16, 17, 18, 19, 22, 27],
  5: [10, 9, 8, 11, 2, 20, 16, 15, 1, 4, 24, 25, 30, 23, 3, 7, 12, 21, 28, 14, 29, 6, 17, 27, 13, 18, 19, 22, 26],
  6: [3, 2, 15, 1, 12, 21, 25, 4, 29, 20, 28, 13, 17, 19, 7, 9, 10, 11, 24, 30, 18, 22, 23, 5, 8, 14, 16, 26, 27],
  7: [22, 26, 5, 8, 14, 29, 24, 28, 30, 6, 13, 16, 17, 18, 19, 23, 27, 10, 15, 12, 1, 2, 3, 4, 9, 11, 20, 21, 25],
  8: [14, 18, 15, 29, 7, 5, 6, 27, 13, 26, 22, 23, 30, 1, 9, 16, 17, 19, 10, 2, 3, 20, 28, 4, 11, 12, 21, 24, 25],
  9: [27, 14, 5, 6, 18, 7, 22, 12, 30, 10, 23, 24, 8, 16, 17, 4, 11, 15, 21, 13, 19, 26, 29, 28, 1, 25, 2, 3, 20],
  10: [5, 22, 26, 6, 16, 17, 18, 23, 13, 19, 24, 3, 8, 14, 27, 29, 4, 7, 11, 12, 28, 1, 2, 9, 15, 20, 21, 25, 30],
  11: [22, 15, 29, 26, 2, 8, 14, 18, 23, 24, 4, 5, 6, 13, 16, 17, 19, 27, 10, 3, 20, 28, 1, 7, 9, 12, 21, 25, 30],
  12: [8, 16, 2, 23, 9, 10, 4, 6, 17, 27, 20, 15, 5, 13, 14, 18, 19, 22, 26, 29, 1, 11, 24, 25, 30, 3, 7, 21, 28],
  13: [28, 5, 24, 30, 4, 7, 11, 12, 22, 26, 1, 2, 3, 9, 10, 15, 20, 21, 25, 23, 19, 6, 8, 14, 16, 17, 18, 27, 29],
  14: [5, 28, 13, 19, 4, 11, 30, 6, 8, 16, 17, 18, 22, 23, 26, 27, 29, 1, 2, 3, 7, 9, 10, 12, 15, 20, 21, 24, 25],
  15: [12, 19, 1, 3, 21, 25, 29, 10, 7, 13, 17, 2, 4, 9, 11, 20, 24, 28, 30, 8, 14, 5, 6, 16, 18, 22, 23, 26, 27],
  16: [13, 19, 17, 29, 5, 1, 3, 12, 21, 25, 2, 4, 15, 6, 8, 14, 18, 22, 23, 26, 27, 7, 9, 10, 11, 20, 24, 28, 30],
  17: [23, 2, 9, 10, 20, 7, 12, 8, 16, 1, 3, 4, 11, 15, 21, 24, 25, 28, 30, 5, 6, 13, 14, 18, 19, 22, 26, 27, 29],
  18: [23, 26, 22, 5, 14, 24, 6, 8, 13, 16, 17, 19, 27, 29, 4, 7, 11, 12, 28, 21, 1, 2, 3, 9, 10, 15, 20, 25, 30],
  19: [12, 21, 3, 1, 25, 10, 24, 29, 22, 2, 15, 20, 28, 13, 17, 14, 27, 4, 7, 9, 11, 30, 18, 23, 5, 6, 8, 16, 26],
  20: [2, 9, 10, 4, 15, 8, 16, 23, 1, 3, 7, 11, 12, 21, 24, 25, 28, 30, 5, 13, 19, 6, 14, 17, 18, 22, 26, 27, 29],
  21: [23, 5, 13, 19, 4, 11, 28, 6, 8, 14, 16, 17, 18, 22, 26, 27, 29, 1, 2, 3, 7, 9, 10, 12, 15, 20, 24, 25, 30],
  22: [19, 8, 14, 29, 4, 11, 28, 5, 6, 13, 16, 17, 18, 23, 26, 27, 10, 15, 7, 12, 1, 2, 3, 9, 20, 21, 24, 25, 30],
  23: [15, 26, 24, 1, 7, 9, 22, 10, 2, 3, 20, 28, 29, 13, 4, 11, 12, 21, 25, 30, 8, 14, 18, 5, 6, 16, 17, 19, 27],
  24: [11, 10, 15, 22, 26, 1, 2, 3, 4, 7, 9, 12, 20, 21, 25, 28, 30, 8, 14, 29, 5, 13, 19, 6, 16, 17, 18, 23, 27],
  25: [19, 8, 14, 29, 5, 13, 4, 11, 28, 6, 16, 17, 18, 22, 23, 26, 27, 10, 15, 1, 2, 3, 7, 9, 12, 20, 21, 24, 30],
  26: [3, 21, 17, 1, 12, 25, 13, 19, 29, 6, 16, 18, 2, 4, 7, 9, 10, 11, 15, 20, 24, 28, 30, 14, 5, 8, 22, 23, 27],
  27: [14, 22, 4, 11, 10, 24, 6, 8, 16, 17, 28, 12, 21, 5, 13, 18, 19, 23, 26, 29, 1, 9, 25, 30, 2, 3, 7, 15, 20],
  28: [5, 19, 6, 14, 18, 27, 7, 23, 13, 15, 30, 8, 16, 17, 22, 26, 29, 4, 11, 12, 1, 2, 3, 9, 10, 20, 21, 24, 25],
  29: [10, 2, 9, 20, 8, 15, 21, 14, 16, 23, 19, 1, 3, 4, 7, 11, 12, 24, 25, 28, 30, 26, 5, 6, 13, 17, 18, 22, 27],
  30: [23, 5, 4, 11, 28, 13, 19, 6, 8, 14, 16, 17, 18, 22, 26, 27, 29, 7, 12, 1, 2, 3, 9, 10, 15, 20, 21, 24, 25]
}

function defined(o) {
  return o !== null && o !== undefined
}

function stableRoommateProblem(preferences) {
  validate(preferences)
  const accepted = {}
  const preferenceKeys = Object.keys(preferences)
  // Stage 1: Generate preference list.
  while (preferenceKeys.length) {
    const p = preferenceKeys.shift()
    const q = preferences[p]?. [0]
    const o = accepted[q]
    if (o) {
      // Check which one q preferred.
      const l = preferences[q].indexOf(o)
      const r = preferences[q].indexOf(p)
      const i = l < r ? r : l
      const x = preferences[q].slice(i)
      for (let i of x) {
        preferences[i] = preferences[i].filter((it) => it != q)
      }
      preferences[q] = preferences[q].slice(0, i)
      preferenceKeys.unshift(l < r ? p : o) // Re-propose for rejected.
      accepted[q] = l < r ? o : p
    } else {
      accepted[q] = p
    }
  }

  // Stage 2: Reject all after the proposed.
  for (let key in preferences) {
    const prefs = preferences[key]
    const idx = prefs.indexOf(accepted[key])
    if (idx > -1) {
      const lessPreferred = prefs.slice(idx + 1, prefs.length)
      for (let i of lessPreferred) {
        preferences[i] = preferences[i].filter(it => it !== key)
      }
      preferences[key] = prefs.slice(0, idx + 1)
    }
  }

  if (Object.values(preferences).some(item => item.length === 0)) {
    throw new Error("no stable matching, some results are empty")
  }

  while (Object.values(preferences).some(item => item.length > 1)) {
    const idx = Object.values(preferences).findIndex(item => item.length > 1)
    const rotation = getRotation(preferences, Object.keys(preferences)[idx]).reverse()
    if (rotation.length % 2 !== 0) throw new Error('no stable rotation')

    const rotated = []
    while (rotation.length) {
      const pair = rotation.splice(0, 2)
      rotated.push(pair)
    }

    rotated.forEach(([x, y]) => {
      preferences[x].shift()
      preferences[y].pop()
    })

    rotated.forEach(([x, y]) => {
      let last = preferences[y][preferences[y].length - 1]
      while (preferences[last]?. [0] !== y) {
        preferences[y].pop()
        last = preferences[y][preferences[y].length - 1]
        if (!preferences[y].length) throw new Error('no stable matching')
      }
    })
  }

  const output = {}
  for (let key in preferences) {
    if (preferences[key].length === 1) {
      const head = preferences[key][0]
      if (preferences[head][0] === key) {
        output[key] = head
        delete preferences[key]
        delete preferences[head]
      }
    } else {
      throw new Error('no stable matching')
    }
  }
  return output
}

// For the first time, find the second item, use it as a key to find the next last item, and continue until a cycle is found.
function getRotation(preferences, person = Object.keys(preferences)[0], secondOrLast = true, items = [person]) {
  if (items.length > Object.keys(preferences).length) {
    // Find rotation at any even index.
    for (let i = 0; i < items.length; i += 2) {
      const p = items[i]
      if (items.slice(i + 2).includes(p)) {
        const lastIdx = items.slice(i + 2).findIndex(it => it === p)
        const rotation = items.slice(i, i + 2 + lastIdx)
        rotation.push(rotation.shift())
        return rotation
      }
    }
    throw new Error(`no rotation found (key=${person})`)
  }
  const prefs = preferences[person]
  if (prefs.length < 2) {
    return items
  }
  const nextPerson = prefs[secondOrLast ? 1 : prefs.length - 1]

  // NOTE: This only find rotation at the first index. It should actually find the rotation at any index.
  if (items?. [0] === nextPerson) {
    items.shift()
    items.push(nextPerson)
    return items
  }

  items.push(nextPerson)
  return getRotation(preferences, nextPerson, !secondOrLast, items)
}

function clone(object) {
  const result = {}
  for (let key in object) {
    result[key] = [...object[key]]
  }
  return result
}

function stringify(o) {
  return Object.entries(o).reduce((acc, [key, preferences]) => {
    acc[key] = preferences.map(item => item.toString())
    return acc
  }, {})
}

function uniqueArray(arr) {
  return arr.length === new Set(arr).size
}

function duplicateInArray(arr) {
  if (uniqueArray(arr)) return []

  const counter = {}
  for (let item of arr) {
    if (!counter[item]) counter[item] = 0
    counter[item]++
  }
  return Object
    .entries(counter)
    .filter(([key, count]) => count > 1)
    .map(([key, count]) => key)
}

function validate(o) {
  const people = Object.keys(o).length
  for (let key in o) {
    if (o[key].includes(key)) {
      throw new Error('cannot match against ownself')
    }
    const duplicates = duplicateInArray(o[key])
    if (duplicates.length) {
      throw new Error(`${key} has duplicate keys ${duplicates}`)
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generatePreferences(n = 30, start = 1) {
  const result = {}
  for (let i = 0; i < n; i++) {
    result[i + start] = Array(n)
      .fill(start)
      .flatMap((n, idx) => idx + n === i + start ? [] : [(idx + n).toString()])
    shuffleArray(result[i + start])
  }
  return result
}


console.log(stableRoommateProblem(stringify(preferences)))
console.log(stableRoommateProblem(stringify(preferences1)))
console.log(stableRoommateProblem(stringify(preferences2)))
console.log(stableRoommateProblem(stringify(preferences3)))
// This will sometimes generate a result - refresh for different possiblity.
console.log(stableRoommateProblem(stringify(generatePreferences(30))))
