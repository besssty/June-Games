import QuizGame from '../components/QuizGame'

const items = [
	{ id: 1, name: 'Cap', emoji: '🧢', isBeach: true },
	{ id: 2, name: 'Umbrella', emoji: '⛱️', isBeach: true },
	{ id: 3, name: 'Sunglasses', emoji: '🕶️', isBeach: true },
	{ id: 4, name: 'Ball', emoji: '⚽', isBeach: true },
	{ id: 5, name: 'Laptop', emoji: '💻', isBeach: false },
	{ id: 6, name: 'TV', emoji: '📺', isBeach: false },
	{ id: 7, name: 'Bucket', emoji: '🪣', isBeach: true },
	{ id: 8, name: 'Ladder', emoji: '🪜', isBeach: false },
]

function BeachOrNot() {
	return (
		<QuizGame
			title="Beach or Not? 🏖️"
			question="Does this go to the beach?"
			items={items}
			checkField="isBeach"
			trueLabel="✅ Beach!"
			falseLabel="❌ Not Beach"
			delay={1200}
		/>
	)
}

export default BeachOrNot

