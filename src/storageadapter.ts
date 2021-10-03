import type { IJsonTypes, PokitOS } from "./pokittypes/pokit";


export default function start_adapter(pokit: PokitOS) {
    let reg = pokit.modules.registerEvent.bind(pokit.modules)
    console.log('creating save/load events')
    reg('saveSetting', (key:string, value:IJsonTypes) => {
        localStorage.setItem(key, JSON.stringify(value))
    })
    reg('loadSetting', (key: string, obj: {value:IJsonTypes})=>{
        obj.value = JSON.parse(localStorage.getItem(key))
    })
    reg('querySettings', (ns: string, arr: string[])=>{
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if(key.startsWith(ns))arr.push(key.substr(ns.length))//.substring(ns.length, ns.length - key.length));
        }
    })
}