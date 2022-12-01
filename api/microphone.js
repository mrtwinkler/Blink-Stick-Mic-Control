const Eventable = require('../inc/eventable')

class MicrophoneController extends Eventable {
    static Events = {
        MUTE: 'mute',
        UNMUTE: 'unmute',
        UPDATE: 'update'
    }

    constructor() {
        super()

        const winaudio = require('win-audio')
        const microphone = winaudio.mic

        if (microphone) {
            this._microphone = microphone
        }
    }

    isMuted() {
        return this._microphone
            ? this._microphone.isMuted()
            : false
    }

    mute() {
        if (!this._microphone) {
            return
        }

        this._microphone.mute()
        this.emit(this.constructor.Events.MUTE, this)
        this.emit(this.constructor.Events.UPDATE, this)
    }

    unmute() {
        if (!this._microphone) {
            return
        }

        if (!this._microphone.isMuted()) {
            return
        }

        this._microphone.toggle()
        this.emit(this.constructor.Events.UNMUTE, this)
        this.emit(this.constructor.Events.UPDATE, this)
    }

    toggle() {
        if (!this._microphone) {
            return
        }

        if (this._microphone.isMuted()) {
            this.unmute()
        }
        else {
            this.mute()
        }
    }
}

module.exports = MicrophoneController