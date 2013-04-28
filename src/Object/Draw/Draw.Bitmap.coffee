class Draw.Bitmap extends Draw
	context = null

	drawType: 'bitmap'
	isDisposed: on
	entity: null

	options:
		sourceX: 0
		sourceY: 0
		sourceWidth: 0
		sourceHeight: 0
		transX: 0
		transY: 0
		scaleX: 1
		scaleY: 1
		alpha: 1
		rotate: 0

	load: (src, callback)=>
		@entity = new Image()
		@entity.onload = ()=>
			@options.sourceWidth = @entity.width
			@options.sourceHeight = @entity.height
			callback this
		@entity.src = src

	draw: (stage)=>
		context = stage.context if stage
		@isDisposed = true
		@update()

	clone: ()=>
		newBitmap = new Bitmap @width, @height
		newBitmap.entity = @entity.cloneNode() if @entity
		super newBitmap, this

	update: (_context)=>
		context = _context if _context
		return off unless @isDisposed and context
		context.globalAlpha = @options.alpha
		context.scale @options.scaleX, @options.scaleY
		context.transform @options.transX, @options.transY
		context.rotate @options.rotate
		context.drawImage @entity,
			@options.sourceX, @options.sourceY,
			@options.sourceWidth, @options.sourceHeight,
			@x, @y, @width, @height

	dispose: (value)=>
		@isDisposed = value if value
		@isDisposed

	destroy: ()=>
		delete @entity
		super()

	constructor: (width, height)->
		@width = width
		@height = height
		nextUpdate = @frequency