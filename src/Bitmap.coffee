class Bitmap extends Object
	context = null
	drawCache = []

	is: 'bitmap'
	isDisposd: off
	entity: null
	sourceX: 0
	sourceY: 0
	sourceWidth: 0
	sourceHeight: 0
	x: 0
	y: 0
	z: 0
	width: 0
	height: 0
	transX: 0
	transY: 0
	scaleX: 1
	scaleY: 1
	alpha: 1
	rotate: 0

	load: (src, callback)=>
		@entity = new Image()
		@entity.onload = ()=>
			@sourceWidth = @entity.width
			@sourceHeight = @entity.height
			callback this
		@entity.src = src

	draw: (_context)=>
		context = _context
		@isDisposd = true
		@update

	clone: ()=>
		newBitmap = new Bitmap @width, @height
		field = ['sourceX', 'sourceY', 'sourceWidth', 'sourceHeight',
			'x', 'y','z', 'width', 'height', 'transX', 'transY',
			'scaleX', 'scaleY', 'alpha', 'rotate']
		newBitmap[key] = this[key] for key in field
		newBitmap.entity = @entity.cloneNode() if @entity

	drawLine: ()=>
		# TODO

	drawRect: ()=>
		# TODO

	drawCircle: ()=>
		# TODO

	drawArc: ()=>
		# TODO

	update: ()=>
		return off unless @isDisposd and context
		context.globalAlpha = @alpha
		context.transform @transX, @transY
		context.rotate @rotate
		context.drawImage @entity,
			@sourceX, @sourceY, @sourceWidth, @sourceHeight,
			@x, @y, @width, @height

	dispose: (value)=>
		@isDisposd = value if value
		@isDisposd

	destroy: ()=>
		delete this

	constructor: (width, height)->
		@width = width
		@height = height
		nextUpdate = @frequency