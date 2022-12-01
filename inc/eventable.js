class Eventable {
    static Events = {}

    constructor() {
        this._registeredEventHandler = {}
    }

    on(key, handler) {
        this._registeredEventHandler[key] = this._registeredEventHandler[key] || []
        const index = this._registeredEventHandler[key].indexOf(handler)

        if(index > -1) {
            return
        }

        this._registeredEventHandler[key].push(handler)
    }

    off(key, handler) {
        if (!key) {
            this._registeredEventHandler = {}
            return
        }

        if (!this._registeredEventHandler[key]) {
            return
        }

        const index = this._registeredEventHandler[key].indexOf(handler)

        if (index === -1) {
            return
        }

        this._registeredEventHandler.splice(index, 1)
    }

    emit(key, payload) {
        const handler = this._registeredEventHandler[key] || []
        handler.forEach(handle => handle(payload))
    }
}

module.exports = Eventable