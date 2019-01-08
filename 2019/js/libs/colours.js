
var palettes = []
palettes[ 0 ] = new colourPool()
  // .add('#FFFFFF')
  .add( '#99B898' )
  .add( '#FECEAB' )
  .add( '#FF847C' )
  .add( '#E84A5F' )
  .add( '#2A363B' );


palettes[ 1 ] = new colourPool()

  .add( '#A8A7A7' )
  .add( '#CC527A' )
  .add( '#E8175D' )
  .add( '#000000' )
  .add( '#363636' )
  .add( '#474747' );


palettes[ 2 ] = new colourPool()
  // .add('#FFFFFF')
  .add( '#E1F5C4' )
  .add( '#EDE574' )
  .add( '#F9D423' )
  .add( '#000000' )
  .add( '#FC913A' )
  .add( '#FF4E50' );

palettes[ 3 ] = new colourPool()
  .add( '#FFFFFF' )
  .add( '#E5FCC2' )
  .add( '#9DE0AD' )
  .add( '#45ADA8' )
  .add( '#547980' )
  .add( '#594F4F' );

palettes[ 4 ] = new colourPool()
  //
  .add( '#ECECEC' )
  .add( '#CCCCCC' )
  .add( '#000000' )
  .add( '#0095a8' )
  .add( '#00616f' )
  .add( '#FF3300' )
  //.add( '#FF6600' )
  //.add( '#FFFFFF' )
  //.add( '#FFFF00' )
  //.add( '#FF00FF' )

var colour_count = 4
var colours = palettes[ colour_count ];

function changeColourFwd() {
  colour_count = ( colour_count + 1 );
  if ( colour_count > palettes.length-1 ) colour_count = 0;
  console.log( "colour_count: " + colour_count );
  colours = palettes[ colour_count ];
  // ctx.fillStyle = rgb( colours.get(colour_count) );
  // ctx.strokeStyle = rgb( colours.get(colour_count) );
}

function changeColourBwd() {
  colour_count = ( colour_count - 1 );
  if ( colour_count < 0 ) colour_count = palettes.length - 1;
  console.log( "colour_count: " + colour_count );
  colours = palettes[ colour_count ];
}
