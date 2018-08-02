NODE_ENV := development

.PHONY: all

.EXPORT_ALL_VARIABLES:

all: build-client build-server

build-client:
	npx parcel build --out-file app.bundle.js src/client/index.tsx

build-server:
	npx tsc

pretty:
	npx prettier --write "src/**/*.{ts,tsx}"

clean:
	npx rimraf "{lib,dist}"