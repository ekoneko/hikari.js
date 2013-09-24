class Animate extends Object
	
	@id: 1
	@list: new Object()
	@update: () =>
		@list[id].update() for id of @list

	__id: null
	__type: 'animate'
	__animateType: ''
	__start: off

	constructor: ->
		@__id = Animate.id++
		Animate.list[@__id] = this

	animateType: =>
		@__animateType

	start: =>

	update: =>

	running: =>
		@__start

	destory: ->
		delete Animate.list[@__id]
		super()