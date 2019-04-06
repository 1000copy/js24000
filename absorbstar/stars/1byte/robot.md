快速开发聊天机器人
=========

2016-06-19

聊天工具除了用来传递消息之外，还可以帮我们完成一些重复琐碎的工作，比如让它去追踪一些数据变化，象下图中的 Trump 会告诉我们发表在知乎上的帖子又增加了多少新的读者关注。

 [![Trump - 知乎数据](/static/92585bc72106f3cf7c11a40e870563e9/a111b/robot-trump-zhihu.jpg)](/static/92585bc72106f3cf7c11a40e870563e9/a66cd/robot-trump-zhihu.jpg) 

下面我就来介绍一下如何在 [LeanEngine](https://leancloud.cn/docs/leanengine_overview.html) 上快速开发和部署一个像 Trump 这样的聊天机器人。因为我们团队使用的聊天工具是 [BearyChat](https://bearychat.com/)，所以就以 BearyChat 为例了。

首先，开始一个新的 Node.js 项目并把 RoLE 增加为依赖。RoLE 是 Robot on LeanEngine 的缩写，这是从我们自己的聊天室机器人抽象出来的一个库。不过因为已经有一个叫 `role` 的 NPM 包，所以包名就只能叫 `role-model` 了，也是个有趣的名字。用下面的命令把它加到你的项目里：

    npm install --save role-model

这个库只有一个顶层 API `createRobotApp()`：

    const role = require('role-model');
    const app = role.createRobotApp({
      chatService: 'bearychat',
      chatServiceOptions: {
        team: process.env.BEARYCHAT_TEAM,
        token: process.env.BEARYCHAT_TOKEN
      }
    });

目前 `chatService` 参数暂时只支持 `'bearychat'`，但支持其他聊天工具（包括微信服务号）是非常容易的，欢迎在 GitHub 提交 pull request。`chatServiceOptions` 是要传递给这个聊天工具的参数，对于 BearyChat 来说就是 team 和 token。为了避免 token 暴露在源代码中，我们从环境变量读取他的值。环境变量可以在云引擎的 web 控制台设置。

上一行代码的 `app` 有三个属性：

*   `app.expressApp` 是一个 Express 应用的实例，可以用它来定义新的 route 和 middleware，比如用来作为第三方服务的回调 hook。
*   `app.leanEngine` 是一个已经初始化过的 LeanEngine SDK 的实例，在普通 LeanEngine Node 应用中可以通过 `require('leanengine')` 得到并自己初始化。在这里提供出来以方便调用 LeanCloud 的各种服务，比如存储、IM 等。
*   `app.robot` 这是用来定义机器人行为的对象。

机器人的行为通过建立匹配条件和回调函数的关联来定义。匹配条件可以是一个关键词列表：

    app.robot.addHandler(['ping'],
        context => context.respond('pong'));

当发来的消息包含列表中的所有关键词时，对应的函数就会被调用。

匹配条件也可以是正则表达式：

    app.robot.addHandler(/ping/,
        context => context.respond('pong'));

如果正则表达式里有捕获组（capture group）的话，`context.matches` 里会有匹配到的字符串。

最灵活的方式是用一个函数作为匹配条件：

    app.robot.addHandler((msg) => msg === "ping",
        context => context.respond('pong'));

在程序的最后运行：

    app.run();

这必须是主程序的最后一行，因为它会调用 `app.expressApp.listen()`。

因为 RoLE 使用了 ES6 的一些功能，所以需要在 `package.json` 告诉 LeanEngine 使用 Node 4.x（未来也可以换成更高的版本）。

      "engines": {
        "node": "4.x"
      }

如果以前没有用过 LeanEngine，请先安装必要的[命令行工具](https://leancloud.cn/docs/leanengine_cli.html)。然后按步骤[将程序部署到 LeanEngine](https://leancloud.cn/docs/leanengine_cli.html#%E9%83%A8%E7%BD%B2)，在 LeanCloud 后台配置好自己的 `*.leanapp.cn` 二级域名，再到 BearyChat 的设置里增加一个 Hubot 类型的机器人，就可以和你的新机器人对话了。

最后贴出一些我们自己使用聊天机器人的截图，希望能抛砖引玉，给大家攒些灵感吧：

机器人「长者」的功能很多。比如测试一下从国内调用 LeanCloud 美国节点的 API 是不是畅通：

 [![长者 - 测试美国节点](/static/61f0fdd4ba7350211b283a4e49a5549b/a111b/robot-zz-test.jpg)](/static/61f0fdd4ba7350211b283a4e49a5549b/a66cd/robot-zz-test.jpg) 

看看今天有谁请假：

 [![长者 - 请假](/static/3262fae232a44d792e6201029d3101bb/a111b/robot-zz-vacation.jpg)](/static/3262fae232a44d792e6201029d3101bb/a66cd/robot-zz-vacation.jpg) 

请教一下人生的经验：

 [![长者 - 支持不支持](/static/7a221225c6c59ad2abbe8b2a40c6c6ae/a111b/robot-zz-trump.jpg)](/static/7a221225c6c59ad2abbe8b2a40c6c6ae/caeba/robot-zz-trump.jpg) 

 [![长者 - 清河的雷布斯](/static/80e0a0cc2704cbc666538dc81b5fc8c2/a111b/robot-zz-lbs.jpg)](/static/80e0a0cc2704cbc666538dc81b5fc8c2/5bea2/robot-zz-lbs.jpg) 

是不是觉得 Siri 什么的都弱爆了？

* * *

[LeanCloud](https://leancloud.cn/?utm_source=1byte&utm_medium=article&utm_campaign=jobs&utm_content=robot-on-leanengine) 在招聘以下职位：

*   后端软件工程师（Clojure、Python、Java）
*   Android 软件工程师

具体的需求以及其他正在招聘的职位请见我们的[工作机会](https://leancloud.cn/jobs/?utm_source=1byte&utm_medium=article&utm_campaign=jobs&utm_content=robot-on-leanengine)页面。除了在官网上可以看到的已经发布的产品外，我们也在开发让人兴奋的新产品，有很多有意义、有价值的工作。

* * *

订阅我的邮件列表以得到新文章通知：