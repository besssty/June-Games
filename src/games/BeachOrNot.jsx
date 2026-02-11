// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив предметів для гри - кожен має унікальний id, назву, прапорець чи йде на пляж, та емодзі
const items = [
	{ id: 1, name: 'Towel', isBeach: true, emoji: '🏖️' }, // Рушник - пляжний предмет
	{ id: 2, name: 'Umbrella', isBeach: true, emoji: '⛱️' }, // Парасолька - пляжний предмет
	{ id: 3, name: 'Sunglasses', isBeach: true, emoji: '🕶️' }, // Сонцезахисні окуляри - пляжний предмет
	{ id: 4, name: 'Ball', isBeach: true, emoji: '⚽' }, // М'яч - пляжний предмет
	{ id: 5, name: 'Laptop', isBeach: false, emoji: '💻' }, // Ноутбук - НЕ пляжний предмет
	{ id: 6, name: 'TV', isBeach: false, emoji: '📺' }, // Телевізор - НЕ пляжний предмет
	{ id: 7, name: 'Bucket', isBeach: true, emoji: '🪣' }, // Відро - пляжний предмет
	{ id: 8, name: 'Refrigerator', isBeach: false, emoji: '🧊' }, // Холодильник - НЕ пляжний предмет
]

function BeachOrNot() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточного індексу предмета
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відображення зворотного зв'язку (правильно/неправильно/завершено)
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточний предмет за індексом
	const currentItem = items[currentIndex]

	// Функція обробки вибору користувача
	const handleChoice = isBeach => {
		// Перевіряємо чи правильна відповідь
		const correct = isBeach === currentItem.isBeach

		// Встановлюємо відповідний зворотний зв'язок
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - збільшуємо рахунок
		if (correct) setScore(score + 1)

		// Через 1.2 секунди переходимо до наступного предмета або завершуємо гру
		setTimeout(() => {
			if (currentIndex < items.length - 1) {
				// Ще є предмети - переходимо до наступного
				setCurrentIndex(currentIndex + 1)
				setFeedback(null)
			} else {
				// Всі предмети пройдено - гра завершена
				setFeedback('complete')
			}
		}, 1200)
	}

	return (
		<div className='game-container'>
			{/* Кнопка повернення на головну сторінку */}
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			{/* Заголовок гри з інструкціями та рахунком */}
			<div className='game-header'>
				<h1 className='game-title'>Beach or Not? 🏖️</h1>
				<p className='game-instruction'>Does this go to the beach?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {items.length}
				</p>
			</div>

			{/* Умовний рендеринг: показуємо або результат, або поточне питання */}
			{feedback === 'complete' ? (
				// Екран завершення гри з фінальним рахунком
				<div className='feedback correct'>
					🎉 All Done! Score: {score}/{items.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Відображення поточного предмета */}
					<div style={{ textAlign: 'center', marginBottom: '40px' }}>
						<div
							className={`choice-card ${feedback ? (feedback === 'correct' ? 'correct' : 'wrong') : ''}`}
							style={{ display: 'inline-block', minWidth: '350px', cursor: 'default' }}
						>
							{/* Емодзі предмета */}
							<div className='choice-image' style={{ fontSize: '10rem' }}>
								{currentItem.emoji}
							</div>
							{/* Назва предмета */}
							<div className='choice-label'>{currentItem.name}</div>
						</div>
					</div>

					{/* Кнопки вибору (показуються тільки якщо немає активного зворотного зв'язку) */}
					{!feedback && (
						<div className='choice-container'>
							{/* Кнопка "Пляжний предмет" */}
							<button
								className='choice-card'
								onClick={() => handleChoice(true)}
								style={{ background: 'linear-gradient(135deg, #6BCF7F, #4CAF50)' }}
							>
								<div className='choice-label' style={{ color: 'white' }}>
									✅ Beach!
								</div>
							</button>
							{/* Кнопка "Не пляжний предмет" */}
							<button
								className='choice-card'
								onClick={() => handleChoice(false)}
								style={{ background: 'linear-gradient(135deg, #FF6B9D, #E74C3C)' }}
							>
								<div className='choice-label' style={{ color: 'white' }}>
									❌ Not Beach
								</div>
							</button>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default BeachOrNot
