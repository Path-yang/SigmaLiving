import { RealtimeConfig, RealtimeMessage } from './types';

export class RealtimeVoiceAgent {
  private ws: WebSocket | null = null
  private peerConnection: RTCPeerConnection | null = null
  private localStream: MediaStream | null = null
  private remoteAudio: HTMLAudioElement
  private isConnected = false
  private onError?: (error: string) => void

  constructor(
    private config: RealtimeConfig,
    private audioElement: HTMLAudioElement
  ) {
    this.remoteAudio = audioElement
  }

  async connect(): Promise<void> {
    try {
      // Get user microphone
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      })

      // Create WebRTC connection
      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })

      // Add local stream
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!)
      })

      // Handle remote audio
      this.peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0]
        if (this.remoteAudio) {
          this.remoteAudio.srcObject = remoteStream
          this.remoteAudio.play().catch(console.error)
        }
      }

      // Connect to OpenAI Realtime API with environment-based URL
      const baseUrl = process.env.NEXT_PUBLIC_OPENAI_BASE_URL || 'wss://api.openai.com';
      const model = this.config.model || 'gpt-4o-realtime-preview';
      const wsUrl = `${baseUrl}/v1/realtime?model=${model}&token=${this.config.token}`;
      
      console.log('Connecting to OpenAI Realtime API:', wsUrl.replace(this.config.token, '***'));
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('Connected to OpenAI Realtime API')
        this.isConnected = true
      }

      this.ws.onmessage = (event) => {
        const message: RealtimeMessage = JSON.parse(event.data)
        this.handleMessage(message)
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.onError?.('Connection error')
      }

      this.ws.onclose = () => {
        console.log('WebSocket closed')
        this.isConnected = false
      }

    } catch (error) {
      console.error('Failed to connect:', error)
      this.onError?.('Failed to access microphone')
    }
  }

  private handleMessage(message: RealtimeMessage) {
    switch (message.type) {
      case 'response.audio.delta':
        // Handle audio response
        break
      case 'response.done':
        // Handle response completion
        break
      case 'error':
        console.error('Realtime API error:', message)
        this.onError?.(message.error?.message || 'Unknown error')
        break
      default:
        console.log('Unhandled message type:', message.type)
    }
  }

  sendAudio(audioData: ArrayBuffer) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: Array.from(new Uint8Array(audioData))
      }))
    }
  }

  sendMessage(text: string) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [{ type: 'input_text', text }]
        }
      }))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    if (this.peerConnection) {
      this.peerConnection.close()
      this.peerConnection = null
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop())
      this.localStream = null
    }
    this.isConnected = false
  }

  setErrorHandler(handler: (error: string) => void) {
    this.onError = handler
  }
}
