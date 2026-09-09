---
title: Media Player
category: Media & Playback
icon: play_circle
description: Audio and video player with scrubbers, queue management, volume controls, and picture-in-picture.
---

## Overview

Media player component for audio and video playback, providing timeline scrubbers, track queue drawers, volume sliders, playback speed controls, and fullscreen presentation.

### Subpath Import

```javascript
import '@francofantomius/material-components/player';
```

## Examples

### Audio and Video Player

```html
<md-player
  src="https://www.w3schools.com/html/mov_bbb.mp4"
  title="Big Buck Bunny"
  artist="Blender Foundation"
  type="video"
></md-player>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `''` | Media source URL |
| `title` | `string` | `''` | Media track title |
| `artist` | `string` | `''` | Artist or author name |
| `type` | `'audio' \| 'video'` | `'audio'` | Media type |
| `poster` | `string` | `''` | Video poster thumbnail image |
| `autoplay` | `boolean` | `false` | Begins playback automatically |
| `loop` | `boolean` | `false` | Loops active track |

### Methods

| Method | Description |
| :--- | :--- |
| `play()` | Begins or resumes media playback |
| `pause()` | Pauses active playback |
| `togglePlay()` | Toggles between play and pause states |
| `seek(timeInSeconds)` | Jumps directly to a specific timestamp |
| `setVolume(level)` | Sets audio volume (0 to 1) |
| `toggleMute()` | Toggles audio mute state |
| `toggleFullscreen()` | Toggles fullscreen mode for video |

### Events

| Name | Description |
| :--- | :--- |
| `play` | Dispatched when playback starts |
| `pause` | Dispatched when playback pauses |
| `timeupdate` | Dispatched as media timeline advances |

