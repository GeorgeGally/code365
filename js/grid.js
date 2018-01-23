
///////////////////////////////////////////
//////////////// G R I D //////////////////
///////////////////////////////////////////

function Grid(_num_items_horiz, _num_items_vert, _grid_w, _grid_h, _startx, _starty){

  if (_num_items_horiz == undefined) _num_items_horiz = 1;
  if (_num_items_vert == undefined) _num_items_vert = 1;
  var _horiz = _num_items_horiz || 1;
  var _vert = _num_items_vert || 1;
  this.length = 0;
  this.spacing_x;
  this.spacing_y;

  this.num_items_horiz = 0;
  this.num_items_vert = 0;

  this.start = {x: _startx || 0 , y: _starty || 0};

  this.grid_w = _grid_w || w;
  this.grid_h = _grid_h || h;

  this.width = _grid_w || w;
  this.height = _grid_h || h;
  this.centre = {x: this.start.x + this.width/2, y: this.start.y + this.height/2}
  this.grid = [];
  this.edge = [];
  this.x = [];
  this.y = [];
  this.rows = [];
  this.cols = [];
  this.pos = [];

  this.add = function(_horiz, _vert) {

    this.num_items_horiz += _horiz || 1;
    this.num_items_vert += _vert || 1;

    this.spacing_x = this.width / this.num_items_horiz;
    this.spacing_y = this.height / this.num_items_vert;
    this.spacing = new Vector(this.spacing_x, this.spacing_y);
    this.createGrid();

    return this;

  }


  this.setStart = function(_x, _y) {

     this.start = {x: _x || 0 , y: _y || 0};
     createGrid();

  }

  this.createGrid = function() {
    var r = 0;
    this.spacing_x = this.width / this.num_items_horiz;
    this.spacing_y = this.height / this.num_items_vert;
    this.spacing = new Vector(this.spacing_x, this.spacing_y);
    // console.log(this.start.x);
    // console.log(this.width);
    this.cols = [];

    for (var y = 0; y < this.num_items_vert; y++) {

      var c = 0;
      var row = [];
      //this.cols[y] = [];
      var yy = y * this.spacing_y + this.spacing_y/2 + this.start.y;


      for (var x = 0; x < this.num_items_horiz; x++) {

        var edge = false;
        var xx = x * this.spacing_x + this.spacing_x/2 + this.start.x;

        //console.log(this.start.y);
        // see if it's a point on the outside
        if ((y == this.start.y || y == this.num_items_vert) && (x == this.start.x || x == this.num_items_horiz ) ) {
          edge = true;
        }

        this.x.push(xx);
        this.y.push(yy);
        this.pos.push({row: r, col: c, x: xx, y: yy});
        row.push({x: xx, y: yy});

        this.edge.push(edge);
        this.grid.push({row: y, col: x, x: xx, y: yy, edge: edge});
        c++;

      }

      this.cols[y] = {x: this.x[y], y: yy};
      this.rows[r] = {row: r, items: this.num_items_horiz, pos: row};
      r++;
      //console.log(row);
    };
    //console.log(this.rows);
    this.length = this.num_items_vert * this.num_items_horiz;
    this.grid.push({row: this.rows, col: this.cols});

  }

  this.add(_horiz, _vert);

  //console.log(this);
  return this;

}
