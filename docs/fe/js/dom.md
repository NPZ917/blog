# DOM

- 文档对象模型 DOM 树
- 由文档、元素、节点 组成
  - 一个页面就是一个文档，
  - 所有标签都称为元素 Element
  - 文档中的所有内容，在文档中都是节点（标签、属性、文本注释等）node

## 获取元素

- document.getElementById
- document.getElementsByTagName
- document.getElementsByCalssName
- document.querySelector
- document.querySelectorAll

## 创建元素和节点

- document.createElement(tagName) 创建元素节点
- document.createTextNode(text) 创建文本节点
- element.appendChild(newNode) 将新节点添加到元素的子节点列表末尾
- element.insertBefore(newNode, existingNode) 将新节点插入到元素的子节点列表中指定的位置

## 修改元素和节点

- element.innerHTML：设置或获取元素的 HTML 内容
- element.innerText：设置或获取元素的文本内容
- element.setAttribute(name, value)：设置元素的属性
- element.removeAttribute(name)：移除元素的属性
- element.classList.add(className)：为元素添加类名
- element.classList.remove(className)：移除元素的类名
- element.classList.toggle(className)：切换元素的类名

## 删除元素和节点

- element.removeChild(node)：从元素的子节点列表中移除指定的节点
- element.remove()：从文档中移除元素本身

## 属性值

- element.属性
- element.getAttribute('属性')
- element.属性= '值'
- element.setAttribute("属性", '值')
- element.removeAttribute('属性')

## 自定义属性

- 只能获取以 data 开头 的自定义属性
- element.dataset.index
- element.setAttribute(“data-index”,2)
