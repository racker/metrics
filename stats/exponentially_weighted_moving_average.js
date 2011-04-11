require('sample');

/*
*  Exponentially weighted moving average.
*  Args: 
*  - alpha:
*  - interval: time in milliseconds
*/

var M1_ALPHA = 1 - Math.exp(-5/60);
var M5_ALPHA = 1 - Math.exp(-5/60/5);
var M15_ALPHA = 1 - Math.exp(-5/60/15);

var ExponentiallyWeightedMovingAverage = EWMA = module.exports = function ExponentiallyWeightedMovingAverage(alpha, interval) {
  var self = this;
  this.alpha = alpha;
  this.interval = interval;
  this.initialized = false;
  this.rate = 0.0;
  this.uncounted = 0;
  this.tickInterval = setInterval(function(){ self.tick(); }, interval);
}

ExponentiallyWeightedMovingAverage.prototype.update = function(val) {
  this.uncounted += 1;
}

/*
* Update our rate measurements every interval
*/
ExponentiallyWeightedMovingAverage.prototype.tick = function() {
  var  instantRate = this.uncounted / this.interval;
  this.uncounted = 0;
  
  if(this.initialized) {
    this.rate += this.alpha * (instantRate - this.rate);
  } else {
    this.rate = instantRate;
    this.initialized = true;
  }
}

/*
* Return the rate per second
*/
ExponentiallyWeightedMovingAverage.prototype.rate = function() {
  return this.rate * 1000;
}


