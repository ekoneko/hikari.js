class Vector.Rect extends Vector

	__vectorType: 'rect'

	init = (self)->
		self.__options =
			start: 
				x: 0
				y: 0
			width: 0
			height: 0

	isInside: (x, y)=>
		if x < @__options.start.x or
		x > @__options.start.x + @__options.start.width or
		y < @__options.start.y or
		y > @__options.start.y + @__options.start.height
			off
		on

	move: (dx, dy)=>
		@__options.start.x += dx
		@__options.start.y += dy
		this

	constructor: (start, width, height) ->
		init this

		@__options.start = start
		@__options.width = width
		@__options.height = height