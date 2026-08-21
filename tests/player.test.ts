import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdPlayer, MdMediaPlayer, MdAudioPlayer, MdVideoPlayer } from '../src/components/player/player.js';

describe('md-player', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default audio player with track info and controls', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    player.trackTitle = 'Test Track';
    player.artist = 'Test Artist';
    player.album = 'Test Album';
    player.duration = 200;
    player.currentTime = 50;
    document.body.appendChild(player);
    await player.updateComplete;

    expect(player.type).toBe('audio');
    expect(player.variant).toBe('elevated');
    expect(player.paused).toBe(true);

    const title = player.shadowRoot?.querySelector('.track-title');
    expect(title?.textContent).toBe('Test Track');

    const artist = player.shadowRoot?.querySelector('.track-artist');
    expect(artist?.textContent).toBe('Test Artist');

    const album = player.shadowRoot?.querySelector('.track-album');
    expect(album?.textContent).toBe('Test Album');

    const playBtn = player.shadowRoot?.querySelector('.play-pause-btn');
    expect(playBtn).not.toBeNull();
    expect(playBtn?.getAttribute('aria-label')).toBe('Play');
  });

  it('should toggle play and pause states and emit events', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    document.body.appendChild(player);
    await player.updateComplete;

    let played = false;
    let paused = false;
    player.addEventListener('play', () => { played = true; });
    player.addEventListener('pause', () => { paused = true; });

    player.togglePlay();
    await player.updateComplete;
    expect(player.paused).toBe(false);
    expect(played).toBe(true);

    player.togglePlay();
    await player.updateComplete;
    expect(player.paused).toBe(true);
    expect(paused).toBe(true);
  });

  it('should seek to specific timestamps and seek relative delta', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    player.duration = 300;
    document.body.appendChild(player);
    await player.updateComplete;

    let seekedTime = -1;
    player.addEventListener('seeked', (e: any) => {
      seekedTime = e.detail?.currentTime;
    });

    player.seek(120);
    expect(player.currentTime).toBe(120);
    expect(seekedTime).toBe(120);

    player.seekBy(30);
    expect(player.currentTime).toBe(150);
    expect(seekedTime).toBe(150);

    player.seekBy(-50);
    expect(player.currentTime).toBe(100);
    expect(seekedTime).toBe(100);
  });

  it('should adjust volume and toggle mute state', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    document.body.appendChild(player);
    await player.updateComplete;

    let volChanged = false;
    player.addEventListener('volumechange', () => { volChanged = true; });

    player.setVolume(0.4);
    expect(player.volume).toBe(0.4);
    expect(volChanged).toBe(true);

    player.toggleMute();
    expect(player.muted).toBe(true);

    player.toggleMute();
    expect(player.muted).toBe(false);
  });

  it('should cycle playback speeds and emit ratechange', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    document.body.appendChild(player);
    await player.updateComplete;

    let rateChanged = false;
    player.addEventListener('ratechange', () => { rateChanged = true; });

    expect(player.playbackRate).toBe(1);
    player.cyclePlaybackRate();
    expect(player.playbackRate).toBe(1.25);
    expect(rateChanged).toBe(true);

    player.setPlaybackRate(2);
    expect(player.playbackRate).toBe(2);
  });

  it('should support loop and shuffle toggles', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    document.body.appendChild(player);
    await player.updateComplete;

    let shuffled = false;
    player.addEventListener('shuffle', (e: any) => {
      shuffled = e.detail?.shuffle;
    });

    player.toggleLoop();
    expect(player.loop).toBe(true);

    player.toggleShuffle();
    expect(player.shuffle).toBe(true);
    expect(shuffled).toBe(true);
  });

  it('should emit previous and next events', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    document.body.appendChild(player);
    await player.updateComplete;

    let prevFired = false;
    let nextFired = false;
    player.addEventListener('previous', () => { prevFired = true; });
    player.addEventListener('next', () => { nextFired = true; });

    player.previous();
    expect(prevFired).toBe(true);

    player.next();
    expect(nextFired).toBe(true);
  });

  it('should render in video mode with video viewport and overlays', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    player.type = 'video';
    player.trackTitle = 'Trailer Clip';
    player.poster = 'https://example.com/poster.jpg';
    player.src = 'https://example.com/video.mp4';
    document.body.appendChild(player);
    await player.updateComplete;

    expect(player.type).toBe('video');
    const viewport = player.shadowRoot?.querySelector('.video-viewport');
    expect(viewport).not.toBeNull();

    const title = player.shadowRoot?.querySelector('.video-title');
    expect(title?.textContent).toBe('Trailer Clip');
  });

  it('should support compact layout mode and variant', async () => {
    const player = document.createElement('md-player') as MdPlayer;
    player.compact = true;
    player.trackTitle = 'Compact Track';
    player.artist = 'Compact Artist';
    document.body.appendChild(player);
    await player.updateComplete;

    expect(player.hasAttribute('compact')).toBe(true);

    const compactControls = player.shadowRoot?.querySelector('.compact-controls-right');
    expect(compactControls).not.toBeNull();

    const prevBtn = compactControls?.querySelector('button[aria-label="Previous song"]');
    const playBtn = compactControls?.querySelector('.compact-play-btn');
    const nextBtn = compactControls?.querySelector('button[aria-label="Next song"]');

    expect(prevBtn).not.toBeNull();
    expect(playBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();

    const fullScrubber = player.shadowRoot?.querySelector('.full-player-scrubber');
    expect(fullScrubber).not.toBeNull();
  });

  it('should instantiate aliases md-media-player, md-audio-player, md-video-player', async () => {
    const mediaP = document.createElement('md-media-player') as MdMediaPlayer;
    const audioP = document.createElement('md-audio-player') as MdAudioPlayer;
    const videoP = document.createElement('md-video-player') as MdVideoPlayer;

    document.body.appendChild(mediaP);
    document.body.appendChild(audioP);
    document.body.appendChild(videoP);

    await Promise.all([mediaP.updateComplete, audioP.updateComplete, videoP.updateComplete]);

    expect(mediaP instanceof MdPlayer).toBe(true);
    expect(audioP instanceof MdPlayer).toBe(true);
    expect(videoP instanceof MdPlayer).toBe(true);
    expect(videoP.type).toBe('video');
  });

  it('should transition between squiggly line and straight line on play/pause, and remain straight for video player', async () => {
    const audioPlayer = document.createElement('md-player') as MdPlayer;
    audioPlayer.type = 'audio';
    audioPlayer.duration = 100;
    audioPlayer.currentTime = 30;
    document.body.appendChild(audioPlayer);
    await audioPlayer.updateComplete;

    // Initially paused: container is not playing-wave
    expect(audioPlayer.paused).toBe(true);
    expect(audioPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).not.toBeNull();
    expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);

    // When playing: playing-wave class is added for smooth transition to squiggly line
    audioPlayer.togglePlay();
    await audioPlayer.updateComplete;
    expect(audioPlayer.paused).toBe(false);
    expect(audioPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).not.toBeNull();
    expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(true);

    // When paused: playing-wave class is removed for smooth transition to straight line
    audioPlayer.togglePlay();
    await audioPlayer.updateComplete;
    expect(audioPlayer.paused).toBe(true);
    expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);

    // Video player: should never render sinus wave or have playing-wave, even when playing
    const videoPlayer = document.createElement('md-player') as MdPlayer;
    videoPlayer.type = 'video';
    videoPlayer.duration = 100;
    videoPlayer.currentTime = 30;
    document.body.appendChild(videoPlayer);
    await videoPlayer.updateComplete;

    videoPlayer.togglePlay();
    await videoPlayer.updateComplete;
    expect(videoPlayer.paused).toBe(false);
    expect(videoPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).toBeNull();
    expect(videoPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);
  });
});
