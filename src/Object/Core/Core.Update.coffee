class Core.Update extends Core
	functions: null
	bind: (name, func)=>
		functions[name] = func if typeof func is 'function'

	unbind: ()=>
		delete functions[name]

	update: ()=>

		for func in @functions
			func() if typeof func is 'function'
	constructor: () ->
		@functions = {}