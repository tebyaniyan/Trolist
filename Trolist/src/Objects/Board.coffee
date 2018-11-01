api = require "../Utilites/trelloAPI"
List = require "./List"
Member = require "./Member"
Label = require "./Label"

module.exports = class Board

	constructor: (boardData, onReady)->

		@id = boardData.id

		@name = boardData.name

		@lists = []

		@members = []

		@labels = []

		@trelloObj = boardData

		@members.push new Member memberData for memberData in boardData.members

		@labels.push new Label labelData for labelData in boardData.labels

		@makeReadyLists =>

			onReady @

		@

	makeReadyLists: (onReady)->

		@lists.push new List listData, @ for listData in @trelloObj.lists

		do onReady

	getList: (id)->

		if typeof id is "string"

			return list for list in @lists when list.name is id

			return undefined

		return this.lists[id]

	eachList: (eachFunc)->

		eachFunc list for list in @lists

		@

	getCard: (id)->

		ret = undefined

		@eachList (list)->

			ret = card for card in list.cards when card.id is id

		return ret

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

	addList: (name, params = {}, onSuccess = ->)->

		if typeof params is "function"

			onSuccess = params

			params = {}

		params.name = name

		params.idBoard = @id

		API = new api "/lists", params

		API.run "POST", (listData)=> @board.refresh => onSuccess @getList listData.id

	refresh: (onSuccess = ->)->

		API = new api "/boards/#{@id}",

			lists: "open"

			members: "all"

			member_fields: "all"

			list_fields: "all"

			fields: "name"

			labels: "all"

			label_fields: "all"

			cards: "open"

			card_fields: "all"

		API.run "GET", (boardData) =>

			@constructor boardData, (board)=>

				onSuccess board

		@