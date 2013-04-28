class Draw extends Object
	type: 'draw'
	options: {}
	x: 0
	y: 0
	z: 0

	setOptions: (_options)=>
		for key of _options
			unless typeof @options[key] is 'undefined'
				@options[key] = _options[key]
		true

	clone: (desc, src)=>
		for key in ['options', 'x', 'y', 'z']
			desc[key] = src[key]
		desc