class EventMap extends Object

	width: 0
	height: 0
	keyEvent: {}
	grid: 50
	mouseEvent: []

	sortEvent = (array)->
		array = array.sort (a, b)->
			Event.list[a].priority > Event.list[b].priority

	# 计算鼠标操作范围尺寸
	__detectScope: (scope)=>
		ret = []
		if scope.vectorType() is 'rect'
			x = scope.options.start.x
			y = scope.options.start.y
			width = scope.options.width
			height = scope.options.height
		else if scope.vectorType() is 'circle'
			x = scope.options.origin.x - scope.options.radius
			y = scope.options.origin.y - scope.options.radius
			width = x + scope.options.radius * 2
			height = y + scope.options.radius * 2
		else
			return ret
		x0 = parseInt x / @grid, 10
		y0 = parseInt y / @grid, 10
		x1 = parseInt (x + width) / @grid, 10
		y1 = parseInt (y + height) / @grid, 10

		for i in [y0..y1]
			for j in [x0..x1]
				ret.push [j, i]
		ret

	__triggerKeyPress: (keyCode)=>
		return if typeof @keyEvent[keyCode] is 'undefined'
		events = @keyEvent[keyCode].concat()
		@__exec events

	__triggerClick: (action)=>
		x = parseInt action.x / @grid, 10
		y = parseInt action.y / @grid, 10
		events = @mouseEvent[y][x].click[3].concat()
		events = events.concat @mouseEvent[y][x].click[1] if action.button is 0
		events = events.concat @mouseEvent[y][x].click[2] if action.button is 1

		i = 0
		while eventId = events[i]
			condition = Event.list[eventId].condition
			if condition.scope.isInside action.x, action.y
				i++
			else
				events.splice i, 1
		@__exec events

	__triggerHover: (action)=>
		x = parseInt action.x / @grid, 10
		y = parseInt action.y / @grid, 10
		events = @mouseEvent[y][x].hover.concat()

		i = 0
		while eventId = events[i]
			condition = Event.list[eventId].condition
			if condition.scope.isInside action.x, action.y
				i++
			else
				events.splice i, 1
		@__exec events

	__exec: (events)=>
		return unless events and events.length
		event = Event.list[events.pop()]
		return unless event.type() is 'event'
		event.exec ()=>
			@__exec events

	__pushEvent: (stack, eventId)=>
		stack.push eventId
		sortEvent stack

	register: (event)=>
		switch event.eventType
			when 'keyPress'
				if typeof @keyEvent[event.condition] is 'undefined'
					@keyEvent[event.condition] = new Array()
				@__pushEvent @keyEvent[event.condition], event.__id
			when 'hover'
				scope = @__detectScope event.condition.scope
				for item in scope
					@__pushEvent @mouseEvent[item[0]][item[1]].hover, event.__id
			when 'click'
				scope = @__detectScope event.condition.scope
				event.condition.button = 1 unless event.condition.button
				for item in scope
					@__pushEvent @mouseEvent[item[0]][item[1]].click[event.condition.button], event.__id
		event.map = this
		this

	revoke: (event)=>
		switch event.eventType
			when 'keyPress'
				i = @keyEvent[event.condition].indexOf event.__id
				@keyEvent[event.condition].splice i, 1 if i > -1
			when 'hover'
				for lines in @mouseEvent
					for event in lines
						i = event.hover.indexOf event.__id
						event.hover.splice i, 1 if i > -1
			when 'click'
				for lines in @mouseEvent
					for event in lines
						continue unless event.click[event.button] and event.click[event.button].length
						i = event.click[event.button].indexOf event.__id
						event.click[event.button].splice i, 1 if i > -1


	trigger: (type, action)=>
		switch type
			when 'keyPress'
				@__triggerKeyPress action.identity
				break
			when 'click'
				@__triggerClick action
				break
			when 'hover'
				@__triggerHover action
				break

	modify: (event)=>
		@revoke event
		@register event

	constructor: (width, height, grid)->
		@width = width
		@height = height
		@keyEvent = {}
		@mouseEvent = []

		@grid = grid if grid
		lineCount = Math.ceil width / @grid
		rowCount = Math.ceil height / @grid
		for r in [0...rowCount]
			@mouseEvent[r] = new Array lineCount
			for l in [0...lineCount]
				@mouseEvent[r][l] =
					click:
						'1': []	# 左键
						'2': []	# 右键
						'3': []	# 左键 or 右键
					hover:[]