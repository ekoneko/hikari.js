(function() {
  var Audio, Const, DataType, Draw, Event, EventMap, HTML, Input, Network, Object, Stage, Store, Unit, Vector, _ref, _ref1, _ref2, _ref3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Hikari = (function() {
    var global,
      _this = this;

    Hikari.prototype.__type = 'hikari';

    Hikari.prototype.__delay = null;

    Hikari.prototype.times = 0;

    Hikari.prototype.fps = 0;

    global = function() {
      Hikari.Audio = Audio;
      Hikari.Draw = Draw;
      Hikari.HTML = HTML;
      Hikari.DataType = DataType;
      Hikari.Vector = Vector;
      Hikari.Event = Event;
      Hikari.Const = Const;
      return Hikari.NetWork = Network;
    };

    Hikari.prototype.__init = function() {
      global();
      return this.__delay = function(callback) {
        return setTimeout(function() {
          return callback();
        }, this.times);
      };
    };

    Hikari.prototype.__loadResources = function() {};

    Hikari.prototype.update = function() {
      this.stage.update();
      this.input.update();
      return this.__delay(this.update);
    };

    function Hikari(container, width, height, callback) {
      this.update = __bind(this.update, this);
      this.__loadResources = __bind(this.__loadResources, this);
      this.__init = __bind(this.__init, this);      this.__delay = null;
      this.fps = 60;
      this.times = 1000 / 30;
      this.__init();
      this.stage = new Stage(width, height, container);
      this.eventMap = new EventMap(width, height);
      this.input = new Input(this.stage, this.eventMap);
      this.__loadResources();
      this.update();
      if (typeof callback === 'function') {
        callback(this);
      }
    }

    return Hikari;

  }).call(this);

  Object = (function() {
    function Object() {
      this.destroy = __bind(this.destroy, this);
      this.set = __bind(this.set, this);
      this.get = __bind(this.get, this);
      this.type = __bind(this.type, this);
    }

    Object.prototype.type = function() {
      return this.__type || 'object';
    };

    Object.prototype.get = function(key) {
      return this[key];
    };

    Object.prototype.set = function(options) {
      var key;

      for (key in options) {
        if (typeof this[key] !== 'undefined') {
          this[key] = options[key];
        }
      }
      return true;
    };

    Object.prototype.destroy = function() {
      return delete this;
    };

    return Object;

  })();

  Audio = (function() {
    function Audio() {}

    return Audio;

  })();

  Const = {};

  DataType = (function(_super) {
    __extends(DataType, _super);

    function DataType() {
      this.clone = __bind(this.clone, this);
      this.dataType = __bind(this.dataType, this);      _ref = DataType.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataType.prototype.__type = 'datatype';

    DataType.prototype.__options = {};

    DataType.prototype.dataType = function() {
      return this.__dataType;
    };

    DataType.prototype.clone = function(dest, src) {
      dest.__options = src.__options;
      return dest;
    };

    return DataType;

  })(Object);

  Draw = (function(_super) {
    __extends(Draw, _super);

    function Draw() {
      this.destroy = __bind(this.destroy, this);
      this.clone = __bind(this.clone, this);
      this.options = __bind(this.options, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.height = __bind(this.height, this);
      this.width = __bind(this.width, this);
      this.z = __bind(this.z, this);
      this.y = __bind(this.y, this);
      this.x = __bind(this.x, this);
      this.drawType = __bind(this.drawType, this);      _ref1 = Draw.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Draw.prototype.__type = 'draw';

    Draw.prototype.__x = 0;

    Draw.prototype.__y = 0;

    Draw.prototype.__z = 0;

    Draw.prototype.__width = 0;

    Draw.prototype.__height = 0;

    Draw.prototype.__options = {};

    Draw.prototype.drawType = function() {
      return this.__drawType;
    };

    Draw.prototype.x = function(x) {
      if (typeof x === 'number') {
        this.__x = x;
      }
      return this.__x;
    };

    Draw.prototype.y = function(y) {
      if (typeof y === 'number') {
        this.__y = y;
      }
      return this.__y;
    };

    Draw.prototype.z = function(z) {
      if (typeof z === 'number') {
        this.__z = Math.min(200, Math.max(0, z));
      }
      return this.__z;
    };

    Draw.prototype.width = function(width) {
      if (typeof width === 'number') {
        this.__width = width;
      }
      return this.__width;
    };

    Draw.prototype.height = function(height) {
      if (typeof height === 'number') {
        this.__height = height;
      }
      return this.__height;
    };

    Draw.prototype.draw = function(stage) {};

    Draw.prototype.update = function() {};

    Draw.prototype.options = function(o) {
      var key;

      if (typeof o === 'object') {
        for (key in o) {
          if (typeof this.__options[key] !== 'undefined') {
            this.__options[key] = o[key];
          }
        }
      }
      return this.__options;
    };

    Draw.prototype.clone = function(dest, src) {
      var key, _i, _len, _ref2;

      _ref2 = ['options', 'x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        key = _ref2[_i];
        dest["__" + key] = src["__" + key];
      }
      return dest;
    };

    Draw.prototype.destroy = function() {
      this.isDisposed = false;
      return Draw.__super__.destroy.call(this);
    };

    return Draw;

  })(Object);

  Event = (function(_super) {
    __extends(Event, _super);

    Event.id = 1;

    Event.list = {};

    Event.prototype.__type = 'event';

    Event.prototype.__id = 0;

    Event.prototype.__action = null;

    Event.prototype.eventType = '';

    /*
    	# @condition
    	# 	keyPress:
    	#		(int)identity
    	#
    	# 	hover || click
    	# 		x
    	#		y
    	#		size(Rect|Circle)
    */


    Event.prototype.condition = null;

    Event.prototype.map = null;

    Event.prototype.move = function(x, y) {
      this.x = x;
      this.y = y;
      if (this.map) {
        return this.map.modify(this.__id);
      }
    };

    Event.prototype.exec = function(params) {
      return this.__action(params);
    };

    function Event(eventType, condition, action) {
      this.exec = __bind(this.exec, this);
      this.move = __bind(this.move, this);      this.map = this.condition = this.__action = null;
      this.eventType = eventType;
      this.condition = condition;
      this.__action = action;
      this.__id = Event.id++;
      Event.list[this.__id] = this;
    }

    return Event;

  })(Object);

  EventMap = (function(_super) {
    __extends(EventMap, _super);

    EventMap.prototype.width = 0;

    EventMap.prototype.height = 0;

    EventMap.prototype.keyEvent = {};

    EventMap.prototype.table = [];

    EventMap.prototype.__triggerKeyPress = function(keyCode) {
      var eventId, _i, _len, _ref2, _results;

      if (!this.keyEvent[keyCode]) {
        return;
      }
      _ref2 = this.keyEvent[keyCode];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        eventId = _ref2[_i];
        _results.push(Event.list[eventId].exec());
      }
      return _results;
    };

    EventMap.prototype.__triggerClick = function(event) {};

    EventMap.prototype.__triggerHover = function(event) {};

    EventMap.prototype.register = function(event) {
      switch (event.eventType) {
        case 'keyPress':
          if (!this.keyEvent[event.condition]) {
            this.keyEvent[event.condition] = [];
          }
          this.keyEvent[event.condition].push(event.__id);
          break;
        case 'hover':
          break;
        case 'click':
          break;
      }
    };

    EventMap.prototype.revoke = function(event) {
      switch (event.eventType) {
        case 'keyPress':
          return delete this.keyEvent[event.condition][event.__id];
      }
    };

    EventMap.prototype.trigger = function(type, event) {
      switch (type) {
        case 'keyPress':
          this.__triggerKeyPress(event.identity);
          break;
        case 'click':
          this.__triggerClick(event);
          break;
        case 'hover':
          this.__triggerHover(event);
          break;
      }
    };

    function EventMap(width, height, grid) {
      this.trigger = __bind(this.trigger, this);
      this.revoke = __bind(this.revoke, this);
      this.register = __bind(this.register, this);
      this.__triggerHover = __bind(this.__triggerHover, this);
      this.__triggerClick = __bind(this.__triggerClick, this);
      this.__triggerKeyPress = __bind(this.__triggerKeyPress, this);
      var l, lineCount, r, rowCount, _i, _j;

      this.width = width;
      this.height = height;
      this.keyEvent = {};
      this.table = [];
      grid = grid || 50;
      lineCount = Math.ceil(width / grid);
      rowCount = Math.ceil(height / grid);
      for (r = _i = 0; 0 <= rowCount ? _i < rowCount : _i > rowCount; r = 0 <= rowCount ? ++_i : --_i) {
        this.table[r] = new Array(lineCount);
        for (l = _j = 0; 0 <= lineCount ? _j < lineCount : _j > lineCount; l = 0 <= lineCount ? ++_j : --_j) {
          this.table[r][l] = {
            click: [],
            over: []
          };
        }
      }
    }

    return EventMap;

  })(Object);

  HTML = (function(_super) {
    __extends(HTML, _super);

    function HTML() {
      this.build = __bind(this.build, this);
      this.remove = __bind(this.remove, this);
      this.append = __bind(this.append, this);
      this.htmlType = __bind(this.htmlType, this);      _ref2 = HTML.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    HTML.prototype.__type = 'html';

    HTML.prototype.tag = null;

    HTML.prototype.element = null;

    HTML.prototype.stage = null;

    HTML.prototype.onStage = false;

    HTML.prototype.htmlType = function() {
      return this.__htmlType;
    };

    HTML.prototype.append = function(stage) {
      if (stage && stage.type === 'stage') {
        this.stage = stage;
      }
      this.stage.box.appendChild(this.element);
      return this.onStage = true;
    };

    HTML.prototype.remove = function() {
      if (!this.onStage) {
        return;
      }
      this.stage.box.removeChild(this.element);
      return this.onStage = false;
    };

    HTML.prototype.build = function(options, callback) {};

    return HTML;

  })(Object);

  Input = (function(_super) {
    __extends(Input, _super);

    Input.prototype.update = function() {
      if (this.mouse.click) {
        this.eventMap.trigger('click', this.mouse.click);
        this.mouse.click = null;
      }
      if (this.mouse.position) {
        this.eventMap.trigger('hover', this.mouse.position);
      }
      if (this.keyboard.press) {
        this.eventMap.trigger('keyPress', this.keyboard.press);
        return this.keyboard.press = null;
      }
    };

    function Input(stage, eventMap) {
      this.update = __bind(this.update, this);      this.eventMap = eventMap;
      this.keyboard = new Input.Keyboard(stage.box);
      this.mouse = new Input.Mouse(stage.box);
    }

    return Input;

  })(Object);

  Network = (function() {
    function Network() {}

    return Network;

  })();

  Stage = (function(_super) {
    var list, sort;

    __extends(Stage, _super);

    list = [];

    Stage.prototype.__type = 'stage';

    Stage.prototype.box = null;

    Stage.prototype.canvas = null;

    Stage.prototype.context = null;

    Stage.prototype.width = 0;

    Stage.prototype.height = 0;

    sort = function(list) {
      return list.sort(function(a, b) {
        return a.z > b.z;
      });
    };

    Stage.prototype.append = function(o) {
      if (o.type() !== 'draw') {
        console.log('error: object cannt append to canvas', o);
        return;
      }
      if (['bitmap', 'sprite'].indexOf(o.drawType() > -1)) {
        list.push(o);
      }
      return o.draw(this);
    };

    Stage.prototype.update = function() {
      var i, item, _results;

      this.context.restore();
      this.context.save();
      this.context.clearRect(0, 0, this.width, this.height);
      list = sort(list);
      i = 0;
      _results = [];
      while (item = list[i]) {
        if (item && item.__isDisposed) {
          item.update();
          _results.push(i++);
        } else {
          _results.push(list.splice(i, 1));
        }
      }
      return _results;
    };

    function Stage(width, height, container) {
      this.update = __bind(this.update, this);
      this.append = __bind(this.append, this);      list = [];
      this.width = width;
      this.height = height;
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
      this.context.save();
      this.box = document.createElement('div');
      this.box.style.width = width;
      this.box.style.height = height;
      this.box.style.position = 'relative';
      this.box.style.overflow = 'hidden';
      this.canvas.style.position = 'absolute';
      this.canvas.style.zIndex = 100;
      container.appendChild(this.box);
      this.box.appendChild(this.canvas);
      this;
    }

    return Stage;

  })(Object);

  Store = (function() {
    function Store() {}

    return Store;

  })();

  Unit = (function(_super) {
    __extends(Unit, _super);

    Unit.prototype.__type = 'unit';

    Unit.prototype.scope = null;

    Unit.prototype.sprite = null;

    Unit.prototype.event = [];

    Unit.prototype.addEvent = function(event) {
      if (event.type() === 'event') {
        this.event.push(event);
        return true;
      }
      return false;
    };

    Unit.prototype.move = function(x, y) {
      if (this.sprite) {
        this.sprite.x(this.sprite.x() + x);
        return this.sprite.y(this.sprite.y() + y);
      }
    };

    function Unit(options) {
      this.move = __bind(this.move, this);
      this.addEvent = __bind(this.addEvent, this);      this.scope = this.sprite = null;
      this.event = [];
      this.set(options);
    }

    return Unit;

  })(Object);

  Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      this.setOptions = __bind(this.setOptions, this);
      this.vectorType = __bind(this.vectorType, this);      _ref3 = Vector.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Vector.prototype.__type = 'vector';

    Vector.prototype.vectorType = function() {
      return this.__vectorType;
    };

    Vector.prototype.setOptions = function(_options) {
      var key;

      for (key in _options) {
        if (typeof options[key] !== 'undefined') {
          options[key] = _options[key];
        }
      }
      return true;
    };

    return Vector;

  })(Object);

  Const.KeyCode = {
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'A': 65,
    'B': 66,
    'C': 67,
    'D': 68,
    'E': 69,
    'F': 70,
    'G': 71,
    'H': 72,
    'I': 73,
    'J': 74,
    'K': 75,
    'L': 76,
    'M': 77,
    'N': 78,
    'O': 79,
    'P': 80,
    'Q': 81,
    'R': 82,
    'S': 83,
    'T': 84,
    'U': 85,
    'V': 86,
    'W': 87,
    'X': 88,
    'Y': 89,
    'Z': 90,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123,
    'LEFT': 37,
    'TOP': 38,
    'RIGHT': 39,
    'DOWN': 40,
    'Alt+0': 304,
    'Alt+1': 305,
    'Alt+2': 306,
    'Alt+3': 307,
    'Alt+4': 308,
    'Alt+5': 309,
    'Alt+6': 310,
    'Alt+7': 311,
    'Alt+8': 312,
    'Alt+9': 313,
    'Alt+A': 321,
    'Alt+B': 322,
    'Alt+C': 323,
    'Alt+D': 324,
    'Alt+E': 325,
    'Alt+F': 326,
    'Alt+G': 327,
    'Alt+H': 328,
    'Alt+I': 329,
    'Alt+J': 330,
    'Alt+K': 331,
    'Alt+L': 332,
    'Alt+M': 333,
    'Alt+N': 334,
    'Alt+O': 335,
    'Alt+P': 336,
    'Alt+Q': 337,
    'Alt+R': 338,
    'Alt+S': 339,
    'Alt+T': 340,
    'Alt+U': 341,
    'Alt+V': 342,
    'Alt+W': 343,
    'Alt+X': 344,
    'Alt+Y': 345,
    'Alt+Z': 346,
    'Alt+F1': 368,
    'Alt+F2': 369,
    'Alt+F3': 370,
    'Alt+F4': 371,
    'Alt+F5': 372,
    'Alt+F6': 373,
    'Alt+F7': 374,
    'Alt+F8': 375,
    'Alt+F9': 376,
    'Alt+F10': 377,
    'Alt+F11': 378,
    'Alt+F12': 379,
    'Alt+LEFT': 293,
    'Alt+TOP': 294,
    'Alt+RIGHT': 295,
    'Alt+DOWN': 296,
    'Ctrl+0': 560,
    'Ctrl+1': 561,
    'Ctrl+2': 562,
    'Ctrl+3': 563,
    'Ctrl+4': 564,
    'Ctrl+5': 565,
    'Ctrl+6': 566,
    'Ctrl+7': 567,
    'Ctrl+8': 568,
    'Ctrl+9': 569,
    'Ctrl+A': 577,
    'Ctrl+B': 578,
    'Ctrl+C': 579,
    'Ctrl+D': 580,
    'Ctrl+E': 581,
    'Ctrl+F': 582,
    'Ctrl+G': 583,
    'Ctrl+H': 584,
    'Ctrl+I': 585,
    'Ctrl+J': 586,
    'Ctrl+K': 587,
    'Ctrl+L': 588,
    'Ctrl+M': 589,
    'Ctrl+N': 590,
    'Ctrl+O': 591,
    'Ctrl+P': 592,
    'Ctrl+Q': 593,
    'Ctrl+R': 594,
    'Ctrl+S': 595,
    'Ctrl+T': 596,
    'Ctrl+U': 597,
    'Ctrl+V': 598,
    'Ctrl+W': 599,
    'Ctrl+X': 600,
    'Ctrl+Y': 601,
    'Ctrl+Z': 602,
    'Ctrl+F1': 624,
    'Ctrl+F2': 625,
    'Ctrl+F3': 626,
    'Ctrl+F4': 627,
    'Ctrl+F5': 628,
    'Ctrl+F6': 629,
    'Ctrl+F7': 630,
    'Ctrl+F8': 631,
    'Ctrl+F9': 632,
    'Ctrl+F10': 633,
    'Ctrl+F11': 634,
    'Ctrl+F12': 635,
    'Ctrl+LEFT': 549,
    'Ctrl+TOP': 550,
    'Ctrl+RIGHT': 551,
    'Ctrl+DOWN': 552,
    'Shift+0': 1072,
    'Shift+1': 1073,
    'Shift+2': 1074,
    'Shift+3': 1075,
    'Shift+4': 1076,
    'Shift+5': 1077,
    'Shift+6': 1078,
    'Shift+7': 1079,
    'Shift+8': 1080,
    'Shift+9': 1081,
    'Shift+A': 1089,
    'Shift+B': 1090,
    'Shift+C': 1091,
    'Shift+D': 1092,
    'Shift+E': 1093,
    'Shift+F': 1094,
    'Shift+G': 1095,
    'Shift+H': 1096,
    'Shift+I': 1097,
    'Shift+J': 1098,
    'Shift+K': 1099,
    'Shift+L': 1100,
    'Shift+M': 1101,
    'Shift+N': 1102,
    'Shift+O': 1103,
    'Shift+P': 1104,
    'Shift+Q': 1105,
    'Shift+R': 1106,
    'Shift+S': 1107,
    'Shift+T': 1108,
    'Shift+U': 1109,
    'Shift+V': 1110,
    'Shift+W': 1111,
    'Shift+X': 1112,
    'Shift+Y': 1113,
    'Shift+Z': 1114,
    'Shift+F1': 1136,
    'Shift+F2': 1137,
    'Shift+F3': 1138,
    'Shift+F4': 1139,
    'Shift+F5': 1140,
    'Shift+F6': 1141,
    'Shift+F7': 1142,
    'Shift+F8': 1143,
    'Shift+F9': 1144,
    'Shift+F10': 1145,
    'Shift+F11': 1146,
    'Shift+F12': 1147,
    'Shift+LEFT': 1061,
    'Shift+TOP': 1062,
    'Shift+RIGHT': 1063,
    'Shift+DOWN': 1064,
    'Alt+Ctrl+0': 816,
    'Alt+Ctrl+1': 817,
    'Alt+Ctrl+2': 818,
    'Alt+Ctrl+3': 819,
    'Alt+Ctrl+4': 820,
    'Alt+Ctrl+5': 821,
    'Alt+Ctrl+6': 822,
    'Alt+Ctrl+7': 823,
    'Alt+Ctrl+8': 824,
    'Alt+Ctrl+9': 825,
    'Alt+Ctrl+A': 833,
    'Alt+Ctrl+B': 834,
    'Alt+Ctrl+C': 835,
    'Alt+Ctrl+D': 836,
    'Alt+Ctrl+E': 837,
    'Alt+Ctrl+F': 838,
    'Alt+Ctrl+G': 839,
    'Alt+Ctrl+H': 840,
    'Alt+Ctrl+I': 841,
    'Alt+Ctrl+J': 842,
    'Alt+Ctrl+K': 843,
    'Alt+Ctrl+L': 844,
    'Alt+Ctrl+M': 845,
    'Alt+Ctrl+N': 846,
    'Alt+Ctrl+O': 847,
    'Alt+Ctrl+P': 848,
    'Alt+Ctrl+Q': 849,
    'Alt+Ctrl+R': 850,
    'Alt+Ctrl+S': 851,
    'Alt+Ctrl+T': 852,
    'Alt+Ctrl+U': 853,
    'Alt+Ctrl+V': 854,
    'Alt+Ctrl+W': 855,
    'Alt+Ctrl+X': 856,
    'Alt+Ctrl+Y': 857,
    'Alt+Ctrl+Z': 858,
    'Alt+Ctrl+F1': 880,
    'Alt+Ctrl+F2': 881,
    'Alt+Ctrl+F3': 882,
    'Alt+Ctrl+F4': 883,
    'Alt+Ctrl+F5': 884,
    'Alt+Ctrl+F6': 885,
    'Alt+Ctrl+F7': 886,
    'Alt+Ctrl+F8': 887,
    'Alt+Ctrl+F9': 888,
    'Alt+Ctrl+F10': 889,
    'Alt+Ctrl+F11': 890,
    'Alt+Ctrl+F12': 891,
    'Alt+Ctrl+LEFT': 805,
    'Alt+Ctrl+TOP': 806,
    'Alt+Ctrl+RIGHT': 807,
    'Alt+Ctrl+DOWN': 808,
    'Alt+Shift+0': 1328,
    'Alt+Shift+1': 1329,
    'Alt+Shift+2': 1330,
    'Alt+Shift+3': 1331,
    'Alt+Shift+4': 1332,
    'Alt+Shift+5': 1333,
    'Alt+Shift+6': 1334,
    'Alt+Shift+7': 1335,
    'Alt+Shift+8': 1336,
    'Alt+Shift+9': 1337,
    'Alt+Shift+A': 1345,
    'Alt+Shift+B': 1346,
    'Alt+Shift+C': 1347,
    'Alt+Shift+D': 1348,
    'Alt+Shift+E': 1349,
    'Alt+Shift+F': 1350,
    'Alt+Shift+G': 1351,
    'Alt+Shift+H': 1352,
    'Alt+Shift+I': 1353,
    'Alt+Shift+J': 1354,
    'Alt+Shift+K': 1355,
    'Alt+Shift+L': 1356,
    'Alt+Shift+M': 1357,
    'Alt+Shift+N': 1358,
    'Alt+Shift+O': 1359,
    'Alt+Shift+P': 1360,
    'Alt+Shift+Q': 1361,
    'Alt+Shift+R': 1362,
    'Alt+Shift+S': 1363,
    'Alt+Shift+T': 1364,
    'Alt+Shift+U': 1365,
    'Alt+Shift+V': 1366,
    'Alt+Shift+W': 1367,
    'Alt+Shift+X': 1368,
    'Alt+Shift+Y': 1369,
    'Alt+Shift+Z': 1370,
    'Alt+Shift+F1': 1392,
    'Alt+Shift+F2': 1393,
    'Alt+Shift+F3': 1394,
    'Alt+Shift+F4': 1395,
    'Alt+Shift+F5': 1396,
    'Alt+Shift+F6': 1397,
    'Alt+Shift+F7': 1398,
    'Alt+Shift+F8': 1399,
    'Alt+Shift+F9': 1400,
    'Alt+Shift+F10': 1401,
    'Alt+Shift+F11': 1402,
    'Alt+Shift+F12': 1403,
    'Alt+Shift+LEFT': 1317,
    'Alt+Shift+TOP': 1318,
    'Alt+Shift+RIGHT': 1319,
    'Alt+Shift+DOWN': 1320,
    'Ctrl+Shift+0': 1584,
    'Ctrl+Shift+1': 1585,
    'Ctrl+Shift+2': 1586,
    'Ctrl+Shift+3': 1587,
    'Ctrl+Shift+4': 1588,
    'Ctrl+Shift+5': 1589,
    'Ctrl+Shift+6': 1590,
    'Ctrl+Shift+7': 1591,
    'Ctrl+Shift+8': 1592,
    'Ctrl+Shift+9': 1593,
    'Ctrl+Shift+A': 1601,
    'Ctrl+Shift+B': 1602,
    'Ctrl+Shift+C': 1603,
    'Ctrl+Shift+D': 1604,
    'Ctrl+Shift+E': 1605,
    'Ctrl+Shift+F': 1606,
    'Ctrl+Shift+G': 1607,
    'Ctrl+Shift+H': 1608,
    'Ctrl+Shift+I': 1609,
    'Ctrl+Shift+J': 1610,
    'Ctrl+Shift+K': 1611,
    'Ctrl+Shift+L': 1612,
    'Ctrl+Shift+M': 1613,
    'Ctrl+Shift+N': 1614,
    'Ctrl+Shift+O': 1615,
    'Ctrl+Shift+P': 1616,
    'Ctrl+Shift+Q': 1617,
    'Ctrl+Shift+R': 1618,
    'Ctrl+Shift+S': 1619,
    'Ctrl+Shift+T': 1620,
    'Ctrl+Shift+U': 1621,
    'Ctrl+Shift+V': 1622,
    'Ctrl+Shift+W': 1623,
    'Ctrl+Shift+X': 1624,
    'Ctrl+Shift+Y': 1625,
    'Ctrl+Shift+Z': 1626,
    'Ctrl+Shift+F1': 1648,
    'Ctrl+Shift+F2': 1649,
    'Ctrl+Shift+F3': 1650,
    'Ctrl+Shift+F4': 1651,
    'Ctrl+Shift+F5': 1652,
    'Ctrl+Shift+F6': 1653,
    'Ctrl+Shift+F7': 1654,
    'Ctrl+Shift+F8': 1655,
    'Ctrl+Shift+F9': 1656,
    'Ctrl+Shift+F10': 1657,
    'Ctrl+Shift+F11': 1658,
    'Ctrl+Shift+F12': 1659,
    'Ctrl+Shift+LEFT': 1573,
    'Ctrl+Shift+TOP': 1574,
    'Ctrl+Shift+RIGHT': 1575,
    'Ctrl+Shift+DOWN': 1576,
    'Alt+Ctrl+Shift+0': 1840,
    'Alt+Ctrl+Shift+1': 1841,
    'Alt+Ctrl+Shift+2': 1842,
    'Alt+Ctrl+Shift+3': 1843,
    'Alt+Ctrl+Shift+4': 1844,
    'Alt+Ctrl+Shift+5': 1845,
    'Alt+Ctrl+Shift+6': 1846,
    'Alt+Ctrl+Shift+7': 1847,
    'Alt+Ctrl+Shift+8': 1848,
    'Alt+Ctrl+Shift+9': 1849,
    'Alt+Ctrl+Shift+A': 1857,
    'Alt+Ctrl+Shift+B': 1858,
    'Alt+Ctrl+Shift+C': 1859,
    'Alt+Ctrl+Shift+D': 1860,
    'Alt+Ctrl+Shift+E': 1861,
    'Alt+Ctrl+Shift+F': 1862,
    'Alt+Ctrl+Shift+G': 1863,
    'Alt+Ctrl+Shift+H': 1864,
    'Alt+Ctrl+Shift+I': 1865,
    'Alt+Ctrl+Shift+J': 1866,
    'Alt+Ctrl+Shift+K': 1867,
    'Alt+Ctrl+Shift+L': 1868,
    'Alt+Ctrl+Shift+M': 1869,
    'Alt+Ctrl+Shift+N': 1870,
    'Alt+Ctrl+Shift+O': 1871,
    'Alt+Ctrl+Shift+P': 1872,
    'Alt+Ctrl+Shift+Q': 1873,
    'Alt+Ctrl+Shift+R': 1874,
    'Alt+Ctrl+Shift+S': 1875,
    'Alt+Ctrl+Shift+T': 1876,
    'Alt+Ctrl+Shift+U': 1877,
    'Alt+Ctrl+Shift+V': 1878,
    'Alt+Ctrl+Shift+W': 1879,
    'Alt+Ctrl+Shift+X': 1880,
    'Alt+Ctrl+Shift+Y': 1881,
    'Alt+Ctrl+Shift+Z': 1882,
    'Alt+Ctrl+Shift+F1': 1904,
    'Alt+Ctrl+Shift+F2': 1905,
    'Alt+Ctrl+Shift+F3': 1906,
    'Alt+Ctrl+Shift+F4': 1907,
    'Alt+Ctrl+Shift+F5': 1908,
    'Alt+Ctrl+Shift+F6': 1909,
    'Alt+Ctrl+Shift+F7': 1910,
    'Alt+Ctrl+Shift+F8': 1911,
    'Alt+Ctrl+Shift+F9': 1912,
    'Alt+Ctrl+Shift+F10': 1913,
    'Alt+Ctrl+Shift+F11': 1914,
    'Alt+Ctrl+Shift+F12': 1915,
    'Alt+Ctrl+Shift+LEFT': 1829,
    'Alt+Ctrl+Shift+TOP': 1830,
    'Alt+Ctrl+Shift+RIGHT': 1831,
    'Alt+Ctrl+Shift+DOWN': 1832
  };

  DataType.Color = (function(_super) {
    var dec2hex, hex2dec, scope,
      _this = this;

    __extends(Color, _super);

    Color.prototype.__dataType = 'color';

    Color.prototype.__options = {
      r: 0,
      g: 0,
      b: 0
    };

    hex2dec = function(hex) {
      var b, g, r, ret;

      r = parseInt(hex.substr(1, 2), 16);
      g = parseInt(hex.substr(3, 4), 16);
      b = parseInt(hex.substr(5, 6), 16);
      return ret = {
        r: r,
        g: g,
        b: b
      };
    };

    dec2hex = function(r, g, b) {
      var ret;

      ret = '#';
      ret += r.toString(16);
      ret += g.toString(16);
      ret += b.toString(16);
      return ret;
    };

    scope = function(value, min, max) {
      return Math.max(min, Math.min(value, max));
    };

    Color.prototype.getRGB = function() {
      return "(" + this.__options.r + ", " + this.__options.g + ", " + this.__options.b + ")";
    };

    Color.prototype.red = function(r) {
      if (typeof r === 'number') {
        this.__options.r = scope(r, 0, 255);
      }
      return this.__options.r;
    };

    Color.prototype.green = function(g) {
      if (typeof g === 'number') {
        this.__options.g = scope(g, 0, 255);
      }
      return this.__options.g;
    };

    Color.prototype.blue = function(b) {
      if (typeof b === 'number') {
        this.__options.b = scope(b, 0, 255);
      }
      return this.__options.b;
    };

    Color.prototype.hex = function(hex) {
      if (hex && /#[0-9A-Fa-f]{6}/.test(hex)) {
        this.set(hex);
        return hex;
      }
      return dec2hex(this.__options.r, this.__options.g, this.__options.b);
    };

    Color.prototype.set = function(color, value) {
      var i, rgb, _i, _len, _ref4;

      if (typeof color === 'object') {
        this.red(color.r || color.R);
        this.green(color.g || color.G);
        this.blue(color.b || color.B);
      } else {
        color = color.toLocaleLowerCase();
        if (['r', 'g', 'b'].indexOf(color) !== -1) {
          this[color](value);
        } else if (color === '#' && /#[0-9A-Fa-f]{6}/.test(color)) {
          rgb = hex2dec(color);
          _ref4 = ['r', 'g', 'b'];
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            i = _ref4[_i];
            this[i](rgb[i]);
          }
        }
      }
      return this;
    };

    Color.prototype.clone = function() {
      return new DataType.Color(this.__options);
    };

    function Color(r, g, b) {
      this.clone = __bind(this.clone, this);
      this.set = __bind(this.set, this);
      this.hex = __bind(this.hex, this);
      this.blue = __bind(this.blue, this);
      this.green = __bind(this.green, this);
      this.red = __bind(this.red, this);
      this.getRGB = __bind(this.getRGB, this);      this.__options = {
        r: 0,
        g: 0,
        b: 0
      };
      if (r[0] === '#') {
        this.set(r);
      } else {
        this.set({
          r: r,
          g: g,
          b: b
        });
      }
    }

    return Color;

  }).call(this, DataType);

  DataType.Tone = (function(_super) {
    var scope,
      _this = this;

    __extends(Tone, _super);

    Tone.prototype.__dataType = 'tone';

    Tone.prototype.__options = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 1,
      gray: false,
      opposite: false,
      transparent: null
    };

    Tone.prototype.noChange = true;

    scope = function(value, min, max) {
      return Math.max(min, Math.min(value, max));
    };

    Tone.prototype.red = function(r) {
      if (typeof r === 'number') {
        this.__options.r = scope(r, -255, 255);
        this.noChange = false;
      }
      return this.__options.r;
    };

    Tone.prototype.green = function(g) {
      if (typeof g === 'number') {
        this.__options.g = scope(g, -255, 255);
        this.noChange = false;
      }
      return this.__options.g;
    };

    Tone.prototype.blue = function(b) {
      if (typeof b === 'number') {
        this.__options.b = scope(b, -255, 255);
        this.noChange = false;
      }
      return this.__options.b;
    };

    Tone.prototype.alpha = function(a) {
      if (typeof a === 'number') {
        this.__options.alpha = scope(a, 0, 1);
        this.noChange = false;
      }
      return this.__options.alpha;
    };

    Tone.prototype.transparent = function(t) {
      if (t && t.dataType && t.dataType() === 'color') {
        this.__options.transparent = t;
        this.noChange = false;
      }
      return this.__options.transparent;
    };

    Tone.prototype.rgb = function(r, g, b) {
      if (typeof r === 'object') {
        return this.rgb(r.r, r.g, r.b);
      }
      return {
        r: this.red(r),
        g: this.green(g),
        b: this.blue(b)
      };
    };

    Tone.prototype.gray = function(gray) {
      if (gray) {
        this.__options.gray = !!gray;
        this.noChange = false;
      }
      return this.__options.gray;
    };

    Tone.prototype.opposite = function(opposite) {
      if (opposite) {
        this._opposite = !!opposite;
        this.noChange = false;
      }
      return this._opposite;
    };

    Tone.prototype.reset = function() {
      this.__options.r = this.__options.g = this.__options.b = 0;
      this.__options.gray = false;
      this.__options.opposite = false;
      this.__options.alpha = 1;
      this.__options.transparent = null;
      return this.noChange = true;
    };

    Tone.prototype.mix = function(r, g, b, a) {
      var average;

      if (this.__options.transparent && a > 0) {
        if (r === this.__options.transparent.red() && g === this.__options.transparent.green() && b === this.__options.transparent.blue()) {
          return [r, g, b, 0];
        }
      }
      if (this.__options.gray) {
        average = (r * 299 + g * 587 + b * 114 + 500) / 1000;
        r = g = b = average;
      }
      r += this.__options.r;
      g += this.__options.g;
      b += this.__options.b;
      if (this.__options.opposite) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }
      a *= this.__options.alpha;
      return [r, g, b, a];
    };

    Tone.prototype.clone = function() {
      return new DataType.Tone(this.__options);
    };

    function Tone(options) {
      this.clone = __bind(this.clone, this);
      this.mix = __bind(this.mix, this);
      this.reset = __bind(this.reset, this);
      this.opposite = __bind(this.opposite, this);
      this.gray = __bind(this.gray, this);
      this.rgb = __bind(this.rgb, this);
      this.transparent = __bind(this.transparent, this);
      this.alpha = __bind(this.alpha, this);
      this.blue = __bind(this.blue, this);
      this.green = __bind(this.green, this);
      this.red = __bind(this.red, this);      this.__options = {};
      this.reset();
      options = options || {};
      this.red(options.r);
      this.green(options.g);
      this.blue(options.b);
      this.alpha(options.alpha);
      this.gray(options.gray);
      this.opposite(options.opposite);
      this.transparent(options.transparent);
    }

    return Tone;

  }).call(this, DataType);

  Draw.Bitmap = (function(_super) {
    __extends(Bitmap, _super);

    Bitmap.prototype.__drawType = 'bitmap';

    Bitmap.prototype.__isDisposed = true;

    Bitmap.prototype.__context = null;

    Bitmap.prototype.__options = {
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 0,
      sourceHeight: 0,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      rotate: 0
    };

    Bitmap.prototype.entity = null;

    Bitmap.prototype.load = function(src, callback) {
      var _this = this;

      this.entity = new Image();
      this.entity.onload = function() {
        _this.options({
          sourceWidth: _this.entity.width,
          sourceHeight: _this.entity.height
        });
        if (typeof callback === 'function') {
          return callback(_this);
        }
      };
      return this.entity.src = src;
    };

    Bitmap.prototype.draw = function(stage) {
      if (stage) {
        this.__context = stage.context;
      }
      this.__isDisposed = true;
      return this.update();
    };

    Bitmap.prototype.clone = function() {
      var newBitmap;

      newBitmap = new Bitmap(this.__width, this.__height);
      if (this.entity) {
        newBitmap.entity = this.entity;
      }
      return Bitmap.__super__.clone.call(this, newBitmap, this);
    };

    Bitmap.prototype.update = function(_context) {
      if (_context) {
        this.__context = _context;
      }
      if (!(this.__isDisposed && this.__context)) {
        return false;
      }
      this.__context.globalAlpha = this.__options.alpha;
      this.__context.scale(this.__options.scaleX, this.__options.scaleY);
      this.__context.rotate(this.__options.rotate);
      return this.__context.drawImage(this.entity, this.__options.sourceX, this.__options.sourceY, this.__options.sourceWidth, this.__options.sourceHeight, this.__x, this.__y, this.__width, this.__height);
    };

    Bitmap.prototype.dispose = function(value) {
      if (value) {
        this.__isDisposed = value;
      }
      return this.__isDisposed;
    };

    Bitmap.prototype.destroy = function() {
      delete this.entity;
      return Bitmap.__super__.destroy.call(this);
    };

    function Bitmap(width, height) {
      this.destroy = __bind(this.destroy, this);
      this.dispose = __bind(this.dispose, this);
      this.update = __bind(this.update, this);
      this.clone = __bind(this.clone, this);
      this.draw = __bind(this.draw, this);
      this.load = __bind(this.load, this);
      var nextUpdate;

      this.__options = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 0,
        sourceHeight: 0,
        transX: 0,
        transY: 0,
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        rotate: 0
      };
      this.entity = null;
      this.__context = null;
      this.width(width);
      this.height(height);
      nextUpdate = this.frequency;
    }

    return Bitmap;

  })(Draw);

  Draw.Sprite = (function(_super) {
    var sort, zAutoIncrement;

    __extends(Sprite, _super);

    Sprite.prototype.__drawType = 'sprite';

    zAutoIncrement = 0;

    Sprite.prototype.__tone = null;

    Sprite.prototype.__list = [];

    Sprite.prototype.__canvas = null;

    Sprite.prototype.__context = null;

    Sprite.prototype.__imageData = null;

    Sprite.prototype.__isDisposed = false;

    Sprite.prototype.__imageChanged = false;

    Sprite.prototype.__toneChanged = false;

    Sprite.prototype.__blinkCount = 0;

    Sprite.prototype.__blinkRGB = null;

    Sprite.prototype.__blinkTone = null;

    sort = function(list) {
      return list.sort(function(a, b) {
        return a.z > b.z;
      });
    };

    Sprite.prototype.__updateCanvas = function() {
      var cache, i, item;

      cache = this.__canvas.getContext('2d');
      cache.restore();
      cache.save();
      this.__list = sort(this.__list);
      i = 0;
      while (item = this.__list[i]) {
        if (item && item.__isDisposed) {
          item.update(cache);
          i++;
        } else {
          this.__list.splice(i, 1);
        }
      }
      this.__imageChanged = false;
      return cache;
    };

    Sprite.prototype.__updateImageData = function() {
      var data, i;

      i = 0;
      if (!(this.__tone && !this.__tone.noChange)) {
        return;
      }
      while (i < this.__imageData.data.length) {
        data = this.__tone.mix(this.__imageData.data[i], this.__imageData.data[i + 1], this.__imageData.data[i + 2], this.__imageData.data[i + 3]);
        this.__imageData.data[i] = data[0];
        this.__imageData.data[i + 1] = data[1];
        this.__imageData.data[i + 2] = data[2];
        this.__imageData.data[i + 3] = data[3];
        i += 4;
      }
      this.__toneChanged = false;
      return true;
    };

    Sprite.prototype.__updateBlink = function() {
      var abs, i;

      if (this.__blinkCount % this.__blinkFps >= this.__blinkFps / 2) {
        abs = 1;
      } else {
        abs = -1;
      }
      i = 0;
      while (i < this.__imageData.data.length) {
        this.__imageData.data[i] += this.__blinkRGB.red() * abs;
        this.__imageData.data[i + 1] += this.__blinkRGB.green() * abs;
        this.__imageData.data[i + 2] += this.__blinkRGB.blue() * abs;
        i += 4;
      }
      this.__blinkCount--;
      if (this.__blinkCount === 0) {
        this.__imageChanged = true;
        return this.__blinkRGB = null;
      }
    };

    Sprite.prototype.tone = function(t) {
      if (t && t.type() === 'datatype' && t.dataType() === 'tone') {
        this.__tone = t;
        this.__toneChanged = true;
      }
      return this.__tone;
    };

    Sprite.prototype.append = function(image) {
      if (image.type() !== 'draw' && image.drawType() === 'sprite') {
        return;
      }
      if (!this.__width) {
        this.__width = image.width() + image.x();
      }
      if (!this.__height) {
        this.__height = image.height() + image.y();
      }
      this.z(zAutoIncrement++);
      this.__list.push(image);
      return this.__imageChanged = true;
    };

    Sprite.prototype.draw = function(stage) {
      this.__context = stage.context;
      this.__isDisposed = true;
      if (this.__canvas === null) {
        this.__canvas = document.createElement('canvas');
        this.__canvas.width = this.__width;
        this.__canvas.height = this.__height;
      }
      return this.update();
    };

    Sprite.prototype.update = function(_context) {
      var cache;

      if (_context) {
        this.__context = _context;
      }
      if (!(this.__isDisposed && this.__context)) {
        return false;
      }
      if (this.__imageChanged) {
        cache = this.__updateCanvas(this);
        this.__imageData = cache.getImageData(0, 0, this.__width, this.__height);
        this.__updateImageData(this);
      } else if (this.__toneChanged) {
        this.__updateImageData(this);
      }
      if (this.__blinkCount > 0) {
        this.__updateBlink();
      }
      if (this.__imageData) {
        return this.__context.putImageData(this.__imageData, this.__x, this.__y);
      }
    };

    Sprite.prototype.clone = function() {
      var dest, item, _i, _len, _ref4;

      dest = new Draw.Sprite();
      dest = Sprite.__super__.clone.call(this, dest, this);
      _ref4 = this.__list;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        item = _ref4[_i];
        dest.append(item.clone());
      }
      return dest;
    };

    Sprite.prototype.blink = function(options) {
      var fps, times;

      times = options.times || 2;
      fps = options.fps || 30;
      fps += fps % 2;
      if (options.color && options.color.dataType && options.colordataType() === 'color') {
        this.__blinkRGB = options.color;
      } else {
        this.__blinkRGB = new DataType.Color(3, 3, 3);
      }
      this.__blinkCount = times * fps;
      this.__blinkFps = fps;
      this.__blinkTone = null;
      this.__blinkTone = this.tone().clone();
      this.__blinkTone.red(0);
      this.__blinkTone.green(0);
      return this.__blinkTone.blue(0);
    };

    Sprite.prototype.dispose = function(value) {
      if (value) {
        this.__isDisposed = value;
      }
      return this.__isDisposed;
    };

    function Sprite(width, height, x, y) {
      this.dispose = __bind(this.dispose, this);
      this.blink = __bind(this.blink, this);
      this.clone = __bind(this.clone, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.append = __bind(this.append, this);
      this.tone = __bind(this.tone, this);
      this.__updateBlink = __bind(this.__updateBlink, this);
      this.__updateImageData = __bind(this.__updateImageData, this);
      this.__updateCanvas = __bind(this.__updateCanvas, this);      this.__tone = null;
      this.__list = [];
      this.__canvas = null;
      this.__context = null;
      this.__imageData = null;
      this.__isDisposed = false;
      this.__imageChanged = false;
      this.__toneChanged = false;
      this.__blinkCount = 0;
      this.__blinkRGB = null;
      this.__blinkTone = null;
      this.width(width);
      this.height(height);
      this.x(x);
      this.y(y);
    }

    return Sprite;

  })(Draw);

  Draw.Vector = (function(_super) {
    __extends(Vector, _super);

    Vector.prototype.__drawType = 'vector';

    Vector.prototype.__isDisposed = true;

    Vector.prototype.__options = {
      lineWidth: 1,
      strokeStyle: 'black',
      lineCap: 'butt',
      fillStyle: 'black'
    };

    Vector.prototype.vector = [];

    Vector.prototype.__updateLine = function(vector) {
      this.__context.moveTo(vector.options.start.x, vector.options.start.y);
      return this.__context.lineTo(vector.options.end.x, vector.options.end.y);
    };

    Vector.prototype.__updateRect = function(vector) {
      return this.__context.rect(vector.options.start.x, vector.options.start.y, vector.options.width, vector.options.height);
    };

    Vector.prototype.draw = function(stage) {
      if (stage) {
        this.__context = stage.context;
      }
      this.__isDisposed = true;
      return this.update();
    };

    Vector.prototype.update = function(context) {
      var vector, _i, _len, _ref4;

      if (context) {
        this.__context = context;
      }
      this.__context.beginPath();
      _ref4 = this.vector;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        vector = _ref4[_i];
        switch (vector.vectorType()) {
          case 'line':
            this.__updateLine(vector);
            break;
          case 'rect':
            this.__updateRect(vector);
        }
      }
      this.__context.lineWidth = this.__options.lineWidth;
      this.__context.strokeStyle = this.__options.strokeStyle;
      this.__context.lineCap = this.__options.lineCap;
      this.__context.fillStyle = this.__options.fillStyle;
      this.__context.closePath();
      return this.__context.stroke();
    };

    Vector.prototype.append = function(v) {
      if (v.type() === 'vector') {
        this.vector.push(v);
      }
      return this;
    };

    function Vector() {
      this.append = __bind(this.append, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.__updateRect = __bind(this.__updateRect, this);
      this.__updateLine = __bind(this.__updateLine, this);      this.__options = {
        lineWidth: 1,
        strokeStyle: 'black',
        lineCap: 'butt',
        fillStyle: 'black'
      };
    }

    return Vector;

  })(Draw);

  HTML.BLOCK = (function(_super) {
    __extends(BLOCK, _super);

    BLOCK.prototype.__htmlType = 'block';

    BLOCK.prototype.__attribute = {
      x: 0,
      y: 0,
      z: 1,
      width: 0,
      height: 0
    };

    BLOCK.prototype.__style = function(div) {
      div.style.position = 'absolute';
      div.style.left = "" + this.__attribute.x + "px";
      div.style.top = "" + this.__attribute.y + "px";
      div.style.width = "" + this.__attribute.width + "px";
      div.style.height = "" + this.__attribute.height + "px";
      return div.style.zIndex = attribute.z;
    };

    BLOCK.prototype.build = function(options, callback) {
      this.element = document.createElement('div');
      this.set(options);
      style(this.element);
      if (typeof options.content === 'string') {
        this.element.innerHTML = this.options.content;
      } else {
        this.element.appendChild(this.options.content);
      }
      if (typeof callback === 'function') {
        return callback();
      }
    };

    BLOCK.prototype.destroy = function() {
      this.remove();
      return BLOCK.__super__.destroy.call(this);
    };

    BLOCK.prototype.options = function(options) {
      var i, _i, _len, _ref4;

      _ref4 = ['x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        i = _ref4[_i];
        if (options[i]) {
          this.__attribute[i] = options[i];
        }
      }
      return this.__style(this.element);
    };

    function BLOCK(stage) {
      this.options = __bind(this.options, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);
      this.__style = __bind(this.__style, this);      this.__attribute = {
        x: 0,
        y: 0,
        z: 1,
        width: 0,
        height: 0
      };
      this.stage = null;
      if (stage && stage.type() === 'stage') {
        this.stage = stage;
      }
    }

    return BLOCK;

  })(HTML);

  HTML.IMG = (function(_super) {
    __extends(IMG, _super);

    IMG.prototype.__htmlType = 'img';

    IMG.prototype.__attribute = {
      x: 0,
      y: 0,
      z: 1,
      width: 0,
      height: 0
    };

    IMG.prototype.__style = function(img) {
      img.style.position = 'absolute';
      img.style.left = "" + this.__attribute.x + "px";
      img.style.top = "" + this.__attribute.y + "px";
      img.style.zIndex = this.__attribute.z;
      img.width = this.__attribute.width;
      return img.height = this.__attribute.height;
    };

    IMG.prototype.build = function(options, callback) {
      var i, _i, _len, _ref4;

      this.element = new Image();
      this.element.onload = function() {
        if (typeof callback === 'function') {
          return callback();
        }
      };
      _ref4 = ['x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        i = _ref4[_i];
        this.__attribute[i] = options[i];
      }
      this.__style(this.element);
      return this.element.src = options.src;
    };

    IMG.prototype.destroy = function() {
      this.remove();
      return IMG.__super__.destroy.call(this);
    };

    IMG.prototype.set = function(options) {
      var i, _i, _len, _ref4;

      _ref4 = ['x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        i = _ref4[_i];
        if (options[i]) {
          this.__attribute[i] = options[i];
        }
      }
      return this.__style(this.element);
    };

    function IMG(stage) {
      this.set = __bind(this.set, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);
      this.__style = __bind(this.__style, this);      this.stage = null;
      if (stage && stage.type() === 'stage') {
        this.stage = stage;
      }
    }

    return IMG;

  })(HTML);

  Input.Keyboard = (function(_super) {
    __extends(Keyboard, _super);

    Keyboard.prototype.press = null;

    function Keyboard(dom) {
      var textarea,
        _this = this;

      this.press = null;
      textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.left = '-500px';
      dom.appendChild(textarea);
      dom.addEventListener('click', function() {
        return textarea.focus();
      });
      document.body.addEventListener('keydown', function(event) {
        var identity;

        identity = parseInt(event.keyCode, 10);
        if (event.altKey) {
          identity += 256;
        }
        if (event.ctrlKey) {
          identity += 512;
        }
        if (event.shiftKey) {
          identity += 1024;
        }
        return _this.press = {
          altKey: event.altKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          keyCode: event.keyCode,
          identity: identity
        };
      });
    }

    return Keyboard;

  })(Input);

  Input.Mouse = (function(_super) {
    __extends(Mouse, _super);

    Mouse.prototype.click = null;

    Mouse.prototype.position = null;

    function Mouse(dom) {
      var _this = this;

      this.click = null;
      this.position = null;
      dom.addEventListener('mousedown', function(event) {
        return _this.click = {
          button: event.button,
          x: event.offsetX,
          y: event.offsetY
        };
      });
      dom.addEventListener('mouseover', function(event) {
        return _this.position = {
          x: event.offsetX,
          y: event.offsetY
        };
      });
    }

    return Mouse;

  })(Input);

  Vector.Circle = (function(_super) {
    __extends(Circle, _super);

    Circle.prototype.__vectorType = 'circle';

    Circle.prototype.options = {
      origin: {
        x: 0,
        y: 0
      },
      radius: 0
    };

    function Circle(origin, radius) {
      this.options = {};
      this.options.origin = origin;
      this.options.radius = radius;
    }

    return Circle;

  })(Vector);

  Vector.Line = (function(_super) {
    __extends(Line, _super);

    Line.prototype.__vectorType = 'line';

    Line.prototype.options = {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };

    function Line(start, end) {
      this.options = {};
      this.options.start = start;
      this.options.end = end;
    }

    return Line;

  })(Vector);

  Vector.Rect = (function(_super) {
    __extends(Rect, _super);

    Rect.prototype.__vectorType = 'rect';

    Rect.prototype.options = {
      start: {
        x: 0,
        y: 0
      },
      width: 0,
      height: 0
    };

    function Rect(start, width, height) {
      this.options = {};
      this.options.start = start;
      this.options.width = width;
      this.options.height = height;
    }

    return Rect;

  })(Vector);

}).call(this);
