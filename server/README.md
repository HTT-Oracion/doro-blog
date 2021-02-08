# 接口API:
## web  '/web'

### 登录注册
 - login : 
```
 type: post
 url: '/user/login'
```
 - register : 
```
 type: post
 url: '/user/register'
```
### 文章
 - 所有文章 articleList：
 ```
 type: get
 url: '/article/list'
```
 - 文章详情
 ```
 type: get
 url: '/article/:id'
```
 - 更新文章数据
 ```
 type: put
 url: '/article/edit/:id'
```
 - 搜索一些文章
 ```
 type: get
 url: '/search'
```
 - 随机文章列表
 ```
 type: get
 url: '/article/some' (默认为5)
```
### 评论
 - 评论列表
 ```
 type: get
 url: '/comment/list/:id'
```
 - 增加评论
 ```
 type: post
 url: ？？？
```
 - 最新评论
 ```
 type: get
 url: '/comment/lastest'
```
### tag
 - 标签列表
 ```
 type: get
 url: '/tag0/list'
```

### 留言
 - 留言列表
 ```
 type: get
 url: '/comment/list'
```
 - 最新留言
 ```
 type: post
 url: '/comment/lastest'
```
### 图片
 - 图片列表
 ```
 type: get
 url: '/photo/list'
```
## admin