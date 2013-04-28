class Draw.Sprite extends Draw
	canvas = context = null
	list = []
	drawType: 'sprite'
	isDisposed: off
	x: 0
	y: 0
	z: 0
	width: 0
	height: 0

	sort = (list)->
		list.sort (a,b)->
			a.z > b.z

	append: (image)=>
		return if image.type isnt 'draw' and image.drawType is 'sprite'
		@width = image.width + image.x unless @width
		@height = image.height + image.y unless @height
		list.push image

	draw: (stage)=>
		context = stage.context
		@isDisposed = on
		if canvas is null
			canvas = document.createElement 'canvas'
			canvas.width = @width
			canvas.height = @height
		@update()

	update: (_context)=>
		context = _context if _context
		return off unless @isDisposed and context
		cache = canvas.getContext '2d'
		list = sort list
		for item in list
			continue unless item.isDisposed
			item.update cache
		pixels = cache.getImageData 0, 0, @width, @height
		context.putImageData pixels, @x, @y

	dispose: (value)=>
		@isDisposed = value if value
		@isDisposed

	constructor: (width, height, x, y)->
		@width = width if width
		@height = height if height
		@x = x if x
		@y = y if y