
    export class ButtonGroup {
        constructor(inputmap: Map<string, number>) {
            this.inputmap = inputmap
        }
        inputmap: Map<string, number>
        up (btnname: string, ev: MouseEvent) {
            this.inputmap.set(btnname, 0)
        }
        down (btnname: string, ev: MouseEvent) {
            this.inputmap.set(btnname, 1)
        }
        enter (btnname: string, ev: MouseEvent) {
        }
        leave (btnname: string, ev: MouseEvent) {
        }
        groupleave (ev: MouseEvent) {
        }
        groupdown (ev: MouseEvent) {
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

        up (btnname: string, ev: MouseEvent) {
            this.groupleave(ev)
        }
        down (btnname: string, ev: MouseEvent) {
            this.primary = btnname
            this.secondary = null
        }
        enter (btnname: string, ev: MouseEvent) {
            if (this.primary && this.primary != btnname) {
                this.secondary = btnname
            }
            if (this.grouppressed && !this.primary) {
                this.down(btnname, ev)
            }
        }
        leave (btnname: string, ev: MouseEvent) {
            if (btnname === this.secondary) {
                this.secondary = null
            }
        }
        groupleave (ev: MouseEvent) {
            this.primary = null
            this.secondary = null
        }
        groupdown (ev: MouseEvent) {
            this.grouppressed = true
        }
    }