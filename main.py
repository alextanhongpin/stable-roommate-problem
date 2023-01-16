from collections import defaultdict

pref_by_proposer: dict[str, list[str]] = {
    '1': list('34265'),
    '2': list('65413'),
    '3': list('24516'),
    '4': list('52361'),
    '5': list('31246'),
    '6': list('51342')
}

if len(pref_by_proposer) % 2 == 1:
    raise Exception('must have even number for pairing')


proposed: dict[str, str] = defaultdict(str)


def reject_symmetrical(a, b):
    pref_by_proposer[a] = [p for p in pref_by_proposer[a] if p != b]
    pref_by_proposer[b] = [p for p in pref_by_proposer[b] if p != a]


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
            reject_symmetrical(first_pref, prev_proposer)
            proposed[first_pref] = proposer
            proposers = [prev_proposer, *proposers]
        else:
            reject_symmetrical(first_pref, proposer)
            proposers = [proposer, *proposers]
    else:
        proposed[first_pref] = proposer


for proposed_to, proposed_by in proposed.items():
    i = pref_by_proposer[proposed_to].index(proposed_by)
    to_reject = pref_by_proposer[proposed_to][i+1:]
    for reject in to_reject:
        reject_symmetrical(proposed_to, reject)


proposers = list(pref_by_proposer.keys())


while proposers:
    [proposer, *proposers] = proposers
    prefs = pref_by_proposer[proposer]
    if len(prefs) == 1:
        continue

    p: list[str] = []
    q: list[str] = []

    pi, qi = proposer, prefs[1]
    p.append(pi)  # Start with the first proposer, p0.
    q.append(qi)  # q0 is the second pref of p0

    while True:
        # pi is the last item in qi-1's prefs.
        pi = pref_by_proposer[qi][-1]
        if pi in p:
            # We want to pair p and q diagonally, q0 with p1, q1 with p2 ...
            # The easiest is to append pi to queue p, and pop queue q from the
            # left, and then zip both p and q.
            # Visualization below:
            #
            # p: [p0,p1,p0]   <- A cycle happens when value repeats in queue p.
            #       / /       <- pair diagonally
            # q: [q0,q1]
            #
            p.append(pi)
            p.pop(0)
            break
        p.append(pi)

        # qi is second item in pi's prefs.
        qi = pref_by_proposer[pi][1]
        q.append(qi)

    for k, v in zip(p, q):
        reject_symmetrical(k, v)
        reject_symmetrical(v, k)

    if len(pref_by_proposer[proposer]) > 1:
        proposers = [proposer, *proposers]


pairs = []
for k in pref_by_proposer:
    pairs.append((k, pref_by_proposer[k][0]))

print(pairs)
