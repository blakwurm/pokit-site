import { subscribe } from 'svelte/internal';
import { Subscriber, Unsubscriber, Updater, Writable, writable } from 'svelte/store';

export const count = writable(0);

function get_setting<n>(settingname: string, default_value: n): n {
    let settingcontainer = JSON.parse(window.localStorage.getItem('pokit-settings')) || {}
    let thing = settingcontainer[settingname]
    if (!thing) {
        set_setting(settingname, default_value)
        thing = default_value
    }
    return thing 
}

function set_setting<n>(settingname, value: n) {
    let settingcontainer = JSON.parse(window.localStorage.getItem('pokit-settings')) || {}
    settingcontainer[settingname] = value
    let jsonish = JSON.stringify(settingcontainer)
    window.localStorage.setItem('pokit-settings', jsonish)
}

class SettingStore<N> {

    constructor(settingname: string, defaultvalue: N) {
        this.settignname = settingname
        this.get(defaultvalue)
    }
    
    settignname: string
    value: N
    subscribers = new Set<Subscriber<N>>()

    set(value: N): void {
        this.value = value
        set_setting(this.settignname, this.value)
        for (let subber of this.subscribers) {
            subber(this.value)
        }
    }

    get(defaultvalue?: N): N {
        this.value = get_setting(this.settignname, defaultvalue || this.value)
        return this.value
    }

    subscribe(run: Subscriber<N>, invalidate?: (value?: N) => void): Unsubscriber {
        this.subscribers.add(run)
        run(this.value)
        return () => {
            this.subscribers.delete(run)
        }
    }

}

export const atomic_hue = new SettingStore('atomic-hue', 200)