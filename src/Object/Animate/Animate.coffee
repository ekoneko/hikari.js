class Animate extends Object
	
	@id: 1
	@list: {}

	@update: ()=>
		item.update() for item in @list

	__type: 'animate'
	__animateType: ''

	animateType: ()->
		__animateType

	start:()=>

	update: ()=>

	destory: ()->
		delete Animate.list[@__id]
		super()

	constructor: ()->
		@__id = Animate.id++
		Animate.list[@__id]