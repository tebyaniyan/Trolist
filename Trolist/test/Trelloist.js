(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Board.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Board, Label, List, Member, api;

  api = require("../Utilites/trelloAPI");

  List = require("./List");

  Member = require("./Member");

  Label = require("./Label");

  module.exports = Board = (function() {
    function Board(boardData, onReady) {
      var labelData, memberData, _i, _j, _len, _len1, _ref, _ref1;
      this.id = boardData.id;
      this.name = boardData.name;
      this.lists = [];
      this.members = [];
      this.labels = [];
      this.trelloObj = boardData;
      _ref = boardData.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        memberData = _ref[_i];
        this.members.push(new Member(memberData));
      }
      _ref1 = boardData.labels;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        labelData = _ref1[_j];
        this.labels.push(new Label(labelData));
      }
      this.makeReadyLists((function(_this) {
        return function() {
          return onReady(_this);
        };
      })(this));
      this;
    }

    Board.prototype.makeReadyLists = function(onReady) {
      var listData, _i, _len, _ref;
      _ref = this.trelloObj.lists;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listData = _ref[_i];
        this.lists.push(new List(listData, this));
      }
      return onReady();
    };

    Board.prototype.getList = function(id) {
      var list, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.lists;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          list = _ref[_i];
          if (list.name === id) {
            return list;
          }
        }
        return void 0;
      }
      return this.lists[id];
    };

    Board.prototype.eachList = function(eachFunc) {
      var list, _i, _len, _ref;
      _ref = this.lists;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        list = _ref[_i];
        eachFunc(list);
      }
      return this;
    };

    Board.prototype.getCard = function(id) {
      var ret;
      ret = void 0;
      this.eachList(function(list) {
        var card, _i, _len, _ref, _results;
        _ref = list.cards;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (card.id === id) {
            _results.push(ret = card);
          }
        }
        return _results;
      });
      return ret;
    };

    Board.prototype.getMember = function(id) {
      var member, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.members;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          if (member.id === id) {
            return member;
          }
        }
        return void 0;
      }
      return this.members[id];
    };

    Board.prototype.getMemberByUsername = function(username) {
      var member, _i, _len, _ref;
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        if (member.username === username) {
          return member;
        }
      }
      return void 0;
    };

    Board.prototype.eachMember = function(eachFunc) {
      var member, _i, _len, _ref;
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        eachFunc(member);
      }
      return this;
    };

    Board.prototype.getLabel = function(id) {
      var label, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.labels;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          label = _ref[_i];
          if (label.id === id) {
            return label;
          }
        }
        return void 0;
      }
      return this.labels[id];
    };

    Board.prototype.getLabelByColor = function(color) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        if (label.color === color) {
          return label;
        }
      }
      return void 0;
    };

    Board.prototype.getLabelByName = function(name) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        if (label.name === name) {
          return label;
        }
      }
      return void 0;
    };

    Board.prototype.eachLabel = function(eachFunc) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        eachFunc(label);
      }
      return this;
    };

    Board.prototype.addList = function(name, params, onSuccess) {
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
      params.idBoard = this.id;
      API = new api("/lists", params);
      return API.run("POST", (function(_this) {
        return function(listData) {
          return _this.board.refresh(function() {
            return onSuccess(_this.getList(listData.id));
          });
        };
      })(this));
    };

    Board.prototype.refresh = function(onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/boards/" + this.id, {
        lists: "open",
        members: "all",
        member_fields: "all",
        list_fields: "all",
        fields: "name",
        labels: "all",
        label_fields: "all",
        cards: "open",
        card_fields: "all"
      });
      API.run("GET", (function(_this) {
        return function(boardData) {
          return _this.constructor(boardData, function(board) {
            return onSuccess(board);
          });
        };
      })(this));
      return this;
    };

    return Board;

  })();

}).call(this);

},{"../Utilites/trelloAPI":"J:\\xampp\\htdocs\\Trolist\\js\\Utilites\\trelloAPI.js","./Label":"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Label.js","./List":"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\List.js","./Member":"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Member.js"}],"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Card.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Card, api;

  api = require("../Utilites/trelloAPI");

  module.exports = Card = (function() {
    function Card(cardData, board) {
      var labelId, memberId, _i, _j, _len, _len1, _ref, _ref1;
      this.board = board;
      this.id = cardData.id;
      this.name = this.text = cardData.name;
      this.desc = cardData.desc;
      this.members = [];
      this.labels = [];
      this.trelloObj = cardData;
      _ref = cardData.idMembers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        memberId = _ref[_i];
        this.members.push(this.board.getMember(memberId));
      }
      _ref1 = cardData.idLabels;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        labelId = _ref1[_j];
        this.labels.push(this.board.getLabel(labelId));
      }
    }

    Card.prototype.getParent = function() {
      return this.board.getList(this.trelloObj.idList);
    };

    Card.prototype.getMember = function(id) {
      var member, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.members;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          if (member.id === id) {
            return member;
          }
        }
        return void 0;
      }
      return this.members[id];
    };

    Card.prototype.getMemberByUsername = function(username) {
      var member, _i, _len, _ref;
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        if (member.username === username) {
          return member;
        }
      }
      return void 0;
    };

    Card.prototype.eachMember = function(eachFunc) {
      var member, _i, _len, _ref;
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        eachFunc(member);
      }
      return this;
    };

    Card.prototype.getLabel = function(id) {
      var label, _i, _len, _ref;
      if (typeof id === "string") {
        _ref = this.labels;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          label = _ref[_i];
          if (label.id === id) {
            return label;
          }
        }
        return void 0;
      }
      return this.labels[id];
    };

    Card.prototype.getLabelByColor = function(color) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        if (label.color === color) {
          return label;
        }
      }
      return void 0;
    };

    Card.prototype.getLabelByName = function(name) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        if (label.name === name) {
          return label;
        }
      }
      return void 0;
    };

    Card.prototype.eachLabel = function(eachFunc) {
      var label, _i, _len, _ref;
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        eachFunc(label);
      }
      return this;
    };

    Card.prototype.setName = function(text, onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id, {
        name: text
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

    Card.prototype.setText = function(text, onSuccess) {
      return this.setName(text, onSuccess);
    };

    Card.prototype.setDescription = function(desc, onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id, {
        desc: desc
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

    Card.prototype.moveTo = function(newList, onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id, {
        idList: newList.id
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

    Card.prototype.remove = function(onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id);
      API.run("DELETE", (function(_this) {
        return function() {
          return _this.board.refresh(function() {
            return onSuccess();
          });
        };
      })(this));
      return this;
    };

    Card.prototype.archive = function(onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id + "/closed", {
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

    Card.prototype.addMember = function(member, onSuccess) {
      var API, membersStr, _i, _len, _member, _ref;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      if (typeof member === "string") {
        member = {
          id: member
        };
      }
      membersStr = "";
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _member = _ref[_i];
        membersStr += "" + _member.id + ",";
      }
      membersStr += member.id;
      API = new api("/cards/" + this.id, {
        idMembers: membersStr
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

    Card.prototype.removeMember = function(member, onSuccess) {
      var API, membersStr, _i, _len, _member, _ref;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      if (typeof member === "string") {
        member = {
          id: member
        };
      }
      membersStr = "";
      _ref = this.members;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _member = _ref[_i];
        membersStr += "" + _member.id + ",";
      }
      if (membersStr.indexOf(member.id !== -1)) {
        membersStr = membersStr.replace(member.id + ',', '').replace(member.id, '');
        API = new api("/cards/" + this.id, {
          idMembers: membersStr
        });
        API.run("PUT", (function(_this) {
          return function() {
            return _this.board.refresh(function() {
              return onSuccess();
            });
          };
        })(this));
      }
      return this;
    };

    Card.prototype.addLabel = function(label, onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id + "/idLabels", {
        value: label.id
      });
      API.run("POST", (function(_this) {
        return function() {
          return _this.board.refresh(function() {
            return onSuccess();
          });
        };
      })(this));
      return this;
    };

    Card.prototype.removeLabel = function(label, onSuccess) {
      var API;
      if (onSuccess == null) {
        onSuccess = function() {};
      }
      API = new api("/cards/" + this.id + "/idLabels", {
        idLabel: label.id
      });
      API.run("DELETE", (function(_this) {
        return function() {
          return _this.board.refresh(function() {
            return onSuccess();
          });
        };
      })(this));
      return this;
    };

    return Card;

  })();

}).call(this);

},{"../Utilites/trelloAPI":"J:\\xampp\\htdocs\\Trolist\\js\\Utilites\\trelloAPI.js"}],"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Label.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Label;

  module.exports = Label = (function() {
    function Label(labelData) {
      this.id = labelData.id;
      this.name = labelData.name;
      this.uses = labelData.uses;
      this.color = labelData.color;
    }

    return Label;

  })();

}).call(this);

},{}],"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\List.js":[function(require,module,exports){
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

},{"../Utilites/trelloAPI":"J:\\xampp\\htdocs\\Trolist\\js\\Utilites\\trelloAPI.js","./Card":"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Card.js"}],"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Member.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Member;

  module.exports = Member = (function() {
    function Member(memberData) {
      this.id = memberData.id;
      this.name = memberData.fullName;
      this.type = memberData.memberType;
      this.url = memberData.url;
      this.status = memberData.status;
      this.bio = memberData.bio;
      this.username = memberData.username;
      this.trelloObj = memberData;
      this.isAdmin = function() {
        return this.type === "admin";
      };
    }

    return Member;

  })();

}).call(this);

},{}],"J:\\xampp\\htdocs\\Trolist\\js\\Trolist.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Board, Trolist, api;

  api = require("./Utilites/trelloAPI");

  Board = require("./Objects/Board");

  Trolist = (function() {
    function Trolist() {}

    Trolist.prototype.init = function(data, startApp) {
      this.GLOBAL_BOARD = null;
      if (typeof data !== "object") {
        data = {
          appName: data,
          boardId: null,
          workerFile: null
        };
      }
      this.workerFile = data.workerFile;
      return Trello.authorize({
        name: data.appName,
        scope: {
          read: true,
          write: true,
          account: true
        },
        expiration: "never",
        success: (function(_this) {
          return function() {
            _this.key = Trello.key();
            _this.token = Trello.token();
            if (data.boardId === null) {
              return startApp(_this);
            } else {
              return _this.loadBoard(data.boardId, startApp);
            }
          };
        })(this),
        error: (function(_this) {
          return function(e) {
            return console.error("We have some problems to login");
          };
        })(this)
      });
    };

    Trolist.prototype.loadBoard = function(boardId, onSuccess) {
      var API;
      API = new api("/boards/" + boardId, {
        lists: "open",
        members: "all",
        member_fields: "all",
        list_fields: "all",
        fields: "name",
        labels: "all",
        label_fields: "all",
        cards: "open",
        card_fields: "all"
      });
      API.run("GET", (function(_this) {
        return function(boardData) {
          var worker;
          if (typeof Worker !== "undefined") {
            worker = new Worker(_this.workerFile);
            worker.postMessage({
              cmd: "start",
              token: Trello.token(),
              key: Trello.key(),
              boardId: boardData.id
            });
            worker.addEventListener("message", function(e) {
              return console.log(e.data);
            });
          } else {
            console.error("Error: Web Workers isnt supported in this browser!");
          }
          return _this.GLOBAL_BOARD = new Board(boardData, function(board) {
            return onSuccess(board);
          });
        };
      })(this));
      return this;
    };

    return Trolist;

  })();

  window.Trolist = new Trolist();

}).call(this);

},{"./Objects/Board":"J:\\xampp\\htdocs\\Trolist\\js\\Objects\\Board.js","./Utilites/trelloAPI":"J:\\xampp\\htdocs\\Trolist\\js\\Utilites\\trelloAPI.js"}],"J:\\xampp\\htdocs\\Trolist\\js\\Utilites\\trelloAPI.js":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var trelloAPI;

  module.exports = trelloAPI = (function() {
    function trelloAPI(url, params) {
      var key, value;
      this.apiURL = "https://api.trello.com/1" + url + "?";
      for (key in params) {
        value = params[key];
        this.apiURL += "" + key + "=" + value + "&";
      }
      this.apiURL += "key=" + (Trello.key()) + "&token=" + (Trello.token());
      this;
    }

    trelloAPI.prototype.run = function(method, onSuccess) {
      var request;
      request = new XMLHttpRequest();
      request.open(method, this.apiURL, true);
      request.onload = (function(_this) {
        return function() {
          if (request.status >= 200 && request.status < 400) {
            return onSuccess(JSON.parse(request.responseText));
          } else {
            return console.error("Something's goes wrong! Error " + request.status, request.responseText);
          }
        };
      })(this);
      request.onerror = (function(_this) {
        return function() {
          return console.error("Something's goes wrong! API Error!");
        };
      })(this);
      return request.send(null);
    };

    return trelloAPI;

  })();

}).call(this);

},{}]},{},["J:\\xampp\\htdocs\\Trolist\\js\\Trolist.js"]);