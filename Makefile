install:
	npm install
	cd src/api && npm install

dev: 
	npx concurrently "cd src/api && npm start" "npx vite"

project:
	npx vite

server:
	cd src/api && npm start

build:
	npm run build

lint:
	npx eslint .

fix:
	npx eslint --fix