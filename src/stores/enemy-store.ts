import { defineStore } from "pinia"
import { IAction } from "./current-class-store"
import { ref, watch } from "vue"

interface IDebuff {
    debuffName: string,
    debuffDuration: number
}

interface IEnemy {
    debuffList: IDebuff[]
}

export const useEnemyStore = defineStore('enemy-store', {
    state: (): IEnemy => ({
        debuffList: []
    }),
    getters: {},
    actions: {
        applyDebuff(action: IAction) {
            const debuff = {
                debuffName: action.actionName,
                debuffDuration: action.duration
            };
            if (this.debuffList.find((x: IDebuff) => x.debuffName == debuff.debuffName)) {
                return this.debuffList.find((x: IDebuff) => x.debuffName == debuff.debuffName).debuffDuration = action.duration
            }
            this.debuffList.push(debuff)
            this.debuffCountdown(debuff)
        },
        debuffCountdown(debuff: IDebuff) {
            if (this.debuffList.find((x: IDebuff) => x.debuffName == debuff.debuffName).debuffDuration > 0) {
                setTimeout(() => {
                    this.debuffList.find((x: IDebuff) => x.debuffName == debuff.debuffName).debuffDuration -= 1
                    this.debuffCountdown(debuff)
                }, 1000)
            } else {
                this.debuffList.splice(this.debuffList.indexOf(debuff.debuffName), 1)
            }

        }
    }
})
