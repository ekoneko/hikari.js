class Vector extends Object

	setOptions: (_options)=>
		for key of _options
			unless typeof options[key] is 'undefined'
				options[key] = _options[key]
		true