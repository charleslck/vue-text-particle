### Install
```shell
npm i vue-text-particle
```
### Quick Start
``` javascript
import ParticleText from "vue-text-particle";
```
### Preview
![preivew][1]


  [1]: https://github.com/charleslck/vue-text-particle/raw/master/preview/test.gif
  
### How to use
``` javascript
<ParticleText :particleTextOptions="particleTextOptions"></ParticleText>
```

``` javascript
particleTextOptions: {
  text: ["A", "X", "C"],
  fontSize: 25,
  particleRadius: 5,
  italic: true,
  duration: 2000,
  canvasBackground: '#000',
  canvasSize: [700, 340],
  textTop: 18.8,
  textLeft: 0,
  theme:'default'
}
```
### Props

| Name | type | Value |
|--------|------|
| `text` | Arry | The texts you want to show |
| `fontSize` | Number | The font-size of your texts |
| `particleRadius` | Number | The max radius of the partcile |
| `italic` | Boolean | If your texts are italic |
| `duration` | Number | The time before the texts change |
| `canvasBackground` | Hex_Number | The background-color of the canvas |
| `canvasSize` | Arry [width,height] | The width&height of the canvas |
| `textTop` | Number | The distance of the canvas to the top |
| `textLeft` | Number | The distance of the canvas to the left |
| `theme` | String | 'default','white','black','red' and more coming soon... |

