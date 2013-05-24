class Draw.Sprite extends Draw

	zAutoIncrement = 0
	
	__drawType: 'sprite'

	__tone: null	# Tone
	__bitmap: null
	__canvas: null
	__context: null
	__imageData: null
	__isDisposed: off
	__imageChanged: off
	__toneChanged: off
	__options:
		bx: 0	# bitmap x
		by: 0	# bitmap y
		bw: 0	# bitmap width
		bh: 0	# bitmap height

	__updateCanvas: ()=>
		cache = @__canvas.getContext '2d'
		cache.restore()
		cache.save()
		cache.clearRect 0, 0, @__width, @__height
		if @__bitmap and @__bitmap.dispose()
			@__bitmap.update cache
		@__imageChanged = off
		cache

	__updateImageData: ()=>
		return unless @__tone and !@__tone.noChange
		i = 0
		while i < @__imageData.data.length
			data = @__tone.mix @__imageData.data[i],
				@__imageData.data[i + 1],
				@__imageData.data[i + 2],
				@__imageData.data[i + 3]

			@__imageData.data[i] = data[0]
			@__imageData.data[i + 1] = data[1]
			@__imageData.data[i + 2] = data[2]
			@__imageData.data[i + 3] = data[3]
			i += 4
		@__toneChanged = off
		true

	tone: (t)=>
		if t and t.type() is 'datatype' and t.dataType() is 'tone'
			@__tone = t
			@__toneChanged = on
			@__stage.needUpdate = on if @__stage
		@__tone

	bitmap: (bitmap, x, y, width, height)=>
		if bitmap and bitmap.type() is 'draw' and bitmap.drawType() is 'bitmap'
			@__options.bx = x if x
			@__options.by = y if y
			@__options.bw = width if width
			@__options.bh = height if height

			@__width = @__options.bw or bitmap.width() unless @__width
			@__height = @__options.bh or bitmap.height() unless @__height
			@__bitmap = bitmap
			@__imageChanged = on
			@__stage.needUpdate = on if @__stage
		@__bitmap

	draw: (stage)=>
		@__stage = stage
		@__context = stage.context
		@__isDisposed = on
		if @__canvas is null
			@__canvas = document.createElement 'canvas'
			@__canvas.width = @__width
			@__canvas.height = @__height
		@update()

	update: (_context)=>
		@__context = _context if _context
		return off unless @__isDisposed and @__context

		if @__imageChanged
			cache = @__updateCanvas this
			@__imageData = cache.getImageData(0, 0, @__width, @__height)
			@__updateImageData this
		else if @__toneChanged
			@__updateImageData this

		if @__imageData
			ret =
				map: @__imageData.data
				x: @__x
				y: @__y
				width: @__width
				height: @__height
		else
			ret = off

	offset: (dx, dy)=>
		dx = @__options.bw * dx if dx < 1
		dy = @__options.bh * dy if dy < 1
		@__options.bx += dx % @__options.bw
		@__options.bx -= @__options.bw if @__options.bx > @__options.bw
		@__options.bx += @__options.bw if @__options.bx < 0
		@__options.by += dy % @__options.bh
		@__options.by -= @__options.bh if @__options.by > @__options.bh
		@__options.by += @__options.bh if @__options.by < 0

	clone: ()=>
		dest = new Draw.Sprite()
		dest = super dest, this
		dest.bitmap @__bitmap.clone()
		dest

	constructor: (width, height, x, y)->
		@__tone = @__stage = @__bitmap = @__canvas = @__context = @__imageData = null
		@__isDisposed = @__imageChanged = @__toneChanged = off
		@__options =
			bx: 0
			by: 0
			bw: 0
			bh: 0

		@width width
		@height height
		@x x
		@y y
		@z zAutoIncrement++