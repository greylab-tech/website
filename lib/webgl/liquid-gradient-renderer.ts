import { liquidGradientConfig } from "@/components/motion/liquid-gradient-config";
import { liquidGradientFragment } from "@/components/motion/liquid-gradient-shader";

const vertexSource = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to allocate the gradient shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Unable to compile the gradient shader.");
  }
  return shader;
}

/** One full-screen GPU pass; no CSS animation or video drives the effect. */
export function createLiquidGradientRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  });
  if (!gl || gl.isContextLost()) return null;

  const program = gl.createProgram();
  const vertices = gl.createBuffer();
  const pushTexture = gl.createTexture();
  const vertexArray = gl.createVertexArray();
  const shaders: WebGLShader[] = [];
  let disposed = false;

  function dispose(releaseContext = false) {
    if (disposed) return;
    disposed = true;
    if (!gl!.isContextLost()) {
      for (const shader of shaders) gl!.deleteShader(shader);
      gl!.deleteTexture(pushTexture);
      gl!.deleteBuffer(vertices);
      gl!.deleteVertexArray(vertexArray);
      gl!.deleteProgram(program);
      if (releaseContext) gl!.getExtension("WEBGL_lose_context")?.loseContext();
    }
  }

  try {
    if (!program || !vertices || !pushTexture || !vertexArray) {
      throw new Error("Unable to allocate gradient GPU resources.");
    }
    shaders.push(compileShader(gl, gl.VERTEX_SHADER, vertexSource));
    shaders.push(compileShader(gl, gl.FRAGMENT_SHADER, liquidGradientFragment));
    for (const shader of shaders) gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        gl.getProgramInfoLog(program) || "Unable to link the gradient program.",
      );
    }
    gl.useProgram(program);
    gl.bindVertexArray(vertexArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // The reference disables mouse displacement, so its push field is zero.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, pushTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array(4),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "u_push_buffer"), 0);
    gl.uniform1i(
      gl.getUniformLocation(program, "u_colors_length"),
      liquidGradientConfig.colors.length,
    );
    const colors = new Float32Array(8 * 4);
    liquidGradientConfig.colors.forEach((hex, index) => {
      colors.set(
        [
          parseInt(hex.slice(1, 3), 16) / 255,
          parseInt(hex.slice(3, 5), 16) / 255,
          parseInt(hex.slice(5, 7), 16) / 255,
          1,
        ],
        index * 4,
      );
    });
    gl.uniform4fv(gl.getUniformLocation(program, "u_colors[0]"), colors);
    for (const [name, value] of Object.entries(liquidGradientConfig.uniforms)) {
      gl.uniform1f(gl.getUniformLocation(program, name), value);
    }
    gl.uniform1f(gl.getUniformLocation(program, "u_pixelRatio"), 1);
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    let lastWidth = 0;
    let lastHeight = 0;

    return {
      render(seconds: number) {
        if (disposed || gl.isContextLost()) return false;
        // Source resolution is exactly one GPU pixel per CSS pixel, including grain.
        const width = Math.max(1, Math.round(canvas.clientWidth));
        const height = Math.max(1, Math.round(canvas.clientHeight));
        if (width !== lastWidth || height !== lastHeight) {
          canvas.width = width;
          canvas.height = height;
          lastWidth = width;
          lastHeight = height;
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        gl.useProgram(program);
        gl.bindVertexArray(vertexArray);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pushTexture);
        gl.uniform2f(
          resolutionLocation,
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
        );
        gl.uniform1f(timeLocation, seconds);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        return true;
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
