# 文件上传

只有图片和pdf可以预览，world、ppt、excel等不可预览，需后端解析
图片为例,TODO

## 单文件上传
```js
<div class="upload">
  <input class="upload_int" type="file">
  <button class="upload_btn">上传</button>
  <img class="upload_preview" src="" alt="">
</div>
<div id="progress">
  <div class="progress-item"></div>
</div>
上传成功后的返回内容<br>
<span id="callback"></span>

<script>
  let $upload = document.querySelector('.upload'),
    $upload_file = document.querySelector('.upload_int'),
    $upload_btn = document.querySelector('.upload_btn'),
    $upload_preview = document.querySelector('.upload_preview');

  $upload_file.addEventListener('change', preview)

  $upload_btn.addEventListener('click', upload);

  // 预览
  function preview(e) {
    let file = $upload_file.files[0];
    // 第一种方式
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.error(e);
      $upload_preview.setAttribute('src', e.target.result)
    }
    // 第二种方式
    // const src = window.URL.createObjectURL(file);   // blob:http://127.0.0.1:5500/8f8b4311-ecdd-4a9e-b7d5-5a1d7bd9d916
    // $upload_preview.setAttribute('src', src);
  }

  // 上传  压缩-Todo
  function upload() {
    let fileList = $upload_file.files;
    // console.error(fileList);
    if (fileList.length === 0) {
      alert('请选择文件')
      return
    }

    var formData = new FormData();
    formData.append("file", fileList[0]);
    console.error(formData);

    var xhr = new XMLHttpRequest();
    xhr.open("post", "/");
    //回调
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.querySelector("#callback").innerText = xhr.responseText;
      }
    }
    //获取上传的进度
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        var percent = event.loaded / event.total * 100;
        document.querySelector("#progress .progress-item").style.width = percent + "%";
      }
    }
    //将formdata上传
    xhr.send(formData);
  }
</script>
```
## 多文件上传
## 目录上传
## 压缩目录上传
## 拖拽上传
## 剪贴板上传
## 大文件分块上传
## 服务端上传