// src/services/PlaybackService.ts
import TrackPlayer, { Event } from 'react-native-track-player';

export const PlaybackService = async function () {
    await TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    await TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    // ...
};
