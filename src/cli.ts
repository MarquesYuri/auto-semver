#!/usr/bin/env node

import rootPath from 'app-root-path'
import commander from 'commander'
import fileSystem from 'fs'
import semver from 'semver'

commander
	.version('1.0.0')
	.description('An exemple CLI for auto update version in package.json and commit to github')
	.option('-m', '--major', 'Incremment a major version')
	.option('-n', '--minor', 'Incremment a minor version')
	.option('-p', '--patch', 'Incremment a path version')
	.parse(process.argv)

semver.valid('10.0.2')
