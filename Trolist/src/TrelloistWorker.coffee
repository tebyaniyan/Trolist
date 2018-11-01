api = require "./Utilites/trelloAPI"

self.Trello = {}

getLatestActions = (onSuccess = ->)->

	postParams =

		filter: "all"

		fields: "all"

		limit: 10

	postParams.since = self.lastDate if self.lastDate?

	API = new api "/boards/#{self.boardId}/actions", postParams

	API.run "GET", (actionsData) =>

		self.lastDate = actionsData[0].date if actionsData.length isnt 0

		onSuccess actionsData

getUpdateActions = ->

	getLatestActions (latestActions)->

		self.postMessage latestActions if latestActions.length isnt 0

		setTimeout (-> getUpdateActions()), 100

self.addEventListener 'message', (e)->

	switch e.data.cmd

		when "start"

			Trello.token = -> e.data.token

			Trello.key = -> e.data.key

			self.boardId = e.data.boardId

			getLatestActions ->

				do getUpdateActions
	
, false