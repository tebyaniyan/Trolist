module.exports = class Label

	constructor: (labelData)->

		@id = labelData.id
		
		@name = labelData.name
		
		@uses = labelData.uses
		
		@color = labelData.color
		