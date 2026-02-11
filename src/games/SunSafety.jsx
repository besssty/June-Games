// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив предметів для перевірки захисту від сонця
const items = [
	{ id: 1, name: 'Sunglasses', emoji: '🕶️', protectsFromSun: true }, // Сонцезахисні окуляри - захищають
	{ id: 2, name: 'Hat', emoji: '🧢', protectsFromSun: true }, // Капелюх - захищає
	{ id: 3, name: 'Umbrella', emoji: '⛱️', protectsFromSun: true }, // Парасолька - захищає
	{ id: 4, name: 'Sunscreen', emoji: '🧴', protectsFromSun: true }, // Сонцезахисний крем - захищає
	{ id: 5, name: 'Ice Cream', emoji: '🍦', protectsFromSun: false }, // Морозиво - НЕ захищає
	{ id: 6, name: 'Ball', emoji: '⚽', protectsFromSun: false }, // М'яч - НЕ захищає
	{ id: 7, name: 'Book', emoji: '📚', protectsFromSun: false }, // Книга - НЕ захищає
	{ id: 8, name: 'Phone', emoji: '📱', protectsFromSun: false }, // Телефон - НЕ захищає
]

function SunSafety() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточного предмета
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточний предмет
	const currentItem = items[currentIndex]

	// Функція обробки вибору
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === currentItem.protectsFromSun
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < items.length - 1) {
				setCurrentIndex(currentIndex + 1)
				setFeedback(null)
			} else {
				setFeedback('complete')
			}
		}, 1500)
	}

	return (
		<div className='game-container'>
			{/* Кнопка повернення на головну */}
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			{/* Заголовок гри */}
			<div className='game-header'>
				<h1 className='game-title'>Sun Safety 🕶️</h1>
				<p className='game-instruction'>Does this protect from the sun?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {items.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Sun Safety Expert! Score: {score}/{items.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Картка з предметом на фоні сонця */}
					<div
						style={{
							background: 'linear-gradient(135deg, #FFD700, #FFA500)', // Сонячний градієнт
							borderRadius: '24px',
							padding: '60px',
							marginBottom: '40px',
							border: '6px solid #FF8C42',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							textAlign: 'center',
							position: 'relative',
						}}
					>
						{/* Декоративне сонце в кутку */}
						<div
							style={{
								position: 'absolute',
								top: '20px',
								right: '20px',
								fontSize: '4rem',
								animation: 'float 3s ease-in-out infinite', // Анімація плавання
							}}
						>
							☀️
						</div>
						{/* Емодзі предмета */}
						<div style={{ fontSize: '12rem', marginBottom: '20px' }}>{currentItem.emoji}</div>
						{/* Назва предмета */}
						<div
							style={{
								fontSize: '2.5rem',
								fontWeight: 'bold',
								color: 'white',
								textShadow: '2px 2px 4px rgba(0,0,0,0.3)', // Тінь для кращої читабельності
							}}
						>
							{currentItem.name}
						</div>
					</div>

					{/* Кнопки вибору: Захищає/Не захищає */}
					<div className='choice-container'>
						{/* Кнопка "Захищає" */}
						<button
							className={`choice-card ${
								feedback && currentItem.protectsFromSun
									? 'correct'
									: feedback && !currentItem.protectsFromSun
										? 'wrong'
										: ''
							}`}
							onClick={() => !feedback && handleChoice(true)}
							style={{
								cursor: feedback ? 'default' : 'pointer',
								background: 'linear-gradient(135deg, #6BCF7F, #4CAF50)',
								minWidth: '220px',
							}}
						>
							<div className='choice-label' style={{ color: 'white', fontSize: '2.3rem' }}>
								✅ Protects
							</div>
						</button>

						{/* Кнопка "Не захищає" */}
						<button
							className={`choice-card ${
								feedback && !currentItem.protectsFromSun
									? 'correct'
									: feedback && currentItem.protectsFromSun
										? 'wrong'
										: ''
							}`}
							onClick={() => !feedback && handleChoice(false)}
							style={{
								cursor: feedback ? 'default' : 'pointer',
								background: 'linear-gradient(135deg, #FF6B9D, #E74C3C)',
								minWidth: '220px',
							}}
						>
							<div className='choice-label' style={{ color: 'white', fontSize: '2.3rem' }}>
								❌ Doesn't Protect
							</div>
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default SunSafety
