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

	vector: new Array()

	constructor: (x, y) ->
		@x x
		@y y

	draw: (stage) =>
		@__stage = stage
		@__context = stage.context if stage
		@__isDisposed = on
		@update()

	update: (context) =>
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

	append: (v) =>
		if v.type() is 'vector'
			@vector.push v
			@__stage.needUpdate = on if @__stage
		this

	clone: =>
		newVector = new Draw.Vector @__x, @__y
		newVector.__options[i] = @__options[i] for i of newVector.__options
		newVector.vector.push vector.clone() for vector in @vector
		newVector

	__updateLine: (vector) =>
		@__context.moveTo vector.__options.start.x + @__x, vector.__options.start.y + @__y
		@__context.lineTo vector.__options.end.x + @__x, vector.__options.end.y + @__y

	__updateRect: (vector) =>
		@__context.rect vector.__options.start.x + @__x, vector.__options.start.y + @__y,
		vector.__options.width, vector.__options.height
