# minify-css

> [!WARNING]
> This repository is not maintained (it was never used actually). Please refer to [format-css](https://github.com/projectwallace/format-css) to minify your CSS. 

Fast, small, zero-config library to minify CSS with basic rules. Simplicity, bundle size and runtime speed are more important than versatility and extensibility.

## Installation

```
npm install @projectwallace/minify-css
```

## Usage

```js
import { minify } from "@projectwallace/minify-css";

let old_css = "/* Your CSS here */";
let new_css = minify(old_css);
```

TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO Need more examples?

- [StackBlitz example using CommonJS](https://stackblitz.com/edit/stackblitz-starters-phchci?file=index.js)
- [StackBlitz example using ES Modules](https://stackblitz.com/edit/stackblitz-starters-hrhsed?file=index.js)

## Acknowledgements

- Thanks to [CSSTree](https://github.com/csstree/csstree) for providing the necessary parser and the interfaces for our CSS Types (the **bold** elements in the list above)

## Related projects

- [Minify CSS online](https://www.projectwallace.com/minify-css?utm_source=github&utm_medium=wallace_minify_css_related_projects) - See this minifier in action online!
- [CSS Analyzer](https://github.com/projectwallace/css-analyzer) - The best CSS analyzer that powers all analysis on [projectwallace.com](https://www.projectwallace.com?utm_source=github&utm_medium=wallace_minify_css_related_projects)
- [Format CSS](https://github.com/projectwallace/format-css) The exact opposite of this library: fast, small, zero-config CSS formatter.
