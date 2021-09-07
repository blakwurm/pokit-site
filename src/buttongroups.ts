
    export class ButtonGroup {
        constructor(inputmap: Map<string, number>) {
            this.inputmap = inputmap
        }
        inputmap: Map<string, number>
        up (btnname: string) {
            this.inputmap.set(btnname, 0)
        }
        down (btnname: string) {
            this.inputmap.set(btnname, 1)
        }
        enter (btnname: string) {
        }
        leave (btnname: string) {
        }
        groupleave () {
        }
        groupdown () {
        }
    }

    let dpad_triggers = new Map(Object.entries({
        'up': ['up'],
        'down': ['down'],
        'left': ['left'],
        'right': ['right'],
        'upright': ['up', 'right'],
        'upleft': ['up', 'left'],
        'downright': ['down', 'right'],
        'downleft': ['down', 'left'],
        'dead': []
    }))

    export class DPadGroup extends ButtonGroup {
        pressed = false
        press(btnname, val) {
            let triggers = dpad_triggers.get(btnname)
            console.log(this.inputmap)
            console.log(btnname)
            for (let trigger of triggers) {
                this.inputmap.set(trigger, val)
                console.log(trigger, 'is now', val)
                console.log(this.inputmap.get(trigger))
            }
        }
        up (btnname: string) {
            this.press(btnname, 0)
            this.pressed = false
        }
        down (btnname: string) {
            this.press(btnname, 1)
            this.pressed = true
        }
        enter (btnname: string) {
            if (this.pressed) {
                this.press(btnname, 1)
            }
        }
        leave (btnname: string) {
            if (this.pressed) {
                this.press(btnname, 0)
            }
        }
        groupleave () {
            if (this.pressed) {
                this.press('left', 0)
                this.press('right', 0)
                this.press('up', 0)
                this.press('down', 0)
                this.pressed = false
                console.log('up done')
            }
        }
        groupdown () {
            this.pressed = true
            console.log('down done')
        }
    }

    export class FaceButtonGroup extends ButtonGroup {

        _primary?: string = null
        set primary(x: string) {
            if (x) {
                this.inputmap.set(x, 1)
                console.log(x, 'pressed')
            } else {
                this.inputmap.set(this._primary, 0)
                console.log(this.primary, 'depressed')
            }
            this._primary = x
        }
        get primary() {return this._primary}

        _secondary?: string = null
        set secondary(x: string) {
            if (x) {
                if (this._secondary) {
                    this.secondary = null
                }
                this.inputmap.set(x, 1)
                console.log(x, 'pressed')
            } else {
                this.inputmap.set(this._secondary, 0)
                console.log(this._secondary, 'depressed')
            }
            this._secondary = x
        }
        get secondary() {return this._primary}

        grouppressed = false 

        up (btnname: string) {
            this.groupleave()
        }
        down (btnname: string) {
            this.primary = btnname
            this.secondary = null
        }
        enter (btnname: string) {
            if (this.primary && this.primary != btnname) {
                this.secondary = btnname
            }
            if (this.grouppressed && !this.primary) {
                this.down(btnname)
            }
        }
        leave (btnname: string) {
            if (btnname === this.secondary) {
                this.secondary = null
            }
        }
        groupleave () {
            this.primary = null
            this.secondary = null
            this.grouppressed = false
        }
        groupdown () {
            this.grouppressed = true
        }
    }