// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив тварин - морські та наземні
const creatures = [
	{ id: 1, name: 'Dolphin', emoji: '🐬', livesInSea: true }, // Дельфін - живе в морі
	{ id: 2, name: 'Fish', emoji: '🐟', livesInSea: true }, // Риба - живе в морі
	{ id: 3, name: 'Crab', emoji: '🦀', livesInSea: true }, // Краб - живе в морі
	{ id: 4, name: 'Whale', emoji: '🐋', livesInSea: true }, // Кит - живе в морі
	{ id: 5, name: 'Dog', emoji: '🐕', livesInSea: false }, // Собака - НЕ живе в морі
	{ id: 6, name: 'Cat', emoji: '🐈', livesInSea: false }, // Кіт - НЕ живе в морі
	{ id: 7, name: 'Bird', emoji: '🦜', livesInSea: false }, // Птах - НЕ живе в морі
	{ id: 8, name: 'Rabbit', emoji: '🐰', livesInSea: false }, // Кролик - НЕ живе в морі
]

function LiveInSea() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної тварини
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточну тварину
	const currentCreature = creatures[currentIndex]

	// Функція обробки вибору
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === currentCreature.livesInSea
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < creatures.length - 1) {
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
				<h1 className='game-title'>Live in the Sea? 🐟</h1>
				<p className='game-instruction'>Does this animal live in the sea?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {creatures.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Ocean Expert! Score: {score}/{creatures.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Картка з морською тематикою */}
					<div
						style={{
							background: 'linear-gradient(135deg, #0077BE, #005A8C)', // Синій градієнт
							borderRadius: '24px',
							padding: '60px',
							marginBottom: '40px',
							border: '6px solid #87CEEB', // Блакитна рамка
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							textAlign: 'center',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Декоративні хвилі внизу */}
						<div
							style={{
								position: 'absolute',
								bottom: '10px',
								left: '0',
								right: '0',
								fontSize: '3rem',
								opacity: 0.5,
							}}
						>
							🌊🌊🌊🌊🌊🌊
						</div>
						{/* Емодзі тварини */}
						<div
							style={{ fontSize: '12rem', marginBottom: '20px', position: 'relative', zIndex: 1 }}
						>
							{currentCreature.emoji}
						</div>
						{/* Назва тварини */}
						<div
							style={{
								fontSize: '2.5rem',
								fontWeight: 'bold',
								color: 'white',
								textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Тінь для читабельності
								position: 'relative',
								zIndex: 1,
							}}
						>
							{currentCreature.name}
						</div>
					</div>

					{/* Кнопки вибору: Так/Ні */}
					<div className='choice-container'>
						{/* Кнопка "Так" */}
						<button
							className={`choice-card ${
								feedback && currentCreature.livesInSea
									? 'correct'
									: feedback && !currentCreature.livesInSea
										? 'wrong'
										: ''
							}`}
							onClick={() => !feedback && handleChoice(true)}
							style={{
								cursor: feedback ? 'default' : 'pointer',
								background: 'linear-gradient(135deg, #6BCF7F, #4CAF50)',
								minWidth: '200px',
							}}
						>
							<div className='choice-label' style={{ color: 'white', fontSize: '2.5rem' }}>
								✅ Yes!
							</div>
						</button>

						{/* Кнопка "Ні" */}
						<button
							className={`choice-card ${
								feedback && !currentCreature.livesInSea
									? 'correct'
									: feedback && currentCreature.livesInSea
										? 'wrong'
										: ''
							}`}
							onClick={() => !feedback && handleChoice(false)}
							style={{
								cursor: feedback ? 'default' : 'pointer',
								background: 'linear-gradient(135deg, #FF6B9D, #E74C3C)',
								minWidth: '200px',
							}}
						>
							<div className='choice-label' style={{ color: 'white', fontSize: '2.5rem' }}>
								❌ No!
							</div>
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default LiveInSea
