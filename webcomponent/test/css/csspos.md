CSS 绝对定位释义

之前看过多次CSS绝对定位，但是缺乏一个好的案例。偶尔看到一个控件，觉得用它来说明是非常简明的。

假设我们有一个DIV，内部还嵌入两个平级的DIV，代码如下：

	<div class="wrapper">
		<div class="block1"></div>
		<div class="block2"></div>
	</div>
	<style>
		.wrapper{border: solid 1px;height:20px;width:220px;}
		.block1{background: red;height:10px;}
		.block2{background:blue;height:10px;width:100%;}
	</style>


那么按照默认的盒子模型，两个平级的DIV一上一下，占满整个父亲DIV。如果想要让第二个DIV覆盖第一个怎么办？

此时就必须取消默认排版过程，转而使用绝对定位。方法就是设置.block2直接相对.wrapper定位，top距离为0即可。具体做法就是在.wrapper内加入代码：

	position:relative

添加CSS代码到.block2内：

	position:absolute;top:0;

就可以看到.block2覆盖于.block1之上。这样就达到了我们希望的效果了。

使用完全相同的结构，我们可以制作一个进度条控件：

	<style>
	.progress { position: relative; border: solid 1px;width: 100px;height:1rem;}
	.progress > .bar { background: red; height: 100%; width:10%}
	.progress > .label {position: absolute; top: 0; left: 0; width: 100%;
	    text-align: center; font-size: 0.8rem; }
	</style>
	<div class="progress">
        <div class="bar"></div>
        <div class="label">10%</div>
    </div>

这里的.label正是通过对其父容器.progress的绝对定位，实现了.bar和.label的重合，从而实现的进度条效果。
