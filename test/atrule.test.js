import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { minify } from '../index.js'

let test = suite('Atrule')

test('leaves atrule names intact', () => {
	let actual = minify(`@FONT-FACE {}`)
	let expected = `@FONT-FACE{}`
	assert.is(actual, expected)
})

test('minifies atrule with block', () => {
	let actual = minify(`@layer   test   ;`)
	let expected = `@layer test;`
	assert.is(actual, expected)
})

test('multiline prelude is single-lined', () => {
	let actual = minify(`
		@media
			(min-width: 1000px)
			and (min-height: 100px) {}
	`)
	let expected = `@media (min-width:1000px) and (min-height:100px){}`
	assert.is(actual, expected)
})

test('abundant whitespace is collapsed/removed', () => {
	let actual = minify(`@media  (  min-width  :  1000px  ) {}`)
	let expected = minify(`@media (min-width:1000px){}`)
	assert.is(actual, expected)
})

test('empty atrule body is collapsed', () => {
	let actual = minify(`
		@media all {

		}
	`)
	let expected = `@media all{}`
	assert.is(actual, expected)
})

test('comment in prelude is removed', () => {
	let actual = minify(`@media all /* remove me */ {}`)
	let expected = `@media all{}`
	assert.is(actual, expected)
})

test('comment in body is removed', () => {
	let actual = minify(`@media all { /* remove me */ }`)
	let expected = `@media all{}`
	assert.is(actual, expected)
})

test('space between two atrules is removed', () => {
	let actual = minify(`@media all {} @media print {}`)
	let expected = `@media all{}@media print{}`
	assert.is(actual, expected)
})

test.run()