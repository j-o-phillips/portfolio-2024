uniform float uColorChannelOne;
uniform vec2 uMousePosition;

void main() 
{
 csm_DiffuseColor = vec4(uColorChannelOne, uColorChannelOne, uColorChannelOne, 1.0); 
 

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}