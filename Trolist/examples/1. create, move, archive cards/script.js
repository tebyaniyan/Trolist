Trolist.init({

	appName: "Tester",
	boardId: "572ed3b95456d589fa46d855"

}, function( board ){

	var Todo = board.getList(0);

	var Doing = board.getList(1);

	var Done = board.getList(2);

	var tebyaniyan = board.getMemberByUsername("tebyaniyan");

	var GreenLabel = board.getLabelByColor("green");

	Todo.addCard("رفتن به رخت خواب", function(card){

		card.addMember(fateme);

		setTimeout(function(){
			
			card.moveTo(Doing);

		}, 5000);

		setTimeout(function(){

			card.moveTo(Done);

			card.addLabel(GreenLabel);

			card.setName("That's Automation!");

		}, 10000);

		setTimeout(function(){

			card.archive();

		}, 20000);

	})


})