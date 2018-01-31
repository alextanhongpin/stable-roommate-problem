
function isBreakup (data, from, p1, p2) {
  // If p1 has lower score, it means p1 is preferred over p2
  const scores = data[from]
  return scores.indexOf(p1) < scores.indexOf(p2)
}

function breakup (state, person, choice) {
  const oldValue = state[person]
  const newValue = oldValue.filter(i => i !== choice)
  return { ...state, [person]: newValue }
}

function removePreference (state, person) {
  const oldValue = state[person]
  const newValue = oldValue.slice(1, oldValue.length)
  return { ...state, [person]: newValue }
}

function firstPhase (data) {
  return Object.entries(data).reduce(([matches, data], [person, value]) => {
    const nextProposal = value[0]
    const isProposed = matches[nextProposal]
    if (!isProposed) {
      matches[nextProposal] = person
    } else {
      const currentProposal = matches[nextProposal]
      if (isBreakup(data, nextProposal, person, currentProposal)) {
        data = breakup(data, nextProposal, currentProposal)
        data = removePreference(data, currentProposal)

        matches[nextProposal] = person
        matches[data[currentProposal][0]] = currentProposal
      } else {
        data = breakup(data, nextProposal, person)
        data = removePreference(data, person)

        matches[data[person][0]] = person
      }
    }
    return [matches, data]
  }, [{}, {...data}])
}
function head (arr) {
  return (arr && arr[0]) || null
}
function secondPhase (_data) {
  const data = {..._data}
  const participants = Object.keys(data)
  return participants.reduce((state, person) => {
    const preferences = data[person]
    const first = head(preferences)
        // Get the current index of the person
    const index = data[first].indexOf(person) + 1
    const itemsToBeRemoved = data[first].slice(index, data[first].length + 1)
        // slice away all items below the index
    data[first] = data[first].slice(0, index)
    itemsToBeRemoved.forEach((item) => {
      data[person] = data[person].filter(i => i !== item)
      data[item] = data[item].filter(i => i !== first)
    })
    return data
  }, data)
}

function getRotation (state, index = 0, person = Object.keys(state)[index], items = []) {
  const isTerminationConditionReached = items.filter(([i]) => i === person)
  if (isTerminationConditionReached.length) {
    return [state, items.concat([[person]])]
  }
  const secondPreference = state[person] && state[person][1]
  if (!secondPreference) {
    return getRotation(state, index + 1, Object.keys(state)[index + 1], items)
  }

  const newItems = items.concat([[person, secondPreference]])
  const lastPreference = state[secondPreference][state[secondPreference].length - 1]
  return getRotation(state, index, lastPreference, newItems)
}

function mapRotation (state, rotation) {
  const newRotation = rotation.reduce((pairs, items, i) => {
    const [_, tail] = items
    const nextItems = rotation[i + 1]
    if (!nextItems) {
      return pairs
    }
    const newPairs = pairs.concat([[tail, nextItems[0]]])
    return newPairs
  }, [])
  return [state, newRotation]
}

function filterRotation (state) {
  const [newState, rotation] = mapRotation(...getRotation(state))
  rotation.forEach(([k, v]) => {
    state[k] = state[k].filter(i => i !== v)
    state[v] = state[v].filter(i => i !== k)
  })
  return newState
}
function thirdPhase (state) {
  const newState = filterRotation(state)
  const isOneStable = Object.values(newState).some(items => items.length === 1)
  if (!isOneStable) {
    return thirdPhase(state)
  }
  const stableMatches = Object.entries(newState).filter(([k, v]) => v.length === 1)
  stableMatches.forEach(([k, [v]]) => {
    newState[k] = newState[k].filter(i => i === v)
    newState[v] = newState[v].filter(i => i === k)

    Object.keys(newState).forEach((key) => {
      if (!([k, v]).includes(key)) {
        newState[key] = newState[key].filter(i => i !== k)
        newState[key] = newState[key].filter(i => i !== v)
      }
    })
  })

  const isAllStable = Object.values(newState).every(i => i.length === 1)
  if (!isAllStable) {
    return thirdPhase(newState)
  }
  return Object.values(Object.entries(newState).map(([k, [v]]) => {
    return [k, v].sort()
  }).reduce((cache, items) => {
    const key = items.join(',')
    if (!cache[key]) {
      cache[key] = items
    }
    return cache
  }, {}))
}

module.exports = (data) => {
  const [_, state] = firstPhase(data)

  const state2 = secondPhase(state)
  const state3 = thirdPhase(state2)
  return state3
}
