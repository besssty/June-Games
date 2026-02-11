// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив літніх дій/активностей з варіантами відповідей
const actions = [
	{ id: 1, action: 'Swim', emoji: '🏊', options: ['Swim', 'Run', 'Sleep'] }, // Плавати
	{ id: 2, action: 'Play', emoji: '⚽', options: ['Eat', 'Play', 'Walk'] }, // Грати
	{ id: 3, action: 'Rest', emoji: '🥱', options: ['Rest', 'Jump', 'Dance'] }, // Відпочивати
	{ id: 4, action: 'Boat', emoji: '🚤', options: ['Fly', 'Boat', 'Drive'] }, // Катання на човні
	{ id: 5, action: 'Fish', emoji: '🎣', options: ['Fish', 'Cook', 'Paint'] }, // Рибалити
]

function SummerActions() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної дії
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточну дію
	const currentAction = actions[currentIndex]

	// Функція обробки вибору відповіді
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === currentAction.action
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < actions.length - 1) {
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
				<h1 className='game-title'>Summer Actions 🏊</h1>
				<p className='game-instruction'>What are they doing?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {actions.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Great Job! Score: {score}/{actions.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Картка з емодзі дії */}
					<div
						style={{
							background: 'white',
							borderRadius: '24px',
							padding: '50px',
							marginBottom: '40px',
							border: '6px solid #0077BE',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
						}}
					>
						{/* Великий емодзі дії */}
						<div style={{ fontSize: '12rem', textAlign: 'center' }}>{currentAction.emoji}</div>
					</div>

					{/* Варіанти відповідей */}
					<div className='choice-container'>
						{currentAction.options.map((option, idx) => (
							<button
								key={idx}
								// Динамічні класи для візуального відображення результату
								className={`choice-card ${
									feedback && option === currentAction.action
										? 'correct' // Правильна відповідь
										: feedback && option !== currentAction.action
											? 'wrong' // Неправильна відповідь
											: '' // Ще не обрано
								}`}
								onClick={() => !feedback && handleChoice(option)} // Блокуємо після вибору
								style={{
									cursor: feedback ? 'default' : 'pointer',
									minWidth: '200px',
								}}
							>
								<div className='choice-label'>{option}</div>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default SummerActions
