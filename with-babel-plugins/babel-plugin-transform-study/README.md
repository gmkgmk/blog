# babel-plugin插件制作

最基本的插件制作：

```js
let tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights the",
   "corresponding part in the source code",

  "Shift click on an AST node expands the whole substree"
];
```

====>

```js
var _tips = "Click on any AST node with a '+' to expand itHovering over a node highlights thecorresponding part in the source codeShift click on an AST node expands the whole substree";
```