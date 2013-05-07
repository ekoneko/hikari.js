class Vector.Line extends Vector

	__vectorType: 'line'
	options:
		start:
			x: 0
			y: 0
		end:
			x: 0
			y: 0

	isInside: (x, y)->
		off

	move: (dx, dy)=>
		@options.start.x += dx
		@options.start.y += dy

		@options.end.x += dx
		@options.end.y += dy

	constructor: (start, end) ->
		@options = {}
		@options.start = start
		@options.end = end