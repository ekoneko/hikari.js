(function() {
  var Audio, Draw, Event, HTML, Keyboard, Mouse, Network, Object, Stage, Store, Tone, Vector, _ref, _ref1, _ref2, _ref3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Hikari = (function() {
    var delay, global, init,
      _this = this;

    delay = null;

    Hikari.prototype.type = 'hikari';

    global = function() {
      Hikari.Audio = Audio;
      Hikari.Draw = Draw;
      Hikari.HTML = HTML;
      Hikari.Event = Event;
      Hikari.Keyboard = Keyboard;
      Hikari.Mouse = Mouse;
      return Hikari.NetWork = Network;
    };

    init = function() {
      return delay = function(callback) {
        return setTimeout(function() {
          return callback();
        }, 60);
      };
    };

    Hikari.prototype.update = function() {
      this.stage.update();
      return delay(this.update);
    };

    function Hikari(container, width, height, callback) {
      this.update = __bind(this.update, this);      global();
      init();
      this.stage = new Stage(width, height, container);
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
    }

    Object.prototype.type = 'object';

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

  Draw = (function(_super) {
    __extends(Draw, _super);

    function Draw() {
      this.clone = __bind(this.clone, this);
      this.setOptions = __bind(this.setOptions, this);      _ref = Draw.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Draw.prototype.type = 'draw';

    Draw.prototype.options = {};

    Draw.prototype.x = 0;

    Draw.prototype.y = 0;

    Draw.prototype.z = 0;

    Draw.prototype.setOptions = function(_options) {
      var key;

      for (key in _options) {
        if (typeof this.options[key] !== 'undefined') {
          this.options[key] = _options[key];
        }
      }
      return true;
    };

    Draw.prototype.clone = function(desc, src) {
      var key, _i, _len, _ref1;

      _ref1 = ['options', 'x', 'y', 'z'];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        key = _ref1[_i];
        desc[key] = src[key];
      }
      return desc;
    };

    return Draw;

  })(Object);

  Event = (function() {
    function Event() {}

    return Event;

  })();

  HTML = (function(_super) {
    __extends(HTML, _super);

    function HTML() {
      this.build = __bind(this.build, this);
      this.remove = __bind(this.remove, this);
      this.append = __bind(this.append, this);      _ref1 = HTML.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    HTML.prototype.type = 'html';

    HTML.prototype.tag = null;

    HTML.prototype.element = null;

    HTML.prototype.stage = null;

    HTML.prototype.onStage = false;

    HTML.prototype.append = function() {
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

  Stage = (function(_super) {
    var list;

    __extends(Stage, _super);

    list = [];

    Stage.prototype.box = null;

    Stage.prototype.canvas = null;

    Stage.prototype.context = null;

    Stage.prototype.width = 0;

    Stage.prototype.height = 0;

    Stage.prototype.type = 'stage';

    Stage.prototype.append = function(o) {
      if (o.type !== 'draw') {
        console.log('error: object cannt append to canvas', o);
        return;
      }
      if (o.drawType === 'sprite') {
        list.push(o);
      }
      return o.draw(this);
    };

    Stage.prototype.update = function() {
      var item, _i, _len, _results;

      this.context.restore();
      this.context.save();
      this.context.clearRect(0, 0, this.width, this.height);
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        _results.push(item.update());
      }
      return _results;
    };

    function Stage(width, height, container, callback) {
      this.update = __bind(this.update, this);
      this.append = __bind(this.append, this);      this.width = width;
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

  Tone = (function() {
    Tone.prototype.rgb = 0;

    Tone.prototype.green = 0;

    Tone.prototype.blue = 0;

    Tone.prototype.alpha = 255;

    function Tone(r, g, b, a) {
      this.rgb = r;
      this.green = g;
      this.blue = b;
      this.alpha = a;
    }

    return Tone;

  })();

  Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      this.setOptions = __bind(this.setOptions, this);      _ref2 = Vector.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

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

  Draw.Bitmap = (function(_super) {
    var context;

    __extends(Bitmap, _super);

    context = null;

    Bitmap.prototype.drawType = 'bitmap';

    Bitmap.prototype.isDisposed = true;

    Bitmap.prototype.entity = null;

    Bitmap.prototype.options = {
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

    Bitmap.prototype.load = function(src, callback) {
      var _this = this;

      this.entity = new Image();
      this.entity.onload = function() {
        _this.options.sourceWidth = _this.entity.width;
        _this.options.sourceHeight = _this.entity.height;
        return callback(_this);
      };
      return this.entity.src = src;
    };

    Bitmap.prototype.draw = function(stage) {
      if (stage) {
        context = stage.context;
      }
      this.isDisposed = true;
      return this.update();
    };

    Bitmap.prototype.clone = function() {
      var newBitmap;

      newBitmap = new Bitmap(this.width, this.height);
      if (this.entity) {
        newBitmap.entity = this.entity.cloneNode();
      }
      return Bitmap.__super__.clone.call(this, newBitmap, this);
    };

    Bitmap.prototype.update = function(_context) {
      if (_context) {
        context = _context;
      }
      if (!(this.isDisposed && context)) {
        return false;
      }
      context.globalAlpha = this.options.alpha;
      context.scale(this.options.scaleX, this.options.scaleY);
      context.transform(this.options.transX, this.options.transY);
      context.rotate(this.options.rotate);
      return context.drawImage(this.entity, this.options.sourceX, this.options.sourceY, this.options.sourceWidth, this.options.sourceHeight, this.x, this.y, this.width, this.height);
    };

    Bitmap.prototype.dispose = function(value) {
      if (value) {
        this.isDisposed = value;
      }
      return this.isDisposed;
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

      this.width = width;
      this.height = height;
      nextUpdate = this.frequency;
    }

    return Bitmap;

  })(Draw);

  Draw.Sprite = (function(_super) {
    var canvas, context, list, sort;

    __extends(Sprite, _super);

    canvas = context = null;

    list = [];

    Sprite.prototype.drawType = 'sprite';

    Sprite.prototype.isDisposed = false;

    Sprite.prototype.x = 0;

    Sprite.prototype.y = 0;

    Sprite.prototype.z = 0;

    Sprite.prototype.width = 0;

    Sprite.prototype.height = 0;

    sort = function(list) {
      return list.sort(function(a, b) {
        return a.z > b.z;
      });
    };

    Sprite.prototype.append = function(image) {
      if (image.type !== 'draw' && image.drawType === 'sprite') {
        return;
      }
      if (!this.width) {
        this.width = image.width + image.x;
      }
      if (!this.height) {
        this.height = image.height + image.y;
      }
      return list.push(image);
    };

    Sprite.prototype.draw = function(stage) {
      context = stage.context;
      this.isDisposed = true;
      if (canvas === null) {
        canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
      }
      return this.update();
    };

    Sprite.prototype.update = function(_context) {
      var cache, item, pixels, _i, _len;

      if (_context) {
        context = _context;
      }
      if (!(this.isDisposed && context)) {
        return false;
      }
      cache = canvas.getContext('2d');
      list = sort(list);
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        if (!item.isDisposed) {
          continue;
        }
        item.update(cache);
      }
      pixels = cache.getImageData(0, 0, this.width, this.height);
      return context.putImageData(pixels, this.x, this.y);
    };

    Sprite.prototype.dispose = function(value) {
      if (value) {
        this.isDisposed = value;
      }
      return this.isDisposed;
    };

    function Sprite(width, height, x, y) {
      this.dispose = __bind(this.dispose, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);
      this.append = __bind(this.append, this);      if (width) {
        this.width = width;
      }
      if (height) {
        this.height = height;
      }
      if (x) {
        this.x = x;
      }
      if (y) {
        this.y = y;
      }
    }

    return Sprite;

  })(Draw);

  Draw.Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      _ref3 = Vector.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Vector.prototype.drawType = 'vector';

    Vector.prototype.options = {
      lineWidth: 1,
      strokeStyle: 'black',
      lineCap: 'butt',
      fillStyle: 'black'
    };

    return Vector;

  })(Draw);

  HTML.BLOCK = (function(_super) {
    var attribute, style;

    __extends(BLOCK, _super);

    BLOCK.prototype.htmlType = 'block';

    attribute = {
      x: 0,
      y: 0,
      z: 1,
      width: 0,
      height: 0
    };

    style = function(div) {
      div.style.position = 'absolute';
      div.style.left = "" + attribute.x + "px";
      div.style.top = "" + attribute.y + "px";
      div.style.width = "" + attribute.width + "px";
      div.style.height = "" + attribute.height + "px";
      return div.style.zIndex = attribute.z;
    };

    BLOCK.prototype.build = function(options, callback) {
      var i, _i, _len, _ref4;

      this.element = document.createElement('div');
      _ref4 = ['x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        i = _ref4[_i];
        attribute[i] = options[i];
      }
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

    BLOCK.prototype.set = function(options) {
      var i, _i, _len, _ref4;

      _ref4 = ['x', 'y', 'z', 'width', 'height'];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        i = _ref4[_i];
        if (options[i]) {
          attribute[i] = options[i];
        }
      }
      return style(this.element);
    };

    function BLOCK(stage) {
      this.set = __bind(this.set, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);      if (stage && stage.type === 'stage') {
        this.stage = stage;
      }
    }

    return BLOCK;

  })(HTML);

  HTML.IMG = (function(_super) {
    var attribute, style;

    __extends(IMG, _super);

    IMG.prototype.htmlType = 'img';

    attribute = {
      x: 0,
      y: 0,
      z: 1,
      width: 0,
      height: 0
    };

    style = function(img) {
      img.style.position = 'absolute';
      img.style.left = "" + attribute.x + "px";
      img.style.top = "" + attribute.y + "px";
      img.style.zIndex = attribute.z;
      img.width = attribute.width;
      return img.height = attribute.height;
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
        attribute[i] = options[i];
      }
      style(this.element);
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
          attribute[i] = options[i];
        }
      }
      return style(this.element);
    };

    function IMG(stage) {
      this.set = __bind(this.set, this);
      this.destroy = __bind(this.destroy, this);
      this.build = __bind(this.build, this);      if (stage && stage.type === 'stage') {
        this.stage = stage;
      }
    }

    return IMG;

  })(HTML);

  Vector.Line = (function(_super) {
    var vectorType;

    __extends(Line, _super);

    vectorType = 'line';

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
      this.options.start = start;
      this.options.end = end;
    }

    return Line;

  })(Vector);

  Vector.Rect = (function(_super) {
    var vectorType;

    __extends(Rect, _super);

    vectorType = 'rect';

    Rect.prototype.options = {
      start: {
        x: 0,
        y: 0
      },
      width: 0,
      height: 0
    };

    function Rect(start, width, height) {
      this.options.start = start;
      this.options.width = width;
      this.options.height = height;
    }

    return Rect;

  })(Vector);

}).call(this);
