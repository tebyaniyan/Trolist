module.exports = class trelloAPI
	
	constructor: (url, params)->

		@apiURL = "https://api.trello.com/1#{url}?"

		@apiURL += "#{key}=#{value}&" for key, value of params

		@apiURL += "key=#{Trello.key()}&token=#{Trello.token()}"

		@

	run: (method, onSuccess)->

		request = new XMLHttpRequest()

		request.open method, @apiURL, yes

		request.onload = =>

			if request.status >= 200 and request.status < 400

				onSuccess JSON.parse request.responseText

			else

				console.error "Something's goes wrong! Error #{request.status}", request.responseText

		request.onerror = =>

			console.error "Something's goes wrong! API Error!"

		request.send null

		