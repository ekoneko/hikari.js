class @Hikari
	frame = 0
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

	update: ()=>
		# do something
		setTimeout ()=>
			@update
		, frame

	constructor: (_frame, container, width, height, callback)->
		# 设置全局变量
		global()
		# 创建一个Stage(绘制canvas)
		@stage = new Stage width, height, container
		# 加载资源

		# 刷新
		frame = _frame
		@update()
		callback() if typeof callback is 'function'