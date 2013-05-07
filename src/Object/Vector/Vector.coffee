class Vector extends Object

	__type: 'vector'

	vectorType: ()=>
		@__vectorType

	isInSide: ()=>

	setOptions: (_options)=>
		for key of _options
			unless typeof options[key] is 'undefined'
				options[key] = _options[key]
		true