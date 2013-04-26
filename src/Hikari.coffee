class @Hikari
	is: 'hikari'
	global = =>
		@Audio		= Audio
		@Bitmap		= Bitmap
		@Sprite		= Sprite
		@Event		= Event
		@Graphics	= Graphics
		@Keyboard	= Keyboard
		@Mouse		= Mouse
		@NetWork	= Network
		@Window		= Window

	init = ->
		r = window.requestAnimationFrame or
		window.webkitRequestAnimationFrame or
		window.mozRequestAnimationFrame or
		window.oRequestAnimationFrame or
		window.msRequestAnimationFrame or
		setTimeout (callback)->
			callback()
		, 60
		window.requestAnimationFrame = r

	update: ()=>
		@stage.update()
		@update()
			

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

		callback() if typeof callback is 'function'