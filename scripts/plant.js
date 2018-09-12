var Plant = {
  canvas: null,
  ctx: null,
  init_done: false,

  available_colors: [
    //http://paletton.com/#uid=71J0u0kw0w0oqURvwWrWz-GUWq5
    "rgba(255,239,  0,1)",
    "rgba(255,243, 60,1)",
    "rgba(255,239,  4,1)",
    "rgba(255,239,  0,1)",
    "rgba(208,195,  0,1)",
    "rgba(189,244,  0,1)",
    "rgba(210,253, 60,1)",
    "rgba(197,253,  4,1)",
    "rgba(190,245,  0,1)",
    "rgba(154,199,  0,1)",
    "rgba(183,  0,148,1)",
    "rgba(241, 57,206,1)",
    "rgba(245,  4,199,1)",
    "rgba(193,  0,157,1)",
    "rgba(149,  0,121,1)",
    "rgba( 92, 13,172,1)",
    "rgba(154, 71,239,1)",
    "rgba(131, 22,243,1)",
    "rgba( 92,  2,184,1)",
    "rgba( 70,  2,140,1)"
  ],
  //available_colors: [
  //  //"rgba(0, 0, 0,1)"
  //  "rgba(255, 255, 255, 1)"
  //],

  branch_color: "#fff000",
  //branch_color: "#000", // monochrome version

  plant_start_x: 0,
  plant_start_y: 0,
  new_x: 0,
  new_y: 0,
  last_x: 0,
  last_y: 0,
  branch_length: 8,
  branch_angle: 0, // 0 is straight up
  last_branch_angle: 0,
  angle_range: 30, // +/- on either side of branch angle

  grow_interval: 0, // window.setInterval()
  growth_rate: 10,

  limb_count: 0,
  max_limbs: 25, // The number of limbs
  branch_count: 0,
  max_branches: 10, // the number of branches per limbs

  init: function (canvas) {
    this.canvas = canvas;//$('.main_canvas')[0];
    this.canvas.width = 170;
    this.canvas.height = 90;
    this.ctx = this.canvas.getContext('2d');

    // Starting point of tree
    this.plant_start_x = this.canvas.width / 2;
    this.plant_start_y = this.canvas.height;

    this.init_done = true;
  },

  draw: function () {
    if (!this.init_done) {
      this.init();
    }
    var self = this;

    this.start_new_limb();

    this.grow_interval = window.setInterval(function () {
      //console.log("limb count: " + self.limb_count);
      //console.log("branch count: " + self.branch_count);

      if (self.limb_count > self.max_limbs) {
        window.clearInterval(self.grow_interval);
        //$('.page_title').css('color', self.rootColor()); // Set the title back to yellow at the end
      } else {
        if (self.branch_count >= self.max_branches) {
          self.drawBud();
          self.start_new_limb();
        } else {
          self.draw_single_branch();
        }
      }

    }, this.growth_rate);
  },

  start_new_limb: function () {
    this.limb_count += 1;

    // Restart branches per limb count:
    this.branch_count = 0;

    // Reset starting position:
    this.new_x = this.plant_start_x;
    this.new_y = this.plant_start_y;
    this.last_x = this.new_x;
    this.last_y = this.new_y;

    // Reset starting branch angles
    this.branch_angle = 0;
    this.last_branch_angle = this.branch_angle;

    // Set a new color for the branch:
    this.currentColor = randomBetween(0,10);
    //this.ctx.strokeStyle = this.nextColor();

    // Update the title to be that color:
    //$('.page_title').css('color', this.nextColor());
  },

  draw_single_branch: function () {
    //this.ctx.strokeStyle = this.branch_color;
    this.ctx.strokeStyle = this.nextColor();
    //this.ctx.strokeStyle = this.randomColor();

    this.branch_count += 1;

    // calculate end x,y of this branch...
    this.new_x = this.last_x;
    this.new_y = this.last_y - this.branch_length;

    this.branch_angle = this.last_branch_angle + randomBetween(-this.angle_range, this.angle_range);

    /*
     * soh: x = o, h = branch_length :. sin(a) = x/h :. x = branch_length*sin(branch_angle)
     * cah: y = a, h = branch_length :. cos(a) = y/h
     * toa
     * */
    this.new_x = this.last_x + (this.branch_length * Math.sin(this.branch_angle * Math.PI / 180));
    this.new_y = this.last_y - (this.branch_length * Math.cos(this.branch_angle * Math.PI / 180));

    this.ctx.beginPath();
    this.ctx.moveTo(this.last_x, this.last_y);
    this.ctx.lineTo(this.new_x, this.new_y);
    this.ctx.stroke();

    this.last_x = this.new_x;
    this.last_y = this.new_y;
    this.last_branch_angle = this.branch_angle;

  },

  drawBud: function() {
    var bud_size = 4;
    //this.ctx.fillStyle = 'rgba(255,239,  0,1)';
    this.ctx.fillStyle = this.randomColor();
    this.ctx.fillRect(this.last_x-bud_size/2, this.last_y-bud_size/2,bud_size,bud_size);
  },

  currentColor: 0,
  nextColor: function() {
    //return this.available_colors[randomBetween(0, this.available_colors.length)]; // Randomize
    this.currentColor += 1;
    if (this.currentColor > this.available_colors.length) {
      this.currentColor = 0;
    }
    return this.available_colors[this.currentColor];
  },
  randomColor: function() {
    return this.available_colors[randomBetween(0, this.available_colors.length)]; // Randomize
  },
  rootColor: function() {
    return this.available_colors[0];
  },

  redraw: function () {
    this.clear_all();
    this.draw();
  },

  clear_all: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  draw_branch: function (parent_length, parent_angle, parent_x, parent_y, parent_high_range, parent_low_range) {
    branches_drawn = branches_drawn + 1;
    if (branches_drawn < max_branches) {
      // draw a branch
      // call itself some number of times.
    } else {
      //console.log("stopping growth!");
    }
  }
};
