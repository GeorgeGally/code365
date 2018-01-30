function Easing(time, type, start, end) {

  this.start = start || 0;
  this.pos = start || 0;
  this.end = end || 1;
  this.time = time;
  this.type = type;

  this.reset = function() {
    this.frames = frameRate * this.time;
    this.start_time = frameCount;
    this.now = frameCount;
    this.end_time = this.start_time + this.frames;
    this.pos = this.start || 0;
		// console.log('this.start_time', this.start_time);
		// console.log('this.end_time', this.end_time);
		// console.log('this.pos', this.pos);
  }
  this.reset();

  this.update = function() {

    this.now = frameCount;

    if (this.now < this.end_time) {
      var t = map(this.now, this.start_time, this.end_time, 0, 1);
    } else {
      t = 1;
    }
    this.pos = this.start + (this.end - this.start) * this.EasingFunctions[this.type](t);
    //console.log(this.EasingFunctions[this.type](t));
  }

  this.getPos = function() {
    this.now = frameCount;
    if (this.now < this.end_time) {
      var t = map(this.now, this.start_time, this.end_time, 0, 1);
    } else {
      t = 1;
    }
    return this.start + (this.end - this.start) * this.EasingFunctions[this.type](t);
  }

  this.EasingFunctions = {
    linear: function(t) {
      return t
    },
    easeInQuad: function(t) {
      return t * t
    },
    easeOutQuad: function(t) {
      return t * (2 - t)
    },
    easeInOutQuad: function(t) {
      return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic: function(t) {
      return t * t * t
    },
    easeOutCubic: function(t) {
      return (--t) * t * t + 1
    },
    easeInOutCubic: function(t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart: function(t) {
      return t * t * t * t
    },
    easeOutQuart: function(t) {
      return 1 - (--t) * t * t * t
    },
    easeInOutQuart: function(t) {
      return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    easeInQuint: function(t) {
      return t * t * t * t * t
    },
    easeOutQuint: function(t) {
      return 1 + (--t) * t * t * t * t
    },
    easeInOutQuint: function(t) {
      return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    },
    easeOutElastic: function(t) {
      return .04 * t / (--t) * Math.sin(25 * t)
    },
    easeInCirc: function(t) {
      var scaledTime = t / 1;
      return -1 * (Math.sqrt(1 - scaledTime * t) - 1);
    },
    easeInBack: function(t, magnitude = 1.70158) {
      return t * t * ((magnitude + 1) * t - magnitude);
    },
    easeOutBack: function(t, magnitude = 1.70158) {
      var scaledTime = (t / 1) - 1;
      return (
        scaledTime * scaledTime * ((magnitude + 1) * scaledTime + magnitude)
      ) + 1;
    },
    easeInOutBack: function(t, magnitude = 1.70158) {

      var scaledTime = t * 2;
      var scaledTime2 = scaledTime - 2;

      var s = magnitude * 1.525;

      if (scaledTime < 1) {

        return 0.5 * scaledTime * scaledTime * (
          ((s + 1) * scaledTime) - s
        );

      }

      return 0.5 * (
        scaledTime2 * scaledTime2 * ((s + 1) * scaledTime2 + s) + 2
      );

    },

    // Bounces slowly then quickly to finish
    easeInElastic: function(t, magnitude = 0.7) {

      if (t === 0 || t === 1) {
        return t;
      }

      const scaledTime = t / 1;
      const scaledTime1 = scaledTime - 1;

      const p = 1 - magnitude;
      const s = p / (2 * Math.PI) * Math.asin(1);

      return -(
        Math.pow(2, 10 * scaledTime1) *
        Math.sin((scaledTime1 - s) * (2 * Math.PI) / p)
      );

    },

    // Fast acceleration, bounces to zero
    easeOutElastic: function(t, magnitude = 0.7) {

      const p = 1 - magnitude;
      const scaledTime = t * 2;

      if (t === 0 || t === 1) {
        return t;
      }

      const s = p / (2 * Math.PI) * Math.asin(1);
      return (
        Math.pow(2, -10 * scaledTime) *
        Math.sin((scaledTime - s) * (2 * Math.PI) / p)
      ) + 1;

    },

    // Slow start and end, two bounces sandwich a fast motion
    easeInOutElastic: function(t, magnitude = 0.65) {

      const p = 1 - magnitude;

      if (t === 0 || t === 1) {
        return t;
      }

      const scaledTime = t * 2;
      const scaledTime1 = scaledTime - 1;

      const s = p / (2 * Math.PI) * Math.asin(1);

      if (scaledTime < 1) {
        return -0.5 * (
          Math.pow(2, 10 * scaledTime1) *
          Math.sin((scaledTime1 - s) * (2 * Math.PI) / p)
        );
      }

      return (
        Math.pow(2, -10 * scaledTime1) *
        Math.sin((scaledTime1 - s) * (2 * Math.PI) / p) * 0.5
      ) + 1;

    },

    // Bounce to completion
    easeOutBounce: function(t) {

      const scaledTime = t / 1;

      if (scaledTime < (1 / 2.75)) {

        return 7.5625 * scaledTime * scaledTime;

      } else if (scaledTime < (2 / 2.75)) {

        const scaledTime2 = scaledTime - (1.5 / 2.75);
        return (7.5625 * scaledTime2 * scaledTime2) + 0.75;

      } else if (scaledTime < (2.5 / 2.75)) {

        const scaledTime2 = scaledTime - (2.25 / 2.75);
        return (7.5625 * scaledTime2 * scaledTime2) + 0.9375;

      } else {

        const scaledTime2 = scaledTime - (2.625 / 2.75);
        return (7.5625 * scaledTime2 * scaledTime2) + 0.984375;

      }

    },

    // Bounce increasing in velocity until completion
    easeInBounce: function(t) {
      return 1 - easeOutBounce(1 - t);
    },

    // Bounce in and bounce out
    easeInOutBounce: function(t) {

      if (t < 0.5) {

        return easeInBounce(t * 2) * 0.5;

      }

      return (easeOutBounce((t * 2) - 1) * 0.5) + 0.5;

    }
  }


}
