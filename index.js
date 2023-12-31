import { parse } from 'css-tree'

/**
 * @param {import('css-tree').CssNode} node
 * @param {string} css
 */
function substr(node, css) {
	if (!node.loc) return ''
	let str = css.substring(node.loc.start.offset, node.loc.end.offset)

	return str
		.replace(/\s+/g, ' ')
}

/**
 * @param {import('css-tree').Rule} node
 * @param {string} css
 */
function print_rule(node, css) {
	let buffer = ''

	if (node.prelude !== null && node.prelude.type === 'SelectorList') {
		buffer += print_selectorlist(node.prelude, css)
	}

	if (node.block !== null && node.block.type === 'Block') {
		buffer += print_block(node.block, css)
	}

	return buffer
}

/**
 * @param {import('css-tree').SelectorList} node
 * @param {string} css
 */
function print_selectorlist(node, css) {
	let buffer = ''

	for (let selector of node.children) {
		if (selector.type === 'Selector') {
			buffer += substr(selector, css)
		}

		if (selector !== node.children.last) {
			buffer += ','
		}
	}

	return buffer
}

/**
 * @param {import('css-tree').Block} node
 * @param {string} css
 */
function print_block(node, css) {
	let children = node.children

	if (children.isEmpty) {
		return '{}'
	}

	let buffer = '{'

	for (let child of children) {
		if (child.type === 'Declaration') {
			buffer += print_declaration(child, css)
			if (child !== children.last) {
				buffer += ';'
			}
		} else if (child.type === 'Rule') {
			buffer += print_rule(child, css)
		} else if (child.type === 'Atrule') {
			buffer += print_atrule(child, css)
		}
	}

	buffer += '}'

	return buffer
}

/**
 * @param {import('css-tree').Atrule} node
 * @param {string} css
 */
function print_atrule(node, css) {
	let buffer = '@' + node.name

	// @font-face has no prelude
	if (node.prelude) {
		buffer += ' ' + print_prelude(node.prelude, css)
	}

	if (node.block !== null && node.block.type === 'Block') {
		buffer += print_block(node.block, css)
	} else {
		// `@import url(style.css);` has no block, neither does `@layer layer1;`
		buffer += ';'
	}

	return buffer
}

/**
 * Pretty-printing atrule preludes takes an insane amount of rules,
 * so we're opting for a couple of 'good-enough' string replacements
 * here to force some nice formatting.
 * Should be OK perf-wise, since the amount of atrules in most
 * stylesheets are limited, so this won't be called too often.
 * @param {import('css-tree').AtrulePrelude | import('css-tree').Raw} node
 * @param {number} indent_level
 * @param {string} css
 */
function print_prelude(node, css) {
	let buffer = substr(node, css)
	return buffer
		.replace(/\s*([:,])\s*/g, '$1') // remove whitespace after colon or comma
		.replace(/\(\s+/g, '(') // remove whitespace after (
		.replace(/\s+\)/g, ')') // remove whitespace before )
		.replace(/\s+/g, ' ') // collapse multiple whitespaces into one
}

/**
 * @param {import('css-tree').Declaration} node
 * @param {string} css
 */
function print_declaration(node, css) {
	return node.property + ':' + substr(node.value, css)
}

/**
 * @param {import('css-tree').CssNode} node
 * @param {string} css
 */
function print(node, css) {
	let buffer = ''

	if (node.children !== null) {
		let children = node.children

		for (let child of children) {
			if (child.type === 'Rule') {
				buffer += print_rule(child, css)
			} else if (child.type === 'Atrule') {
				buffer += print_atrule(child, css)
			}
		}
	}

	return buffer
}

/** @param {string} css */
export function minify(css) {
	let ast = parse(css, {
		positions: true,
		parseAtrulePrelude: false,
		parseCustomProperty: false,
		parseRulePrelude: true,
		parseValue: false
	})
	return print(ast, css)
}
