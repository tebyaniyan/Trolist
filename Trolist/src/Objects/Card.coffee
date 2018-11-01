api = require "../Utilites/trelloAPI"

module.exports = class Card

	constructor: (cardData, @board)->

		@id = cardData.id
		
		@name = @text = cardData.name
		
		@desc = cardData.desc
		
		@members = []
		
		@labels = []
		
		@trelloObj = cardData

		@members.push @board.getMember memberId for memberId in cardData.idMembers

		@labels.push @board.getLabel labelId for labelId in cardData.idLabels

	getParent: ->

		@board.getList @trelloObj.idList

	getMember: (id)->

		if typeof id is "string"

			return member for member in @members when member.id is id

			return undefined

		return this.members[id]

	getMemberByUsername: (username)->

		return member for member in @members when member.username is username

		return undefined

	eachMember: (eachFunc)->

		eachFunc member for member in @members

		@

	getLabel: (id)->

		if typeof id is "string"

			return label for label in @labels when label.id is id

			return undefined

		return this.labels[id]

	getLabelByColor: (color)->

		return label for label in @labels when label.color is color

		return undefined

	getLabelByName: (name)->

		return label for label in @labels when label.name is name

		return undefined

	eachLabel: (eachFunc)->

		eachFunc label for label in @labels

		@

	setName: (text, onSuccess = ->)->

		API = new api "/cards/#{@id}",

			name: text

		API.run "PUT", => @board.refresh => do onSuccess

		@

	setText: (text, onSuccess)-> @setName text, onSuccess

	setDescription: (desc, onSuccess = ->)->

		API = new api "/cards/#{@id}",

			desc: desc

		API.run "PUT", => @board.refresh => do onSuccess

		@

	moveTo: (newList, onSuccess = ->) ->

		API = new api "/cards/#{@id}",

			idList: newList.id

		API.run "PUT", => @board.refresh => do onSuccess
		
		@

	remove: (onSuccess = ->) ->

		API = new api "/cards/#{@id}"

		API.run "DELETE", => @board.refresh => do onSuccess

		@

	archive: (onSuccess = ->) ->

		API = new api "/cards/#{@id}/closed",

			value: true

		API.run "PUT", => @board.refresh => do onSuccess

		@

	addMember: (member, onSuccess = ->) ->

		member = id: member if typeof member is "string"

		membersStr = ""
		
		membersStr += "#{_member.id}," for _member in @members

		membersStr += member.id

		API = new api "/cards/#{@id}",

			idMembers: membersStr

		API.run "PUT", => @board.refresh => do onSuccess

		@

	removeMember: (member, onSuccess = ->) ->
		
		member = id: member if typeof member is "string"

		membersStr = ""
		
		membersStr += "#{_member.id}," for _member in @members

		if membersStr.indexOf member.id isnt -1

			membersStr = membersStr.replace(member.id + ',', '').replace member.id, ''

			API = new api "/cards/#{@id}",

				idMembers: membersStr

			API.run "PUT", => @board.refresh => do onSuccess

		@

	addLabel: (label, onSuccess = ->) ->

		API = new api "/cards/#{@id}/idLabels",

			value: label.id

		API.run "POST", => @board.refresh => do onSuccess
		
		@

	removeLabel: (label, onSuccess = ->) -> # Have Some Bugs

		API = new api "/cards/#{@id}/idLabels", # We have 404 error here in url

			idLabel: label.id

		API.run "DELETE", => @board.refresh => do onSuccess

		@