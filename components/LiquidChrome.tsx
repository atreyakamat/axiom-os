'use client';

import { useRef, useEffect, useCallback } from 'react';

// LiquidChrome shader - creates flowing, chrome-like liquid effect
const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // Very slow time for ambient feel
    float slowTime = uTime * 0.03;
    
    // Mouse influence (very subtle)
    vec2 mouseInfluence = (uMouse - 0.5) * 0.05;
    
    // Multiple layers of noise for liquid chrome effect
    float n1 = snoise(st * 2.0 + slowTime * 0.5 + mouseInfluence);
    float n2 = snoise(st * 4.0 - slowTime * 0.3);
    float n3 = snoise(st * 1.0 + slowTime * 0.2);
    
    // Combine noise layers
    float n = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Dark graphite base colors
    vec3 darkBase = vec3(0.059, 0.059, 0.071); // #0f0f12
    vec3 midBase = vec3(0.094, 0.094, 0.106);  // #18181b
    
    // Muted purple tones
    vec3 purpleMuted = vec3(0.102, 0.086, 0.145); // #1a1625
    vec3 purpleGlow = vec3(0.416, 0.306, 0.510);  // Subtle purple highlight
    
    // Mix colors based on noise
    vec3 color = mix(darkBase, midBase, n * 0.5 + 0.5);
    color = mix(color, purpleMuted, smoothstep(0.0, 1.0, n * 0.3 + 0.3));
    
    // Very subtle purple highlights
    float highlight = smoothstep(0.6, 0.9, n);
    color += purpleGlow * highlight * 0.04;
    
    // Vignette effect
    float vignette = 1.0 - length(st - 0.5) * 0.5;
    color *= vignette * 0.9 + 0.1;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LiquidChrome() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const animationRef = useRef<number>();

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = {
            x: e.clientX / window.innerWidth,
            y: 1 - e.clientY / window.innerHeight,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Create shaders
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, vertexShader);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, fragmentShader);
        gl.compileShader(fs);

        // Create program
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Set up geometry (full-screen quad)
        const vertices = new Float32Array([
            -1, -1, 0, 0,
            1, -1, 1, 0,
            -1, 1, 0, 1,
            1, 1, 1, 1,
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        const uvLoc = gl.getAttribLocation(program, 'uv');

        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

        // Get uniform locations
        const timeLoc = gl.getUniformLocation(program, 'uTime');
        const resolutionLoc = gl.getUniformLocation(program, 'uResolution');
        const mouseLoc = gl.getUniformLocation(program, 'uMouse');

        // Resize handler
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const startTime = performance.now();
        const render = () => {
            const time = (performance.now() - startTime) / 1000;

            gl.uniform1f(timeLoc, time);
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
            gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteBuffer(buffer);
        };
    }, [handleMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ pointerEvents: 'none' }}
        />
    );
}
