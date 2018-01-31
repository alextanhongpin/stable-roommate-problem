const StableRoommateProblem = require('./stable-roommate-problem')

function main () {
  const srp = StableRoommateProblem({
    1: ['3', '4', '2', '6', '5'],
    2: ['6', '5', '4', '1', '3'],
    3: ['2', '4', '5', '1', '6'],
    4: ['5', '2', '3', '6', '1'],
    5: ['3', '1', '2', '4', '6'],
    6: ['5', '1', '3', '4', '2']
  })
  console.log('out ->', srp)
}

main()
