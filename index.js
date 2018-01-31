
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
  if (isTerminationConditionReached) {
    return [state, items]
  }
  const hasSecondPreference = state[person] && state[person][1]
  if (!hasSecondPreference) {
    return getRotation(state, index + 1, Object.keys(state)[index + 1], items)
  }
  const secondPreference = state[person][1]
  const newItems = items.concat([person, secondPreference])
  const lastPreference = state[secondPreference][state[secondPreference].length - 1]
  return getRotation(state, index, lastPreference, newItems)
}

function thirdPhase (data) {
  let startIndex = 0
  let start = Object.keys(data)[startIndex]
  const m = []
  let same
  // Loop for rotation
  while (start !== same) {
    if (!same) {
      same = start
    }
    let second = data[same][1]
    if (!second) {
      startIndex += 1
      start = Object.keys(data)[startIndex]
      same = start
      second = data[same][1]
      console.log('ss', same, second)
      if (same === second) continue
    }
    m.push([same, second])
    same = data[second][data[second].length - 1]
  }
  m.push([same])

  const rotations = []
  m.reverse().forEach((pairs, index) => {
    if (m && m[index + 1]) {
      const a = pairs[0]
      const b = m[index + 1][1]
      if (a !== b) {
        rotations.push([a, b])
      }
    }
  })
  rotations.forEach(([k, v]) => {
    data[k] = data[k].filter(i => i !== v)
    data[v] = data[v].filter(i => i !== k)
  })
  console.log('\nrotations', rotations)
  console.log('data before', data)
  Object.keys(data).forEach(item => {
    if (data[item].length === 1) {
      const firstItem = data[item][0]
      data[firstItem] = data[firstItem].filter(v => v === item)
      console.log('hi', item, firstItem)
      Object.keys(data).forEach((_item) => {
        if (_item !== item && _item !== firstItem) {
          console.log('current ly', _item)
          data[_item] = data[_item].filter(m => !(m === item || m === firstItem))
        }
      })
      console.log('hida', data)
    }
  })
  console.log('data after', data, '\n')
}

function main () {
  let [_, data] = firstPhase({
    1: ['3', '4', '2', '6', '5'],
    2: ['6', '5', '4', '1', '3'],
    3: ['2', '4', '5', '1', '6'],
    4: ['5', '2', '3', '6', '1'],
    5: ['3', '1', '2', '4', '6'],
    6: ['5', '1', '3', '4', '2']
  })

  data = secondPhase(data)

  data = getRotation(data)
  // Step 3

  // step3()
  // step3()
  // step3()

  console.log('output =>')
  console.log(data)
}

main()

// 1,6 - 2,4  - 3,5
