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
console.log(stableRoommateProblem(stringify(preferences2)))
// This will sometimes generate a result - refresh for different possiblity.
console.log(stableRoommateProblem(stringify(generatePreferences(30))))
