// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useCountdownTimer(timeIncrement: number, watchedDuration: number) {

	if (watchedDuration > 0) {
		setTimeout(() => {
			watchedDuration -= 1
			useCountdownTimer(timeIncrement, watchedDuration)
		}, timeIncrement)
	} else {
		return false
	}
}