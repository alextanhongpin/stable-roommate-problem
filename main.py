import json
import sys
from collections import defaultdict


def reject_symmetrical(pref_by_proposer, a, b):
    pref_by_proposer[a] = [p for p in pref_by_proposer[a] if p != b]
    pref_by_proposer[b] = [p for p in pref_by_proposer[b] if p != a]


PrefByProposer = dict[str, list[str]]


def phase1(pref_by_proposer: PrefByProposer) -> PrefByProposer:
    proposed: dict[str, str] = defaultdict(str)
    proposers: list[str] = list(pref_by_proposer.keys())

    while proposers:
        [proposer, *proposers] = proposers
        prefs = pref_by_proposer[proposer]

        first_pref = prefs[0]
        if first_pref in proposed:
            prev_proposer = proposed[first_pref]
            prefs_by_first_pref = pref_by_proposer[first_pref]
            curr_pref_order = prefs_by_first_pref.index(proposer)
            prev_pref_order = prefs_by_first_pref.index(prev_proposer)

            # Lower score means better.
            if curr_pref_order < prev_pref_order:
                reject_symmetrical(pref_by_proposer, first_pref, prev_proposer)
                proposed[first_pref] = proposer
                proposers = [prev_proposer, *proposers]
            else:
                reject_symmetrical(pref_by_proposer, first_pref, proposer)
                proposers = [proposer, *proposers]
        else:
            proposed[first_pref] = proposer

    for proposed_to, proposed_by in proposed.items():
        i = pref_by_proposer[proposed_to].index(proposed_by)
        to_reject = pref_by_proposer[proposed_to][i+1:]
        for reject in to_reject:
            reject_symmetrical(pref_by_proposer, proposed_to, reject)

    return pref_by_proposer


def phase2(pref_by_proposer: PrefByProposer) -> PrefByProposer:
    proposers = list(pref_by_proposer.keys())

    while proposers:
        [proposer, *proposers] = proposers

        prefs = pref_by_proposer[proposer]
        if len(prefs) == 1:
            continue
        elif len(prefs) == 0:
            raise Exception('no stable matching')

        p: list[str] = []
        q: list[str] = []

        pi, qi = proposer, prefs[1]
        p.append(pi)  # Start with the first proposer, p0.
        q.append(qi)  # q0 is the second pref of p0

        while True:
            # pi is the last item in qi-1's prefs.
            pi = pref_by_proposer[qi][-1]
            if pi in p:
                start_index = p.index(pi)
                # We want to pair p and q diagonally, q0 with p1, q1 with p2,
                # etc. The easiest is to append pi to queue p, and pop queue q
                # from the left, and then zip both p and q.
                # Visualization below:
                #
                # p: [p0,p1,p0]   <- A cycle happens when value repeats.
                #       / /       <- pair diagonally
                # q: [q0,q1]
                #
                # Note that however there are scenarios where the cycle does
                # not start from the beginning.
                #
                # p: [p0,p1,p2,p3,p2]   <- A cycle starts at index 2
                #          /     /      <- pair diagonally
                # q: [q0,q1,q2,q3]
                #
                p.append(pi)
                p = p[start_index+1:]
                q = q[start_index:]
                break
            p.append(pi)

            # qi is second item in pi's prefs.
            qi = pref_by_proposer[pi][1]
            q.append(qi)

        for k, v in zip(p, q):
            reject_symmetrical(pref_by_proposer, k, v)

        if len(pref_by_proposer[proposer]) > 1:
            proposers = [proposer, *proposers]

        # NOTE: Repeating this makes the solution works somehow.
        pref_by_proposer = phase1(pref_by_proposer)

    return pref_by_proposer


def stable_roommate(pref_by_proposer: PrefByProposer) -> PrefByProposer:
    if len(pref_by_proposer) % 2 == 1:
        raise Exception('must have even number for pairing')

    p1 = phase1(pref_by_proposer)
    p2 = phase2(p1)
    return p2


def main():
    with open(sys.argv[1], 'r') as f:
        pref_by_proposer = json.load(f)
        for k in pref_by_proposer:
            # Ensure all the key-values are string.
            pref_by_proposer[k] = [str(v) for v in pref_by_proposer[k]]

    result = stable_roommate(pref_by_proposer)
    n = len(pref_by_proposer)

    keys = {key for key in result}
    values = {val for values in result.values() for val in values}
    if len(keys & values) != n:
        raise Exception('invalid matching')

    if len(result) != n:
        raise Exception('not stable matching')

    seen = set()
    for k, [v] in result.items():
        if k in seen or v in seen:
            continue
        seen.add(k)
        seen.add(v)
        print(k, v)


if __name__ == '__main__':
    main()
