(function() {
  var Audio, Bitmap, Event, Graphics, Keyboard, Mouse, Network, Sprite, Stage, Store, Window,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Audio = (function() {
    function Audio() {}

    return Audio;

  })();

  Bitmap = (function() {
    Bitmap.prototype.isA = 'bitmap';

    Bitmap.prototype.entity = null;

    Bitmap.prototype.x = 0;

    Bitmap.prototype.y = 0;

    Bitmap.prototype.width = 0;

    Bitmap.prototype.height = 0;

    Bitmap.prototype.scaleX = 1;

    Bitmap.prototype.scaleY = 1;

    Bitmap.prototype.alpha = 1;

    Bitmap.prototype.visible = false;

    Bitmap.prototype.rotate = 0;

    Bitmap.prototype.load = function(src, callback) {
      this.entity = new Image(this.width, this.height);
      this.entity.onload = function() {
        return callback();
      };
      return this.entity.src = src;
    };

    function Bitmap(width, height) {
      this.load = __bind(this.load, this);      this.width = width;
      this.height = height;
    }

    return Bitmap;

  })();

  Event = (function() {
    function Event() {}

    return Event;

  })();

  Graphics = (function() {
    function Graphics() {}

    return Graphics;

  })();

  this.Hikari = (function() {
    var frame, global,
      _this = this;

    frame = 0;

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

    Hikari.prototype.update = function() {
      var _this = this;

      return setTimeout(function() {
        return _this.update;
      }, frame);
    };

    function Hikari(_frame, container, width, height, callback) {
      this.update = __bind(this.update, this);      global();
      this.stage = new Stage(width, height, container);
      frame = _frame;
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

  Sprite = (function() {
    function Sprite() {}

    return Sprite;

  })();

  Stage = (function() {
    Stage.prototype.canvas = null;

    Stage.prototype.context = null;

    Stage.prototype.append = function(o) {
      if (['bitmap', 'sprite', 'window'].indexOf(o.isA) === -1) {
        console.log('error: object cannt append to canvas');
        return;
      }
      return this.context.drawImage(o.entity, o.x, o.y, o.width, o.height);
    };

    function Stage(width, height, container) {
      this.append = __bind(this.append, this);      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
      container.appendChild(this.canvas);
    }

    return Stage;

  })();

  Store = (function() {
    function Store() {}

    return Store;

  })();

  Window = (function() {
    function Window() {}

    return Window;

  })();

}).call(this);
