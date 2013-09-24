class Vector.Rect extends Vector

	__vectorType: 'rect'
	__options =
		start: 
			x: 0
			y: 0
		width: 0
		height: 0

	constructor: (start, width, height) ->
		@__options.start = start
		@__options.width = width
		@__options.height = height

	isInside: (x, y) =>
		if x < @__options.start.x or
		x > @__options.start.x + @__options.start.width or
		y < @__options.start.y or
		y > @__options.start.y + @__options.start.height
			return off
		on

	move: (dx, dy) =>
		@__options.start.x += dx
		@__options.start.y += dy
		this

	clone: =>
		new Vector.Rect @__options.start, @__options.width, @__options.height
