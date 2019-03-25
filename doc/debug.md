自从node6.3以来，node已经直接支持类似node-inpect的功能，只要对执行的js代码加入一个--inspect参数，即可使用chrome做代码调试。

本文使用如下工具：

1.  node v9.5.0
2. chrome 64

首先准备待调试代码。如果这是为了学习的目的，可以使用我测试用代码为：
    
    var objectRegExp = /^\[object (\S+)\]$/;
    function gettype(obj) {
      var type = typeof obj;
      if (type !== 'object') {
        return type;
      }
      // inspect [[Class]] for objects
      return toString.call(obj)
        .replace(objectRegExp, '$1');
    }
    gettype({})
    gettype(function(){})

然后运行此代码，加上参数--inspect-brk

    node --inspect-brk a.js

系统提示：
    Debugger listening on ws://127.0.0.1:9229/84960765-5abc-4236-a7c6-924f99c34ed7
打开浏览器，在地址栏内输入：

    chrome://inspect/#devices
可以看到：

    Remote Target
    #LOCALHOST
    Target (v9.5.0)
    a.js
    file:///Users/lcj/Documents/github/express/a.js
    inspect
点击最后一行inspect，即可弹出一个新的窗口，此为调试器。并且调入代码到chrome调试器内，在执行命令的控制台上可以看到：

    Debugger attached.
    
现在，可以使用点击调试器内的Run | Step | Step Into等按钮做调试了。

对于没有直接使用node执行的代码，比如测试用例mocha，怎么办？mocha也是支持这些选项的，比如express使用了mocha做单元测试，可以用如下命名来做调试：

  mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/app.router.js --inspect-brk -g 'should decode correct params