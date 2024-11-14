# [MDN - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

## 盒子模型

- 标准盒子: 宽度 = 内容的宽度/content + border + padding + margin
- IE 盒子： 宽度 = 内容的宽度(content + border + padding) + margin

## box-sizing

盒子模型的解析模式 默认 content-box

- content-box 标准盒子
- border-box IE

## 选择器

- id #app
- class .app
- 标签 h1
- 子 ul > li
- 后代 ul li
- 通配符 \*
- 属性 input[type=radio]
- 伪类 a:hover

## 优先级

class-10 id-100 标签-1000 ！important 最高

## 居中

1. 水平居中

```css
// 1.1 inline-block &  text-align
.content {
  width: 900px;
  height: 500px;
  background: pink;
  text-align: center; // 子元素会继承该属性
}
.item {
  width: 300px;
  background: gold;
  display: inline-block;
}
// 1.2 使用margin：0 auto
.content {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
// 1.3 使用绝对定位居中
.content {
  width: 500px;
  height: 500px;
  background: gold;
  position: relative;
}
.item {
  width: 300px;
  position: absolute;
  left: 50%;
  background: yellowgreen;
  transform: translateX(-50%);
}
// 1.4 flex
.content {
  width: 500px;
  height: 500px;
  background: pink;
  display: flex;
  justify-content: center;
}
.item {
  width: 300px;
  height: 300px;
  background: gold;
}
```

2. 垂直居中

```css
// 2.1 display：table-cell & vertical-align
.content {
  width: 500px;
  height: 500px;
  background: gold;
  display: table-cell;
  vertical-align: middle;
}
.item {
  background: yellowgreen;
}
// 2.2 display：inline-block & vertical-align: middle
.content {
  width: 300px;
  height: 300px;
  line-height: 300px;
  background: gold;
}
.item {
  width: 50%;
  height: 50%;
  background: yellowgreen;
  display: inline-block;
  vertical-align: middle;
}
// 2.3 absolute
.content {
  width: 500px;
  height: 500px;
  background: gold;
  position: relative;
}
.item {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  background: yellowgreen;
  transform: translateY(-50%);
}
// 2.4  flex
.content {
  width: 500px;
  height: 500px;
  background: pink;
  display: flex;
  align-items: center;
}
.item {
  width: 300px;
  height: 300px;
  background: gold;
}
```

3. 水平垂直居中

```css
3.1 已知宽高 absolute & margin:auto .content {
  width: 500px;
  height: 500px;
  background: pink;
  position: relative;
}
.item {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: yellowgreen;
}
3.2 未知宽高 .content {
  width: 500px;
  height: 500px;
  background: pink;
  position: relative;
}
.item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: yellowgreen;
}
3.3 flex .content {
  width: 500px;
  height: 500px;
  background: pink;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  width: 300px;
  height: 300px;
  background: gold;
}
```

## display

- inline 默认 内联
- none
- block
- table
- inline-block

## position

- static 默认
- relative 绝对
- absolute 相对
- fixed 固定
- sticky 粘性 相对 + 固定

## CSS3 新特性

1. rgba opacity
2. background-[image, origin, size, repeat]
3. word-wrap: break-word
4. text-shadow: (水平阴影，垂直阴影，模糊距离，阴影颜色)
5. border-radius:
6. 媒体查询
7. ...

## css 三角形

```css
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

## 兼容性

1. 不同浏览器的标签默认的 margin 和 padding 不一样。 `*{margin:0;padding:0;}`
2. Chrome 小于 12px 按照 12px 显示 按照 12px 显示 -webkit-text-size-adjust: none;

## 块级格式化上下文 BFC

完全独立的空间。空间内子元素不会影响外面布局

- 根元素，即 html
- overflow: hidden
- float: left / right
- position: absolute / fixed
- display: inline-block / table-cell /flex

## 浮动 float

1. 高度塌陷
2. 解决

- 父级 div 定义 height
- 最后一个浮动元素后加空 div 标签 并添加样式 clear:both。
- 包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
- 父级 div 定义 zoom

## 浏览器是怎样解析 CSS 选择器的

从右向左解析，先找到最右节点，向上寻找父节点直到根元素/满足条件的匹配规则  
若从左向右，发现不匹配规则，需要重新查找，损失性能  
CSS 解析完毕后，CSS Tree + DOM Tree -> Render Tree -> 绘图

## Flex

设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
[阮一峰 Flex](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### 容器属性

1. flex-direction ---- 决定主轴的方向
   - row | 主轴为水平方向，起点在左端。
   - row-reverse | 主轴为水平方向，起点在右端。
   - column | 主轴为垂直方向，起点在上沿。
   - column-reverse | 主轴为垂直方向，起点在下沿。
2. flex-wrap ---- 如果一条轴线排不下，如何换行
   - nowrap | 不换行
   - wrap | 换行，第一行在上方
   - wrap-reverse | 换行，第一行在下方。
3. flex-flow ---- flex-direction 属性和 flex-wrap 属性的简写形式
   - `<flex-direction>`
   - `<flex-wrap>`
4. justify-content 主轴的方向为 row 时
   - flex-start | 左对齐
   - flex-end | 右对齐
   - center | 居中
   - space-between | 两端对齐，项目之间的间隔都相等。
   - space-around | 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
5. align-items 交叉轴上如何对齐
   - flex-start | 交叉轴的起点对齐。
   - flex-end | 交叉轴的终点对齐。
   - center | 交叉轴的中点对齐。
   - baseline | 项目的第一行文字的基线对齐。
   - stretch | 如果项目未设置高度或设为 auto，将占满整个容器的高度。
6. align-content 多根轴线的对齐方式
   - flex-start |
   - flex-end |
   - center |
   - space-between |
   - space-around |
   - stretch;

### 项目属性

1. order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
2. flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
   - 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。
   - 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。
3. flex-shrink 项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
4. flex-basis 在分配多余空间之前，项目占据的主轴空间（main size） 它的默认值为 auto，即项目的本来大小。
5. flex | flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选
6. align-self | 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。
