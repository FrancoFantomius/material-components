export default {
  id: 'player',
  title: 'Player',
  tag: 'md-player',
  category: 'Media & Playback',
  description: 'Material Design 3 media player component supporting audio and video playback, responsive small-screen and large-screen layouts, artwork/posters, interactive progress scrubbing, always-visible volume controls, queue toggle, playback rates, and keyboard shortcuts.',
  subpath: '@francofantomius/material-components/player',
  interactiveType: 'player',
  properties: [
    { name: 'src', type: 'string', default: "''", description: 'Media source URL for audio or video playback' },
    { name: 'type', type: "'audio' | 'video'", default: "'audio'", description: 'Type of media to render' },
    { name: 'variant', type: "'elevated' | 'filled' | 'outlined' | 'compact' | 'full'", default: "'elevated'", description: 'Surface container style or explicit layout variant' },
    { name: 'track-title', type: 'string', default: "''", description: 'Title of the current track or video' },
    { name: 'artist', type: 'string', default: "''", description: 'Artist or author name' },
    { name: 'album', type: 'string', default: "''", description: 'Album or series name' },
    { name: 'poster', type: 'string', default: "''", description: 'Artwork / poster image URL' },
    { name: 'currentTime', type: 'number', default: '0', description: 'Current playback position in seconds' },
    { name: 'duration', type: 'number', default: '0', description: 'Total media duration in seconds' },
    { name: 'volume', type: 'number', default: '1', description: 'Audio volume level (0.0 to 1.0)' },
    { name: 'muted', type: 'boolean', default: 'false', description: 'Mutes media audio output' },
    { name: 'playback-rate', type: 'number', default: '1', description: 'Speed multiplier (0.5x to 2x)' },
    { name: 'paused', type: 'boolean', default: 'true', description: 'Playback pause state' },
    { name: 'loop', type: 'boolean', default: 'false', description: 'Repeats track when finished' },
    { name: 'autoplay', type: 'boolean', default: 'false', description: 'Automatically begins playback on load' },
    { name: 'compact', type: 'boolean', default: 'false', description: 'Forces minimal single-row bar layout (Image | Text on left, Prev | Play/Pause | Next on right without scrollbar)' },
    { name: 'show-skip', type: 'boolean', default: 'true', description: 'Shows previous and next track buttons' },
    { name: 'show-seek', type: 'boolean', default: 'true', description: 'Shows rewind and fast-forward 10s buttons' },
    { name: 'show-volume', type: 'boolean', default: 'true', description: 'Shows always-visible volume button and slider' },
    { name: 'show-playback-rate', type: 'boolean', default: 'true', description: 'Shows playback rate cycle button' },
    { name: 'show-queue', type: 'boolean', default: 'true', description: 'Shows music queue toggle button' },
    { name: 'seek-step', type: 'number', default: '10', description: 'Seconds to skip with rewind/forward controls' }
  ],
  slots: [
    { name: 'media', description: 'Custom native <audio> or <video> element' },
    { name: 'artwork', description: 'Custom album artwork or video thumbnail element' },
    { name: 'title', description: 'Custom title header content' },
    { name: 'artist', description: 'Custom artist or subtitle content' },
    { name: 'actions', description: 'Custom action buttons (like, share, playlist)' },
    { name: '(default)', description: 'Additional content below controls, such as lyrics or playlist' }
  ],
  events: [
    { name: 'play', detail: 'void', description: 'Fired when playback begins' },
    { name: 'pause', detail: 'void', description: 'Fired when playback is paused' },
    { name: 'timeupdate', detail: '{ currentTime: number, duration: number, progress: number }', description: 'Fired periodically as current time updates' },
    { name: 'seeked', detail: '{ currentTime: number }', description: 'Fired after seeking to a new timestamp' },
    { name: 'volumechange', detail: '{ volume: number, muted: boolean }', description: 'Fired when volume or mute state changes' },
    { name: 'ratechange', detail: '{ playbackRate: number }', description: 'Fired when playback rate is modified' },
    { name: 'queue', detail: '{ open: boolean }', description: 'Fired when the queue button is toggled' },
    { name: 'previous', detail: 'void', description: 'Fired when user clicks previous track button' },
    { name: 'next', detail: 'void', description: 'Fired when user clicks next track button' },
    { name: 'ended', detail: 'void', description: 'Fired when media playback reaches the end' },
    { name: 'fullscreenchange', detail: '{ fullscreen: boolean }', description: 'Fired when fullscreen state changes in video mode' }
  ],
  methods: [
    { name: 'play()', description: 'Begins or resumes media playback' },
    { name: 'pause()', description: 'Pauses active playback' },
    { name: 'togglePlay()', description: 'Toggles between play and pause states' },
    { name: 'seek(timeInSeconds)', description: 'Jumps directly to a specific timestamp' },
    { name: 'seekBy(deltaSeconds)', description: 'Seeks forwards or backwards by given delta seconds' },
    { name: 'setVolume(level)', description: 'Sets audio volume (0 to 1)' },
    { name: 'toggleMute()', description: 'Toggles audio mute state' },
    { name: 'toggleQueue()', description: 'Toggles the music queue state' },
    { name: 'cyclePlaybackRate()', description: 'Cycles through standard speed rates (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)' },
    { name: 'toggleFullscreen()', description: 'Toggles fullscreen mode for video' }
  ],
  examples: [
    {
      title: 'Full Player (Large Screen / Fit Max Width)',
      description: 'Full-featured Material 3 audio player fitting the maximum container width with album artwork, title, artist, timeline scrubber, time indicators, always-visible volume slider, queue toggle, and media controls.',
      html: `<div style="width: 100%;">
  <md-player
    track-title="Midnight City Dreams"
    artist="Synthetic Horizons"
    album="Future Echoes (2026)"
    poster="https://picsum.photos/seed/music/300/300"
    duration="214"
    current-time="45"
  ></md-player>
</div>`
    },
    {
      title: 'Small Screen / Compact Variant',
      description: 'Streamlined single-row layout without scrollbar/scrubber: Image & text aligned on the left, Previous | Play/Pause | Next buttons aligned on the right.',
      html: `<div style="width: 100%;">
  <md-player
    compact
    variant="outlined"
    track-title="Episode 42: Modern Web Design"
    artist="Tech Talk Daily"
    poster="https://picsum.photos/seed/podcast/200/200"
    duration="1820"
    current-time="360"
  ></md-player>
</div>`
    },
    {
      title: 'Video Player Mode with Working Fullscreen',
      description: 'Responsive video player with auto-hiding overlay controls, timeline scrubber, picture-in-picture, and interactive fullscreen toggle.',
      html: `<div style="width: 100%;">
  <md-player
    type="video"
    track-title="Material Design 3 Interactive Experience"
    poster="https://picsum.photos/seed/video/800/450"
    duration="128"
    current-time="18"
  ></md-player>
</div>`
    }
  ]
};
