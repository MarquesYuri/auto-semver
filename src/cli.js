#!/usr/bin/env node

const program = require('commander')
const rootPath = require('app-root-path')
const { inc, valid } = require('semver')

const fs = require('fs')

program
	.version('1.0.1')
	.description("An example CLI for ordering pizza's")
	.option('-d, --debug', 'output extra debugging')
	.option('-s, --small', 'small pizza size')
	.option('-p, --pizza-type <type>', 'flavour of pizza')
	.parse(process.argv)

const options = program.opts();

const a = require(rootPath.path + '/package.json')

if (options.debug) {
	if (valid(a.version)) {
		a.version = inc(a.version, 'minor')
		
		fs.writeFile(rootPath.path + '/package.json', JSON.stringify(a, null, 2), 'utf8', () => {
			console.log('Its ok')
		})
	}
}
	
if (options.small) console.log(options);

if (options.pizzaType) console.log(`Sabor: ${options.pizzaType.replace('--', '')}`);


// git add .
// git commit -am "message"
// git push origin master 
