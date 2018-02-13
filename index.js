import ParticleText from './src/ParticleText';

/* istanbul ignore next */
ParticleText.install = function(Vue) {
  Vue.component(ParticleText.name, ParticleText);
};

export default ParticleText;
