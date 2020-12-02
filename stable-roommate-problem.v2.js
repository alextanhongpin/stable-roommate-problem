const preferences = {
  1: [3, 4, 2, 6, 5],
  2: [6, 5, 4, 1, 3],
  3: [2, 4, 5, 1, 6],
  4: [5, 2, 3, 6, 1],
  5: [3, 1, 2, 4, 6],
  6: [5, 1, 3, 4, 2]
}

const preferences1 = {
  a: 'b d f c e'.split(' '),
  b: 'd e f a c'.split(' '),
  c: 'd e f a b'.split(' '),
  d: 'f c a e b'.split(' '),
  e: 'f c d b a'.split(' '),
  f: 'a b d c e'.split(' '),
}

const preferences2 = {
  1: [10, 22, 26, 3, 4, 6, 7, 2, 9, 11, 12, 16, 18, 19, 21, 23, 24, 25, 27, 28, 29, 30, 5, 8, 13, 14, 15, 17, 20],
  2: [1, 6, 17, 24, 10, 11, 13, 14, 16, 18, 20, 21, 22, 23, 26, 27, 28, 29, 3, 4, 5, 7, 8, 9, 12, 15, 19, 25, 30],
  3: [2, 10, 18, 26, 28, 1, 5, 11, 12, 16, 19, 21, 22, 24, 27, 4, 6, 8, 15, 20, 23, 29, 7, 9, 13, 14, 17, 25, 30],
  4: [6, 22, 24, 26, 1, 2, 3, 7, 10, 11, 13, 14, 16, 17, 18, 20, 21, 23, 27, 28, 5, 8, 9, 12, 15, 19, 25, 29, 30],
  5: [6, 17, 22, 28, 1, 2, 3, 9, 10, 11, 13, 15, 16, 18, 20, 21, 23, 24, 26, 27, 30, 4, 7, 8, 12, 14, 19, 25, 29],
  6: [7, 12, 14, 19, 1, 2, 3, 4, 5, 8, 9, 10, 13, 15, 16, 17, 20, 21, 23, 25, 27, 29, 30, 11, 18, 22, 24, 26, 28],
  7: [29, 4, 30, 10, 12, 17, 19, 21, 1, 3, 5, 6, 8, 9, 13, 14, 15, 20, 22, 25, 26, 2, 11, 16, 18, 23, 24, 27, 28],
  8: [24, 1, 2, 6, 11, 16, 18, 20, 22, 26, 27, 28, 5, 10, 12, 14, 15, 19, 23, 3, 4, 7, 9, 13, 17, 21, 25, 29, 30],
  9: [3, 22, 5, 25, 26, 28, 1, 2, 4, 6, 7, 10, 11, 16, 17, 18, 23, 24, 27, 29, 30, 8, 12, 13, 14, 15, 19, 20, 21],
  10: [4, 3, 7, 14, 20, 29, 30, 5, 6, 8, 9, 12, 13, 15, 17, 19, 21, 22, 24, 25, 26, 1, 2, 11, 16, 18, 23, 27, 28],
  11: [3, 9, 17, 5, 25, 29, 30, 1, 4, 7, 8, 12, 13, 14, 15, 19, 20, 21, 22, 28, 2, 6, 10, 16, 18, 23, 24, 26, 27],
  12: [3, 5, 9, 25, 4, 7, 17, 22, 29, 30, 8, 13, 14, 15, 19, 20, 21, 26, 28, 1, 2, 6, 10, 11, 16, 18, 23, 24, 27],
  13: [6, 10, 7, 14, 16, 22, 23, 24, 1, 2, 11, 12, 18, 19, 20, 26, 27, 28, 30, 3, 4, 5, 8, 9, 15, 17, 21, 25, 29],
  14: [3, 22, 5, 9, 25, 26, 28, 1, 2, 4, 6, 7, 10, 11, 16, 17, 18, 23, 24, 27, 29, 30, 8, 12, 13, 15, 19, 20, 21],
  15: [16, 24, 1, 2, 5, 6, 11, 12, 18, 19, 20, 22, 26, 27, 28, 3, 8, 10, 14, 23, 25, 29, 4, 7, 9, 13, 17, 21, 30],
  16: [1, 6, 17, 24, 29, 2, 3, 5, 10, 11, 13, 14, 18, 20, 21, 22, 23, 25, 26, 27, 28, 4, 7, 8, 9, 12, 15, 19, 30],
  17: [11, 13, 16, 18, 23, 24, 1, 2, 6, 7, 8, 10, 15, 21, 22, 25, 26, 27, 28, 3, 4, 5, 9, 12, 14, 19, 20, 29, 30],
  18: [16, 17, 22, 28, 1, 2, 3, 5, 6, 9, 10, 11, 12, 13, 19, 21, 23, 24, 26, 27, 30, 4, 7, 8, 14, 15, 20, 25, 29],
  19: [4, 21, 29, 5, 10, 12, 30, 2, 3, 7, 8, 9, 13, 14, 15, 17, 18, 20, 25, 26, 28, 1, 6, 11, 16, 22, 23, 24, 27],
  20: [6, 10, 13, 22, 24, 1, 2, 7, 8, 11, 14, 16, 17, 18, 21, 23, 26, 27, 28, 30, 3, 4, 5, 9, 12, 15, 19, 25, 29],
  21: [7, 15, 25, 3, 5, 6, 8, 13, 14, 20, 23, 29, 4, 9, 10, 11, 12, 16, 17, 18, 19, 30, 1, 2, 22, 24, 26, 27, 28],
  22: [25, 3, 7, 8, 9, 13, 15, 17, 29, 1, 4, 5, 11, 12, 14, 16, 18, 19, 20, 21, 23, 30, 2, 6, 10, 24, 26, 27, 28],
  23: [10, 22, 26, 4, 6, 7, 21, 1, 2, 3, 11, 12, 13, 16, 17, 18, 19, 24, 27, 28, 29, 30, 5, 8, 9, 14, 15, 20, 25],
  24: [11, 15, 16, 18, 1, 2, 6, 8, 20, 22, 23, 26, 27, 28, 5, 7, 10, 12, 13, 19, 25, 3, 4, 9, 14, 17, 21, 29, 30],
  25: [3, 5, 9, 29, 1, 2, 4, 7, 8, 12, 13, 14, 15, 17, 19, 20, 21, 24, 27, 30, 6, 10, 11, 16, 18, 22, 23, 26, 28],
  26: [1, 6, 17, 24, 2, 10, 11, 13, 14, 16, 18, 20, 21, 22, 23, 27, 28, 29, 3, 4, 5, 7, 8, 9, 12, 15, 19, 25, 30],
  27: [3, 5, 9, 17, 22, 28, 1, 2, 6, 10, 11, 13, 14, 16, 18, 21, 23, 24, 25, 26, 29, 30, 4, 7, 8, 12, 15, 19, 20],
  28: [2, 6, 10, 18, 21, 24, 1, 5, 11, 13, 14, 16, 17, 20, 22, 23, 26, 27, 3, 4, 7, 8, 9, 12, 15, 19, 25, 29, 30],
  29: [11, 16, 18, 22, 26, 1, 2, 3, 5, 7, 8, 15, 23, 24, 25, 27, 28, 4, 6, 10, 12, 13, 19, 20, 9, 14, 17, 21, 30],
  30: [3, 5, 17, 9, 12, 13, 19, 21, 25, 29, 4, 7, 8, 14, 15, 16, 20, 22, 28, 1, 2, 6, 10, 11, 18, 23, 24, 26, 27]
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
    throw new Error(`no rotation found (key=${person})`)
  }
  const prefs = preferences[person]
  if (prefs.length < 2) {
    return items
  }
  const nextPerson = prefs[secondOrLast ? 1 : prefs.length - 1]

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
// This will sometimes generate a result - refresh for different possiblity.
console.log(stableRoommateProblem(stringify(generatePreferences(30))))
console.log(stableRoommateProblem(stringify(preferences2)))
