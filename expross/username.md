
# 每天阅读一个 npm 模块（1）- username

最近工作比较繁忙，每天能用于学习知识的时间越来越少，深感这样不利于自己的技术提升。恰好想起 [狼叔](https://i5ting.github.io/) 所说的 “迷茫时学习 Node.js 最好的方法 - **每天看十个 npm 模块**“，虽然每天没有那么多时间看十个模块，但时间就像海绵一样，挤一挤，每天阅读一个模块还是能做到的。

希望通过这一系列的文章，一方面提醒自己在工作中牢记技术的初心，另一方面鞭策自己在 Node.js 的路上不断前行。

## 一句话介绍

第一个 npm 模块我选择的是 [username](https://www.npmjs.com/package/username)，用于获取当前用户的用户名，当前版本为 3.0.0，周下载量 6万+。

## 用法

[username](https://www.npmjs.com/package/username) 支持同步和 Promise 异步的写法：

    const username = require('username');

    // 同步
    console.log(username.sync()); // => 'elvin'

    // 异步
    username().then(username => {
        console.log(username); // => 'elvin'
    });

## 源码学习

核心代码一共二十多行，主体逻辑为：

1.  首先通过 `process.env` 变量中的值获得用户名，若存在，直接返回；
2.  接着若存在 `os.userinfo` 函数，则通过 `os.userinfo().username` 获得用户名并返回；
3.  若上述方法均失败，则在 OS X/Linux 下通过执行 `id -un` 命令，Windows 下通过 `whoami` 命令获得用户名并返回。

接下来将结合源码对这三步进行探究。

### process.env

    // 源代码 1-1
    function getEnvVar() {
      const env = process.env;

      return env.SUDO_USER ||
        env.C9_USER /* Cloud9 */ ||
        env.LOGNAME ||
        env.USER ||
        env.LNAME ||
        env.USERNAME;
    }

    const envVar = getEnvVar();

    if (envVar) {
      return Promise.resolve(envVar);
    }

`process.env` 返回的是一个包含用户当前环境变量（environment variable）的对象，可以在命令行执行 `printenv` 命令查看所有的环境变量，也可以 `printenv v_name` 命令获取某一个环境变量的值：

    $ printenv
    // => LANG=zh_CN.UTF-8
    // => PWD=/Users/elvin/
    // => SHELL=/bin/zsh
    // => USER=elvin
    // => ...

    $ printenv USER
    // => elvin

> Shell 变量（shell variables）容易与环境变量（environment variable）弄混，通过 `set` 命令可以查看所有的 Shell 变量。关于这两者的区别和使用建议参考这篇英文资料 [How To Read and Set Environmental and Shell Variables on a Linux VPS](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)。

在 Node.js 中，关于 `process.env` 还有三个地方需要了解：

1.  可以通过 `process.env.foo = "bar"` 的方式设置环境变量，目前所有类型的值都允许且会被转化为 string 类型，根据[官方文档](https://nodejs.org/api/process.html#process_process_env)，在将来的版本中将只允许 string、number 和 boolean 类型的值，设置其他类型的值将会抛出异常。

        process.env.foo = undefined;
        console.log(process.env.foo, typeof process.env.foo);
        // => 'undefined', 'string'

        process.env.foo = {};
        console.log(process.env.foo, typeof process.env.foo);
        // => '[object Object]', 'string'

2.  可以通过 `delete` 方法删除环境变量。

        process.env.foo = undefined;
        delete process.env.foo
        console.log(process.env.foo)
        // => undefined

3.  在 Node.js 中对 `process.env` 的修改并不会反映在 node 进程之外，不过可以在外部设置环境变量然后通过 Node.js 代码去获取，实践中经常通过这种方式设置 `NODE_ENV` 变量，然后在 webpack 配置代码中读取它的值来判断环境进行不同的构建。

        $ node -e 'process.env.foo = "bar"' && echo $foo
        // => 空

        $ NODE_ENV=production node -e 'console.log(process.env.NODE_ENV)'
        // => 'production'

    Windows 下不支持直接 `NODE_ENV=production` 这种方式，需要安装 [cross-env](https://www.npmjs.com/package/cross-env) 包进行兼容。

回到源代码 1-1 中的 `getEnvVar` 函数，可以看到依次尝试从 `process.env` 的 SUDO_USER、C9_USER、LOGNAME、USER、LNAME 和 USERNAME 这些环境变量获得用户名，这里着重介绍一下 `SUDO_USER` 和 `C9_USER` 这两个变量：

1.  当用户身份是 root 时，此时的 `USER` 变量会返回 root，而 `SUDO_USER` 变量返回的是登陆为 root 的账户名，例如：当我以 elvin 账户通过 `sudo su` 变为 root 用户后，`USER` 会返回 root，`SUDO_USER` 会返回 elvin。

        $ sudo su
        // => input password

        $ printenv USER
        // => root

        $ printenv SUDO_USER
        // => elvin

2.  `C9_USER` 从注释来看是针对 [Cloud9](https://aws.amazon.com/cloud9/) 的适配，它是亚马逊推出的用于编写、运行和调试代码的云 IDE，感兴趣的可以试一试～

### os.userInfo

源码中从 `process.env` 无法获取用户名时，会尝试通过 `os.userInfo()` 函数获取：

    // 源代码 1-2
    if (os.userInfo) {
        return Promise.resolve(os.userInfo().username);
    }

`os.userinfo()` 返回的是当前用户的一些信息，相较于 `process.env` 而言信息少很多，而且 Node.js V6.0 及以上版本才支持：

    const os = require('os');

    console.log(os.userInfo());

    // => {
    // => 	uid: 501,
    // => 	gid: 20,
    // => 	username: 'elvin',
    // => 	homedir: '/Users/elvin',
    // => 	shell: '/bin/zsh'
    // => }

上述各字段的意思是：

*   uid: 用户 id（user id），每一个用户在系统内都由唯一的 id 标示，例如 id 501 表示用户 elvin。在 Linux 系统上，uid 信息存储在 `/etc/passwd` 文件中，root 用户的 uid 为 0。
*   gid: 用户所属组 id（group id），一个用户可以属于多个组，例如 gid 20 表示用户 elvin 属于 id 为 20 的组。在 OS X/Linux 系统上，gid 信息存储在 `/etc/group` 文件中，root 用户的 gid 为 0。
*   username: 当前用户名，以 elvin 用户登陆 root 时，它返回的值是 root 而不是 elvin。
*   homedir: 当前用户的主目录。
*   shell: 当前用户的 shell 路径。

### 执行命令行命令

当前两种方式都无法获取用户名时，在 OS X/Linux 下会通过 `id -un` 命令获取用户名，在 Windows 下会通过 `whoami` 命令获取用户名。

    // 源代码 1-3
    function cleanWinCmd(x) {
    	return x.replace(/^.*\\/, '');
    }

    function noop() {}

    if (process.platform === 'darwin' || process.platform === 'linux') {
        return execa('id', ['-un']).then(x => x.stdout).catch(noop);
    } else if (process.platform === 'win32') {
        return execa('whoami').then(x => cleanWinCmd(x.stdout)).catch(noop);
    }

上述代码首先通过 `process.platform` 判断操作系统，若是 OS X（即 darwin）或是 Linux，则执行 `id -un` 获取用户名；若是 Windows（即 win32），则执行 `whoami` 获取平台 & 用户名，再通过 `cleanWinCmd` 函数利用正则提取用户名。其实在 OS X/Linux 上也能通过 `whoami` 获取用户名，但其已经在文档中声明被 `id` 命令淘汰（obsoleted）。

根据 [Node.js 文档](https://nodejs.org/api/process.html#process_process_platform)，`process.platform` 会返回当前的平台，包括 aix | darwin | freebsd | linux | openbsd | sunos | win32 | android，所以其实可以看出上述代码只考虑了其中的三种情况，个人觉得可以适当做一些如下修改:

    if (process.platform === 'win32') {
        return execa('whoami').then(x => cleanWinCmd(x.stdout)).catch(noop);
    } else {
        return execa('id', ['-un']).then(x => x.stdout).catch(noop);
    }

> 这里提出的改进已经通过 [PR #20](https://github.com/sindresorhus/username/pull/20) 被 merge 到最新的代码中 😊

在源码 1-3 中，`noop` 空函数的使用也值得学习：当命令执行异常时，通过 `noop` 函数吞掉报错，并返回 `undefined`。一开始我会好奇这里为什么不将详细的异常信息返回便于出错时定位，但后来站在包使用者的角度来看，我认为直接返回 `undefined` 有两个好处：

1.  作为使用者，一般只关心能否拿到正确结果，不会关心包内部的异常信息，此时详细的出错信息反而是一种干扰。
2.  返回 `undefined` 的话，使用者在编写调用代码时会更简单，当然这一点和个人风格有关。

另外需要注意的是，这里使用的是第三方包 [execa](https://www.npmjs.com/package/execa) 而不是 Node.js 内置的 `child_process.exec` 模块来执行命令行命令，[execa](https://www.npmjs.com/package/execa) 在原生模块的基础上进行了提升，目前每周下载量约为 600 万，这里主要是利用了其提供 Promise 的接口。

## 写在最后

今天通过 [username](https://www.npmjs.com/package/username) 六十行的代码：

1.  了解系统环境变量，懂得了 `SUDO_USER` 与 `USER` 变量的区别；
2.  学会 Node.js 中 `process.env` 增删查改；
3.  了解 Node.js 中 `os.userInfo()` 返回的信息；
4.  知道 `process.platform` 返回的值不止 darwin | win32 | Linux，也许 `username` 这里能有更好的处理；
5.  `noop` 空函数在 Promise 出错时吞掉异常的优点。

其实 [username](https://www.npmjs.com/package/username) 还通过 [mem](https://www.npmjs.com/package/men) 包对结果进行缓冲提升了效率，明天将会阅读 [mem](https://www.npmjs.com/package/men) 包进行学习。

> 关于我：毕业于华科，工作在腾讯，[elvin 的博客](https://segmentfault.me/) 欢迎来访 ^_^
