const BlinkstickController = require('./api/blinkstick')
const MicrophoneController = require('./api/microphone')
const UIController = require('./api/ui')
const { app, globalShortcut, powerMonitor } = require('electron')

const GLOBAL_KEYBOARD_SHORTCUT = 'CommandOrControl+num0'
const blinkstickController = new BlinkstickController()
const microphoneController = new MicrophoneController()
const uiController = new UIController()

uiController.on(UIController.Events.TOGGLE_MUTE, () => {
    microphoneController.toggle()
})
uiController.on(UIController.Events.GET_IS_MUTED, fn => {
    fn(microphoneController.isMuted())
})

microphoneController.on(MicrophoneController.Events.UPDATE, () => {
    if (microphoneController.isMuted()) {
        blinkstickController.setRed()
        uiController.setMute();
    }
    else {
        blinkstickController.setGreen()
        uiController.setUmute();
    }
})

powerMonitor.on('suspend', () => { 
    microphoneController.mute()
    blinkstickController.setOff()
})

powerMonitor.on('resume', () => { 
    microphoneController.mute()
})

powerMonitor.on('shutdown', () => { 
    microphoneController.mute()
    blinkstickController.setOff()
})

app.whenReady().then(() => {
    globalShortcut.unregister(GLOBAL_KEYBOARD_SHORTCUT)
    globalShortcut.unregisterAll()

    if (!blinkstickController.hasDevice()) {
        console.log('stick not found')
        app.quit()
        return
    }

    globalShortcut.register(GLOBAL_KEYBOARD_SHORTCUT, () => {
        microphoneController.toggle()
    })

    uiController.createWindow()
    microphoneController.mute()
})

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll()
    microphoneController.mute()
    blinkstickController.setOff()
    
    if (process.platform !== 'darwin') {
        app.quit()
    }
})