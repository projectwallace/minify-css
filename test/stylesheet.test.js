import { suite } from "uvu";
import * as assert from 'uvu/assert'
import { minify } from "../index.js";

let test = suite('Stylesheet')

test('accepts empty input', () => {
	let actual = minify('')
	assert.is(actual, '')
})

test('scraps invalid input', () => {
	let actual = minify(';')
	assert.is(actual, '')
})

test('removes comments: top-level', () => {
	let actual = minify(`
		/**
		 * Test comment
		 * New line
		 */
		a {
			color: black;
		}
	`)
	let expected = `a{color:black}`
	assert.is(actual, expected)
})

test.run()