class Draw.Bitmap extends Draw

	__drawType: 'bitmap'
	__isDisposed: on
	entity: null
	__context: null

	__options:
		sourceX: 0
		sourceY: 0
		sourceWidth: 0
		sourceHeight: 0
		scaleX: 1
		scaleY: 1
		alpha: 1
		rotate: 0

	load: (src, callback)=>
		@entity = new Image()
		@entity.onload = ()=>
			@options
				sourceWidth: @entity.width
				sourceHeight: @entity.height
			callback this if typeof callback is 'function'
		@entity.src = src

	draw: (stage)=>
		@__context = stage.context if stage
		@__isDisposed = true
		@update()

	clone: ()=>
		newBitmap = new Bitmap @__width, @__height
		newBitmap.entity = @entity if @entity
		super newBitmap, this

	update: (_context)=>
		@__context = _context if _context
		return off unless @__isDisposed and @__context
		@__context.globalAlpha = @__options.alpha
		@__context.scale @__options.scaleX, @__options.scaleY
		@__context.rotate @__options.rotate
		@__context.drawImage @entity,
			@__options.sourceX, @__options.sourceY,
			@__options.sourceWidth, @__options.sourceHeight,
			@__x, @__y, @__width, @__height


	dispose: (value)=>
		@__isDisposed = value if value
		@__isDisposed

	destroy: ()=>
		delete @entity
		super()

	constructor: (width, height)->
		@__options =
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
		@entity = null
		@__context = null
		@reset()
		@width width
		@height height
		nextUpdate = @frequency