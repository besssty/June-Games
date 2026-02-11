// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив літніх та зимових активностей
const activities = [
	{ id: 1, name: 'Swimming', emoji: '🏊', okInSummer: true }, // Плавання - можна влітку
	{ id: 2, name: 'Building Snowman', emoji: '⛄', okInSummer: false }, // Ліпити сніговика - НЕ влітку
	{ id: 3, name: 'Playing Beach Ball', emoji: '🏐', okInSummer: true }, // Пляжний волейбол - можна влітку
	{ id: 4, name: 'Ice Skating', emoji: '⛸️', okInSummer: false }, // Катання на ковзанах - НЕ влітку
	{ id: 5, name: 'Picnic', emoji: '🧺', okInSummer: true }, // Пікнік - можна влітку
	{ id: 6, name: 'Skiing', emoji: '⛷️', okInSummer: false }, // Катання на лижах - НЕ влітку
	{ id: 7, name: 'Surfing', emoji: '🏄', okInSummer: true }, // Серфінг - можна влітку
	{ id: 8, name: 'Sledding', emoji: '🛷', okInSummer: false }, // Катання на санчатах - НЕ влітку
]

function IsItOkSummer() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної активності
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточну активність
	const currentActivity = activities[currentIndex]

	// Функція обробки вибору (так/ні)
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === currentActivity.okInSummer
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < activities.length - 1) {
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
				<h1 className='game-title'>Is it OK in Summer? ☀️</h1>
				<p className='game-instruction'>Can we do this in summer?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {activities.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Summer Expert! Score: {score}/{activities.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Картка з поточною активністю */}
					<div
						style={{
							background: 'white',
							borderRadius: '24px',
							padding: '60px',
							marginBottom: '40px',
							border: '6px solid #0077BE',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							textAlign: 'center',
						}}
					>
						{/* Емодзі активності */}
						<div style={{ fontSize: '12rem', marginBottom: '20px' }}>{currentActivity.emoji}</div>
						{/* Назва активності */}
						<div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0077BE' }}>
							{currentActivity.name}
						</div>
					</div>

					{/* Кнопки вибору: Так/Ні */}
					<div className='choice-container'>
						{/* Кнопка "Так" */}
						<button
							className={`choice-card ${
								feedback && currentActivity.okInSummer
									? 'correct' // Підсвічуємо зеленим якщо правильно
									: feedback && !currentActivity.okInSummer
										? 'wrong' // Підсвічуємо червоним якщо неправильно
										: ''
							}`}
							onClick={() => !feedback && handleChoice(true)} // Блокуємо після вибору
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
								feedback && !currentActivity.okInSummer
									? 'correct' // Підсвічуємо зеленим якщо правильно
									: feedback && currentActivity.okInSummer
										? 'wrong' // Підсвічуємо червоним якщо неправильно
										: ''
							}`}
							onClick={() => !feedback && handleChoice(false)} // Блокуємо після вибору
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

export default IsItOkSummer
