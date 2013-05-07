class Vector.Circle extends Vector

	__vectorType: 'circle'
	options:
		origin:
			x: 0
			y: 0
		radius: 0

	isInside: (x, y)=>
		Math.pow((@options.x - x), 2) + Math.pow((@options.y - y), 2) <= options.radius * options.radius

	move: (dx, dy)=>
		@options.origin.x += dx
		@options.origin.y += dy

	constructor: (origin, radius) ->
		@options = {}
		@options.origin = origin
		@options.radius = radius