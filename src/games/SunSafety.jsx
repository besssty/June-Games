import QuizGame from '../components/QuizGame'

const items = [
	{ id: 1, name: 'Sunglasses', emoji: '🕶️', protectsFromSun: true },
	{ id: 2, name: 'Hat', emoji: '🧢', protectsFromSun: true },
	{ id: 3, name: 'Umbrella', emoji: '⛱️', protectsFromSun: true },
	{ id: 4, name: 'Sunscreen', emoji: '🧴', protectsFromSun: true },
	{ id: 5, name: 'Ice Cream', emoji: '🍦', protectsFromSun: false },
	{ id: 6, name: 'Ball', emoji: '⚽', protectsFromSun: false },
	{ id: 7, name: 'Book', emoji: '📚', protectsFromSun: false },
	{ id: 8, name: 'Phone', emoji: '📱', protectsFromSun: false },
]

function SunSafety() {
	return (
		<QuizGame
			title="Sun Safety 🕶️"
			question="Does this protect from the sun?"
			items={items}
			checkField="protectsFromSun"
			trueLabel="✅ Protects"
			falseLabel="❌ Doesn't Protect"
			delay={1500}
		/>
	)
}

export default SunSafety

