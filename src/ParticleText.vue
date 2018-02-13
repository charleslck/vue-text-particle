<template>
    <div class="214">
        <canvas ref="partcle_text" :width="options._size[0]" :height="options._size[1]"></canvas>
    </div>
</template>

<script>
    var ACTIVE_INDEX = -1;
    const BLUR = false;
    const BLINK = false;
    const BLENDING = false;
    const GLOBAL_PULSATION = false;
    const TREMBLING = 0;
    const ARC = true;
    const PULSATION = true;
    const PULSATION_PERIOD = 600;
    const QUALITY_TO_SCALE = 9;
    const TOTAL_PARTICLES = 1800;
    const PULSATION_TIME = 600;
    export default {
        name: "ParticleText",
        data() {
            return {
                _canvas: null,
                _text_canvas: null,
                _text_canvas_ctx: null,
                _property: {
                    _ctx: null,
                    _w: null,
                    _h: null,
                    _particles: [],
                    _positions: []
                },
                options: {
                    _size: [700, 400],
                    _text_arry: ['LK'],
                    _font_size: 20,
                    _italic: false,
                    _particle_radius: 5,
                    _canvas_background: '#000',
                    _duration: 2000,
                    _text_top: 18.8,
                    _text_left: 0,
                    _theme: 'default'
                }
            };
        },
        props: ["particleTextOptions"],
        computed: {
            _total_area: function() {
                return this._property._w * this._property._h;
            },
            _single_particle_area: function() {
                return this._total_area / TOTAL_PARTICLES;
            },
            _area_length: function() {
                return Math.sqrt(this._single_particle_area);
            }
        },
        mounted() {
            this.options = {
                _size: this.particleTextOptions.canvasSize,
                _text_arry: this.particleTextOptions.text,
                _font_size: this.particleTextOptions.fontSize,
                _italic: this.particleTextOptions.italic,
                _particle_radius: this.particleTextOptions.particleRadius,
                _canvas_background: this.particleTextOptions.canvasBackground,
                _duration: this.particleTextOptions.duration,
                _text_top: this.particleTextOptions.textTop,
                _text_left: this.particleTextOptions.textLeft,
                _theme: this.particleTextOptions.theme
            };
            this._canvas = this.$refs.partcle_text;
            this._text_canvas = document.createElement("canvas");
            this._text_canvas_ctx = this._text_canvas.getContext("2d");
            this._text_canvas.width = this._canvas.width;
            this._text_canvas.height = this._canvas.height;
            this._property = {
                _ctx: this._canvas.getContext("2d"),
                _w: this._canvas.width,
                _h: this._canvas.height,
                _particles: [],
                _positions: []
            };
            this.init();
        },
        methods: {
            init() {
                let self = this;
                class Particle {
                    constructor(i) {
                        this.r = self.renderColor('r');
                        this.g = self.renderColor('g');
                        this.b = self.renderColor('b');
                        this.alpha = 1;
                        this.x = (i * self._area_length) % self._property._w;
                        this.y =
                            i * self._area_length / self._property._w * self._area_length;
                        this.deltaOffset = (Math.random() * PULSATION_TIME) | 0;
                        this.radius = 0.1 + Math.random() * 2;
                    }
                }
                for (let i = 1; i <= TOTAL_PARTICLES; i++) {
                    this._property._particles.push(new Particle(i));
                }
                self.new_positions();
                setInterval(() => {
                    self.draw();
                }, 1000 / 30);
                setInterval(() => {
                    self.new_positions()
                }, self.options._duration);
            },
            renderColor(type) {
                let n, m;
                switch (this.options._theme) {
                    case 'white':
                        n = 255, m = 255;
                        return Math.floor(Math.random() * (m - n + 1) + n);
                        break;
                    case 'black':
                        n = 0, m = 0;
                        return Math.floor(Math.random() * (m - n + 1) + n);
                        break;
                    case 'red':
                        switch (type) {
                            case 'r':
                                n = 0, m = 205;
                                return Math.floor(Math.random() * (m - n + 1) + n);
                            case 'g':
                                n = 0, m = 20;
                                return Math.floor(Math.random() * (m - n + 1) + n);
                            case 'b':
                                n = 0, m = 0;
                                return Math.floor(Math.random() * (m - n + 1) + n);
                        }
                        break;
                    default:
                        n = 0, m = 255;
                        return Math.floor(Math.random() * (m - n + 1) + n);
                        break;
                }
            },
            draw() {
                let now = Date.now();
                this._property._ctx.globalCompositeOperation = "source-over";
                if (BLUR) this._property._ctx.globalAlpha = 0.1;
                else if (!BLUR && !BLINK) this._property._ctx.globalAlpha = 1.0;
                this._property._ctx.fillStyle = this.options._canvas_background;
                this._property._ctx.fillRect(0, 0, this._property._w, this._property._h);
                if (BLENDING) this._property._ctx.globalCompositeOperation = "lighter";
                for (let i = 0; i < this._property._particles.length; i++) {
                    let p = this._property._particles[i];
                    if (isNaN(p.x)) continue;
                    this._property._ctx.beginPath();
                    this._property._ctx.fillStyle =
                        "rgb(" + p.r + ", " + p.g + ", " + p.b + ")";
                    this._property._ctx.fillStyle =
                        "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.alpha + ")";
                    if (BLINK)
                        this._property._ctx.globalAlpha = Math.sin(Math.PI * mod * 1.0);
                    if (PULSATION) {
                        var mod =
                            (((GLOBAL_PULSATION ? 0 : p.deltaOffset) + now) %
                                PULSATION_PERIOD) /
                            PULSATION_PERIOD;
                        mod = Math.sin(mod * Math.PI);
                    } else var mod = 1;
                    var offset = TREMBLING ? TREMBLING * (-1 + Math.random() * 2) : 0;
                    var radius = this.options._particle_radius * p.radius;
                    if (!ARC) {
                        this._property._ctx.fillRect(
                            (offset + p.x - mod * radius / 2) | 0,
                            (offset + p.y - mod * radius / 2) | 0,
                            radius * mod,
                            radius * mod
                        );
                    } else {
                        this._property._ctx.arc(
                            (offset + p.x) | 0,
                            (offset + p.y) | 0,
                            radius * mod,
                            Math.PI * 2,
                            false
                        );
                        this._property._ctx.fill();
                    }
                    p.x += (p.dx - p.x) / 10;
                    p.y += (p.dy - p.y) / 10;
                }
            },
            new_positions() {
                let self = this;
                if (ACTIVE_INDEX < this.options._text_arry.length - 1) {
                    ACTIVE_INDEX++;
                } else {
                    ACTIVE_INDEX = 0;
                }
                let textDisplay = this.options._text_arry[ACTIVE_INDEX];
                this._text_canvas_ctx.fillStyle = "white";
                this._text_canvas_ctx.fillRect(0, 0, this._property._w, this._property._h);
                this._text_canvas_ctx.font = (this.options._italic ? 'italic' : '') + " " + this.options._font_size + "px Arial";
                this._text_canvas_ctx.fillStyle = "#f00";
                this._text_canvas_ctx.fillText(textDisplay, this.options._text_left, this.options._text_top);
                let image_data = this._text_canvas_ctx.getImageData(0, 0, self._property._w, self._property._h);
                let pixels = image_data.data;
                this._property._positions = [];
                for (let i = 0; i < pixels.length; i += 2) {
                    if (pixels[i] != 255) {
                        let position = {
                            x: ((((i / 2) % self._property._w) | 0) * QUALITY_TO_SCALE) | 0,
                            y: (((i / 2 / self._property._w) | 0) * QUALITY_TO_SCALE) | 0
                        };
                        self._property._positions.push(position);
                    }
                }
                this.get_destinations();
            },
            get_destinations() {
                for (let i = 0; i < this._property._particles.length; i++) {
                    let pa = this._property._particles[i];
                    this._property._particles[i].alpha = 1;
                    let distance = [];
                    let nearest_position = 0;
                    if (this._property._positions.length) {
                        for (let n = 0; n < this._property._positions.length; n++) {
                            let po = this._property._positions[n];
                            distance[n] = Math.sqrt(
                                (pa.x - po.x) * (pa.x - po.x) + (pa.y - po.y) * (pa.y - po.y)
                            );
                            if (n > 0) {
                                if (distance[n] <= distance[nearest_position]) {
                                    nearest_position = n;
                                }
                            }
                        }
                        this._property._particles[i].dx = this._property._positions[
                            nearest_position
                        ].x;
                        this._property._particles[i].dy = this._property._positions[
                            nearest_position
                        ].y;
                        this._property._particles[i].distance = distance[nearest_position];
                        var po1 = this._property._positions[nearest_position];
                        for (var n = 0; n < this._property._positions.length; n++) {
                            var po2 = this._property._positions[n];
                            distance = Math.sqrt(
                                (po1.x - po2.x) * (po1.x - po2.x) +
                                (po1.y - po2.y) * (po1.y - po2.y)
                            );
                            if (distance <= 5) {
                                this._property._positions.splice(n, 1);
                            }
                        }
                    } else {
                        //particles[i].alpha = 0;
                    }
                }
            }
        }
    };
</script>
