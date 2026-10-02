import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function mount() {
  let cleanup;
  const requests = [];
  const listeners = {};
  const rafs = [];
  const draws = [];
  const canvas = { getContext: () => ({ fillRect() {}, drawImage(img) { draws.push(img.url); } }) };
  class Image {
    complete = false;
    naturalWidth = 1280;
    naturalHeight = 720;
    set src(url) { this.url = url; requests.push(this); }
  }
  const react = { useRef: () => ({ current: canvas }), useEffect: (fn) => { cleanup = fn(); }, createElement() {} };
  const context = {
    module: { exports: {} }, require: (name) => name === 'react' ? react : class { on() {} raf() {} destroy() {} },
    Image, window: { innerWidth: 1280, innerHeight: 720, scrollY: 0, devicePixelRatio: 1,
      addEventListener: (name, fn) => { listeners[name] = fn; }, removeEventListener() {} },
    document: { documentElement: { scrollHeight: 10720 } },
    requestAnimationFrame: (fn) => { rafs.push(fn); return rafs.length; }, cancelAnimationFrame() {},
  };
  context.exports = context.module.exports;
  vm.runInNewContext(ts.transpileModule(readFileSync('src/components/ScrollCanvas.tsx', 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } }).outputText, context);
  context.module.exports.ScrollCanvas();
  return { requests, context, listeners, cleanup, rafs, draws, finish(img) { img.complete = true; img.onload?.(); } };
}

test('opening prioritizes only the first background frame', () => {
  const app = mount();
  assert.equal(app.requests.length, 1);
  app.finish(app.requests[0]);
  assert.ok(app.requests.length <= 5, 'at most four additional downloads');
  app.cleanup();
});

test('scrolling requests the destination without downloading the whole sequence', () => {
  const app = mount();
  for (let i = 0; i < app.requests.length; i++) app.finish(app.requests[i]);
  assert.ok(app.requests.length < 30);
  app.context.window.scrollY = 10000;
  app.listeners.scroll();
  assert.ok(app.requests.some(img => img.url.endsWith('300.jpg')));
  app.cleanup();
});

test('unmounted background does not start more downloads', () => {
  const app = mount();
  app.cleanup();
  const count = app.requests.length;
  app.finish(app.requests[0]);
  assert.equal(app.requests.length, count);
});


test('only one animation loop runs and idle frames are not redrawn', () => {
  const app = mount();
  assert.equal(app.rafs.length, 1);
  for (let i = 0; i < app.requests.length; i++) app.finish(app.requests[i]);
  const drawCount = app.draws.length;
  app.rafs[0](16);
  assert.equal(app.draws.length, drawCount);
  app.cleanup();
});

test('fast scroll keeps downloads bounded and prioritizes the new position', () => {
  const app = mount();
  app.finish(app.requests[0]);
  app.context.window.scrollY = 10000;
  app.listeners.scroll();
  assert.equal(app.requests.length, 5);
  app.finish(app.requests[1]);
  assert.ok(app.requests.some(img => img.url.endsWith('300.jpg')));
  for (let i = 2; i < app.requests.length; i++) app.finish(app.requests[i]);
  assert.ok(app.requests.length < 30);
  assert.ok(app.draws.at(-1).endsWith('300.jpg'));
  app.cleanup();
});
