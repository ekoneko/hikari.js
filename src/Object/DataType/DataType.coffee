class DataType extends Object

	__type: 'datatype'
	__options: {}

	dataType: ()=>
		@__dataType

	clone: (dest, src)=>
		dest.__options = src.__options
		dest
