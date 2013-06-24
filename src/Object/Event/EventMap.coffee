class EventMap extends Object

	init = (self)->
		self.width = 0
		self.height = 0
		self.grid = 50
		self.keyEvent = {}
		self.mouseEvent = []

	sortEvent = (array)->
		array = array.sort (a, b)->
			Event.list[a].priority > Event.list[b].priority

	# 计算鼠标操作范围尺寸
	__detectScope: (scope)=>
		ret = []
		if scope.vectorType() is 'rect'
			x = scope.__options.start.x
			y = scope.__options.start.y
			width = scope.__options.width
			height = scope.__options.height
		else if scope.vectorType() is 'circle'
			x = scope.__options.origin.x - scope.__options.radius
			y = scope.__options.origin.y - scope.__options.radius
			width = x + scope.__options.radius * 2
			height = y + scope.__options.radius * 2
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
		list = @mouseEvent[x][y].click
		events = list[3].concat()
		events = events.concat list[1] if action.button is 0
		events = events.concat list[2] if action.button is 1

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
		events = @mouseEvent[x][y].hover.concat()

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
		return unless stack or stack.length
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
					continue unless @mouseEvent[item[0]] and @mouseEvent[item[0]][item[1]]
					@__pushEvent @mouseEvent[item[0]][item[1]].hover, event.__id
			when 'click'
				scope = @__detectScope event.condition.scope
				event.condition.button = 1 unless event.condition.button
				for item in scope
					continue unless @mouseEvent[item[0]] and @mouseEvent[item[0]][item[1]]
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
					for item in lines
						i = item.hover.indexOf event.__id
						item.hover.splice i, 1 if i > -1
			when 'click'
				for lines in @mouseEvent
					for item in lines
						continue unless item.click[event.condition.button] and item.click[event.condition.button].length
						i = item.click[event.condition.button].indexOf event.__id
						item.click[event.condition.button].splice i, 1 if i > -1
		this


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
		init this

		@grid = grid if grid
		lineCount = Math.ceil width / @grid
		rowCount = Math.ceil height / @grid
		for l in [0...lineCount]
			@mouseEvent[l] = new Array rowCount
			for r in [0...rowCount]
				@mouseEvent[l][r] =
					click:
						'1': []	# 左键
						'2': []	# 右键
						'3': []	# 左键 or 右键
					hover:[]