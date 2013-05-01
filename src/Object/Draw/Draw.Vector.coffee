class Draw.Vector extends Draw
	drawType: 'vector'
	# TIPS: about strokeStyle:
	# 	http://www.w3schools.com/tags/canvas_strokestyle.asp
	__isDisposed: on
	__options:
		lineWidth: 1
		strokeStyle: 'black' # color|gradient|pattern
		lineCap: 'butt'
		fillStyle: 'black'
	vector: []

	draw: (stage)=>
		@__context = stage.context if stage
		@__isDisposed = on
		@update()

	update: (context)=>
		@__context = context if context
		@__context.beginPath()
		for vector in @vector
			switch vector.vectorType
				when 'line'
					@__updateLine vector
					break
				when 'rect'
					@__updateRect vector
		@__context.lineWidth = @__options.lineWidth
		@__context.strokeStyle = @__options.strokeStyle
		@__context.lineCap = @__options.lineCap
		@__context.fillStyle = @__options.fillStyle
		@__context.closePath()
		@__context.stroke()

	__updateLine: (vector)=>
		@__context.moveTo vector.options.start.x, vector.options.start.y
		@__context.lineTo vector.options.end.x, vector.options.end.y

	__updateRect: (vector)=>
		@__context.rect vector.options.start.x, vector.options.start.y,
		vector.options.width, vector.options.height

	append: (v)=>
		if v.vectorType
			@vector.push v
		this

	constructor: ()->
		@__options = 
			lineWidth: 1
			strokeStyle: 'black' # color|gradient|pattern
			lineCap: 'butt'
			fillStyle: 'black'