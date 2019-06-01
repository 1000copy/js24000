# 更新依赖包到最新版本

一个Nodejs工程项目过一段时间，会发现自己的依赖库的版本过时了。想要简单粗暴的更新到最新包版本吗？

可以使用这个`npm-check-updates`模块，它会查询依赖包的最新版本，并且改写你的package内的所有依赖的版本到最新。

首先安装此模块到全局：

	npm install -g npm-check-updates

然后运行以下命令：

	ncu -u

它会查询全部依赖包包括开发依赖包(devDependencies)到最新主要版本。

此时还没有真的把这些最新的依赖包下载到本地。想要立即更新，请出来我们熟悉的朋友，执行它即可：

	npm update

如果是刚刚下载的项目，还没有本地的node_modules，那么可执行此命令：

	npm install

ref：https://stackoverflow.com/questions/12478679/npm-install-vs-update-whats-the-difference

The difference between npm install and npm update handling of package versions specified in package.json:

{
  "name":          "my-project",
  "version":       "1.0",                             // install   update
  "dependencies":  {                                  // ------------------
    "already-installed-versionless-module":  "*",     // ignores   "1.0" -> "1.1"
    "already-installed-semver-module":       "^1.4.3" // ignores   "1.4.3" -> "1.5.2"
    "already-installed-versioned-module":    "3.4.1"  // ignores   ignores
    "not-yet-installed-versionless-module":  "*",     // installs  installs
    "not-yet-installed-semver-module":       "^4.2.1" // installs  installs
    "not-yet-installed-versioned-module":    "2.7.8"  // installs  installs
  }
}
Summary: The only big difference is that an already installed module with fuzzy(模糊的)versioning ...

- gets ignored by npm install
- gets updated by npm update

Additionally: install and update by default handle devDependencies differently

npm install will install/update devDependencies unless --production flag is added
npm update will ignore devDependencies unless --dev flag is added

Why use npm install at all?

Because npm install does more when you look besides handling your dependencies in package.json. As you can see in npm install you can ...

manually install node-modules
set them as global (which puts them in the shell's PATH) using npm install -g <name>
install certain versions described by git tags
install from a git url
force a reinstall with --force

# semver 语义版本

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.


# bodyParser 的使用

app.use(bodyParser.json({limit: '1mb'}));
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). 
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));


# Nodejs 教程

## 引入

基于最新的ES6语法，基于最新的异步调用模式，使用最流行的Nodejs开源应用做代码演示，一本书20块钱，一览Nodejs前沿领域技术

## 第一部分 基础

### 常用语法

var 变量提升
prototype
mixin
class
加入闭包
promise
generator
await原理，原来是编译成generator函数
错误处理，异常处理，Emit Error


### 常用模式

即时调用函数
高阶函数 - 返回函数的函数

### 模块

* 模块全揽
* npm+package.json 常用命令 
* semver npm 
* package.lock what is？

### ES6语法。

* Let/Const
* 箭头函数

### 文件系统访问fs

### 底层原理

* 非阻塞IO和事件轮询
* V8

### 调试器

### 异步调用

* Callback和它的问题
* Promise原理和应用
* Await/Async原理和应用
* 串行和并行的流程控制，控制模块

### 事件

## 第二部分 Web开发

* Web Hello world
   
* Express框架

- 安装
- 定义路由
- 模板
- 脚手架
- 中间件，错误处理中间件，可配置的中间件
- 案例：用户管理，登录、登出、注册
- 案例：passport通用印证模块

* Koa框架

- 安装
- 定义路由
- 渲染页面
- 脚手架

* 好酷的web server https://zeroserver.io/

- 安装
- 定义路由
- 渲染页面
- 脚手架

* Rest应用开发
* Web开发基础
* 常用中间件和模块。

- ejs
- session
- body-parser
- bus-boy
- method-override
- static
- mongoose mongodb
* Cnodejs club代码分析
* Express源代码分析

## 第三部分 测试驱动开发Web

* 测试框架，assert模块，mocha，ava
* HTTP测试方法。supertest，本地app.handle()无需HTTP通道。CURL快速测试
* 需求描述
* 可执行的需求描述
* 自动更新重加载，Nodemon
* 自己做自动加载
* 路由规划
* 数据库模式设计
* 分页查询。分页，查询，创建修改删除的方法，使用Rest方式改造应用，使用session改善页面交流

## 第四部分 扩展领域

###跨平台PC客户端

1. 使用JS做一个[番茄钟](https://itunes.apple.com/cn/app/focus-timer/id880565132?mt=12)
2. 跨平台手机客户端 .RN
3. 命令行应用开发

### 爬虫开发

### 急速JavaScript全栈教程
### 前端工程化
### puppeteer 爬虫


webpack，babel等

### 存储 - mongodb

概述
CRUD方法
事务处理 ACID


### 部署

    docker
    网上托管nodejs的方法
    部署npm模块的方法
### 交叉领域

前端框架。Vuejs，WebComponent，ES6，CSS/Bootstrap

### 问题

ES6在nodejs内可以用到哪些？https://node.green/
ES6模块可以在Nodejs内使用吗?

https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node

https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c

https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e

### 竞争对标

Nodejs实战	< 2013
深入浅出Nodejs 2013
Nodejs开发指南 < 2013

优点：新。

# 我能写的

    

