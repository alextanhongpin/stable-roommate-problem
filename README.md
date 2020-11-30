# stable-roommate-problem
Solving the stable roommate problem with Irving's algorithm


NOTE: The solution is not working.

```js
const preferences = {
  1: [3, 4, 2, 6, 5],
  2: [6, 5, 4, 1, 3],
  3: [2, 4, 5, 1, 6],
  4: [5, 2, 3, 6, 1],
  5: [3, 1, 2, 4, 6],
  6: [5, 1, 3, 4, 2]
}

const preferences2 = {
  a: 'b d f c e'.split(' '),
  b: 'd e f a c'.split(' '),
  c: 'd e f a b'.split(' '),
  d: 'f c a e b'.split(' '),
  e: 'f c d b a'.split(' '),
  f: 'a b d c e'.split(' '),
}

function stableRoommateProblem(preferences) {
  const original = {...preferences}
  const matched = {}
  const preferenceKeys = Object.keys(preferences)
  while (preferenceKeys.length) {
    const p = preferenceKeys.shift()
    // q receive proposal from p.
    const q = preferences[p]?.[0]
    
    // q has proposal from o too.
    const o = matched[q]
    if (o) {
      // Check which one q preferred.
      const l = preferences[q].indexOf(o)
      const r = preferences[q].indexOf(p)
      const i = l < r ? r : l

      // o rejects p.
      const x = preferences[q].slice(i)
      for (let i of x) {
        preferences[i] = preferences[i].filter((it) => it != q)
      }
      preferences[q] = preferences[q].slice(0, i)
      preferenceKeys.unshift(l < r ? p : o) // Rejected
    } else {
      matched[q] = p
      // q is the first item of p.
      // If p is not the last item of q, remove al item after index p.
      const ip = preferences[q].indexOf(p)
      if (ip !== -1 && ip !== preferences[q].length - 1) {
        const x = preferences[q].slice(ip+1)
        for (let i of x) {
          preferences[i] = preferences[i].filter((it) => it != q)
        }
        preferences[q] = preferences[q].slice(0, ip+1)
      }
    }
  }
  // Phase 1 complete
}

function clone(object) {
  const result = {}
  for (let key in object) {
    result[key] = [...object[key]]
  }
  return result
}

const parsedPreferences = Object.entries(preferences).reduce((acc, [key, preferences]) => {
  acc[key] = preferences.map(item => item.toString())
  return acc
}, {})
stableRoommateProblem(parsedPreferences)
// stableRoommateProblem(preferences2)
```
