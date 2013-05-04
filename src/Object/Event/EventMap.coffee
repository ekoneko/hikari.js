class EventMap extends Object

	width: 0
	height: 0
	keyEvent: {}
	table: []

	__triggerKeyPress: (keyCode)=>
		return unless @keyEvent[keyCode]
		for eventId in @keyEvent[keyCode]
			Event.list[eventId].exec()

	__triggerClick: (event)=>

	__triggerHover: (event)=>

	register: (event)=>
		switch event.eventType
			when 'keyPress'
				@keyEvent[event.condition] = [] unless @keyEvent[event.condition]
				@keyEvent[event.condition].push event.__id
				break
			when 'hover'
				break
			when 'click'
				break
				# TODO: 要计算event尺寸

	revoke: (event)=>
		switch event.eventType
			when 'keyPress'
				delete @keyEvent[event.condition][event.__id]

	trigger: (type, event)=>
		switch type
			when 'keyPress'
				@__triggerKeyPress event.identity
				break
			when 'click'
				@__triggerClick event
				break
			when 'hover'
				@__triggerHover event
				break

	constructor: (width, height, grid)->
		@width = width
		@height = height
		@keyEvent = {}
		@table = []

		grid = grid or 50
		lineCount = Math.ceil width / grid
		rowCount = Math.ceil height / grid
		for r in [0...rowCount]
			@table[r] = new Array lineCount
			for l in [0...lineCount]
				@table[r][l] =
					click: []
					over:[]