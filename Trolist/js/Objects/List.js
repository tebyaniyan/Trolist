// Generated by CoffeeScript 1.8.0
(function() {
  var Card, List, api;

  api = require("../Utilites/trelloAPI");

  Card = require("./Card");

  module.exports = List = (function() {
    function List(listData, board) {
      this.board = board;
      this.id = listData.id;
      this.name = listData.name;
      this.cards = [];
      this.trelloObj = listData;
      this.makeReadyCards();
      this;
    }

    List.prototype.makeReadyCards = function() {
      var cardData, _i, _len, _ref, _results;
      _ref = this.board.trelloObj.cards;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cardData = _ref[_i];
        if (cardData.idList === this.id) {
          _results.push(this.cards.push(new Card(cardData, this.board)));
        }
      }
      return _results;
    };

    List.prototype.getCard = function(id) {
      var card, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.cards;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (card.id === id) {
            return card;
          }
        }
        return void 0;
      }
      return this.cards[id];
    };

    List.prototype.eachCard = function(eachFunc) {
      var card, _i, _len, _ref;
      _ref = this.cards;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        card = _ref[_i];
        eachFunc(card);
      }
      return this;
    };

    List.prototype.addCard = function(name, params, onSuccess) {
      var API;
      if (params == null) {
        params = {};
      }
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      if (typeof params === "function") {
        onSuccess = params;
        params = {};
      }
      params.name = name;
      params.due = null;
      params.idList = this.id;
      API = new api("/cards", params);
      return API.run("POST", (function(_this) {
        return function(cardData) {
          return _this.board.refresh(function() {
            return onSuccess(_this.board.getCard(cardData.id));
          });
        };
      })(this));
    };

    List.prototype.archive = function(onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/lists/" + this.id + "/closed", {
        value: true
      });
      API.run("PUT", (function(_this) {
        return function() {
          return _this.board.refresh(function() {
            return onSuccess();
          });
        };
      })(this));
      return this;
    };

    List.prototype.archiveAll = function(onSuccess) {
      var counter, end;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      counter = 0;
      end = this.cards.length;
      return this.eachCard((function(_this) {
        return function(card) {
          return card.archive(function() {
            counter++;
            if (counter === end) {
              return onSuccess();
            }
          });
        };
      })(this));
    };

    return List;

  })();

}).call(this);
