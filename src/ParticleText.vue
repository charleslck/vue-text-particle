<template>
  <ParticleText :particleTextOptions="particleTextOptions"></ParticleText>
</template>

<script>
  import ParticleText from "~/components/ParticleText";
  export default {
    data() {
      return {
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
      };
    },
    components: {
      ParticleText
    },
    watch: {}
  };
</script>

