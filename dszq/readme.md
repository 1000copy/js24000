
# CatChen Book Share App 陈三猫共享借阅

这是一个互助借阅app，用户可以通过注册加入，上传共享自己的书供其他用户借阅，并且可以借阅其他用户的共享的书。

1. 用户注册、登录、登出、上传头像、查看自己的profile
2. 用户可以提交自己的共享书单
3. 用户可以查看全部的共享书单、可以搜索自己感兴趣的书
4. 可以可以借阅
5. 用户可以批准对自己书单的借阅
6. 用户可以归还借阅
7. 用户可以确认归还

## 路由对照 

用户类 /user

1. 用户注册表单 `GET /registion`
2. 用户注册 `POST /registion`
3. 用户登录表单 `GET /login`
4. 用户登录 `POST /login`
5. 上传头像表单`GET /avatar`
6. 上传头像`POST /avatar`
7. 查看profile `GET /:id`

书类 /book

1. 查看书单 `GET /`
2. 查看书`GET /:id` ，此处可以借阅申请
3. 查看用户书单 `GET /user/:id`

借阅 /borrow 只能一次借一本

1. 借阅表单`GET /:id`
2. 发起借阅`POST /:id`

归还 /return 只能一次还一本

1. 归还表单`GET /:id`
2. 发起归还`POST /:id`

批准 /permit 

1. 发起批准`POST /:id`
2. 撤销批准`PUT /:id`

确认归还 /cofirm

1. 发起归还`POST /:id`
2. 撤销归还`PUT /:id`

## Schema 规划

用户

	{
		name : String,
		avatar:Buffer,
		password:String,
	}
书

	{
		name : String,
		cover:Buffer
	}

Borrow

    {
		userId:ID,
		bookId : ID,
		bookOwnerId : ID,
		date:Date,
		confirmed:Boolean,
	}

Return

	{
		userId:ID,
		bookId : ID,
		bookOwnerId : ID
		date:Date,
		confirmed:Boolean,
	}

## 第三方模块使用

	npm install \
	connect-busboy \
	express \
	mongoose \
	express-session \
	ejs 

## 目录规划

   /public 静态HTML
   /public/img 图片
   /public/js js
   /view  ejs模板文件
   /router 路由文件
   /test   测试js
   /app.js 入口文件

   




