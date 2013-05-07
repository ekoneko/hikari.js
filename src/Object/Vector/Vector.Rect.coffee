class Vector.Rect extends Vector

	__vectorType: 'rect'
	options:
		start: 
			x: 0
			y: 0
		width: 0
		height: 0

	isInside: (x, y)=>
		if x < @options.start.x or
		x > @options.start.x + @options.start.width or
		y < @options.start.y or
		y > @options.start.y + @options.start.height
			off
		on

	move: (dx, dy)=>
		@options.start.x += dx
		@options.start.y += dy

	constructor: (start, width, height) ->
		@options = {}
		@options.start = start
		@options.width = width
		@options.height = height