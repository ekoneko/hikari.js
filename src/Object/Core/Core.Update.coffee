class Core.Update extends Core
	functions: new Object()

	bind: (name, func) =>
		functions[name] = func if typeof func is 'function'

	unbind: (name) =>
		delete functions[name]

	update: =>
			func.call() for func in @functions \
				when typeof func is 'function'