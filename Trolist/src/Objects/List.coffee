api = require "../Utilites/trelloAPI"
Card = require "./Card"

module.exports = class List

	constructor: (listData, @board)->

		@id = listData.id
		
		@name = listData.name
		
		@cards = []
		
		@trelloObj = listData

		do @makeReadyCards

		@

	makeReadyCards: ->

		@cards.push new Card cardData, @board for cardData in @board.trelloObj.cards when cardData.idList is @id

	getCard: (id)->

		if typeof id is "string"

			return card for card in @cards when card.id is id

			return undefined

		return this.cards[id]

	eachCard: (eachFunc)->

		eachFunc card for card in @cards

		@

	addCard: (name, params = {}, onSuccess = ->)->

		if typeof params is "function"

			onSuccess = params

			params = {}

		params.name = name

		params.due = null

		params.idList = @id

		API = new api "/cards", params

		API.run "POST", (cardData)=> @board.refresh => onSuccess @board.getCard cardData.id

	archive: (onSuccess = ->) ->

		API = new api "/lists/#{@id}/closed",

			value: true

		API.run "PUT", => @board.refresh => do onSuccess

		@

	archiveAll: (onSuccess = ->) ->

		counter = 0

		end = @cards.length

		@eachCard (card)=> card.archive =>

			counter++

			do onSuccess if counter is end