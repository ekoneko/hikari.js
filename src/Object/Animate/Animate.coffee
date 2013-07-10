class Animate extends Object
	
	@id: 1
	@list: {}

	@update: ()=>
		@list[id].update() for id of @list

	__type: 'animate'
	__animateType: ''
	__start: off

	animateType: ()->
		__animateType

	start:()=>

	update: ()=>

	running: ()=>
		@__start

	destory: ()->
		delete Animate.list[@__id]
		super()

	constructor: ()->
		@__id = Animate.id++
		Animate.list[@__id] = this