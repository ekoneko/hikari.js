class HTML extends Object
	type: 'html'
	tag: null
	element: null
	stage: null
	onStage: off

	append: ()=>
		@stage.box.appendChild @element
		@onStage = on

	remove: ()=>
		return unless @onStage
		@stage.box.removeChild @element
		@onStage = off

	build: (options, callback)=>