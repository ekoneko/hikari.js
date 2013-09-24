class Draw.Bitmap extends Draw

	__drawType: 'bitmap'
	__isDisposed: on
	__context: null
	__options:
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

	entity: null

	constructor: (width, height) ->
		@width width
		@height height
		nextUpdate = @frequency

	load: (src, callback) =>
		@entity = new Image()
		@entity.onload = =>
			@__width ?= @entity.width
			@__height ?= @entity.height
			callback this if typeof callback is 'function'
		@entity.src = src

	draw: (stage) =>
		@__stage = stage
		@__context = stage.context if stage
		@__isDisposed = true
		@update()

	clone: =>
		newBitmap = new Bitmap @__width, @__height
		newBitmap.entity = @entity.cloneNode() if @entity
		newBitmap.__options[i] = @__options[i] for i of newBitmap.__options
		newBitmap

	update: (_context, x = 0, y = 0, width = @__width, height = @__height) =>
		@__context = _context if _context
		return off unless @__isDisposed and @__context
		@__context.globalAlpha = @__options.alpha
		@__context.scale @__options.scaleX, @__options.scaleY
		@__context.rotate @__options.rotate
		@__context.drawImage @entity,
			@__x, @__y, @__width, @__height,
			x, y, width, height

	destroy: =>
		delete @entity
		super()
