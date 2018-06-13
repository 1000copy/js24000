### 使用ava的理由

ava是一个类似mocha的测试框架。但是，它有一些mocha无法比拟的优点。

1. 更加简便的使用接口，像是这样：

	import test from 'ava';
	test(t => {
	    t.deepEqual([1, 2], [1, 2]);
	});

想想mocha的describe 和 it 作为其默认接口，对比之下，就知道ava的方便也可阅读。
另外，AVA 可以并发执行测试，为每个测试文件提供独立进程。

2. AVA的报告格式也值得一说。它加入了代码摘录和干净的 diff 到实际和期望的值。如果断言中的值是 object 或者 array，那么只有 diff 会显示出来，去掉了干扰让人专注问题。AVA 会自动去掉调用栈中不相关的行，让你能够更快地定位错误的根源。

现在我们来试试它。

	npm install --global ava
	ava --init

输入如下代码：

	//test/index.js
	import test from 'ava';
	test(t => {
		t.deepEqual([1, 2], [1, 2]);
		t.true(true,"not true");
		t.is(1,1,"not equal");
	});
	test.todo('will think about writing this later');

文件package.json的修改：

	"scripts": {
	  "test": "ava test/* --watch"
	},

跑起来，看看效果

	npm test