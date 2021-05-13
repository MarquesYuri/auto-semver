#!/usr/bin/env node

import rootPath from 'app-root-path'
import commander from 'commander'
import fileSystem from 'fs'
import semver from 'semver'

import { exec } from 'child_process'

commander
	.version('1.0.0')
	.description('An exemple CLI for auto update version in package.json and commit to github')
	.option('-m, --major', 'Incremment a major version')
	.option('-n, --minor', 'Incremment a minor version')
	.option('-p, --patch', 'Incremment a path version')
	.option('-a, --add-to-commit <type>', 'Add changes')
	.option('-c, --auto-commit <type>', 'Commit changes')
	.parse(process.argv)

const packageJson = require(rootPath.path + '/package.json')
const options = commander.opts()

if (semver.valid(packageJson.version)) {
	if (options.major) {
		packageJson.version = semver.inc(packageJson.version, 'major')

		fileSystem.writeFile(rootPath.path + '/package.json', JSON.stringify(packageJson, null, 2), 'utf8', () => {
			console.log('Version has been updated')
		})
	} else if (options.minor) {
		packageJson.version = semver.inc(packageJson.version, 'minor')

		fileSystem.writeFile(rootPath.path + '/package.json', JSON.stringify(packageJson, null, 2), 'utf8', () => {
			console.log('Version has been updated')
		})
	} else if (options.patch) {
		packageJson.version = semver.inc(packageJson.version, 'patch')

		fileSystem.writeFile(rootPath.path + '/package.json', JSON.stringify(packageJson, null, 2), 'utf8', () => {
			console.log('Version has been updated')
		})
	} else {
		packageJson.version = semver.inc(packageJson.version, 'patch')

		fileSystem.writeFile(rootPath.path + '/package.json', JSON.stringify(packageJson, null, 2), 'utf8', () => {
			console.log('Version has been updated')
		})
	}
}


console.log(packageJson.version)
