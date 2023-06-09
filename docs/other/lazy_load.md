# 图片懒加载

## 滚动监听 + offsetTop + innerHeight - scrollTop > 0

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<style>
  #lazy-load img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

<body>
  <div id="lazy-load"></div>
  <script>
    getImgs()

    function getImgs() {
      const lazyLoad = document.querySelector('#lazy-load')
      const imgs = [
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
      ]

      const fragment = new DocumentFragment()
      imgs.forEach(item => {
        let img = document.createElement('img');
        img.dataset.src = item
        // loading
        img.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0'
        fragment.appendChild(img);
      })
      lazyLoad.appendChild(fragment)
    }

    let imgs = document.querySelectorAll('img');
    function lazyLoad() {
      let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      imgs.forEach((item) => {
        let offsetTop = item.offsetTop;
        if (clientHeight + scrollTop - offsetTop > 100) {
          item.src = item.dataset.src
        }
      })
    }
    lazyLoad()
    window.addEventListener('scroll', throttle(lazyLoad, 50))

    function throttle(fn, delay) {
      let preTime = 0;
      return function (...args) {
        let now = new Date();

        if (now - preTime > delay) {
          fn.apply(this, args)
          preTime = now
        }
      }
    }
  </script>
</body>

</html>
```

## 滚动监听 + getBoundingClientRect().top < clientHeight

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<style>
  #lazy-load img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

<body>
  <div id="lazy-load"></div>
  <script>
    getImgs()

    function getImgs() {
      const lazyLoad = document.querySelector('#lazy-load')
      const imgs = [
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
      ]

      const fragment = new DocumentFragment()
      imgs.forEach(item => {
        let img = document.createElement('img');
        img.dataset.src = item
        // loading
        img.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0'
        fragment.appendChild(img);
      })
      lazyLoad.appendChild(fragment)
    }

    let imgs = document.querySelectorAll('img');
    function lazyLoad() {
      let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      imgs.forEach((item) => {
        let eleTop = item.getBoundingClientRect().top;
        if (eleTop > 0 && eleTop < clientHeight) {
          item.src = item.dataset.src
        }
      })
    }
    lazyLoad()
    window.addEventListener('scroll', throttle(lazyLoad, 50))

    function debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    }

    function throttle(fn, delay) {
      let preTime = 0;
      return function (...args) {
        let now = new Date();

        if (now - preTime > delay) {
          fn.apply(this, args)
          preTime = now
        }
      }
    }

  </script>
</body>

</html>
```

## interSectionObserve

```javascript
var io = new IntersectionObserver(callback, option)
// 开始观察
io.observe(document.getElementById('app'))

// 停止观察
io.unobserve(element)

// 关闭观察器
io.disconnect()

// callback
// callback函数的参数是一个数组，每个成员都是一个IntersectionObserverEntry对象。
// IntersectionObserverEntry

/**
 * time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
 * target：被观察的目标元素，是一个 DOM 节点对象
 * rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
 * boundingClientRect：目标元素的矩形区域的信息
 * intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
 * intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
 **/
```

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<style>
  #lazy-load img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

<body>
  <div id="lazy-load"></div>
  <script>
    getImgs()

    function getImgs() {
      const lazyLoad = document.querySelector('#lazy-load')
      const imgs = [
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
        "https://npz917.github.io/blog/home/logo.png",
      ]

      const fragment = new DocumentFragment()
      imgs.forEach(item => {
        let img = document.createElement('img');
        img.dataset.src = item
        // loading
        img.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0'
        fragment.appendChild(img);
      })
      lazyLoad.appendChild(fragment)
    }


    let imgs = document.querySelectorAll('img')
    let io = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          item.target.src = item.target.dataset.src;
          io.unobserve(item.target)
        }
      })
    })

    imgs.forEach(ele => {
      io.observe(ele)
    })
  </script>
</body>

</html>
```
