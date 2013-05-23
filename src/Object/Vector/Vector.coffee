class Vector extends Object

	__type: 'vector'
	__options: {}

	vectorType: ()=>
		@__vectorType

	isInside: (x, y)=>

	move: (dx, dy)=>

	options: (_options)=>
		if _options
			for key of _options
				unless typeof @__options[key] is 'undefined'
					@__options[key] = _options[key]
		@__options