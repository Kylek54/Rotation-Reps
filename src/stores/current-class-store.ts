import { defineStore } from "pinia"
import { useEnemyStore } from "./enemy-store"

interface ICurrentClass {
    globalCooldown: boolean,
    currentCast?: IAction,
    className: string,
    gameName: string,
    actions: IAction[]
}

export interface IAction {
    actionName?: string,
    damageType?: "Cast" | "Instant" | "DoT"
    abilityType?: "GCD" | "OGCD"
    castTime?: number,
    recastTime?: number,
    duration?: number,
    casting?: number,
    hotkey?: string
}

export const useCurrentClassStore = defineStore('current-class', {
    state: (): ICurrentClass => ({
        globalCooldown: false,
        currentCast: {},
        className: "White Mage (WHM)",
        gameName: "FFXIV",
        actions: [
            {
                actionName: "Glare",
                damageType: "Cast",
                abilityType: "GCD",
                castTime: 1.5,
                recastTime: 2.5,
                hotkey: ""
            },
            {
                actionName: "Dia",
                damageType: "DoT",
                abilityType: "GCD",
                castTime: 0,
                recastTime: 2.5,
                duration: 30,
                hotkey: ""
            },
            {
                actionName: "Assize",
                damageType: "Instant",
                abilityType: "OGCD",
                castTime: 0,
                recastTime: 40,
                hotkey: ""
            },

        ]
    }),
    getters: {},
    actions: {
        abilityUsed(action: IAction) {
            if (this.globalCooldown == false || (this.currentCast.actionName == undefined && action.abilityType == "OGCD")) {
                console.log(action.actionName, "used!")
                if (action.damageType == "DoT") {
                    useEnemyStore().applyDebuff(action)
                } else if (action.damageType == "Cast") {
                    this.currentCast = action
                }
                
                if (action.abilityType == "OGCD" && this.globalCooldown == true) {
                    return
                }
                this.applyGCD()
            }

        },
        applyGCD() {
            this.globalCooldown = true;
            setTimeout(() => {
                this.globalCooldown = false
                console.log("GCD Over!")
            }, 2500);
        },
        resetCurrentCast() {
            this.currentCast = {}
        }
    },
})
