class PeerService {
  public peer: RTCPeerConnection | null = null;

  constructor() {
    if (typeof window !== "undefined" && "RTCPeerConnection" in window) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun.l.google.com:19301",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | void> {
    if (!this.peer) {
      console.error("Peer connection not initialized.");
      return;
    }

    if (!offer || !offer.type || !offer.sdp) {
      console.error("Invalid SDP offer received:", offer);
      return;
    }

    if (this.peer.signalingState !== "have-remote-offer") {
      console.warn("Skipping getAnswer: Invalid signaling state", this.peer.signalingState);
      return;
    }

    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setLocalDescription(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peer) {
      console.error("Peer connection not initialized.");
      return;
    }

    if (!answer || !answer.type || !answer.sdp) {
      console.error("Invalid SDP answer received:", answer);
      return;
    }

    if (this.peer.signalingState !== "stable") {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    } else {
      console.warn("Skipping setRemoteDescription: Connection is already stable.");
    }
  }

  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (!this.peer) {
      console.error("Peer connection not initialized.");
      return;
    }

    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }
}

export default new PeerService();
