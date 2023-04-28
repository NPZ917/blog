# DOM
- 文档对象模型 DOM树
- 由文档、元素、节点 组成
   - 一个页面就是一个文档，
   - 所有标签都称为元素 Element
   - 文档中的所有内容，在文档中都是节点（标签、属性、文本注释等）node

## 获取元素
- getElementById 
- getElementsByTagName 
- getElementsByCalssName 
- querySelector
- querySelectorAll 
- document.body
- document.documentElement
  
## 操作元素
- Element.innerText
- Element.innerHTMl
- Element.style.样式=值
- Element.className=“类名”
- Element.classList.add (“类名”)
- Element.classList.remove( “ 移除类名”)
- Element.classList.toggle( “切换类名 ”)

```js
<a id="link" href="https://www.baidu.com">点击</a>
var link = document.getElementById('link');
link.onclick = function(){
  alert('hello');
  return false;
};

<a href="javascript:;">点击</a>
```
## 节点
- node.parentNode
- parentNode.children
- parentNode.firstElementChild
- parentNode.lastElementChild 
- parentNode.children[0]
- node.nexElementSibling
- node.previousElementSibling

## 节点操作
- document.createElement("标签")
- node.appendchild(child )
- node.insertBefore(child,指定节点的位置 )
- node.removeChild( child )
- node.cloneNode() 

## 属性值
- Element.属性
- Element.getAttribute('属性') 
- Element.属性= '值'
- Element.setAttribute("属性", '值')
- Element.removeAttribute('属性')

## 自定义属性
- 只能获取以 data开头 的自定义属性
- Element.dataset.index
- Element.setAttribute(“data-index”,2)