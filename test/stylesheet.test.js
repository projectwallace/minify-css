import { suite } from "uvu";
import * as assert from 'uvu/assert'
import { minify } from "../index.js";

let test = suite('Stylesheet')

test('accepts empty input', () => {
	let actual = minify('')
	assert.is(actual, '')
})

test.run()