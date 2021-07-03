serve:
	cd app && npm run serve
build:
	cd app && npm run build

install-deps:
	cd app && npm i

check: lint test

# Test
test: test-unit test-e2e

test-unit:
	cd app && npm run test:unit

test-e2e:
	cd app && npm run test:e2e

# Lint
lint:
	cd app && npm run lint
