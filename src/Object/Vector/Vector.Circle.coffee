class Vector.Circle extends Vector

	__vectorType: 'circle'
	options:
		origin:
			x: 0
			y: 0
		radius: 0

	isInSide: (x, y)=>
		Math.pow((@options.x - x), 2) + Math.pow((@options.y - y), 2) <= options.radius * options.radius

	constructor: (origin, radius) ->
		@options = {}
		@options.origin = origin
		@options.radius = radius