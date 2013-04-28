class Object
	type: 'object'
	set: (options)=>
		for key of options
			if typeof this[key] isnt 'undefined'
				this[key] = options[key]
		true

	destroy: ()=>
		delete this