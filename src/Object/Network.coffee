class Network extends Object
	socket: null
	constructor: (address, callback) ->
		@socket = null

		@socket = new io.connect address
		