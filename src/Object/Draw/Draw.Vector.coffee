class Draw.Vector extends Draw

	# TIPS: about strokeStyle:
	# 	http://www.w3schools.com/tags/canvas_strokestyle.asp
	__drawType: 'vector'
	__isDisposed: on
	__options:
		lineWidth: 1
		strokeStyle: 'black' # color|gradient|pattern
		lineCap: 'butt'
		fillStyle: 'black'
		alpha: 1

	vector: []

	__updateLine: (vector)=>
		@__context.moveTo vector.options.start.x + @__x, vector.options.start.y + @__y
		@__context.lineTo vector.options.end.x + @__x, vector.options.end.y + @__y

	__updateRect: (vector)=>
		@__context.rect vector.options.start.x + @__x, vector.options.start.y + @__y,
		vector.options.width, vector.options.height

	draw: (stage)=>
		@__stage = stage
		@__context = stage.context if stage
		@__isDisposed = on
		@update()

	update: (context)=>
		@__context = context if context
		@__context.beginPath()
		for vector in @vector
			switch vector.vectorType()
				when 'line'
					@__updateLine vector
					break
				when 'rect'
					@__updateRect vector
		@__context.lineWidth = @__options.lineWidth
		@__context.strokeStyle = @__options.strokeStyle
		@__context.lineCap = @__options.lineCap
		@__context.fillStyle = @__options.fillStyle
		@__context.globalAlpha = @__options.alpha
		@__context.closePath()
		@__context.stroke()
		@__context.fill()

		# reset
		@__context.globalAlpha = 1

	append: (v)=>
		if v.type() is 'vector'
			@vector.push v
			@__stage.needUpdate = on if @__stage
		this

	constructor: (x, y)->
		@vector = []
		@__stage = null
		@__options = 
			lineWidth: 1
			strokeStyle: 'black' # color|gradient|pattern
			lineCap: 'butt'
			fillStyle: 'black'
			alpha: 1

		@x x
		@y y