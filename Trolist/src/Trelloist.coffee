# 
# Trolist.
api = require "./Utilites/trelloAPI"
Board = require "./Objects/Board"

class Trolist

	init: (data, startApp) ->

		@GLOBAL_BOARD = null

		data = appName: data, boardId: null, workerFile: null if typeof data isnt "object"

		@workerFile = data.workerFile

		Trello.authorize

			name: data.appName

			scope:

				read: yes

				write: yes

				account: yes

			expiration: "never"

			success: =>
				
				@key = do Trello.key
				
				@token = do Trello.token
				
				if data.boardId is null

					startApp @

				else

					@loadBoard data.boardId, startApp
		
			error: (e)=> console.error "We have some problems to login"

	loadBoard: (boardId, onSuccess) ->

		API = new api "/boards/#{boardId}",

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

			if typeof Worker isnt "undefined"

				worker = new Worker @workerFile

				worker.postMessage

					cmd: "start"

					token: Trello.token()

					key: Trello.key()

					boardId: boardData.id

				worker.addEventListener "message", (e)->

					console.log e.data

			else console.error "Error: Web Workers isnt supported in this browser!"

			@GLOBAL_BOARD = new Board boardData, (board)=>

				onSuccess board

		@

window.Trolist = new Trolist()