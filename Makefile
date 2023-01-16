run:
	@echo 'Usage: make run n=1 to run data/01.json, n=2 to run data/02.json etc'
	@python3 main.py data/0$n.json
