class PeerService {
  constructor() {
    if (!this.peer) {
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
  }

  async getAnswer(offer) {
    if (!offer || !offer.type || !offer.sdp) {
      console.error("Invalid SDP offer received:", offer);
      return;
    }
  
    if (this.peer.signalingState !== "have-remote-offer") {
      console.warn("Skipping getAnswer: Invalid signaling state", this.peer.signalingState);
      return;
    }
  
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
  }

  async setLocalDescription(ans) {
    if (!ans || !ans.type || !ans.sdp) {
      console.error("Invalid SDP answer received:", ans);
      return;
    }
  
    if (this.peer.signalingState !== "stable") {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    } else {
      console.warn("Skipping setRemoteDescription: Connection is already stable.");
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
