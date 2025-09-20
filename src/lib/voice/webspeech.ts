// Web Speech API fallback
export class WebSpeechVoiceAgent {
  private recognition: SpeechRecognition | null = null
  private synthesis: SpeechSynthesis | null = null
  private isListening = false
  private onTranscript?: (text: string, isFinal: boolean) => void
  private onError?: (error: string) => void

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition()
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition()
    }

    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis
    }
  }

  isSupported(): boolean {
    return this.recognition !== null && this.synthesis !== null
  }

  async connect(): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Speech recognition not supported')
    }

    this.setupRecognition()
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = 'en-SG'

    this.recognition.onstart = () => {
      this.isListening = true
      console.log('Speech recognition started')
    }

    this.recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      if (interimTranscript) {
        this.onTranscript?.(interimTranscript, false)
      }
      if (finalTranscript) {
        this.onTranscript?.(finalTranscript, true)
      }
    }

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      this.onError?.(event.error)
      this.isListening = false
    }

    this.recognition.onend = () => {
      this.isListening = false
      console.log('Speech recognition ended')
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start()
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  speak(text: string, rate: number = 0.8, pitch: number = 1) {
    if (!this.synthesis) return

    // Cancel any ongoing speech
    this.synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = 1
    utterance.lang = 'en-SG'

    // Try to use a Singapore-friendly voice
    const voices = this.synthesis.getVoices()
    const singaporeVoice = voices.find(voice => 
      voice.lang.includes('en-SG') || 
      voice.lang.includes('en-GB') || 
      voice.name.includes('Google')
    )
    
    if (singaporeVoice) {
      utterance.voice = singaporeVoice
    }

    this.synthesis.speak(utterance)
  }

  disconnect() {
    this.stopListening()
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  setOnTranscript(callback: (text: string, isFinal: boolean) => void) {
    this.onTranscript = callback
  }

  setOnError(callback: (error: string) => void) {
    this.onError = callback
  }
}
