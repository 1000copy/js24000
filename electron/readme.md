TODO

1. 启动一个Hello World级别的Electron App
2. 可用在`<script>`标签内可用直接，类似Nodejs方式，访问文件系统。amazing！在Tomato Clock内，需要访问Clock的配置文件，比如间隔时间25分钟，休息时间5分钟。如下：

		{workMinutes:25,restMinutes:5}

3. 常规的HTML/JS开发



Electron 教程简介
=============

Electron 快速入门
=============


快速入门
====

简介
--

Electron 可以让你使用纯JavaScript 调用丰富的原生 APIs 来创造桌面应用。Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

主进程
---

在 Electron 里，运行 `package.json` 里 `main` 脚本的进程被称为**主进程**。在主进程运行的脚本可以以创建 web 页面的形式展示 GUI。

渲染进程
----

由于 Electron 使用 Chromium 来展示页面，所以 Chromium 的多进程结构也被充分利用。每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为**渲染进程**。

在一般浏览器中，网页通常会在沙盒环境下运行，并且不允许访问原生资源。然而，Electron 用户拥有在网页中调用 io.js 的 APIs 的能力，可以与底层操作系统直接交互。

主进程与渲染进程的区别
-----------

主进程使用 BrowserWindow 实例创建网页。每个 BrowserWindow 实例都在自己的渲染进程里运行着一个网页。当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的网页。

由于在网页里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在网页面调用 GUI 相关的 APIs 是不被允许的。如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

在 Electron，我们提供用于在主进程与渲染进程之间通讯的 [ipc](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/ipc-main-process.md) 模块。并且也有一个远程进程调用风格的通讯模块 [remote](//www.w3cschool.cn/electronmanual/electronmanual-remote.html)。

打造你第一个 Electron 应用
==================

大体上，一个 Electron 应用的目录结构如下：

    your-app/
    ├── package.json
    ├── main.js
    └── index.html
    

`package.json`的格式和 Node 的完全一致，并且那个被 `main` 字段声明的脚本文件是你的应用的启动脚本，它运行在主进程上。你应用里的 `package.json` 看起来应该像：

    {
      "name"    : "your-app",
      "version" : "0.1.0",
      "main"    : "main.js"
    }
    

**注意**：如果 `main` 字段没有在 `package.json` 声明，Electron会优先加载 `index.js`。

`main.js` 应该用于创建窗口和处理系统时间，一个典型的例子如下：

    var app = require('app');  // 控制应用生命周期的模块。
    var BrowserWindow = require('browser-window');  // 创建原生浏览器窗口的模块
    
    // 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
    // window 会被自动地关闭
    var mainWindow = null;
    
    // 当所有窗口被关闭了，退出。
    app.on('window-all-closed', function() {
      // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
      // 应用会保持活动状态
      if (process.platform != 'darwin') {
        app.quit();
      }
    });
    
    // 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
    // 这个方法就被调用
    app.on('ready', function() {
      // 创建浏览器窗口。
      mainWindow = new BrowserWindow({width: 800, height: 600});
    
      // 加载应用的 index.html
      mainWindow.loadURL('file://' + __dirname + '/index.html');
    
      // 打开开发工具
      mainWindow.openDevTools();
    
      // 当 window 被关闭，这个事件会被发出
      mainWindow.on('closed', function() {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
      });
    });
    

最后，你想展示的 `index.html` ：

    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World!</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        We are using io.js <script>document.write(process.version)</script>
        and Electron <script>document.write(process.versions['electron'])</script>.
      </body>
    </html>
    

运行你的应用
======

一旦你创建了最初的 `main.js`， `index.html` 和 `package.json` 这几个文件，你可能会想尝试在本地运行并测试，看看是不是和期望的那样正常运行。

可以使用npm全局安装electron：

    npm install electron -g

随即可以运行此应用：

    electron .
    

如果你是局部安装，那运行：

    ./node_modules/.bin/electron .
    

手工下载 Electron 二进制文件
-------------------

如果你手工下载了 Electron 的二进制文件，你也可以直接使用其中的二进制文件直接运行你的应用。

### Windows

    $ .\electron\electron.exe your-app\
    

### Linux

    $ ./electron/electron your-app/
    

### OS X

    $ ./Electron.app/Contents/MacOS/Electron your-app/
    

`Electron.app` 里面是 Electron 发布包，你可以在[这里](https://github.com/electron/electron/releases)下载到。



## 从开发一个小型app开始

完成一个番茄钟的App。

##需求规格

### 正常流程

    进入Ready状态
    按start
    进入Work状态。开始从TA计时
    每秒减少一秒，更新剩余时间，直到为零
    提示用户，时间完成
    建议休息TB时间
    用户确认后，进入Rest状态。开始从TB计时
    重复3，4
    建议工作TA时间
    用户确认
    重复2-9

### 异常流程

在Work，Rest状态，用户点击Stop按钮，则进入Ready状态


### 状态描述

    Ready状态。Start按钮可用，Stop不可用，计时标签显示TA。
    Work状态，Start不可用，Stop可用，计时标签为TA - 消逝的时间
    Rest状态。Start不可用，Stop可用，计时时间为TB - 消逝的时间


## 概述Electron应用特点

所有的[Node.js's built-in modules](http://nodejs.org/api/)在Electron中都可用，并且所有的node的第三方组件也可以放心使用（包括自身的模块）。

Electron也提供了一些额外的内置组件来开发传统桌面应用。一些组件只可以在主进程中使用，一些只可以在渲染进程中使用，但是也有部分可以在这2种进程中都可使用。

基本规则：GUI模块或者系统底层的模块只可以在主进程中使用。要使用这些模块，你应当很熟悉主进程vs渲染进程脚本的概念。

主进程脚本看起来像个普通的nodejs脚本

    const electron = require('electron');
    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;
    var window = null;
    app.on('ready', function() {
      window = new BrowserWindow({width: 800, height: 600});
      window.loadURL('https://www.w3cschool.cn');
    });
    

渲染进程和传统的web界面一样，除了它具有使用node模块的能力：

    <!DOCTYPE html>
    <html>
    <body>
    <script>
      const remote = require('electron').remote;
      console.log(remote.app.getVersion());
    </script>
    </body>
    </html>
    
