class HTML extends Object

	__type: 'html'
	tag: null
	element: null
	stage: null
	onStage: off

	htmlType: ()=>
		@__htmlType

	append: (stage)=>
		@stage = stage if stage and stage.type is 'stage'
		@stage.box.appendChild @element
		@onStage = on

	remove: ()=>
		return unless @onStage
		@stage.box.removeChild @element
		@onStage = off

	build: (options, callback)=>