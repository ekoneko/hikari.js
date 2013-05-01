class Vector.Line extends Vector

	vectorType: 'line'
	options:
		start:
			x: 0
			y: 0
		end:
			x: 0
			y: 0

	constructor: (start, end) ->
		@options = {}
		@options.start = start
		@options.end = end