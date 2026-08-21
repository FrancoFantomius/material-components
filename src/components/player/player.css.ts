import { css } from 'lit';

export const playerStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif);
    position: relative;
    border-radius: var(--md-sys-shape-corner-extra-large, 24px);
    overflow: hidden;
    color: var(--md-sys-color-on-surface, #1D1B20);
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* --- Variants --- */
  :host(:not([variant])),
  :host([variant="elevated"]),
  :host([variant="full"]) {
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  :host([variant="filled"]) {
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="outlined"]) {
    background-color: var(--md-sys-color-surface, #FEF7FF);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="compact"]),
  :host([compact]) {
    border-radius: var(--md-sys-shape-corner-large, 16px);
  }

  .player-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  /* Hidden native media element */
  .native-media {
    display: none;
  }

  /* --- Video Mode Layout --- */
  :host([type="video"]) .video-viewport {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #000;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([type="video"]) video,
  :host([type="video"]) ::slotted(video) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* Fullscreen Video Viewport (Scoped exclusively to the video viewport) */
  .video-viewport:fullscreen {
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    aspect-ratio: auto !important;
    background-color: #000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .video-viewport:-webkit-full-screen {
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    aspect-ratio: auto !important;
    background-color: #000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
    opacity: 1;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1);
    color: #fff;
    padding: 16px 20px;
    pointer-events: none;
  }

  .video-overlay * {
    pointer-events: auto;
  }

  .video-viewport:not(:hover):not(.controls-visible) .video-overlay.auto-hide {
    opacity: 0;
  }

  .video-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .video-top-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .video-title {
    font-size: var(--md-sys-typescale-title-medium-size, 16px);
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .video-center-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  /* --- Audio Layout (Large Screen Default) --- */
  .audio-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 24px;
    gap: 16px;
  }

  .audio-main-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
  }

  .audio-header {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
    flex: 1;
  }

  .artwork-container {
    width: 64px;
    height: 64px;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 2px rgba(0, 0, 0, 0.1));
  }

  .artwork-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .artwork-fallback {
    color: var(--md-sys-color-primary, #6750A4);
    font-size: 32px;
  }

  .track-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }

  .track-title {
    font-size: var(--md-sys-typescale-title-medium-size, 16px);
    font-weight: 600;
    color: var(--md-sys-color-on-surface, #1D1B20);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
  }

  .track-artist {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 18px;
  }

  .track-album {
    font-size: 12px;
    color: var(--md-sys-color-outline, #79747E);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Compact controls (on right side) - hidden on large screens */
  .compact-controls-right {
    display: none;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    margin-left: auto;
  }

  /* Full player scrubber and controls sections */
  .full-player-scrubber {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .full-player-controls {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* --- Small Screen / Compact Variant Layout --- */
  /* Hide scrollbar/scrubber and show: Image | text (left) and Previous | Play/Pause | Next (right) */
  @media (max-width: 600px) {
    :host([type="audio"]:not([variant="full"])) .audio-layout {
      padding: 10px 14px;
      gap: 0;
    }

    :host([type="audio"]:not([variant="full"])) .audio-header {
      gap: 12px;
    }

    :host([type="audio"]:not([variant="full"])) .artwork-container {
      width: 44px;
      height: 44px;
      border-radius: var(--md-sys-shape-corner-small, 8px);
    }

    :host([type="audio"]:not([variant="full"])) .track-title {
      font-size: 14px;
      line-height: 18px;
    }

    :host([type="audio"]:not([variant="full"])) .track-artist {
      font-size: 12px;
      line-height: 16px;
    }

    :host([type="audio"]:not([variant="full"])) .track-album {
      display: none;
    }

    :host([type="audio"]:not([variant="full"])) .compact-controls-right {
      display: flex;
    }

    :host([type="audio"]:not([variant="full"])) .full-player-scrubber {
      display: none !important;
    }

    :host([type="audio"]:not([variant="full"])) .full-player-controls {
      display: none !important;
    }
  }

  /* Explicit compact mode (forced compact on any screen width) */
  :host([compact]) .audio-layout,
  :host([variant="compact"]) .audio-layout {
    padding: 10px 14px;
    gap: 0;
  }

  :host([compact]) .audio-header,
  :host([variant="compact"]) .audio-header {
    gap: 12px;
  }

  :host([compact]) .artwork-container,
  :host([variant="compact"]) .artwork-container {
    width: 44px;
    height: 44px;
    border-radius: var(--md-sys-shape-corner-small, 8px);
  }

  :host([compact]) .track-title,
  :host([variant="compact"]) .track-title {
    font-size: 14px;
    line-height: 18px;
  }

  :host([compact]) .track-artist,
  :host([variant="compact"]) .track-artist {
    font-size: 12px;
    line-height: 16px;
  }

  :host([compact]) .track-album,
  :host([variant="compact"]) .track-album {
    display: none;
  }

  :host([compact]) .compact-controls-right,
  :host([variant="compact"]) .compact-controls-right {
    display: flex;
  }

  :host([compact]) .full-player-scrubber,
  :host([variant="compact"]) .full-player-scrubber {
    display: none !important;
  }

  :host([compact]) .full-player-controls,
  :host([variant="compact"]) .full-player-controls {
    display: none !important;
  }

  /* --- Progress / Scrubber Section --- */
  .scrubber-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .progress-slider-container {
    position: relative;
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    touch-action: none;
    user-select: none;
  }

  .slider-track-bg {
    position: absolute;
    left: 0;
    right: 0;
    height: 6px;
    border-radius: 3px;
    background-color: var(--md-sys-color-surface-variant, #E7E0EC);
    overflow: hidden;
    clip-path: inset(0 0 0 0%);
    transition: clip-path 300ms cubic-bezier(0.2, 0, 0, 1);
  }

  .progress-slider-container.playing-wave .slider-track-bg {
    clip-path: inset(0 0 0 var(--progress-percent, 0%));
  }

  .slider-buffer-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    transition: width 150ms linear;
  }

  .slider-active-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--md-sys-color-primary, #6750A4);
    border-radius: 3px;
    opacity: 1;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  .progress-slider-container.playing-wave .slider-active-bar {
    opacity: 0;
  }

  .slider-sinus-wave {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scaleY(0.2);
    height: 20px;
    background-color: var(--md-sys-color-primary, #6750A4);
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Cpath d='M 0 10 C 4.5 4.5, 11.5 4.5, 16 10 S 27.5 15.5, 32 10' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Cpath d='M 0 10 C 4.5 4.5, 11.5 4.5, 16 10 S 27.5 15.5, 32 10' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
    -webkit-mask-repeat: repeat-x;
    mask-repeat: repeat-x;
    -webkit-mask-size: 32px 20px;
    mask-size: 32px 20px;
    animation: sinus-wave-anim 1.2s linear infinite;
    animation-play-state: paused;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    transition: transform 300ms cubic-bezier(0.2, 0, 0, 1),
                opacity 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  .progress-slider-container.playing-wave .slider-sinus-wave {
    opacity: 1;
    transform: translateY(-50%) scaleY(1);
    animation-play-state: running;
  }

  @keyframes sinus-wave-anim {
    0% {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }
    100% {
      -webkit-mask-position: -32px 0;
      mask-position: -32px 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .slider-sinus-wave {
      animation: none;
      transition: none;
    }
    .slider-track-bg {
      transition: none;
    }
    .slider-active-bar {
      transition: none;
    }
  }

  .slider-thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750A4);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    top: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1), background-color 120ms ease;
    z-index: 2;
  }

  .progress-slider-container:hover .slider-thumb,
  .progress-slider-container:active .slider-thumb,
  .progress-slider-container.dragging .slider-thumb {
    transform: translate(-50%, -50%) scale(1.2);
  }

  .time-display {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-weight: 500;
  }

  /* --- Main Controls Row --- */
  .controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
  }

  .controls-group-left,
  .controls-group-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  .controls-group-right {
    justify-content: flex-end;
  }

  .controls-group-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  /* Play / Pause Primary Button */
  .play-pause-btn {
    width: 48px;
    height: 48px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    outline: none;
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px rgba(0, 0, 0, 0.2));
    transition: transform 120ms cubic-bezier(0.2, 0, 0, 1),
                background-color 150ms ease,
                box-shadow 150ms ease;
  }

  .play-pause-btn.compact-play-btn {
    width: 40px;
    height: 40px;
  }

  .play-pause-btn.compact-play-btn md-icon {
    font-size: 24px;
  }

  .play-pause-btn:hover {
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    color: var(--md-sys-color-on-primary-container, #21005D);
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px rgba(0, 0, 0, 0.25));
    transform: scale(1.04);
  }

  .play-pause-btn:active {
    transform: scale(0.96);
  }

  .play-pause-btn md-icon {
    font-size: 28px;
  }

  /* Control Icon Button */
  .ctrl-btn {
    width: 36px;
    height: 36px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background: transparent;
    border: none;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    outline: none;
    transition: background-color 120ms ease, color 120ms ease;
  }

  .ctrl-btn:hover {
    background-color: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.08));
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  .ctrl-btn.active {
    color: var(--md-sys-color-primary, #6750A4);
    background-color: var(--md-sys-color-primary-container, #EADDFF);
  }

  .ctrl-btn md-icon {
    font-size: 20px;
  }

  /* Playback Speed Badge / Pill */
  .speed-btn {
    min-width: 32px;
    height: 28px;
    padding: 0 6px;
    border-radius: var(--md-sys-shape-corner-small, 8px);
    font-size: 11px;
    font-weight: 600;
    background: transparent;
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    outline: none;
    transition: all 120ms ease;
  }

  .speed-btn:hover {
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border-color: var(--md-sys-color-outline, #79747E);
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  /* Volume slider widget - Always visible in full player */
  .volume-container {
    display: flex;
    align-items: center;
    position: relative;
    gap: 6px;
  }

  .volume-slider-wrapper {
    width: 72px;
    opacity: 1;
    display: flex;
    align-items: center;
  }

  .volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 72px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      var(--md-sys-color-primary, #6750A4) 0%,
      var(--md-sys-color-primary, #6750A4) var(--volume-percent, 100%),
      var(--md-sys-color-surface-variant, #E7E0EC) var(--volume-percent, 100%),
      var(--md-sys-color-surface-variant, #E7E0EC) 100%
    );
    accent-color: var(--md-sys-color-primary, #6750A4);
    outline: none;
    cursor: pointer;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--md-sys-color-primary, #6750A4);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 100ms ease;
  }

  .volume-slider::-webkit-slider-thumb:hover {
    transform: scale(1.25);
  }

  .volume-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--md-sys-color-primary, #6750A4);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: none;
  }

  .volume-slider::-moz-range-progress {
    background-color: var(--md-sys-color-primary, #6750A4);
    border-radius: 2px;
    height: 4px;
  }

  /* Video controls bar inside video viewport */
  .video-bottom-bar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .video-bottom-bar .controls-row {
    color: #fff;
  }

  .video-bottom-bar .ctrl-btn {
    color: #fff;
  }

  .video-bottom-bar .ctrl-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .video-bottom-bar .ctrl-btn.active {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: #fff;
  }

  .video-bottom-bar .time-display {
    color: rgba(255, 255, 255, 0.85);
  }

  .video-bottom-bar .speed-btn {
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }

  .video-bottom-bar .speed-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .video-bottom-bar .volume-slider {
    background: linear-gradient(
      to right,
      var(--md-sys-color-primary, #6750A4) 0%,
      var(--md-sys-color-primary, #6750A4) var(--volume-percent, 100%),
      rgba(255, 255, 255, 0.35) var(--volume-percent, 100%),
      rgba(255, 255, 255, 0.35) 100%
    );
  }

  .video-bottom-bar .volume-slider::-webkit-slider-thumb {
    background: var(--md-sys-color-primary, #6750A4);
    border: 1.5px solid #fff;
  }

  .video-bottom-bar .volume-slider::-moz-range-thumb {
    background: var(--md-sys-color-primary, #6750A4);
    border: 1.5px solid #fff;
  }

  /* Extra content / footer slot */
  .extra-content {
    border-top: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    padding: 12px 24px;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .extra-content[hidden],
  .extra-content:empty {
    display: none !important;
  }

  :host([compact]) .extra-content,
  :host([variant="compact"]) .extra-content {
    padding: 8px 16px;
  }
`;
