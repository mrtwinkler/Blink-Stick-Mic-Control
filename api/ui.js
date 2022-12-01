const Eventable = require('../inc/eventable')
const { BrowserWindow } = require('electron')

class UIController extends Eventable {
    static Events = {
        TOGGLE_MUTE: 'toggle-mute',
        GET_IS_MUTED: 'get-is-muted'
    }

    constructor() {
        super()

        const { ipcMain } = require('electron')

        ipcMain.handle(this.constructor.Events.TOGGLE_MUTE, async () => {
            this.emit(this.constructor.Events.TOGGLE_MUTE)
        })

        ipcMain.handle(this.constructor.Events.GET_IS_MUTED, async () => {
            return await new Promise(resolve => {
                this.emit(this.constructor.Events.GET_IS_MUTED, isMuted => {
                    resolve(isMuted)
                })
            })
        })

    }

    createWindow() {
        this.win = new BrowserWindow({
          width: 480,
          height: 300,
          webPreferences: {
              nodeIntegration: true,
              contextIsolation: false
          },
          titleBarStyle: 'hidden'
        })
      
        this.win.setResizable(false)
        this.win.setMenu(null)
        this.win.loadFile('index.html')
    }

    setMute() {
        if (!this.win) {
            console.log('Could not update UI, window not found')
            return
        }

        this.win.webContents.send('set-is-muted', true)
    }

    setUmute() {
        if (!this.win) {
            return
        }

        this.win.webContents.send('set-is-muted', false)
    }
}

module.exports = UIController