hikari.js
====================
## 关于
> hikari.js是一个基于html5 canvas的开源游戏引擎。
>
> hikari在日语中是光的意思。
>
> 她诞生的目的是为了更加方便的使用html5制作游戏，使用者可以把关注底层的精力更好的投入在其他方面。
>
> hikari.js在架构上一定程度的借鉴了<a href="https://github.com/zh99998/OpenRGSS" target="_blank">OpenRGSS</a>。主要是参考需要实现哪些功能，一些对象应该展现哪些属性，程序上并无任何关联。
>
> 目前正处于开发阶段。
>

## 使用
> 引用./hikari.js
>
> 初始化与开发参考文档(虽然还没写)

## 开发
### 安装依赖环境
根目录下执行
```
npm install
```

### 编译环境
编译需要grunt。关于这是什么以及如何安装请Google
根目录下执行
```
grunt
```
开启监听进程

## 结构 && TODO

### Hikari

核心代码，提供唯一入口和实例化

### Viewport

Canvas的绘图抽象

### Bitmap
位图类

### Sprite

### Vector

### HTML
非Canvas的显示控制，主要用显示不需要逐帧刷新的内容展示
>
>#### HTML.IMG
>img元素
>
>#### HTML.BLOCK
>由div包裹的块元素
>
### Store

### Stage
负责画面展示的舞台，用于管理canvas以及将元素放入/移除画面

### Audio

### Keyboard

### Mouse

### Event

### Network
