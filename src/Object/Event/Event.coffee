class Event extends Object

	@id: 1
	@list: {}

	__type: 'event'
	__id: 0
	__action: null

	eventType: ''	# keyPress|hover|click
	###
	# @condition
	# 	keyPress:
	#		(int)identity
	#
	# 	hover || click
	# 		x
	#		y
	#		size(Rect|Circle)
	###
	condition: null
	map: null

	move: (x, y)=>
		@x = x
		@y = y
		@map.modify @__id if @map

	exec: (params)=>
		@__action params

	constructor: (eventType, condition, action)->
		@map = @condition = @__action = null

		@eventType = eventType
		@condition = condition
		@__action = action

		@__id = Event.id++
		Event.list[@__id] = this