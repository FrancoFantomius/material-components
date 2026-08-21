import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { playerStyles } from './player.css.js';

export type PlayerType = 'audio' | 'video';
export type PlayerVariant = 'elevated' | 'filled' | 'outlined' | 'compact' | 'full';

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) {
    return '0:00';
  }
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  if (hrs > 0) {
    const paddedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hrs}:${paddedMins}:${paddedSecs}`;
  }
  return `${mins}:${paddedSecs}`;
}

@customElement('md-player')
export class MdPlayer extends MdBaseElement {
  static override styles = [MdBaseElement.styles, playerStyles];

  @property({ type: String, reflect: true })
  type: PlayerType = 'audio';

  @property({ type: String, reflect: true })
  variant: PlayerVariant = 'elevated';

  @property({ type: String })
  src = '';

  @property({ type: String, attribute: 'track-title' })
  trackTitle = '';

  @property({ type: String })
  artist = '';

  @property({ type: String })
  album = '';

  @property({ type: String })
  poster = '';

  @property({ type: Number })
  currentTime = 0;

  @property({ type: Number })
  duration = 0;

  @property({ type: Number })
  volume = 1;

  @property({ type: Boolean, reflect: true })
  muted = false;

  @property({ type: Number, attribute: 'playback-rate' })
  playbackRate = 1;

  @property({ type: Boolean, reflect: true })
  paused = true;

  @property({ type: Boolean, reflect: true })
  loop = false;

  @property({ type: Boolean, reflect: true })
  autoplay = false;

  @property({ type: String })
  preload: 'auto' | 'metadata' | 'none' = 'metadata';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean, attribute: 'show-skip' })
  showSkip = true;

  @property({ type: Boolean, attribute: 'show-seek' })
  showSeek = true;

  @property({ type: Boolean, attribute: 'show-volume' })
  showVolume = true;

  @property({ type: Boolean, attribute: 'show-playback-rate' })
  showPlaybackRate = true;

  @property({ type: Boolean, attribute: 'show-queue' })
  showQueue = true;

  @property({ type: Number, attribute: 'seek-step' })
  seekStep = 10;

  @property({ type: Boolean, reflect: true })
  shuffle = false;

  @property({ type: Number })
  buffered = 0;

  @property({ type: String })
  crossorigin = '';

  @state()
  private isDraggingScrubber = false;

  @state()
  private scrubFraction = 0;

  @state()
  private isFullscreen = false;

  @state()
  private queueOpen = false;

  @state()
  private controlsVisible = true;

  @state()
  private hasExtraContent = false;

  @query('.native-media')
  private internalMediaEl?: HTMLMediaElement;

  @query('.progress-slider-container')
  private sliderContainerEl?: HTMLElement;

  @query('.video-viewport')
  private videoViewportEl?: HTMLElement;

  private slottedMediaEl: HTMLMediaElement | null = null;
  private controlsHideTimeout: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', this.trackTitle ? `Media Player: ${this.trackTitle}` : 'Media Player');
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    if (this.controlsHideTimeout) {
      clearTimeout(this.controlsHideTimeout);
    }
  }

  override firstUpdated() {
    this.syncMediaProperties();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('trackTitle')) {
      this.setAttribute('aria-label', this.trackTitle ? `Media Player: ${this.trackTitle}` : 'Media Player');
    }

    const media = this.getMediaElement();
    if (!media) return;

    if (changedProperties.has('src') && this.src && media.src !== this.src) {
      media.src = this.src;
      media.load?.();
    }
    if (changedProperties.has('volume')) {
      media.volume = Math.max(0, Math.min(1, this.volume));
    }
    if (changedProperties.has('muted')) {
      media.muted = this.muted;
    }
    if (changedProperties.has('playbackRate')) {
      media.playbackRate = this.playbackRate;
    }
    if (changedProperties.has('loop')) {
      media.loop = this.loop;
    }
  }

  public getMediaElement(): HTMLMediaElement | null {
    if (this.slottedMediaEl) {
      return this.slottedMediaEl;
    }
    return this.internalMediaEl || null;
  }

  private syncMediaProperties() {
    const media = this.getMediaElement();
    if (!media) return;

    media.volume = this.volume;
    media.muted = this.muted;
    media.playbackRate = this.playbackRate;
    media.loop = this.loop;
    media.autoplay = this.autoplay;
    media.preload = this.preload;
  }

  private handleDefaultSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this.hasExtraContent = nodes.some(
      (node) => node.nodeType === Node.ELEMENT_NODE || (node.textContent && node.textContent.trim().length > 0)
    );
  };

  private handleMediaSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    const media = elements.find(
      (el): el is HTMLMediaElement => el instanceof HTMLAudioElement || el instanceof HTMLVideoElement
    );

    if (media) {
      this.slottedMediaEl = media;
      this.bindMediaEvents(this.slottedMediaEl);
      this.syncMediaProperties();
    } else {
      this.slottedMediaEl = null;
    }
  };

  private bindMediaEvents(media: HTMLMediaElement) {
    media.onplay = () => {
      this.paused = false;
      this.emitEvent('play');
    };

    media.onpause = () => {
      this.paused = true;
      this.emitEvent('pause');
    };

    media.ontimeupdate = () => {
      if (!this.isDraggingScrubber) {
        this.currentTime = media.currentTime || 0;
      }
      this.emitEvent('timeupdate', {
        currentTime: this.currentTime,
        duration: this.duration,
        progress: this.duration > 0 ? this.currentTime / this.duration : 0,
      });
    };

    media.ondurationchange = () => {
      this.duration = media.duration || 0;
    };

    media.onloadedmetadata = () => {
      this.duration = media.duration || 0;
      this.currentTime = media.currentTime || 0;
    };

    media.onprogress = () => {
      if (media.buffered && media.buffered.length > 0) {
        const bufferedEnd = media.buffered.end(media.buffered.length - 1);
        this.buffered = this.duration > 0 ? bufferedEnd / this.duration : 0;
      }
    };

    media.onvolumechange = () => {
      this.volume = media.volume;
      this.muted = media.muted;
      this.emitEvent('volumechange', { volume: this.volume, muted: this.muted });
    };

    media.onratechange = () => {
      this.playbackRate = media.playbackRate;
      this.emitEvent('ratechange', { playbackRate: this.playbackRate });
    };

    media.onended = () => {
      this.paused = true;
      this.emitEvent('ended');
    };

    media.onseeking = () => {
      this.emitEvent('seeking', { currentTime: media.currentTime });
    };

    media.onseeked = () => {
      this.emitEvent('seeked', { currentTime: media.currentTime });
    };

    media.onerror = (e) => {
      this.emitEvent('error', { error: e });
    };
  }

  /* --- Public Playback Controls --- */

  public async play(): Promise<void> {
    const media = this.getMediaElement();
    if (media) {
      try {
        await media.play();
      } catch {
        this.paused = false;
      }
    } else {
      this.paused = false;
    }
    this.paused = false;
    this.emitEvent('play');
  }

  public pause(): void {
    const media = this.getMediaElement();
    if (media) {
      media.pause();
    }
    this.paused = true;
    this.emitEvent('pause');
  }

  public togglePlay(): void {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public seek(timeInSeconds: number): void {
    const targetTime = Math.max(0, Math.min(this.duration || Infinity, timeInSeconds));
    this.currentTime = targetTime;
    const media = this.getMediaElement();
    if (media) {
      media.currentTime = targetTime;
    }
    this.emitEvent('seeked', { currentTime: targetTime });
  }

  public seekBy(deltaSeconds: number): void {
    this.seek(this.currentTime + deltaSeconds);
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (clamped > 0 && this.muted) {
      this.muted = false;
    }
    const media = this.getMediaElement();
    if (media) {
      media.volume = clamped;
      media.muted = this.muted;
    }
    this.emitEvent('volumechange', { volume: this.volume, muted: this.muted });
  }

  public toggleMute(): void {
    this.muted = !this.muted;
    const media = this.getMediaElement();
    if (media) {
      media.muted = this.muted;
    }
    this.emitEvent('volumechange', { volume: this.volume, muted: this.muted });
  }

  public setPlaybackRate(rate: number): void {
    this.playbackRate = rate;
    const media = this.getMediaElement();
    if (media) {
      media.playbackRate = rate;
    }
    this.emitEvent('ratechange', { playbackRate: rate });
  }

  public cyclePlaybackRate(): void {
    const currentIndex = PLAYBACK_RATES.indexOf(this.playbackRate);
    const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;
    const nextRate = PLAYBACK_RATES[nextIndex] ?? 1;
    this.setPlaybackRate(nextRate);
  }

  public toggleLoop(): void {
    this.loop = !this.loop;
    const media = this.getMediaElement();
    if (media) {
      media.loop = this.loop;
    }
  }

  public toggleShuffle(): void {
    this.shuffle = !this.shuffle;
    this.emitEvent('shuffle', { shuffle: this.shuffle });
  }

  public toggleQueue(): void {
    this.queueOpen = !this.queueOpen;
    this.emitEvent('queue', { open: this.queueOpen });
  }

  public restart(): void {
    this.seek(0);
    this.play();
  }

  public async toggleFullscreen(): Promise<void> {
    if (this.type !== 'video') return;

    const viewport = this.videoViewportEl || (this.shadowRoot?.querySelector('.video-viewport') as HTMLElement | null);
    const target = viewport || this;

    const isCurrentlyFullscreen = Boolean(
      document.fullscreenElement === target ||
      document.fullscreenElement === this ||
      (this.shadowRoot && (this.shadowRoot as any).fullscreenElement === target) ||
      (document as any).webkitFullscreenElement === target ||
      (document as any).webkitFullscreenElement === this ||
      (document as any).mozFullScreenElement === target ||
      (document as any).msFullscreenElement === target
    );

    if (!isCurrentlyFullscreen) {
      try {
        if (target.requestFullscreen) {
          await target.requestFullscreen();
        } else if ((target as any).webkitRequestFullscreen) {
          await (target as any).webkitRequestFullscreen();
        } else if ((target as any).mozRequestFullScreen) {
          await (target as any).mozRequestFullScreen();
        } else if ((target as any).msRequestFullscreen) {
          await (target as any).msRequestFullscreen();
        } else {
          const media = this.getMediaElement();
          if (media && (media as any).webkitEnterFullscreen) {
            (media as any).webkitEnterFullscreen();
          }
        }
        this.isFullscreen = true;
      } catch {
        // Fallback for restricted / mock environments
        this.isFullscreen = true;
      }
    } else {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        this.isFullscreen = false;
      } catch {
        this.isFullscreen = false;
      }
    }
    this.emitEvent('fullscreenchange', { fullscreen: this.isFullscreen }, { bubbles: false });
  }

  public async togglePictureInPicture(): Promise<void> {
    const media = this.getMediaElement();
    if (media instanceof HTMLVideoElement && 'requestPictureInPicture' in media) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await media.requestPictureInPicture();
      }
    }
  }

  public previous(): void {
    this.emitEvent('previous');
  }

  public next(): void {
    this.emitEvent('next');
  }

  /* --- Event Handlers --- */

  private handleFullscreenChange = (e?: Event) => {
    // Avoid processing custom synthetic events to prevent infinite dispatch loops
    if (e && (e instanceof CustomEvent || (e as any).detail !== undefined)) {
      return;
    }

    if (this.type !== 'video') {
      this.isFullscreen = false;
      return;
    }

    const viewport = this.videoViewportEl || this.shadowRoot?.querySelector('.video-viewport');
    const isFs = Boolean(
      document.fullscreenElement === viewport ||
      document.fullscreenElement === this ||
      (this.shadowRoot && (this.shadowRoot as any).fullscreenElement === viewport) ||
      (document as any).webkitFullscreenElement === viewport ||
      (document as any).webkitFullscreenElement === this ||
      (document as any).mozFullScreenElement === viewport
    );

    this.isFullscreen = isFs;
    this.emitEvent('fullscreenchange', { fullscreen: isFs }, { bubbles: false });
  };

  private handleMouseMove = () => {
    this.controlsVisible = true;
    if (this.controlsHideTimeout) {
      clearTimeout(this.controlsHideTimeout);
    }
    if (!this.paused && this.type === 'video') {
      this.controlsHideTimeout = setTimeout(() => {
        this.controlsVisible = false;
      }, 3000);
    }
  };

  private handleVolumeSliderInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const val = parseFloat(input.value);
    this.setVolume(val);
  };

  private handleScrubberPointerDown = (e: PointerEvent) => {
    e.preventDefault();
    if (!this.sliderContainerEl) return;

    this.isDraggingScrubber = true;
    this.sliderContainerEl.classList.add('dragging');
    this.sliderContainerEl.setPointerCapture(e.pointerId);
    this.updateScrubberFromPointer(e);
  };

  private handleScrubberPointerMove = (e: PointerEvent) => {
    if (this.isDraggingScrubber) {
      this.updateScrubberFromPointer(e);
    }
  };

  private handleScrubberPointerUp = (e: PointerEvent) => {
    if (this.isDraggingScrubber) {
      this.isDraggingScrubber = false;
      if (this.sliderContainerEl) {
        this.sliderContainerEl.classList.remove('dragging');
        try {
          this.sliderContainerEl.releasePointerCapture(e.pointerId);
        } catch {
          // pointer capture release fallback
        }
      }
      const targetTime = (this.duration || 0) * this.scrubFraction;
      this.seek(targetTime);
    }
  };

  private updateScrubberFromPointer(e: PointerEvent) {
    if (!this.sliderContainerEl) return;
    const rect = this.sliderContainerEl.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const fraction = rect.width > 0 ? x / rect.width : 0;
    this.scrubFraction = Math.max(0, Math.min(1, fraction));
    if (this.isDraggingScrubber) {
      this.currentTime = (this.duration || 0) * this.scrubFraction;
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        e.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowLeft':
      case 'j':
      case 'J':
        e.preventDefault();
        this.seekBy(-this.seekStep);
        break;
      case 'ArrowRight':
      case 'l':
      case 'L':
        e.preventDefault();
        this.seekBy(this.seekStep);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setVolume(Math.min(1, this.volume + 0.1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.setVolume(Math.max(0, this.volume - 0.1));
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        this.toggleMute();
        break;
      case 'f':
      case 'F':
        if (this.type === 'video') {
          e.preventDefault();
          this.toggleFullscreen();
        }
        break;
    }
  };

  /* --- Render Helpers --- */

  private getVolumeIcon(): string {
    if (this.muted || this.volume === 0) return 'volume_off';
    if (this.volume < 0.5) return 'volume_down';
    return 'volume_up';
  }

  private renderScrubber(isVideo = false) {
    const currentProgress = this.duration > 0 ? Math.min(1, Math.max(0, this.currentTime / this.duration)) : 0;
    const displayFraction = this.isDraggingScrubber ? this.scrubFraction : currentProgress;
    const progressPercent = displayFraction * 100;
    const bufferPercent = Math.min(1, Math.max(0, this.buffered)) * 100;
    const isAudio = !isVideo && this.type !== 'video';
    const isPlaying = isAudio && !this.paused;

    return html`
      <div class="scrubber-section">
        <div
          class="progress-slider-container ${isPlaying ? 'playing-wave' : ''}"
          role="slider"
          aria-label="Seek track position"
          aria-valuemin="0"
          aria-valuemax=${this.duration || 100}
          aria-valuenow=${this.currentTime}
          aria-valuetext="${formatTime(this.currentTime)} of ${formatTime(this.duration)}"
          tabindex="0"
          style="--progress-percent: ${progressPercent}%;"
          @pointerdown=${this.handleScrubberPointerDown}
          @pointermove=${this.handleScrubberPointerMove}
          @pointerup=${this.handleScrubberPointerUp}
          @pointercancel=${this.handleScrubberPointerUp}
        >
          <div class="slider-track-bg">
            <div class="slider-buffer-bar" style="width: ${bufferPercent}%"></div>
            <div class="slider-active-bar" style="width: ${progressPercent}%"></div>
          </div>
          ${isAudio
            ? html`<div class="slider-sinus-wave" style="width: ${progressPercent}%"></div>`
            : nothing}
          <div class="slider-thumb" style="left: ${progressPercent}%"></div>
        </div>

        <div class="time-display">
          <span class="time-current">${formatTime(this.currentTime)}</span>
          <span class="time-duration">${formatTime(this.duration)}</span>
        </div>
      </div>
    `;
  }

  private renderControls(isVideo = false) {
    return html`
      <div class="controls-row">
        <!-- Left Group -->
        <div class="controls-group-left">
          ${!isVideo
            ? html`
                <button
                  class="ctrl-btn ${this.shuffle ? 'active' : ''}"
                  type="button"
                  aria-label="Toggle shuffle"
                  aria-pressed=${this.shuffle}
                  @click=${this.toggleShuffle}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="shuffle"></md-icon>
                </button>
              `
            : nothing}

          ${this.showVolume
            ? html`
                <div class="volume-container">
                  <button
                    class="ctrl-btn"
                    type="button"
                    aria-label=${this.muted ? 'Unmute' : 'Mute'}
                    @click=${this.toggleMute}
                  >
                    <md-ripple></md-ripple>
                    <md-focus-ring></md-focus-ring>
                    <md-icon name=${this.getVolumeIcon()}></md-icon>
                  </button>
                  <div class="volume-slider-wrapper">
                    <input
                      class="volume-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      aria-label="Volume level"
                      style="--volume-percent: ${(this.muted ? 0 : this.volume) * 100}%;"
                      .value=${String(this.muted ? 0 : this.volume)}
                      @input=${this.handleVolumeSliderInput}
                    />
                  </div>
                </div>
              `
            : nothing}
        </div>

        <!-- Center Group (Primary controls) -->
        <div class="controls-group-center">
          ${this.showSkip
            ? html`
                <button
                  class="ctrl-btn"
                  type="button"
                  aria-label="Previous track"
                  @click=${this.previous}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="skip_previous"></md-icon>
                </button>
              `
            : nothing}

          ${this.showSeek
            ? html`
                <button
                  class="ctrl-btn"
                  type="button"
                  aria-label="Rewind ${this.seekStep} seconds"
                  @click=${() => this.seekBy(-this.seekStep)}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="replay_10"></md-icon>
                </button>
              `
            : nothing}

          <button
            class="play-pause-btn"
            type="button"
            aria-label=${this.paused ? 'Play' : 'Pause'}
            @click=${this.togglePlay}
          >
            <md-ripple></md-ripple>
            <md-focus-ring></md-focus-ring>
            <md-icon name=${this.paused ? 'play_arrow' : 'pause'}></md-icon>
          </button>

          ${this.showSeek
            ? html`
                <button
                  class="ctrl-btn"
                  type="button"
                  aria-label="Forward ${this.seekStep} seconds"
                  @click=${() => this.seekBy(this.seekStep)}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="forward_10"></md-icon>
                </button>
              `
            : nothing}

          ${this.showSkip
            ? html`
                <button
                  class="ctrl-btn"
                  type="button"
                  aria-label="Next track"
                  @click=${this.next}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="skip_next"></md-icon>
                </button>
              `
            : nothing}
        </div>

        <!-- Right Group -->
        <div class="controls-group-right">
          ${this.showPlaybackRate
            ? html`
                <button
                  class="speed-btn"
                  type="button"
                  aria-label="Change playback speed, current speed ${this.playbackRate}x"
                  @click=${this.cyclePlaybackRate}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  ${this.playbackRate}x
                </button>
              `
            : nothing}

          ${!isVideo
            ? html`
                <button
                  class="ctrl-btn ${this.loop ? 'active' : ''}"
                  type="button"
                  aria-label="Toggle repeat"
                  aria-pressed=${this.loop}
                  @click=${this.toggleLoop}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name=${this.loop ? 'repeat_one' : 'repeat'}></md-icon>
                </button>
              `
            : nothing}

          ${!isVideo && this.showQueue
            ? html`
                <button
                  class="ctrl-btn ${this.queueOpen ? 'active' : ''}"
                  type="button"
                  aria-label="Play queue"
                  aria-pressed=${this.queueOpen}
                  @click=${this.toggleQueue}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name="queue_music"></md-icon>
                </button>
              `
            : nothing}

          ${isVideo
            ? html`
                <button
                  class="ctrl-btn fullscreen-bottom-btn"
                  type="button"
                  aria-label="Fullscreen"
                  @click=${(e: Event) => { e.stopPropagation(); this.toggleFullscreen(); }}
                >
                  <md-ripple></md-ripple>
                  <md-focus-ring></md-focus-ring>
                  <md-icon name=${this.isFullscreen ? 'fullscreen_exit' : 'fullscreen'}></md-icon>
                </button>
              `
            : nothing}

          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private renderAudioLayout() {
    return html`
      <div class="audio-layout">
        <!-- Main Row: Image | text on left, and on small screens Previous | Stop/Play | Next on right -->
        <div class="audio-main-row">
          <!-- Left section: Image | text -->
          <div class="audio-header">
            <slot name="artwork">
              <div class="artwork-container">
                ${this.poster
                  ? html`<img class="artwork-img" src=${this.poster} alt=${this.trackTitle || 'Track artwork'} />`
                  : html`<md-icon class="artwork-fallback" name="music_note"></md-icon>`}
              </div>
            </slot>

            <div class="track-info">
              <slot name="title">
                <span class="track-title">${this.trackTitle || 'Unknown Title'}</span>
              </slot>
              <slot name="artist">
                ${this.artist ? html`<span class="track-artist">${this.artist}</span>` : nothing}
              </slot>
              ${this.album ? html`<span class="track-album">${this.album}</span>` : nothing}
            </div>
          </div>

          <!-- Small screen compact controls: Previous song | Stop/Play | Next song on right -->
          <div class="compact-controls-right">
            ${this.showSkip
              ? html`
                  <button
                    class="ctrl-btn"
                    type="button"
                    aria-label="Previous song"
                    @click=${this.previous}
                  >
                    <md-ripple></md-ripple>
                    <md-focus-ring></md-focus-ring>
                    <md-icon name="skip_previous"></md-icon>
                  </button>
                `
              : nothing}

            <button
              class="play-pause-btn compact-play-btn"
              type="button"
              aria-label=${this.paused ? 'Play' : 'Pause'}
              @click=${this.togglePlay}
            >
              <md-ripple></md-ripple>
              <md-focus-ring></md-focus-ring>
              <md-icon name=${this.paused ? 'play_arrow' : 'pause'}></md-icon>
            </button>

            ${this.showSkip
              ? html`
                  <button
                    class="ctrl-btn"
                    type="button"
                    aria-label="Next song"
                    @click=${this.next}
                  >
                    <md-ripple></md-ripple>
                    <md-focus-ring></md-focus-ring>
                    <md-icon name="skip_next"></md-icon>
                  </button>
                `
              : nothing}
          </div>
        </div>

        <!-- Full Player: Scrubber Section (Hidden on small screen / compact) -->
        <div class="full-player-scrubber">
          ${this.renderScrubber()}
        </div>

        <!-- Full Player: Controls Row (Hidden on small screen / compact) -->
        <div class="full-player-controls">
          ${this.renderControls(false)}
        </div>
      </div>
    `;
  }

  private renderVideoLayout() {
    return html`
      <div
        class="video-viewport ${this.controlsVisible ? 'controls-visible' : ''}"
        @mousemove=${this.handleMouseMove}
        @click=${(e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.closest('button') || target.closest('input') || target.closest('.progress-slider-container')) return;
          this.togglePlay();
        }}
      >
        <slot name="media" @slotchange=${this.handleMediaSlotChange}>
          ${this.src
            ? html`
                <video
                  src=${this.src}
                  poster=${this.poster || nothing}
                  ?autoplay=${this.autoplay}
                  ?loop=${this.loop}
                  preload=${this.preload}
                  crossorigin=${this.crossorigin || nothing}
                  @play=${() => { this.paused = false; this.emitEvent('play'); }}
                  @pause=${() => { this.paused = true; this.emitEvent('pause'); }}
                  @timeupdate=${() => {
                    if (!this.isDraggingScrubber && this.internalMediaEl) {
                      this.currentTime = this.internalMediaEl.currentTime;
                    }
                  }}
                  @durationchange=${() => {
                    if (this.internalMediaEl) this.duration = this.internalMediaEl.duration;
                  }}
                  @loadedmetadata=${() => {
                    if (this.internalMediaEl) {
                      this.duration = this.internalMediaEl.duration;
                      this.currentTime = this.internalMediaEl.currentTime;
                    }
                  }}
                  @progress=${() => {
                    if (this.internalMediaEl?.buffered?.length) {
                      const end = this.internalMediaEl.buffered.end(this.internalMediaEl.buffered.length - 1);
                      this.buffered = this.duration > 0 ? end / this.duration : 0;
                    }
                  }}
                  @ended=${() => { this.paused = true; this.emitEvent('ended'); }}
                ></video>
              `
            : nothing}
        </slot>

        <div class="video-overlay ${!this.paused ? 'auto-hide' : ''}">
          <div class="video-top-bar">
            <slot name="title">
              <span class="video-title">${this.trackTitle || ''}</span>
            </slot>
            <div class="video-top-actions">
              <button
                class="ctrl-btn"
                type="button"
                aria-label="Picture in picture"
                @click=${(e: Event) => { e.stopPropagation(); this.togglePictureInPicture(); }}
              >
                <md-ripple></md-ripple>
                <md-focus-ring></md-focus-ring>
                <md-icon name="picture_in_picture_alt"></md-icon>
              </button>
              <button
                class="ctrl-btn fullscreen-top-btn"
                type="button"
                aria-label="Fullscreen"
                @click=${(e: Event) => { e.stopPropagation(); this.toggleFullscreen(); }}
              >
                <md-ripple></md-ripple>
                <md-focus-ring></md-focus-ring>
                <md-icon name=${this.isFullscreen ? 'fullscreen_exit' : 'fullscreen'}></md-icon>
              </button>
            </div>
          </div>

          <div class="video-center-controls">
            <button
              class="play-pause-btn"
              type="button"
              aria-label=${this.paused ? 'Play' : 'Pause'}
              @click=${(e: Event) => { e.stopPropagation(); this.togglePlay(); }}
            >
              <md-ripple></md-ripple>
              <md-focus-ring></md-focus-ring>
              <md-icon name=${this.paused ? 'play_arrow' : 'pause'}></md-icon>
            </button>
          </div>

          <div class="video-bottom-bar" @click=${(e: Event) => e.stopPropagation()}>
            ${this.renderScrubber(true)}
            ${this.renderControls(true)}
          </div>
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="player-container" @keydown=${this.handleKeyDown}>
        <!-- Hidden Native Audio when in audio mode with src -->
        ${this.type === 'audio' && this.src
          ? html`
              <audio
                class="native-media"
                src=${this.src}
                ?autoplay=${this.autoplay}
                ?loop=${this.loop}
                preload=${this.preload}
                crossorigin=${this.crossorigin || nothing}
                @play=${() => { this.paused = false; this.emitEvent('play'); }}
                @pause=${() => { this.paused = true; this.emitEvent('pause'); }}
                @timeupdate=${() => {
                  if (!this.isDraggingScrubber && this.internalMediaEl) {
                    this.currentTime = this.internalMediaEl.currentTime;
                  }
                }}
                @durationchange=${() => {
                  if (this.internalMediaEl) this.duration = this.internalMediaEl.duration;
                }}
                @loadedmetadata=${() => {
                  if (this.internalMediaEl) {
                    this.duration = this.internalMediaEl.duration;
                    this.currentTime = this.internalMediaEl.currentTime;
                  }
                }}
                @progress=${() => {
                  if (this.internalMediaEl?.buffered?.length) {
                    const end = this.internalMediaEl.buffered.end(this.internalMediaEl.buffered.length - 1);
                    this.buffered = this.duration > 0 ? end / this.duration : 0;
                  }
                }}
                @ended=${() => { this.paused = true; this.emitEvent('ended'); }}
              ></audio>
            `
          : nothing}

        <!-- Audio Mode Slot Container (for slotted native audio) -->
        ${this.type === 'audio'
          ? html`<div style="display:none;"><slot name="media" @slotchange=${this.handleMediaSlotChange}></slot></div>`
          : nothing}

        ${this.type === 'video' ? this.renderVideoLayout() : this.renderAudioLayout()}

        <div class="extra-content" ?hidden=${!this.hasExtraContent}>
          <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

// Aliases for convenience & clear semantics
@customElement('md-media-player')
export class MdMediaPlayer extends MdPlayer {}

@customElement('md-audio-player')
export class MdAudioPlayer extends MdPlayer {}

@customElement('md-video-player')
export class MdVideoPlayer extends MdPlayer {
  override type: PlayerType = 'video';
}

declare global {
  interface HTMLElementTagNameMap {
    'md-player': MdPlayer;
    'md-media-player': MdMediaPlayer;
    'md-audio-player': MdAudioPlayer;
    'md-video-player': MdVideoPlayer;
  }
}
