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
	#		scope(Rect|Circle)
	#		button(1|2|3)
	###
	condition: null
	map: null
	priority: 0

	move: (dx, dy)=>
		return off unless @condition.scope
		@condition.scope.move dx, dy

		@map.modify this if @map

	exec: (next)=>
		@__action next

	revoke: ()=>
		return off unless @map
		@map.revoke this
		true

	constructor: (eventType, condition, action)->
		@map = @condition = @__action = null

		@__action = action
		@eventType = eventType
		condition.button = 1 if eventType is 'click' and !condition.button
		@condition = condition

		@__id = Event.id++
		Event.list[@__id] = this