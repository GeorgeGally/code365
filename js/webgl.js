vec2 st = gl_FragCoord.xy/u_resolution.xy;

float circle(in vec2 pos, in float _radius){
  vec2 dist = _st-vec2(pos);
	return 1.-smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(dist,dist)*4.0);
}
