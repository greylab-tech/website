/** GreyLab palette for the shared WebGL background. */
export const liquidGradientConfig = {
  colors: ["#f40919", "#ca0817", "#92000c", "#000000", "#000000", "#f40919"],
  stillTime: 3,
  uniforms: {
    u_contrast: 1.1,
    u_distBias: 0.8,
    u_dither: 0.02,
    u_ditherMode: 2,
    u_exposure: 1.1,
    u_jellify: 0,
    u_loop: 0,
    u_saturation: 1,
    u_scale: 0.1,
    u_seed: 380,
    u_speed: 0.73,
    u_turbAmp: 0.07,
    u_turbFreq: 0.31,
    u_turbIter: 7,
    u_waveFreq: 5,
  },
} as const;
