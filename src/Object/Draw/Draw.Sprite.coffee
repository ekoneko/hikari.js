class Draw.Sprite extends Draw
	
	__drawType: 'sprite'

	zAutoIncrement = 0

	__tone: null	# Tone
	__list: []
	__canvas: null
	__context: null
	__imageData: null
	__isDisposed: off
	__imageChanged: off
	__toneChanged: off

	sort = (list)->
		list.sort (a,b)->
			a.z() > b.z()

	__updateCanvas: ()=>
		cache = @__canvas.getContext '2d'
		cache.restore()
		cache.save()
		cache.clearRect 0, 0, @__width, @__height
		@__list = sort @__list
		i = 0
		while item = @__list[i] 
			unless item and item.__isDisposed
				@__list.splice i, 1
			else
				item.update cache
				i++

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

	append: (image)=>
		return if image.type() isnt 'draw' and image.drawType() is 'sprite'
		@__width = image.width() + image.x() unless @__width
		@__height = image.height() + image.y() unless @__height
		@z zAutoIncrement++
		@__list.push image
		@__imageChanged = on
		@__stage.needUpdate = on if @__stage

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

	clone: ()=>
		dest = new Draw.Sprite()
		dest = super dest, this
		dest.append item.clone() for item in @__list
		dest

	dispose: (value)=>
		if value
			@__isDisposed = value
			@__stage.needUpdate = on if @__stage
		@__isDisposed

	constructor: (width, height, x, y)->
		@__tone = null	# Tone
		@__stage = null
		@__list = []
		@__canvas = null
		@__context = null
		@__imageData = null
		@__isDisposed = off
		@__imageChanged = off
		@__toneChanged = off
		@width width
		@height height
		@x x
		@y y