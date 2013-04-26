(function() {
  var Audio, Bitmap, Event, Graphics, Keyboard, Mouse, Network, Object, Sprite, Stage, Store, VectorLine, Window,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Audio = (function() {
    function Audio() {}

    return Audio;

  })();

  Bitmap = (function(_super) {
    var context, drawCache;

    __extends(Bitmap, _super);

    context = null;

    drawCache = [];

    Bitmap.prototype.is = 'bitmap';

    Bitmap.prototype.isDisposd = false;

    Bitmap.prototype.entity = null;

    Bitmap.prototype.sourceX = 0;

    Bitmap.prototype.sourceY = 0;

    Bitmap.prototype.sourceWidth = 0;

    Bitmap.prototype.sourceHeight = 0;

    Bitmap.prototype.x = 0;

    Bitmap.prototype.y = 0;

    Bitmap.prototype.z = 0;

    Bitmap.prototype.width = 0;

    Bitmap.prototype.height = 0;

    Bitmap.prototype.transX = 0;

    Bitmap.prototype.transY = 0;

    Bitmap.prototype.scaleX = 1;

    Bitmap.prototype.scaleY = 1;

    Bitmap.prototype.alpha = 1;

    Bitmap.prototype.rotate = 0;

    Bitmap.prototype.load = function(src, callback) {
      var _this = this;

      this.entity = new Image();
      this.entity.onload = function() {
        _this.sourceWidth = _this.entity.width;
        _this.sourceHeight = _this.entity.height;
        return callback(_this);
      };
      return this.entity.src = src;
    };

    Bitmap.prototype.draw = function(_context) {
      context = _context;
      this.isDisposd = true;
      return this.update;
    };

    Bitmap.prototype.clone = function() {
      var field, key, newBitmap, _i, _len;

      newBitmap = new Bitmap(this.width, this.height);
      field = ['sourceX', 'sourceY', 'sourceWidth', 'sourceHeight', 'x', 'y', 'z', 'width', 'height', 'transX', 'transY', 'scaleX', 'scaleY', 'alpha', 'rotate'];
      for (_i = 0, _len = field.length; _i < _len; _i++) {
        key = field[_i];
        newBitmap[key] = this[key];
      }
      if (this.entity) {
        return newBitmap.entity = this.entity.cloneNode();
      }
    };

    Bitmap.prototype.drawLine = function() {};

    Bitmap.prototype.drawRect = function() {};

    Bitmap.prototype.drawCircle = function() {};

    Bitmap.prototype.drawArc = function() {};

    Bitmap.prototype.update = function() {
      if (!(this.isDisposd && context)) {
        return false;
      }
      context.globalAlpha = this.alpha;
      context.transform(this.transX, this.transY);
      context.rotate(this.rotate);
      return context.drawImage(this.entity, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height);
    };

    Bitmap.prototype.dispose = function(value) {
      if (value) {
        this.isDisposd = value;
      }
      return this.isDisposd;
    };

    Bitmap.prototype.destroy = function() {
      return delete this;
    };

    function Bitmap(width, height) {
      this.destroy = __bind(this.destroy, this);
      this.dispose = __bind(this.dispose, this);
      this.update = __bind(this.update, this);
      this.drawArc = __bind(this.drawArc, this);
      this.drawCircle = __bind(this.drawCircle, this);
      this.drawRect = __bind(this.drawRect, this);
      this.drawLine = __bind(this.drawLine, this);
      this.clone = __bind(this.clone, this);
      this.draw = __bind(this.draw, this);
      this.load = __bind(this.load, this);
      var nextUpdate;

      this.width = width;
      this.height = height;
      nextUpdate = this.frequency;
    }

    return Bitmap;

  })(Object);

  Event = (function() {
    function Event() {}

    return Event;

  })();

  Graphics = (function() {
    function Graphics() {}

    return Graphics;

  })();

  this.Hikari = (function() {
    var global, init,
      _this = this;

    Hikari.prototype.is = 'hikari';

    global = function() {
      Hikari.Audio = Audio;
      Hikari.Bitmap = Bitmap;
      Hikari.Sprite = Sprite;
      Hikari.Event = Event;
      Hikari.Graphics = Graphics;
      Hikari.Keyboard = Keyboard;
      Hikari.Mouse = Mouse;
      Hikari.NetWork = Network;
      return Hikari.Window = Window;
    };

    init = function() {
      var r;

      r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || setTimeout(function(callback) {
        return callback();
      }, 60);
      return window.requestAnimationFrame = r;
    };

    Hikari.prototype.update = function() {
      this.stage.update();
      return this.update();
    };

    function Hikari(container, width, height, callback) {
      this.update = __bind(this.update, this);      global();
      init();
      this.stage = new Stage(width, height, container);
      this.update();
      if (typeof callback === 'function') {
        callback();
      }
    }

    return Hikari;

  }).call(this);

  Keyboard = (function() {
    function Keyboard() {}

    return Keyboard;

  })();

  Mouse = (function() {
    function Mouse() {}

    return Mouse;

  })();

  Network = (function() {
    function Network() {}

    return Network;

  })();

  Object = (function() {
    function Object() {
      this.set = __bind(this.set, this);
    }

    Object.prototype.set = function(options) {
      var key;

      for (key in options) {
        if (typeof this[key] !== 'undefined') {
          this[key] = options[key];
        }
      }
      return true;
    };

    return Object;

  })();

  Sprite = (function() {
    function Sprite() {}

    return Sprite;

  })();

  Stage = (function(_super) {
    var list;

    __extends(Stage, _super);

    list = [];

    Stage.prototype.canvas = null;

    Stage.prototype.context = null;

    Stage.prototype.width = 0;

    Stage.prototype.height = 0;

    Stage.prototype.is = 'stage';

    Stage.prototype.append = function(o) {
      if (typeof o.draw !== 'function') {
        console.log('error: object cannt append to canvas');
        return;
      }
      list.push(o);
      return o.draw(this.context);
    };

    Stage.prototype.update = function() {
      var item, _i, _len, _results;

      context.clearRect(0, 0, this.width, this.height);
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        _results.push(item.update());
      }
      return _results;
    };

    function Stage(width, height, container) {
      this.update = __bind(this.update, this);
      this.append = __bind(this.append, this);      this.width = width;
      this.height = height;
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
      container.appendChild(this.canvas);
    }

    return Stage;

  })(Object);

  Store = (function() {
    function Store() {}

    return Store;

  })();

  Window = (function() {
    function Window() {}

    return Window;

  })();

  VectorLine = (function() {
    function VectorLine() {
      true;
    }

    return VectorLine;

  })();

}).call(this);
