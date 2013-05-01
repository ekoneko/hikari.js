class DateType extends Object

	type: 'datetype'
	dataType: ''

	clone: (dest, src)=>
		dest.options = src.options
		dest

	