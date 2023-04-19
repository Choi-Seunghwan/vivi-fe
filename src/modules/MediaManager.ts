import logger from '@/utils/Logger';

export class MediaManager {
  localStream: MediaStream | null;

  constructor() {
    this.localStream = null;
  }

  async initLocalStream(callback: Function): Promise<MediaStream | void> {
    try {
      if (!navigator?.mediaDevices) return;
      else
        this.localStream = await navigator?.mediaDevices?.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
          // audio: true
        });
      callback();
    } catch (err) {
      logger.debug('initLocalStream Error');
    }
  }

  clearLocalStream() {
    const tracks = this.localStream?.getTracks();
    tracks?.forEach(track => {
      track.stop();
    });
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }
}

export const mediaManager = new MediaManager();
