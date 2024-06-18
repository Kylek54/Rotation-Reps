import { defineStore } from "pinia"
import { useEnemyStore } from "./enemy-store"

interface ICurrentClass {
    globalCooldown: boolean,
    className: string,
    gameName: string,
    actions: IAction[]
}

export interface IAction {
    actionName: string,
    damageType: "Instant" | "DoT"
    abilityType: "GCD" | "OGCD"
    castTime: number,
    recastTime: number,
    duration?: number,
    hotkey: string
}

export const useCurrentClassStore = defineStore('current-class', {
    state: (): ICurrentClass => ({
        globalCooldown: false,
        className: "White Mage (WHM)",
        gameName: "FFXIV",
        actions: [
            {
                actionName: "Glare",
                damageType: "Instant",
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
                duration: 15,
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
            if (this.globalCooldown == false || action.abilityType == "OGCD") {
                console.log(action.actionName, "used!")
                if (action.damageType == "DoT") {
                    useEnemyStore().applyDebuff(action)
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
        applyDebuff() {

        }
    },
})
