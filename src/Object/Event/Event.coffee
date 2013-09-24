class Event extends Object

	@id: 1
	@list: new Object()

	__type: 'event'
	__id: 0
	__action: null

	###
	# condition
	# 	keyPress:
	#		(int)identity
	#
	# 	hover || click
	#		scope(Rect|Circle)
	#		button(1|2|3)
	###
	condition: null
	eventType: ''	# keyPress|hover|click
	map: null
	priority: 0

	constructor: (eventType, condition, action) ->
		@__id = Event.id++
		@__action = action
		@eventType = eventType
		condition.button = 1 if eventType is 'click' and !condition.button
		@condition = condition
		Event.list[@__id] = this

	move: (dx, dy) =>
		return off unless @condition.scope
		@condition.scope.move dx, dy
		@map.modify this if @map

	exec: (next) =>
		@__action next

	destory: =>
		@map.revoke this if @map
		delete Event.list[@__id]
		super()
