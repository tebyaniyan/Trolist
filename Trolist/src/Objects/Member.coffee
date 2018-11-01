module.exports = class Member

	constructor: (memberData)->

		@id = memberData.id
		
		@name = memberData.fullName
		
		@type = memberData.memberType
		
		@url = memberData.url
		
		@status = memberData.status
		
		@bio = memberData.bio
		
		@username = memberData.username
		
		@trelloObj = memberData
		
		@isAdmin = -> this.type is "admin"