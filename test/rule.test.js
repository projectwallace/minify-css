import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { minify } from '../index.js'

let test = suite('Rule')

test('space between rules is removed', () => {
	let actual = minify(`
		a {}
		b {}
	`)
	let expected = `a{}b{}`
	assert.is(actual, expected)
})

test('comment in rule body is removed', () => {
	let actual = minify(`a { /* remove me */ }`)
	let expected = `a{}`
	assert.is(actual, expected)
})

test.run()
