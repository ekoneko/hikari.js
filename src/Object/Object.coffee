class Object

	type: =>
		@__type or 'object'

	get: (key) =>
		this[key]

	set: (options) =>
		this[key] = options[key] for key of options \
			when this[key] isnt 'undefined'
		on

	destroy: =>
		delete this