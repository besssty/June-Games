// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив сцен з різними типами погоди
const weatherScenes = [
	{ id: 1, weather: 'Sunny', emoji: '☀️', options: ['Sunny', 'Cloudy', 'Rainy'] }, // Сонячно
	{ id: 2, weather: 'Cloudy', emoji: '☁️', options: ['Sunny', 'Cloudy', 'Windy'] }, // Хмарно
	{ id: 3, weather: 'Hot', emoji: '🌡️', options: ['Hot', 'Cold', 'Warm'] }, // Спекотно
	{ id: 4, weather: 'Windy', emoji: '💨', options: ['Rainy', 'Windy', 'Snowy'] }, // Вітряно
]

function ChooseWeather() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної сцени погоди
	const [currentScene, setCurrentScene] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточну сцену
	const scene = weatherScenes[currentScene]

	// Функція обробки вибору відповіді
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === scene.weather
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо до наступної сцени або завершуємо
		setTimeout(() => {
			if (currentScene < weatherScenes.length - 1) {
				setCurrentScene(currentScene + 1)
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
				<h1 className='game-title'>Choose Weather 🌤️</h1>
				<p className='game-instruction'>What's the weather?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {weatherScenes.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення з фінальним рахунком
				<div className='feedback correct'>
					🎉 Weather Expert! Score: {score}/{weatherScenes.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Візуалізація погоди з динамічними кольорами фону */}
					<div
						style={{
							// Різні градієнти для різних типів погоди
							background:
								scene.weather === 'Sunny'
									? 'linear-gradient(135deg, #FFD700, #FFA500)' // Золотистий для сонячно
									: scene.weather === 'Cloudy'
										? 'linear-gradient(135deg, #B0C4DE, #778899)' // Сірий для хмарно
										: scene.weather === 'Hot'
											? 'linear-gradient(135deg, #FF6B6B, #FF4444)' // Червоний для спеки
											: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)', // Блакитний для вітру
							borderRadius: '24px',
							padding: '80px',
							marginBottom: '40px',
							border: '6px solid #0077BE',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							textAlign: 'center',
						}}
					>
						{/* Емодзі погоди з анімацією плавання */}
						<div
							style={{
								fontSize: '15rem',
								animation: 'float 3s ease-in-out infinite',
							}}
						>
							{scene.emoji}
						</div>
					</div>

					{/* Контейнер з варіантами відповідей */}
					<div className='choice-container'>
						{scene.options.map(option => (
							<button
								key={option}
								// Динамічні класи для візуального відображення правильності/неправильності
								className={`choice-card ${
									feedback && option === scene.weather
										? 'correct' // Правильна відповідь
										: feedback && option !== scene.weather
											? 'wrong' // Неправильна відповідь
											: '' // Ще не обрано
								}`}
								onClick={() => !feedback && handleChoice(option)} // Блокуємо клік після відповіді
								style={{
									cursor: feedback ? 'default' : 'pointer',
									minWidth: '180px',
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

export default ChooseWeather
