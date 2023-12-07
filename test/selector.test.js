import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { minify } from '../index.js'

let test = suite('Selector')

test('space between selectors is removed', () => {
	let actual = minify(`
		a,
		b,
		c {}
	`)
	let expected = `a,b,c{}`
	assert.is(actual, expected)
})

test('comments in selectors are removed', () => {
	let actual = minify(`
		a /* remove */,
		b /* remove */ c {}
	`)
	let expected = `a,b c{}`
	assert.is(actual, expected)
})

test('whitespace is collapsed', () => {
	let actual = minify(`a    b   [test="  a  "] {}`)
	let expected = `a b [test="  a  "]{}`
	assert.is(actual, expected)
})

test('removes space between combinators', () => {
	let actual = minify(`a > b ~ c {}`)
	let expected = `a>b~c{}`
	assert.is(actual, expected)
})

test('multiline is collapsed', () => {
	let actual = minify(`
		a
			b
				[test="  a  "] {}`)
	let expected = `a b [test="  a  "]{}`
	assert.is(actual, expected)
})

test('removes whitespace in pseudo functions', () => {
	let actual = minify(`li:nth-child( 3n + 1 ) {}`)
	let expected = `li:nth-child(3n+1){}`
	assert.is(actual, expected)
})

test.run()
