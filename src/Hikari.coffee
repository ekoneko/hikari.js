class @Hikari
	delay = null
	type: 'hikari'
	global = =>
		@Audio		= Audio
		@Draw		= Draw
		@HTML		= HTML
		@Event		= Event
		@Keyboard	= Keyboard
		@Mouse		= Mouse
		@NetWork	= Network

	init = ->
		delay = (callback)->
			setTimeout ()->
				callback()
			, 60

	update: ()=>
		@stage.update()
		delay @update
			

	constructor: (container, width, height, callback)->
		# 设置全局变量
		global()
		# 初始化
		init()
		# 创建一个Stage(绘制canvas)
		@stage = new Stage width, height, container
		# 加载资源

		# 刷新
		@update()

		callback this if typeof callback is 'function'