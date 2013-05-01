(function() {
  var Audio, DateType, Draw, Event, HTML, Keyboard, Mouse, Network, Object, Stage, Store, Vector, _ref, _ref1, _ref2, _ref3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Hikari = (function() {
    var global,
      _this = this;

    Hikari.prototype.type = 'hikari';

    Hikari.prototype.__delay = null;

    Hikari.prototype.times = 0;

    Hikari.prototype.fps = 0;

    global = function() {
      Hikari.Audio = Audio;
      Hikari.Draw = Draw;
      Hikari.HTML = HTML;
      Hikari.DateType = DateType;
      Hikari.Vector = Vector;
      Hikari.Event = Event;
      Hikari.Keyboard = Keyboard;
      Hikari.Mouse = Mouse;
      return Hikari.NetWork = Network;
    };

    Hikari.prototype.init = function() {
      return this.__delay = function(callback) {
        return setTimeout(function() {
          return callback();
        }, this.times);
      };
    };

    Hikari.prototype.update = function() {
      this.stage.update();
      return this.__delay(this.update);
    };

    function Hikari(container, width, height, callback) {
      this.update = __bind(this.update, this);
      this.init = __bind(this.init, this);      this.fps = 30;
      this.times = 1000 / 30;
      global();
      this.init();
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
      this.get = __bind(this.get, this);
    }

    Object.prototype.type = 'object';

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

  DateType = (function(_super) {
    __extends(DateType, _super);

    function DateType() {
      this.clone = __bind(this.clone, this);      _ref = DateType.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DateType.prototype.type = 'datetype';

    DateType.prototype.dataType = '';

    DateType.prototype.clone = function(dest, src) {
      dest.options = src.options;
      return dest;
    };

    return DateType;

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
      this.x = __bind(this.x, this);      _ref1 = Draw.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Draw.prototype.type = 'draw';

    Draw.prototype.__x = 0;

    Draw.prototype.__y = 0;

    Draw.prototype.__z = 0;

    Draw.prototype.__width = 0;

    Draw.prototype.__height = 0;

    Draw.prototype.__options = {};

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

  Event = (function() {
    function Event() {}

    return Event;

  })();

  HTML = (function(_super) {
    __extends(HTML, _super);

    function HTML() {
      this.build = __bind(this.build, this);
      this.remove = __bind(this.remove, this);
      this.append = __bind(this.append, this);      _ref2 = HTML.__super__.constructor.apply(this, arguments);
      return _ref2;
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
      if (['bitmap', 'sprite'].indexOf(o.drawType > -1)) {
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

  Vector = (function(_super) {
    __extends(Vector, _super);

    function Vector() {
      this.setOptions = __bind(this.setOptions, this);      _ref3 = Vector.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Vector.prototype.vectorType = '';

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

  DateType.Color = (function(_super) {
    var dec2hex, hex2dec, scope,
      _this = this;

    __extends(Color, _super);

    Color.prototype.dataType = 'color';

    Color.prototype.options = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 1
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
      return "(" + this.options.r + ", " + this.options.g + ", " + this.options.b + ")";
    };

    Color.prototype.getRGBA = function() {
      return "(" + this.options.r + ", " + this.options.g + ", " + options.b + ", " + options.alpha + ")";
    };

    Color.prototype.red = function(r) {
      if (typeof r === 'number') {
        this.options.r = scope(r, 0, 255);
      }
      return this.options.r;
    };

    Color.prototype.green = function(g) {
      if (typeof g === 'number') {
        this.options.g = scope(g, 0, 255);
      }
      return this.options.g;
    };

    Color.prototype.blue = function(b) {
      if (typeof b === 'number') {
        this.options.b = scope(b, 0, 255);
      }
      return this.options.b;
    };

    Color.prototype.hex = function(hex) {
      if (hex && /#[0-9A-Fa-f]{6}/.test(hex)) {
        this.set(hex);
        return hex;
      }
      return dec2hex(this.options.r, this.options.g, this.options.b);
    };

    Color.prototype.alpha = function(a) {
      if (typeof a === 'number') {
        this.options.alpha = scope(a, 0, 1);
      }
      return this.options.alpha;
    };

    Color.prototype.set = function(color, value) {
      var i, rgb, _i, _len, _ref4;

      if (typeof color === 'object') {
        this.red(color.r || color.R);
        this.green(color.g || color.G);
        this.blue(color.b || color.B);
        this.alpha(color.alpha);
      } else {
        color = color.toLocaleLowerCase();
        if (['r', 'g', 'b', 'alpha'].indexOf(color) !== -1) {
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
      return new DateType.Color(this.options);
    };

    function Color(r, g, b, a) {
      this.clone = __bind(this.clone, this);
      this.set = __bind(this.set, this);
      this.alpha = __bind(this.alpha, this);
      this.hex = __bind(this.hex, this);
      this.blue = __bind(this.blue, this);
      this.green = __bind(this.green, this);
      this.red = __bind(this.red, this);
      this.getRGBA = __bind(this.getRGBA, this);
      this.getRGB = __bind(this.getRGB, this);      this.options = {
        r: 0,
        g: 0,
        b: 0,
        alpha: 1
      };
      if (r[0] === '#') {
        this.set(r);
      } else {
        this.set({
          r: r,
          g: g,
          b: b
        });
        if (typeof a === 'number') {
          this.alpha = a;
        }
      }
    }

    return Color;

  }).call(this, DateType);

  DateType.Tone = (function(_super) {
    var scope,
      _this = this;

    __extends(Tone, _super);

    Tone.prototype.dataType = 'tone';

    Tone.prototype.options = {
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
        this.options.r = scope(r, -255, 255);
        this.noChange = false;
      }
      return this.options.r;
    };

    Tone.prototype.green = function(g) {
      if (typeof g === 'number') {
        this.options.g = scope(g, -255, 255);
        this.noChange = false;
      }
      return this.options.g;
    };

    Tone.prototype.blue = function(b) {
      if (typeof b === 'number') {
        this.options.b = scope(b, -255, 255);
        this.noChange = false;
      }
      return this.options.b;
    };

    Tone.prototype.alpha = function(a) {
      if (typeof a === 'number') {
        this.options.alpha = scope(a, 0, 1);
        this.noChange = false;
      }
      return this.options.alpha;
    };

    Tone.prototype.transparent = function(t) {
      if (t && t.dataType && t.dataType === 'color') {
        this.options.transparent = t;
        this.noChange = false;
      }
      return this.options.transparent;
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
        this.options.gray = !!gray;
        this.noChange = false;
      }
      return this.options.gray;
    };

    Tone.prototype.opposite = function(opposite) {
      if (opposite) {
        this._opposite = !!opposite;
        this.noChange = false;
      }
      return this._opposite;
    };

    Tone.prototype.reset = function() {
      this.options.r = this.options.g = this.options.b = 0;
      this.options.gray = false;
      this.options.opposite = false;
      this.options.alpha = 1;
      this.options.transparent = null;
      return this.noChange = true;
    };

    Tone.prototype.mix = function(r, g, b, a) {
      var average;

      if (this.options.transparent && a > 0) {
        if (r === this.options.transparent.red() && g === this.options.transparent.green() && b === this.options.transparent.blue()) {
          return [r, g, b, 0];
        }
      }
      if (this.options.gray) {
        average = (r * 299 + g * 587 + b * 114 + 500) / 1000;
        r = g = b = average;
      }
      r += this.options.r;
      g += this.options.g;
      b += this.options.b;
      if (this.options.opposite) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }
      a *= this.options.alpha;
      return [r, g, b, a];
    };

    Tone.prototype.clone = function() {
      return new DateType.Tone(this.options);
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
      this.red = __bind(this.red, this);      this.options = {};
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

  }).call(this, DateType);

  Draw.Bitmap = (function(_super) {
    __extends(Bitmap, _super);

    Bitmap.prototype.drawType = 'bitmap';

    Bitmap.prototype.__isDisposed = true;

    Bitmap.prototype.entity = null;

    Bitmap.prototype.__context = null;

    Bitmap.prototype.__options = {
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
      this.__context.transform(this.__options.transX, this.__options.transY);
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

    Bitmap.prototype.reset = function() {
      return this.__options = {
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
    };

    function Bitmap(width, height) {
      this.reset = __bind(this.reset, this);
      this.destroy = __bind(this.destroy, this);
      this.dispose = __bind(this.dispose, this);
      this.update = __bind(this.update, this);
      this.clone = __bind(this.clone, this);
      this.draw = __bind(this.draw, this);
      this.load = __bind(this.load, this);
      var nextUpdate;

      this.__options = {};
      this.entity = null;
      this.__context = null;
      this.reset();
      this.width(width);
      this.height(height);
      nextUpdate = this.frequency;
    }

    return Bitmap;

  })(Draw);

  Draw.Sprite = (function(_super) {
    var sort, zAutoIncrement;

    __extends(Sprite, _super);

    Sprite.prototype.drawType = 'sprite';

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
        if (item.__isDisposed) {
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
      if (t && t.type === 'datetype' && t.dataType === 'tone') {
        this.__tone = t;
        this.__toneChanged = true;
      }
      return this.__tone;
    };

    Sprite.prototype.append = function(image) {
      if (image.type !== 'draw' && image.drawType === 'sprite') {
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
      if (options.color && options.color.dateType && options.colordateType === 'color') {
        this.__blinkRGB = options.color;
      } else {
        this.__blinkRGB = new DateType.Color(3, 3, 3);
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

    Vector.prototype.drawType = 'vector';

    Vector.prototype.__isDisposed = true;

    Vector.prototype.__options = {
      lineWidth: 1,
      strokeStyle: 'black',
      lineCap: 'butt',
      fillStyle: 'black'
    };

    Vector.prototype.vector = [];

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
        switch (vector.vectorType) {
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

    Vector.prototype.__updateLine = function(vector) {
      this.__context.moveTo(vector.options.start.x, vector.options.start.y);
      return this.__context.lineTo(vector.options.end.x, vector.options.end.y);
    };

    Vector.prototype.__updateRect = function(vector) {
      return this.__context.rect(vector.options.start.x, vector.options.start.y, vector.options.width, vector.options.height);
    };

    Vector.prototype.append = function(v) {
      if (v.vectorType) {
        this.vector.push(v);
      }
      return this;
    };

    function Vector() {
      this.append = __bind(this.append, this);
      this.__updateRect = __bind(this.__updateRect, this);
      this.__updateLine = __bind(this.__updateLine, this);
      this.update = __bind(this.update, this);
      this.draw = __bind(this.draw, this);      this.__options = {
        lineWidth: 1,
        strokeStyle: 'black',
        lineCap: 'butt',
        fillStyle: 'black'
      };
    }

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
    var style;

    __extends(IMG, _super);

    IMG.prototype.htmlType = 'img';

    IMG.prototype.attribute = {
      x: 0,
      y: 0,
      z: 1,
      width: 0,
      height: 0
    };

    style = function(img, attribute) {
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
        this.attribute[i] = options[i];
      }
      style(this.element, this.attribute);
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
          this.attribute[i] = options[i];
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
    __extends(Line, _super);

    Line.prototype.vectorType = 'line';

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

    Rect.prototype.vectorType = 'rect';

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
