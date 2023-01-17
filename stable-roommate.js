class StableRoommate {
  static #phase1(prefsByUser) {
    const unmatched = Object.keys(prefsByUser);
    const proposed = {};

    while (hasUnmatched()) {
      const curr = getUnmatched();
      const pref = getTopPref(curr);
      if (hasProposal(pref)) {
        const prev = proposed[pref];

        if (prefersCurrOverPrevProposer(pref, prev, curr)) {
          breakup(pref);
          engage(pref, curr);
          rejectSymmetrical(pref, prev);
          retry(prev);
        } else {
          rejectSymmetrical(pref, curr);
          retry(curr);
        }
      } else {
        engage(pref, curr);
      }
    }

    for (const [proposedTo, proposedBy] of Object.entries(proposed)) {
      const prefs = prefsByUser[proposedTo];

      const i = prefs.indexOf(proposedBy);
      // Reject all proposals made by the user after the accepted proposal.
      const rejections = prefs.slice(i + 1);
      for (let rejected of rejections) {
        rejectSymmetrical(proposedTo, rejected);
      }
    }

    function hasUnmatched() {
      return unmatched.length > 0;
    }

    function getUnmatched() {
      return unmatched.shift();
    }

    function getTopPref(user) {
      return prefsByUser[user].at(0);
    }

    function hasProposal(user) {
      return user in proposed;
    }

    function prefersCurrOverPrevProposer(user, prev, curr) {
      const prefs = prefsByUser[user];
      const prevRank = prefs.indexOf(prev);
      const currRank = prefs.indexOf(curr);
      return currRank < prevRank;
    }

    function engage(proposedTo, proposedBy) {
      proposed[proposedTo] = proposedBy;
    }

    function breakup(user) {
      delete proposed[user];
    }

    function rejectSymmetrical(user1, user2) {
      prefsByUser[user1] = prefsByUser[user1].filter((user) => user !== user2);
      prefsByUser[user2] = prefsByUser[user2].filter((user) => user !== user1);
    }

    function retry(user) {
      unmatched.unshift(user);
    }

    return prefsByUser;
  }

  static #phase2(prefsByUser) {
    const unmatched = Object.keys(prefsByUser);

    while (hasUnmatched()) {
      const curr = getUnmatched();
      if (isStable(curr)) continue;
      if (isUnstable(curr)) throw new Error("no stable matching");
      seekCycle(curr);
      retry(curr);
      prefsByUser = StableRoommate.#phase1(prefsByUser);
    }

    function hasUnmatched() {
      return unmatched.length;
    }
    function getUnmatched() {
      return unmatched.shift();
    }
    function isStable(user) {
      return prefsByUser[user].length === 1;
    }
    function isUnstable(user) {
      return prefsByUser[user].length === 0;
    }
    function retry(user) {
      return unmatched.unshift(user);
    }

    function rejectSymmetrical(user1, user2) {
      prefsByUser[user1] = prefsByUser[user1].filter((user) => user !== user2);
      prefsByUser[user2] = prefsByUser[user2].filter((user) => user !== user1);
    }

    function seekCycle(curr) {
      let pi = curr;
      let qi;

      let p = [pi];
      let q = [];
      while (true) {
        qi = prefsByUser[pi][1]; // The second choice.
        q.push(qi);

        pi = prefsByUser[qi].at(-1); // The last choice.
        if (p.includes(pi)) {
          const i = p.indexOf(pi);
          p.push(pi);
          p = p.slice(i + 1);
          q = q.slice(i);
          break;
        }
        p.push(pi);
      }

      for (let i = 0; i < p.length; i++) {
        rejectSymmetrical(p[i], q[i]);
      }
    }

    return prefsByUser;
  }

  static solve(prefsByUser) {
    const p1 = StableRoommate.#phase1(prefsByUser);
    const p2 = StableRoommate.#phase2(p1);
    return p2;
  }
}

function main() {
  const arg = process.argv.slice(2)[0];
  const preferences = require(`./data/0${arg}.json`);
  for (let key in preferences) {
    preferences[key] = preferences[key].map((n) => n.toString());
  }
  console.log(StableRoommate.solve(preferences));
}

main();
