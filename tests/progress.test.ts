import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdProgress } from '../src/components/progress/progress.js';

describe('md-progress', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render linear progress determinate & indeterminate', async () => {
    const progress = document.createElement('md-progress') as MdProgress;
    progress.type = 'linear';
    document.body.appendChild(progress);
    await progress.updateComplete;

    expect(progress.indeterminate).toBe(true);

    progress.value = 0.5;
    await progress.updateComplete;
    expect(progress.indeterminate).toBe(false);
    expect(progress.getAttribute('aria-valuenow')).toBe('0.5');
  });

  it('should render linear wavy line when determinate with a value', async () => {
    const progress = document.createElement('md-progress') as MdProgress;
    progress.type = 'linear';
    progress.value = 0.75;
    document.body.appendChild(progress);
    await progress.updateComplete;

    const sinusWave = progress.shadowRoot?.querySelector('.linear-sinus-wave') as HTMLElement;
    expect(sinusWave).not.toBeNull();
    expect(sinusWave?.style.width).toBe('75%');

    const trackBg = progress.shadowRoot?.querySelector('.linear-track-bg') as HTMLElement;
    expect(trackBg).not.toBeNull();
    expect(trackBg?.style.clipPath).toBe('inset(0 0 0 75%)');
  });

  it('should support linear buffer bar', async () => {
    const progress = document.createElement('md-progress') as MdProgress;
    progress.type = 'linear';
    progress.value = 0.4;
    progress.buffer = 0.8;
    document.body.appendChild(progress);
    await progress.updateComplete;

    const bufferBar = progress.shadowRoot?.querySelector('.linear-buffer') as HTMLElement;
    expect(bufferBar).not.toBeNull();
    expect(bufferBar?.style.width).toBe('80%');
  });

  it('should render circular progress', async () => {
    const progress = document.createElement('md-progress') as MdProgress;
    progress.type = 'circular';
    document.body.appendChild(progress);
    await progress.updateComplete;

    const svg = progress.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('should render circular wavy indicator when determinate with a value', async () => {
    const progress = document.createElement('md-progress') as MdProgress;
    progress.type = 'circular';
    progress.value = 0.6;
    document.body.appendChild(progress);
    await progress.updateComplete;

    const waveIndicator = progress.shadowRoot?.querySelector('.circle-wave-indicator') as SVGPathElement;
    expect(waveIndicator).not.toBeNull();
    expect(waveIndicator?.getAttribute('pathLength')).toBe('100');
    expect(waveIndicator?.getAttribute('stroke-dasharray')).toBe('100');
    expect(waveIndicator?.getAttribute('stroke-dashoffset')).toBe('40');
  });

  it('should support wavy = false fallback to standard indicator', async () => {
    const progressLinear = document.createElement('md-progress') as MdProgress;
    progressLinear.type = 'linear';
    progressLinear.value = 0.5;
    progressLinear.wavy = false;
    document.body.appendChild(progressLinear);
    await progressLinear.updateComplete;

    const sinusWave = progressLinear.shadowRoot?.querySelector('.linear-sinus-wave');
    expect(sinusWave).toBeNull();
    const standardBar = progressLinear.shadowRoot?.querySelector('.linear-bar');
    expect(standardBar).not.toBeNull();

    const progressCircular = document.createElement('md-progress') as MdProgress;
    progressCircular.type = 'circular';
    progressCircular.value = 0.5;
    progressCircular.wavy = false;
    document.body.appendChild(progressCircular);
    await progressCircular.updateComplete;

    const circularWave = progressCircular.shadowRoot?.querySelector('.circle-wave-indicator');
    expect(circularWave).toBeNull();
    const standardCircle = progressCircular.shadowRoot?.querySelector('.circle-indicator');
    expect(standardCircle).not.toBeNull();
  });
});
