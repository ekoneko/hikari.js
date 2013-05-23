class Draw.Bitmap extends Draw

	__drawType: 'bitmap'

	init = (self)->
		self.__isDisposed = on
		self.__context = null
		self.__options =
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
		self.entity = null

	load: (src, callback)=>
		@entity = new Image()
		@entity.onload = ()=>
			@__width = @entity.width
			@__height = @entity.height
			callback this if typeof callback is 'function'
		@entity.src = src

	draw: (stage)=>
		@__stage = stage
		@__context = stage.context if stage
		@__isDisposed = true
		@update()

	clone: ()=>
		newBitmap = new Bitmap @__width, @__height
		newBitmap.entity = @entity if @entity
		super newBitmap, this

	update: (_context, x, y, width, height)=>
		@__context = _context if _context
		return off unless @__isDisposed and @__context
		x ?= 0
		y ?= 0
		width ?= @__width
		height ?= @__height
		@__context.globalAlpha = @__options.alpha
		@__context.scale @__options.scaleX, @__options.scaleY
		@__context.rotate @__options.rotate
		@__context.drawImage @entity,
			x, y, width, height,
			@__x, @__y, @__width, @__height

	destroy: ()=>
		delete @entity
		super()

	constructor: (width, height)->
		init this

		@width width
		@height height
		nextUpdate = @frequency