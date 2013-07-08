(function() {
  var Animate, Audio, Const, Core, DataType, Draw, Event, EventMap, HTML, Input, Network, Object, Stage, Store, Vector, _ref, _ref1, _ref2, _ref3,
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
      Hikari.NetWork = Network;
      return Hikari.Animate = Animate;
    };

    Hikari.prototype.__init = function() {
      var _ref;

      global();
      if ((_ref = window.requestAnimationFrame) == null) {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      }
      return this.__delay = function(callback) {
        return setTimeout(function() {
          return window.requestAnimationFrame(callback);
        }, this.times);
      };
    };

    Hikari.prototype.__loadResources = function() {};

    Hikari.prototype.__update = function() {
      Animate.update();
      this.stage.update();
      this.input.update();
      this.update.update();
      return this.__delay(this.__update);
    };

    function Hikari(container, width, height, callback) {
      this.__update = __bind(this.__update, this);
      this.__loadResources = __bind(this.__loadResources, this);
      this.__init = __bind(this.__init, this);      this.__delay = this.update = null;
      this.fps = 30;
      this.times = 1000 / 30;
      this.__init();
      this.stage = new Stage(width, height, container);
      this.eventMap = new EventMap(width, height);
      this.input = new Input(this.stage, this.eventMap);
      this.update = new Update();
      this.__loadResources();
      this.__update();
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

  Animate = (function(_super) {
    __extends(Animate, _super);

    Animate.id = 1;

    Animate.list = {};

    Animate.update = function() {
      var item, _i, _len, _ref, _results;

      _ref = Animate.list;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(item.update());
      }
      return _results;
    };

    Animate.prototype.__type = 'animate';

    Animate.prototype.__animateType = '';

    Animate.prototype.animateType = function() {
      return __animateType;
    };

    Animate.prototype.start = function() {};

    Animate.prototype.update = function() {};

    Animate.prototype.destory = function() {
      delete Animate.list[this.__id];
      return Animate.__super__.destory.call(this);
    };

    function Animate() {
      this.update = __bind(this.update, this);
      this.start = __bind(this.start, this);      this.__id = Animate.id++;
      Animate.list[this.__id];
    }

    return Animate;

  }).call(this, Object);

  Audio = (function() {
    function Audio() {}

    return Audio;

  })();

  Const = {};

  Core = (function() {
    function Core() {}

    Core.prototype.__type = 'datatype';

    return Core;

  })();

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
      this.dispose = __bind(this.dispose, this);
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

    Draw.prototype.__stage = null;

    Draw.prototype.__options = {};

    Draw.prototype.drawType = function() {
      return this.__drawType;
    };

    Draw.prototype.x = function(x) {
      if (typeof x === 'number') {
        this.__x = x;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__x;
    };

    Draw.prototype.y = function(y) {
      if (typeof y === 'number') {
        this.__y = y;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__y;
    };

    Draw.prototype.z = function(z) {
      if (typeof z === 'number') {
        this.__z = Math.min(200, Math.max(0, z));
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__z;
    };

    Draw.prototype.width = function(width) {
      if (typeof width === 'number') {
        this.__width = width;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__width;
    };

    Draw.prototype.height = function(height) {
      if (typeof height === 'number') {
        this.__height = height;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__height;
    };

    Draw.prototype.draw = function(stage) {};

    Draw.prototype.update = function() {};

    Draw.prototype.options = function(options) {
      var key;

      if (typeof options === 'object') {
        for (key in options) {
          if (typeof this.__options[key] !== 'undefined') {
            this.__options[key] = options[key];
          }
        }
        if (this.__stage) {
          this.__stage.needUpdate = true;
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

    Draw.prototype.dispose = function(value) {
      if (typeof value !== 'undefined') {
        this.__isDisposed = value;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__isDisposed;
    };

    Draw.prototype.destroy = function() {
      this.isDisposed = false;
      if (this.__stage) {
        this.__stage.needUpdate = true;
      }
      return Draw.__super__.destroy.call(this);
    };

    return Draw;

  })(Object);

  Event = (function(_super) {
    var init;

    __extends(Event, _super);

    Event.id = 1;

    Event.list = {};

    Event.prototype.__type = 'event';

    init = function(self) {
      self.__id = Event.id++;
      self.__action = null;
      /*
      		# condition
      		# 	keyPress:
      		#		(int)identity
      		#
      		# 	hover || click
      		#		scope(Rect|Circle)
      		#		button(1|2|3)
      */

      self.condition = null;
      self.eventType = '';
      self.map = null;
      return self.priority = 0;
    };

    Event.prototype.move = function(dx, dy) {
      if (!this.condition.scope) {
        return false;
      }
      this.condition.scope.move(dx, dy);
      if (this.map) {
        return this.map.modify(this);
      }
    };

    Event.prototype.exec = function(next) {
      return this.__action(next);
    };

    Event.prototype.destory = function() {
      if (this.map) {
        this.map.revoke(this);
      }
      delete Event.list[this.__id];
      return Event.__super__.destory.call(this);
    };

    function Event(eventType, condition, action) {
      this.destory = __bind(this.destory, this);
      this.exec = __bind(this.exec, this);
      this.move = __bind(this.move, this);      init(this);
      this.__action = action;
      this.eventType = eventType;
      if (eventType === 'click' && !condition.button) {
        condition.button = 1;
      }
      this.condition = condition;
      Event.list[this.__id] = this;
    }

    return Event;

  })(Object);

  EventMap = (function(_super) {
    var init, sortEvent;

    __extends(EventMap, _super);

    init = function(self) {
      self.width = 0;
      self.height = 0;
      self.grid = 50;
      self.keyEvent = {};
      return self.mouseEvent = [];
    };

    sortEvent = function(array) {
      return array = array.sort(function(a, b) {
        return Event.list[a].priority > Event.list[b].priority;
      });
    };

    EventMap.prototype.__detectScope = function(scope) {
      var height, i, j, ret, width, x, x0, x1, y, y0, y1, _i, _j;

      ret = [];
      if (scope.vectorType() === 'rect') {
        x = scope.__options.start.x;
        y = scope.__options.start.y;
        width = scope.__options.width;
        height = scope.__options.height;
      } else if (scope.vectorType() === 'circle') {
        x = scope.__options.origin.x - scope.__options.radius;
        y = scope.__options.origin.y - scope.__options.radius;
        width = x + scope.__options.radius * 2;
        height = y + scope.__options.radius * 2;
      } else {
        return ret;
      }
      x0 = parseInt(x / this.grid, 10);
      y0 = parseInt(y / this.grid, 10);
      x1 = parseInt((x + width) / this.grid, 10);
      y1 = parseInt((y + height) / this.grid, 10);
      for (i = _i = y0; y0 <= y1 ? _i <= y1 : _i >= y1; i = y0 <= y1 ? ++_i : --_i) {
        for (j = _j = x0; x0 <= x1 ? _j <= x1 : _j >= x1; j = x0 <= x1 ? ++_j : --_j) {
          ret.push([j, i]);
        }
      }
      return ret;
    };

    EventMap.prototype.__triggerKeyPress = function(keyCode) {
      var events;

      if (typeof this.keyEvent[keyCode] === 'undefined') {
        return;
      }
      events = this.keyEvent[keyCode].concat();
      return this.__exec(events);
    };

    EventMap.prototype.__triggerClick = function(action) {
      var condition, eventId, events, i, list, x, y;

      x = parseInt(action.x / this.grid, 10);
      y = parseInt(action.y / this.grid, 10);
      list = this.mouseEvent[x][y].click;
      events = list[3].concat();
      if (action.button === 0) {
        events = events.concat(list[1]);
      }
      if (action.button === 1) {
        events = events.concat(list[2]);
      }
      i = 0;
      while (eventId = events[i]) {
        condition = Event.list[eventId].condition;
        if (condition.scope.isInside(action.x, action.y)) {
          i++;
        } else {
          events.splice(i, 1);
        }
      }
      return this.__exec(events);
    };

    EventMap.prototype.__triggerHover = function(action) {
      var condition, eventId, events, i, x, y;

      x = parseInt(action.x / this.grid, 10);
      y = parseInt(action.y / this.grid, 10);
      events = this.mouseEvent[x][y].hover.concat();
      i = 0;
      while (eventId = events[i]) {
        condition = Event.list[eventId].condition;
        if (condition.scope.isInside(action.x, action.y)) {
          i++;
        } else {
          events.splice(i, 1);
        }
      }
      return this.__exec(events);
    };

    EventMap.prototype.__exec = function(events) {
      var event,
        _this = this;

      if (!(events && events.length)) {
        return;
      }
      event = Event.list[events.pop()];
      if (event.type() !== 'event') {
        return;
      }
      return event.exec(function() {
        return _this.__exec(events);
      });
    };

    EventMap.prototype.__pushEvent = function(stack, eventId) {
      if (!(stack || stack.length)) {
        return;
      }
      stack.push(eventId);
      return sortEvent(stack);
    };

    EventMap.prototype.register = function(event) {
      var item, scope, _i, _j, _len, _len1;

      switch (event.eventType) {
        case 'keyPress':
          if (typeof this.keyEvent[event.condition] === 'undefined') {
            this.keyEvent[event.condition] = new Array();
          }
          this.__pushEvent(this.keyEvent[event.condition], event.__id);
          break;
        case 'hover':
          scope = this.__detectScope(event.condition.scope);
          for (_i = 0, _len = scope.length; _i < _len; _i++) {
            item = scope[_i];
            if (!(this.mouseEvent[item[0]] && this.mouseEvent[item[0]][item[1]])) {
              continue;
            }
            this.__pushEvent(this.mouseEvent[item[0]][item[1]].hover, event.__id);
          }
          break;
        case 'click':
          scope = this.__detectScope(event.condition.scope);
          if (!event.condition.button) {
            event.condition.button = 1;
          }
          for (_j = 0, _len1 = scope.length; _j < _len1; _j++) {
            item = scope[_j];
            if (!(this.mouseEvent[item[0]] && this.mouseEvent[item[0]][item[1]])) {
              continue;
            }
            this.__pushEvent(this.mouseEvent[item[0]][item[1]].click[event.condition.button], event.__id);
          }
      }
      event.map = this;
      return this;
    };

    EventMap.prototype.revoke = function(event) {
      var i, item, lines, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref2, _ref3;

      switch (event.eventType) {
        case 'keyPress':
          i = this.keyEvent[event.condition].indexOf(event.__id);
          if (i > -1) {
            this.keyEvent[event.condition].splice(i, 1);
          }
          break;
        case 'hover':
          _ref2 = this.mouseEvent;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            lines = _ref2[_i];
            for (_j = 0, _len1 = lines.length; _j < _len1; _j++) {
              item = lines[_j];
              i = item.hover.indexOf(event.__id);
              if (i > -1) {
                item.hover.splice(i, 1);
              }
            }
          }
          break;
        case 'click':
          _ref3 = this.mouseEvent;
          for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
            lines = _ref3[_k];
            for (_l = 0, _len3 = lines.length; _l < _len3; _l++) {
              item = lines[_l];
              if (!(item.click[event.condition.button] && item.click[event.condition.button].length)) {
                continue;
              }
              i = item.click[event.condition.button].indexOf(event.__id);
              if (i > -1) {
                item.click[event.condition.button].splice(i, 1);
              }
            }
          }
      }
      return this;
    };

    EventMap.prototype.trigger = function(type, action) {
      switch (type) {
        case 'keyPress':
          this.__triggerKeyPress(action.identity);
          break;
        case 'click':
          this.__triggerClick(action);
          break;
        case 'hover':
          this.__triggerHover(action);
          break;
      }
    };

    EventMap.prototype.modify = function(event) {
      this.revoke(event);
      return this.register(event);
    };

    function EventMap(width, height, grid) {
      this.modify = __bind(this.modify, this);
      this.trigger = __bind(this.trigger, this);
      this.revoke = __bind(this.revoke, this);
      this.register = __bind(this.register, this);
      this.__pushEvent = __bind(this.__pushEvent, this);
      this.__exec = __bind(this.__exec, this);
      this.__triggerHover = __bind(this.__triggerHover, this);
      this.__triggerClick = __bind(this.__triggerClick, this);
      this.__triggerKeyPress = __bind(this.__triggerKeyPress, this);
      this.__detectScope = __bind(this.__detectScope, this);
      var l, lineCount, r, rowCount, _i, _j;

      init(this);
      if (grid) {
        this.grid = grid;
      }
      lineCount = Math.ceil(width / this.grid);
      rowCount = Math.ceil(height / this.grid);
      for (l = _i = 0; 0 <= lineCount ? _i < lineCount : _i > lineCount; l = 0 <= lineCount ? ++_i : --_i) {
        this.mouseEvent[l] = new Array(rowCount);
        for (r = _j = 0; 0 <= rowCount ? _j < rowCount : _j > rowCount; r = 0 <= rowCount ? ++_j : --_j) {
          this.mouseEvent[l][r] = {
            click: {
              '1': [],
              '2': [],
              '3': []
            },
            hover: []
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

  Network = (function(_super) {
    __extends(Network, _super);

    Network.prototype.socket = null;

    function Network(address, callback) {
      this.socket = null;
      this.socket = new io.connect(address);
    }

    return Network;

  })(Object);

  Stage = (function(_super) {
    var colorMix, imageMix, sort;

    __extends(Stage, _super);

    Stage.prototype.list = {
      sprite: [],
      vector: []
    };

    Stage.prototype.__type = 'stage';

    Stage.prototype.box = null;

    Stage.prototype.canvas = null;

    Stage.prototype.context = null;

    Stage.prototype.width = 0;

    Stage.prototype.height = 0;

    Stage.prototype.needUpdate = false;

    sort = function(list) {
      return list.sort(function(a, b) {
        return a.z() > b.z();
      });
    };

    colorMix = function(color1, alpha1, color2, alpha2) {
      return (color1 * alpha1 * (255 - alpha2) + color2 * alpha2) / 255;
    };

    imageMix = function(map, item, width, height) {
      var image, ip, line, row, sp;

      image = item.update();
      if (!image) {
        return map;
      }
      line = image.y;
      row = image.x;
      while (line <= image.height + image.y) {
        row = image.x;
        while (row <= image.width + image.x) {
          sp = (row + line * width) * 4;
          ip = (row - image.x + (line - image.y) * image.width) * 4;
          if (image.map[ip + 3] > 0) {
            map[sp + 0] = colorMix(map[sp + 0], map[sp + 3], image.map[ip + 0], image.map[ip + 3]);
            map[sp + 1] = colorMix(map[sp + 1], map[sp + 3], image.map[ip + 1], image.map[ip + 3]);
            map[sp + 2] = colorMix(map[sp + 2], map[sp + 3], image.map[ip + 2], image.map[ip + 3]);
            map[sp + 3] = map[sp + 3] + image.map[ip + 3] - map[sp + 3] * image.map[ip + 3] / 255;
          }
          row += 1;
        }
        line++;
      }
      image = null;
      return map;
    };

    Stage.prototype.__updateSprite = function() {
      var i, imageData, item, list, map;

      list = this.list.sprite;
      list = sort(list);
      imageData = this.context.getImageData(0, 0, this.width, this.height);
      map = imageData.data;
      i = 0;
      while (item = list[i]) {
        if (item && item.dispose()) {
          map = imageMix(map, item, this.width, this.height);
          i++;
        } else {
          list.splice(i, 1);
        }
      }
      imageData.data = map;
      this.context.putImageData(imageData, 0, 0);
      return imageData = void 0;
    };

    Stage.prototype.__updateVector = function() {
      var i, item, list, _results;

      list = this.list.vector;
      list = sort(list);
      i = 0;
      _results = [];
      while (item = list[i]) {
        if (item && item.dispose()) {
          item.update(this.context);
          _results.push(i++);
        } else {
          _results.push(list.splice(i, 1));
        }
      }
      return _results;
    };

    Stage.prototype.append = function(o) {
      if (o.type() !== 'draw') {
        console.log('error: object cannt append to canvas', o);
        return;
      }
      if (o.drawType() === 'sprite') {
        this.list.sprite.push(o);
      } else if (o.drawType() === 'vector') {
        this.list.vector.push(o);
      }
      o.draw(this);
      this.needUpdate = true;
      return this;
    };

    Stage.prototype.update = function() {
      if (!this.needUpdate) {
        return;
      }
      this.needUpdate = false;
      this.context.restore();
      this.context.save();
      this.context.clearRect(0, 0, this.width, this.height);
      this.__updateSprite();
      return this.__updateVector();
    };

    function Stage(width, height, container) {
      this.update = __bind(this.update, this);
      this.append = __bind(this.append, this);
      this.__updateVector = __bind(this.__updateVector, this);
      this.__updateSprite = __bind(this.__updateSprite, this);      this.list = {
        sprite: [],
        vector: []
      };
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

  Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      this.options = __bind(this.options, this);
      this.move = __bind(this.move, this);
      this.isInside = __bind(this.isInside, this);
      this.vectorType = __bind(this.vectorType, this);      _ref3 = Vector.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Vector.prototype.__type = 'vector';

    Vector.prototype.__options = {};

    Vector.prototype.vectorType = function() {
      return this.__vectorType;
    };

    Vector.prototype.isInside = function(x, y) {};

    Vector.prototype.move = function(dx, dy) {};

    Vector.prototype.options = function(_options) {
      var key;

      if (_options) {
        for (key in _options) {
          if (typeof this.__options[key] !== 'undefined') {
            this.__options[key] = _options[key];
          }
        }
      }
      return this.__options;
    };

    return Vector;

  })(Object);

  Animate.Blink = (function(_super) {
    var init;

    __extends(Blink, _super);

    Blink.prototype.__animateType = 'blink';

    init = function(self) {
      self.__timer = 0;
      self.__frame = 0;
      self.__count = 0;
      self.__start = false;
      self.__next = 0;
      self.__orginTone = null;
      self.__newTone = null;
      self.entity = null;
      self.color = null;
      self.path = null;
      self.delta = 1;
      return self.onFinish = null;
    };

    Blink.prototype.start = function(timer) {
      if (this.__start) {
        return false;
      }
      this.__timer = timer;
      this.__start = true;
      if (this.entity.tone()) {
        this.__orginTone = this.entity.tone();
        this.__newTone = orginTone.clone();
      } else {
        this.__orginTone = null;
        this.__newTone = new DataType.Tone();
      }
      this.__count = this.__timer / this.delta;
      return true;
    };

    Blink.prototype.update = function() {
      var b, g, r;

      if (!this.__start) {
        return false;
      }
      if (--this.__next > 0) {
        return true;
      }
      this.__next = this.delta;
      r = this.color.r / this.__count * this.__frame;
      g = this.color.g / this.__count * this.__frame;
      b = this.color.b / this.__count * this.__frame;
      this.__newTone.red(this.__newTone.red() + r);
      this.__newTone.green(this.__newTone.green() + g);
      this.__newTone.blue(this.__newTone.blue() + b);
      this.entity.tone(this.__newTone);
      this.__frame += this.delta;
      this.__timer -= this.delta;
      if (this.__timer < 1) {
        this.__timer = 0;
        this.__start = false;
        this.entity.tone(this.__orginTone);
        this.__newTone.destory();
        if (this.onFinish === 'function') {
          return this.onFinish();
        }
      }
    };

    function Blink(sprite, color, path) {
      this.update = __bind(this.update, this);
      this.start = __bind(this.start, this);      Blink.__super__.constructor.call(this);
      init(this);
      this.entity = sprite;
      this.path = path;
      this.color = color;
    }

    return Blink;

  })(Animate);

  Animate.Marquee = (function(_super) {
    var init;

    __extends(Marquee, _super);

    Marquee.prototype.__animateType = 'marquee';

    init = function(self) {
      self.__timer = 0;
      self.__start = false;
      self.__next = 0;
      self.entity = null;
      self.dx = 0;
      self.dy = 0;
      self.delta = 1;
      return self.onFinish = null;
    };

    Marquee.prototype.start = function(timer) {
      if (this.__start) {
        return false;
      }
      this.__timer = timer;
      this.__start = true;
      return true;
    };

    Marquee.prototype.update = function() {
      if (!this.__start) {
        return false;
      }
      if (--this.__next > 0) {
        return true;
      }
      this.__next = this.delta;
      this.entity.offset(dx, dy);
      this.__timer -= this.delta;
      if (this.__timer < 1) {
        this.__timer = 0;
        this.__start = false;
        if (this.onFinish === 'function') {
          return this.onFinish();
        }
      }
    };

    function Marquee(sprite, dx, dy) {
      this.update = __bind(this.update, this);
      this.start = __bind(this.start, this);      Marquee.__super__.constructor.call(this);
      init(this);
      this.entity = sprite;
      this.dx = dx;
      this.dy = dy;
    }

    return Marquee;

  })(Animate);

  Animate.Move = (function(_super) {
    var init;

    __extends(Move, _super);

    Move.prototype.__animateType = 'move';

    init = function(self) {
      self.__timer = 0;
      self.__frame = 0;
      self.__start = false;
      self.__next = 0;
      self.entity = null;
      self.path = null;
      self.delta = 1;
      return self.onFinish = null;
    };

    Move.prototype.start = function(timer) {
      if (this.__start) {
        return false;
      }
      this.__timer = timer;
      this.__start = true;
      return true;
    };

    Move.prototype.update = function() {
      var point;

      if (!this.__start) {
        return false;
      }
      if (--this.__next > 0) {
        return true;
      }
      this.__next = this.delta;
      point = this.path(this.__frame);
      this.entity.x(point.x);
      this.entity.y(point.y);
      this.__frame += this.delta;
      this.__timer -= this.delta;
      if (this.__timer < 1) {
        this.__timer = this.__frame = 0;
        this.__start = false;
        if (this.onFinish === 'function') {
          return this.onFinish();
        }
      }
    };

    function Move(sprite, path) {
      this.update = __bind(this.update, this);
      this.start = __bind(this.start, this);      Move.__super__.constructor.call(this);
      init(this);
      this.entity = sprite;
      this.path = path;
    }

    return Move;

  })(Animate);

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
    'ENTER': 13,
    'SPACE': 32,
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
    'Alt+ENTER': 269,
    'Alt+SPACE': 288,
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
    'Ctrl+ENTER': 525,
    'Ctrl+SPACE': 544,
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
    'Shift+ENTER': 1037,
    'Shift+SPACE': 1056,
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
    'Alt+Ctrl+ENTER': 781,
    'Alt+Ctrl+ENTER': 800,
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
    'Alt+Shift+ENTER': 1293,
    'Alt+Shift+ENTER': 1312,
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
    'Ctrl+Shift+ENTER': 1549,
    'Ctrl+Shift+SPACE': 1568,
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
    'Alt+Ctrl+Shift+DOWN': 1832,
    'Alt+Ctrl+Shift+ENTER': 1805,
    'Alt+Ctrl+Shift+SPACE': 1824
  };

  Core.Update = (function(_super) {
    __extends(Update, _super);

    Update.prototype.functions = null;

    Update.prototype.bind = function(name, func) {
      if (typeof func === 'function') {
        return functions[name] = func;
      }
    };

    Update.prototype.unbind = function() {
      return delete functions[name];
    };

    Update.prototype.update = function() {
      var func, _i, _len, _ref4, _results;

      _ref4 = this.functions;
      _results = [];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        func = _ref4[_i];
        if (typeof func === 'function') {
          _results.push(func());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    function Update() {
      this.update = __bind(this.update, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);      this.functions = {};
    }

    return Update;

  })(Core);

  DataType.Color = (function(_super) {
    var dec2hex, hex2dec, init, scope,
      _this = this;

    __extends(Color, _super);

    Color.prototype.__dataType = 'color';

    init = function(self) {
      return self.__options = {
        r: 0,
        g: 0,
        b: 0
      };
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
      this.getRGB = __bind(this.getRGB, this);      init(this);
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
    var init, scope,
      _this = this;

    __extends(Tone, _super);

    Tone.prototype.__dataType = 'tone';

    init = function(self) {
      self.__options = {
        r: 0,
        g: 0,
        b: 0,
        alpha: 1,
        gray: false,
        opposite: false,
        transparent: null
      };
      return self.noChange = true;
    };

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
      this.red = __bind(this.red, this);      init(this);
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
    var init;

    __extends(Bitmap, _super);

    Bitmap.prototype.__drawType = 'bitmap';

    init = function(self) {
      self.__isDisposed = true;
      self.__context = null;
      self.__options = {
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
      return self.entity = null;
    };

    Bitmap.prototype.load = function(src, callback) {
      var _this = this;

      this.entity = new Image();
      this.entity.onload = function() {
        if (!_this.__width) {
          _this.__width = _this.entity.width;
        }
        if (!_this.__height) {
          _this.__height = _this.entity.height;
        }
        if (typeof callback === 'function') {
          return callback(_this);
        }
      };
      return this.entity.src = src;
    };

    Bitmap.prototype.draw = function(stage) {
      this.__stage = stage;
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

    Bitmap.prototype.update = function(_context, x, y, width, height) {
      if (_context) {
        this.__context = _context;
      }
      if (!(this.__isDisposed && this.__context)) {
        return false;
      }
      if (!x) {
        x = 0;
      }
      if (!y) {
        y = 0;
      }
      if (!width) {
        width = this.__width;
      }
      if (!height) {
        height = this.__height;
      }
      this.__context.globalAlpha = this.__options.alpha;
      this.__context.scale(this.__options.scaleX, this.__options.scaleY);
      this.__context.rotate(this.__options.rotate);
      return this.__context.drawImage(this.entity, this.__x, this.__y, this.__width, this.__height, x, y, width, height);
    };

    Bitmap.prototype.destroy = function() {
      delete this.entity;
      return Bitmap.__super__.destroy.call(this);
    };

    function Bitmap(width, height) {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
      this.clone = __bind(this.clone, this);
      this.draw = __bind(this.draw, this);
      this.load = __bind(this.load, this);
      var nextUpdate;

      init(this);
      this.width(width);
      this.height(height);
      nextUpdate = this.frequency;
    }

    return Bitmap;

  })(Draw);

  Draw.Sprite = (function(_super) {
    var init, zAutoIncrement;

    __extends(Sprite, _super);

    zAutoIncrement = 0;

    Sprite.prototype.__drawType = 'sprite';

    init = function(self) {
      self.__tone = self.__stage = self.__bitmap = self.__canvas = self.__context = self.__imageData = null;
      self.__isDisposed = self.__imageChanged = self.__toneChanged = false;
      return self.__options = {
        bx: 0,
        by: 0,
        bw: 0,
        bh: 0
      };
    };

    Sprite.prototype.__updateCanvas = function() {
      var cache;

      cache = this.__canvas.getContext('2d');
      cache.restore();
      cache.save();
      cache.clearRect(0, 0, this.__width, this.__height);
      if (this.__bitmap && this.__bitmap.dispose()) {
        this.__bitmap.update(cache, this.__options.bx, this.__options.by, this.__options.bw, this.__options.bh);
      }
      this.__imageChanged = false;
      return cache;
    };

    Sprite.prototype.__updateImageData = function() {
      var data, i;

      if (!(this.__tone && !this.__tone.noChange)) {
        return;
      }
      i = 0;
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

    Sprite.prototype.tone = function(t) {
      if (t && t.type() === 'datatype' && t.dataType() === 'tone') {
        this.__tone = t;
        this.__toneChanged = true;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__tone;
    };

    Sprite.prototype.bitmap = function(bitmap, x, y, width, height) {
      if (bitmap && bitmap.type() === 'draw' && bitmap.drawType() === 'bitmap') {
        if (x) {
          this.__options.bx = x;
        }
        if (y) {
          this.__options.by = y;
        }
        if (width) {
          this.__options.bw = width;
        }
        if (height) {
          this.__options.bh = height;
        }
        if (!this.__width) {
          this.__width = this.__options.bw || bitmap.width();
        }
        if (!this.__height) {
          this.__height = this.__options.bh || bitmap.height();
        }
        this.__bitmap = bitmap;
        this.__imageChanged = true;
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this.__bitmap;
    };

    Sprite.prototype.draw = function(stage) {
      this.__stage = stage;
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
      var cache, ret;

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
      if (this.__imageData) {
        return ret = {
          map: this.__imageData.data,
          x: this.__x,
          y: this.__y,
          width: this.__width,
          height: this.__height
        };
      } else {
        return ret = false;
      }
    };

    Sprite.prototype.offset = function(dx, dy) {
      if (dx < 1) {
        dx = this.__options.bw * dx;
      }
      if (dy < 1) {
        dy = this.__options.bh * dy;
      }
      this.__options.bx += dx % this.__options.bw;
      if (this.__options.bx > this.__options.bw) {
        this.__options.bx -= this.__options.bw;
      }
      if (this.__options.bx < 0) {
        this.__options.bx += this.__options.bw;
      }
      this.__options.by += dy % this.__options.bh;
      if (this.__options.by > this.__options.bh) {
        this.__options.by -= this.__options.bh;
      }
      if (this.__options.by < 0) {
        return this.__options.by += this.__options.bh;
      }
    };

    Sprite.prototype.clone = function() {
      var dest;

      dest = new Draw.Sprite();
      dest = Sprite.__super__.clone.call(this, dest, this);
      dest.bitmap(this.__bitmap.clone());
      return dest;
    };

    function Sprite(width, height, x, y) {
      this.clone = __bind(this.clone, this);
      this.offset = __bind(this.offset, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.bitmap = __bind(this.bitmap, this);
      this.tone = __bind(this.tone, this);
      this.__updateImageData = __bind(this.__updateImageData, this);
      this.__updateCanvas = __bind(this.__updateCanvas, this);      init(this);
      this.width(width);
      this.height(height);
      this.x(x);
      this.y(y);
      this.z(zAutoIncrement++);
    }

    return Sprite;

  })(Draw);

  Draw.Vector = (function(_super) {
    var init;

    __extends(Vector, _super);

    Vector.prototype.__drawType = 'vector';

    init = function(self) {
      self.__isDisposed = true;
      self.__options = {
        lineWidth: 1,
        strokeStyle: 'black',
        lineCap: 'butt',
        fillStyle: 'black',
        alpha: 1
      };
      return self.vector = [];
    };

    Vector.prototype.__updateLine = function(vector) {
      this.__context.moveTo(vector.__options.start.x + this.__x, vector.__options.start.y + this.__y);
      return this.__context.lineTo(vector.__options.end.x + this.__x, vector.__options.end.y + this.__y);
    };

    Vector.prototype.__updateRect = function(vector) {
      return this.__context.rect(vector.__options.start.x + this.__x, vector.__options.start.y + this.__y, vector.__options.width, vector.__options.height);
    };

    Vector.prototype.draw = function(stage) {
      this.__stage = stage;
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
      this.__context.globalAlpha = this.__options.alpha;
      this.__context.closePath();
      this.__context.stroke();
      this.__context.fill();
      return this.__context.globalAlpha = 1;
    };

    Vector.prototype.append = function(v) {
      if (v.type() === 'vector') {
        this.vector.push(v);
        if (this.__stage) {
          this.__stage.needUpdate = true;
        }
      }
      return this;
    };

    function Vector(x, y) {
      this.append = __bind(this.append, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.__updateRect = __bind(this.__updateRect, this);
      this.__updateLine = __bind(this.__updateLine, this);      init(this);
      this.x(x);
      this.y(y);
    }

    return Vector;

  })(Draw);

  HTML.BLOCK = (function(_super) {
    var init;

    __extends(BLOCK, _super);

    BLOCK.prototype.__htmlType = 'block';

    init = function(self) {
      self.__options = {
        x: 0,
        y: 0,
        z: 1,
        width: 0,
        height: 0
      };
      return self.stage = null;
    };

    BLOCK.prototype.__style = function(div) {
      div.style.position = 'absolute';
      div.style.left = "" + this.__options.x + "px";
      div.style.top = "" + this.__options.y + "px";
      div.style.width = "" + this.__options.width + "px";
      div.style.height = "" + this.__options.height + "px";
      return div.style.zIndex = this.__options.z;
    };

    BLOCK.prototype.build = function(options, callback) {
      this.element = document.createElement('div');
      this.options(options);
      this.__style(this.element);
      if (typeof options.content === 'string') {
        this.element.innerHTML = this.options.content;
      } else if (typeof options.content === 'object') {
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
          this.__options[i] = options[i];
        }
      }
      return this.__style(this.element);
    };

    function BLOCK(stage) {
      this.options = __bind(this.options, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);
      this.__style = __bind(this.__style, this);      init(this);
      if (stage && stage.type() === 'stage') {
        this.stage = stage;
      }
    }

    return BLOCK;

  })(HTML);

  HTML.IMG = (function(_super) {
    __extends(IMG, _super);

    IMG.prototype.__htmlType = 'img';

    IMG.prototype.init = function(self) {
      self.__options = {
        x: 0,
        y: 0,
        z: 1,
        width: 0,
        height: 0
      };
      return self.stage = null;
    };

    IMG.prototype.__style = function(img) {
      img.style.position = 'absolute';
      img.style.left = "" + this.__options.x + "px";
      img.style.top = "" + this.__options.y + "px";
      img.style.zIndex = this.__options.z;
      img.width = this.__options.width;
      return img.height = this.__options.height;
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
        this.__options[i] = options[i];
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
          this.__options[i] = options[i];
        }
      }
      return this.__style(this.element);
    };

    function IMG(stage) {
      this.set = __bind(this.set, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);
      this.__style = __bind(this.__style, this);      init(this);
      if (stage && stage.type() === 'stage') {
        this.stage = stage;
      }
    }

    return IMG;

  })(HTML);

  Input.Keyboard = (function(_super) {
    var init;

    __extends(Keyboard, _super);

    init = function(self) {
      return self.press = null;
    };

    function Keyboard(dom) {
      var textarea,
        _this = this;

      init(this);
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
    var init;

    __extends(Mouse, _super);

    init = function(self) {
      self.click = null;
      return self.position = null;
    };

    function Mouse(dom) {
      var _this = this;

      init(this);
      dom.addEventListener('mousedown', function(event) {
        return _this.click = {
          button: event.button,
          x: event.offsetX || event.layerX,
          y: event.offsetY || event.layerY
        };
      });
      dom.addEventListener('mouseover', function(event) {
        return _this.position = {
          x: event.offsetX || event.layerX,
          y: event.offsetY || event.layerY
        };
      });
    }

    return Mouse;

  })(Input);

  Vector.Circle = (function(_super) {
    var init;

    __extends(Circle, _super);

    Circle.prototype.__vectorType = 'circle';

    init = function(self) {
      return self.__options = {
        origin: {
          x: 0,
          y: 0
        },
        radius: 0
      };
    };

    Circle.prototype.isInside = function(x, y) {
      return Math.pow(this.__options.x - x, 2) + Math.pow(this.__options.y - y, 2) <= options.radius * options.radius;
    };

    Circle.prototype.move = function(dx, dy) {
      this.__options.origin.x += dx;
      return this.__options.origin.y += dy;
    };

    function Circle(origin, radius) {
      this.move = __bind(this.move, this);
      this.isInside = __bind(this.isInside, this);      init(this);
      this.__options.origin = origin;
      this.__options.radius = radius;
    }

    return Circle;

  })(Vector);

  Vector.Line = (function(_super) {
    var init;

    __extends(Line, _super);

    Line.prototype.__vectorType = 'line';

    init = function(self) {
      return self.__options = {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        }
      };
    };

    Line.prototype.isInside = function(x, y) {
      return false;
    };

    Line.prototype.move = function(dx, dy) {
      this.__options.start.x += dx;
      this.__options.start.y += dy;
      this.__options.end.x += dx;
      return this.__options.end.y += dy;
    };

    function Line(start, end) {
      this.move = __bind(this.move, this);      init(this);
      this.__options.start = start;
      this.__options.end = end;
    }

    return Line;

  })(Vector);

  Vector.Rect = (function(_super) {
    var init;

    __extends(Rect, _super);

    Rect.prototype.__vectorType = 'rect';

    init = function(self) {
      return self.__options = {
        start: {
          x: 0,
          y: 0
        },
        width: 0,
        height: 0
      };
    };

    Rect.prototype.isInside = function(x, y) {
      if (x < this.__options.start.x || x > this.__options.start.x + this.__options.start.width || y < this.__options.start.y || y > this.__options.start.y + this.__options.start.height) {
        false;
      }
      return true;
    };

    Rect.prototype.move = function(dx, dy) {
      this.__options.start.x += dx;
      this.__options.start.y += dy;
      return this;
    };

    function Rect(start, width, height) {
      this.move = __bind(this.move, this);
      this.isInside = __bind(this.isInside, this);      init(this);
      this.__options.start = start;
      this.__options.width = width;
      this.__options.height = height;
    }

    return Rect;

  })(Vector);

}).call(this);

/*
//@ sourceMappingURL=hikari.js.map
*/