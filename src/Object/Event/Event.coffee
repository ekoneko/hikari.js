class Event extends Object

	@id: 1
	@list: {}

	__type: 'event'

	init = (self)->
		self.__id = Event.id++
		self.__action = null

		###
		# condition
		# 	keyPress:
		#		(int)identity
		#
		# 	hover || click
		#		scope(Rect|Circle)
		#		button(1|2|3)
		###
		self.condition = null
		self.eventType = ''	# keyPress|hover|click
		self.map = null
		self.priority = 0

	move: (dx, dy)=>
		return off unless @condition.scope
		@condition.scope.move dx, dy

		@map.modify this if @map

	exec: (next)=>
		@__action next

	destory: ()=>
		@map.revoke this if @map
		delete Event.list[@__id]
		super()

	constructor: (eventType, condition, action)->
		init this

		@__action = action
		@eventType = eventType
		condition.button = 1 if eventType is 'click' and !condition.button
		@condition = condition
		Event.list[@__id] = this