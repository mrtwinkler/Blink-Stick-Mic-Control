class BlinkstickController {
    constructor() {
        const blinkstick = require('blinkstick')
        const device = blinkstick.findFirst()

        if (device) {
            this._device = device
        }
    }

    hasDevice() {
        return this._device !== undefined
    }

    setColor(colorHEX) {
        if (!this.hasDevice()) {
            console.log('Could not set color, device not found')
            return
        }

        this._device.setColor(colorHEX)
    }
    
    setRed() {
        this.setColor('#ff0000')
    }
    
    setGreen() {
        this.setColor('#00ff00')
    }
    
    setOff() {
        this.setColor('#000000')
    }
}

module.exports = BlinkstickController