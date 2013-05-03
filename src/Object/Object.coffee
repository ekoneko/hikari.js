class Object

	type: ()=>
		@__type or 'object'

	get: (key)=>
		this[key]

	set: (options)=>
		for key of options
			if typeof this[key] isnt 'undefined'
				this[key] = options[key]
		true

	destroy: ()=>
		delete this