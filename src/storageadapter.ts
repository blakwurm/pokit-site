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
}