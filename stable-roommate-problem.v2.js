// From wikipedia.
const preferences1 = {
  "1": ["3", "4", "2", "6", "5"],
  "2": ["6", "5", "4", "1", "3"],
  "3": ["2", "4", "5", "1", "6"],
  "4": ["5", "2", "3", "6", "1"],
  "5": ["3", "1", "2", "4", "6"],
  "6": ["5", "1", "3", "4", "2"]
}


// From youtube. Search for Irving's algorithm.
const preferences2 = {
  a: 'b d f c e'.split(' '),
  b: 'd e f a c'.split(' '),
  c: 'd e f a b'.split(' '),
  d: 'f c a e b'.split(' '),
  e: 'f c d b a'.split(' '),
  f: 'a b d c e'.split(' '),
}

// http://www.dcs.gla.ac.uk/~pat/jchoco/roommates/papers/Comp_sdarticle.pdf
const preferences3 = {
  1: [2, 5, 4, 6, 7, 8, 3],
  2: [3, 6, 1, 7, 8, 5, 4],
  3: [4, 7, 2, 8, 5, 6, 1],
  4: [1, 8, 3, 5, 6, 7, 2],
  5: [6, 1, 8, 2, 3, 4, 7],
  6: [7, 2, 5, 3, 4, 1, 8],
  7: [8, 3, 6, 4, 1, 2, 5],
  8: [5, 4, 7, 1, 2, 3, 6]
}


const preferences4 = {
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

function stringify(o) {
  const r = {}
  for (let k in o) {
    r[k] = o[k].map(i => i.toString())
  }
  return r
}

function clone(o) {
  const c = {}
  for (let key in o) {
    c[key] = [...o[key]]
  }
  return c
}

function stableRoommateProblem(preferences) {
  const people = Object.keys(preferences)
  const accepted = {}
  // Phase 1.
  while (people.length) {
    const currProposer = people.shift()
    const proposed = preferences[currProposer][0]
    const prevProposer = accepted[proposed]

    if (prevProposer) {
      const prevRank = preferences[proposed].indexOf(prevProposer)
      const currRank = preferences[proposed].indexOf(currProposer)

      // Lower the index, the higher the preference.
      const idx = prevRank < currRank ? currRank : prevRank
      const rejects = prevRank < currRank ? currProposer : prevProposer
      const accepts = prevRank < currRank ? prevProposer : currProposer
      people.unshift(rejects)
      preferences[rejects].shift()
      const rejected = preferences[proposed].slice(idx)
      for (const r of rejected) {
        preferences[r] = preferences[r].filter(person => person !== proposed)
      }
      preferences[proposed] = preferences[proposed].slice(0, idx)
      accepted[proposed] = accepts
    } else {
      accepted[proposed] = currProposer
    }
  }

  // Phase 2: Reject those lower than the preferences
  for (let proposer in preferences) {
    const idx = preferences[proposer].indexOf(accepted[proposer])
    if (idx === -1) continue
    const kept = preferences[proposer].slice(0, idx + 1)
    const reject = preferences[proposer].slice(idx + 1)
    for (const rejected of reject) {
      preferences[rejected] = preferences[rejected].filter(person => person !== proposer)
    }
    preferences[proposer] = kept
  }

  // Phase 3: Eliminate rotation.
  while (Object.values(preferences).some(prefs => prefs.length > 1)) {
    const [person] = Object.entries(preferences).find(([person, prefs]) => prefs.length > 1)
    if (!person) break
    const rotations = getRotation(preferences, person)
    for (const [x, y] of rotations) {
      preferences[x].shift()
      preferences[y].pop()
    }
    for (const [x, y] of rotations) {
      let lastY = tail(preferences[y])
      if (!lastY) {
        throw new Error('no stable matching: list is empty')
      }
      if (head(preferences[lastY]) !== y) {
        preferences[lastY] = preferences[lastY].filter(person => person !== y)
        preferences[y].pop()
      }
    }
  }
  const result = []
  for (let person in preferences) {
    if (preferences[person].length === 0) {
      throw new Error('no stable matching: empty list')
    }
    const match = preferences[person][0]
    if (preferences[match][0] === person) {
      result.push([person, preferences[person][0]])
      delete preferences[person]
      delete preferences[match]
    }
  }
  return result
}

function getRotation(preferences, person, secondOrLast = true, p = [person], q = []) {
  const prefs = preferences[person]
  if (!prefs) throw new Error('getRotationError: no stable matching: list is empty')
  const target = prefs[secondOrLast ? 1 : prefs.length - 1]
  const rotationExists = !secondOrLast && p.includes(target)
  secondOrLast ? q.push(target) : p.push(target)
  if (rotationExists) {
    // Find the tail of the cycle.
    while (head(p) !== target) {
      p.shift()
      q.shift()
    }
    p.shift()
    const rotation = []
    while (p.length) {
      const k = p.shift()
      const v = q.shift()
      rotation.push([k, v])
    }
    rotation.unshift(rotation.pop())
    return rotation
  }
  return getRotation(preferences, target, !secondOrLast, p, q)
}

function tail(arr) {
  return arr[arr.length - 1]
}

function head(arr) {
  return arr[0]
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateList(n = 10) {
  const result = {}
  const arr = Array(n).fill(0).map((_, i) => i + 1)
  for (let i = 0; i < n; i++) {
    const tmp = new Set(arr)
    tmp.delete(i + 1)
    result[i + 1] = [...tmp]
    shuffleArray(result[i + 1])
  }
  return result
}

console.log('1', stableRoommateProblem(preferences1))
console.log('2', stableRoommateProblem(stringify(preferences2)))
console.log('3', stableRoommateProblem(stringify(preferences3)))
console.log('4', stableRoommateProblem(stringify(preferences4)))
console.log('5', stableRoommateProblem(stringify(generateList(40))))
