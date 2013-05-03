hikari.js
====================
## 关于
hikari.js是一个基于html5 canvas的开源游戏引擎。

hikari在日语中是光的意思。

她诞生的目的是为了更加方便的使用html5制作游戏，使用者可以把关注底层的精力更好的投入在其他方面。

hikari.js在架构上一定程度的借鉴了<a href="https://github.com/zh99998/OpenRGSS" target="_blank">OpenRGSS</a>。主要是参考需要实现哪些功能，一些对象应该展现哪些属性，程序上并无任何关联。

目前正处于开发阶段。

## 使用

引用./hikari.js

参考文档(工事中)

## 开发与编译

### 安装依赖环境

根目录下执行安装依赖包
```
npm install
```

### 编译环境
编译需要grunt。关于这是什么以及如何安装请参见<a href="https://gruntjs.com" target="_blank">Grunt.js</a>和Google。

根目录下执行
```
grunt   # 负责编译coffee/合并文件/监听改动
```

## 结构

> hikari.js -- 生成的文件
>
> hikari.min.js -- 生成文件压缩版
>
> Gruntfile.coffee -- grunt配置文件
>
> package.json -- npm的依赖包申明
>
> README.md
>
> ./src -- 源文件
>
> ./history -- 历史版本
>
> ./demo -- 演示程序

## TODO

音频 Audio

存储 Store

事件 Event

交互 Mutual

输入 INPUT

通讯 NETWORK