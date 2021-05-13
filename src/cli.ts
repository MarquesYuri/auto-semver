#!/usr/bin/env node

import rootPath from 'app-root-path'
import commander from 'commander'
import fileSystem from 'fs'
import semver from 'semver'

import { exec } from 'child_process'

const packageJson = require(rootPath.path + '/package.json')
const options = commander.opts()

commander
	.version(packageJson.version)
	.description('An exemple CLI for auto update version in package.json and commit to github')
	.option('-m, --major', 'Incremment a major version')
	.option('-n, --minor', 'Incremment a minor version')
	.option('-p, --patch', 'Incremment a path version')
	.option('-o, --only-semver-run', 'No commit')
	.option('--no-github', 'No push to git')
	.option('-b, --branch [type]', 'Branch')
	.option('-a, --add [type]', 'Add')
	.option('-c, --commit [type]', 'Commit')
	.option('-p, --push [type]', 'Push')
	.parse(process.argv)

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

if (!options.onlySemverRun) {
	const executions = async () => {
		await exec(`git branch ${options.branch || 'develop'}`, (err, stdout, stderr) => {
			if (err) {
				console.log(`branch stderr: ${stderr}`)
			} else {
				console.log(`stdout: ${stdout}`)
			}
		})
		
		exec(`git checkout ${options.branch || 'develop'}`, (err, stdout, stderr) => {
			if (err) {
				console.log(`checkout stderr: ${stderr}`)
				return
			} else {
				console.log(`stdout: ${stdout}`)
			}
		})

		exec(`git add ${options.add || '.'}`, (err, stdout, stderr) => {
			if (err) {
				console.log(`add stderr: ${stderr}`)
				return
			} else {
				console.log(`stdout: ${stdout}`)
			}
		})

		exec(`git commit -am ${options.commit || 'Automatic commit by auto-semver'}`, (err, stdout, stderr) => {
			if (err) {
				console.log(`commit stderr: ${stderr}`)
				return
			} else {
				console.log(`stdout: ${stdout}`)
			}
		})
	}

	executions()
} else {
	console.log(options)
	
	console.log(packageJson.version)
}
