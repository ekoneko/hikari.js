class @Hikari
	type: 'hikari'
	__delay: null
	times: 0
	fps: 0
	global = =>
		@Audio		= Audio
		@Draw		= Draw
		@HTML		= HTML
		@DateType	= DateType
		@Vector		= Vector
		@Event		= Event
		@Keyboard	= Keyboard
		@Mouse		= Mouse
		@NetWork	= Network

	init: =>
		@__delay = (callback)->
			setTimeout ()->
				callback()
			, @times

	update: ()=>
		@stage.update()
		@__delay @update
			

	constructor: (container, width, height, callback)->
		@fps = 30
		@times = 1000 / 30

		# 设置全局变量
		global()
		# 初始化
		@init()
		# 创建一个Stage(绘制canvas)
		@stage = new Stage width, height, container
		# 加载资源

		# 刷新
		@update()

		callback this if typeof callback is 'function'