// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив сцен з різною кількістю людей
const scenes = [
	{ id: 1, count: 3, people: ['👨', '👩', '👧'] }, // 3 людини: чоловік, жінка, дівчинка
	{ id: 2, count: 5, people: ['👨', '👩', '👧', '👦', '👶'] }, // 5 людей: додано хлопчик та немовля
	{ id: 3, count: 4, people: ['👨', '👩', '👧', '👦'] }, // 4 людини: сім'я
	{ id: 4, count: 2, people: ['👨', '👩'] }, // 2 людини: пара
]

function CountTheFriends() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної сцени
	const [currentScene, setCurrentScene] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточну сцену
	const scene = scenes[currentScene]
	
	// Створюємо варіанти відповідей: правильна кількість ± 1 (фільтруємо від'ємні числа)
	const options = [scene.count - 1, scene.count, scene.count + 1].filter(n => n > 0)

	// Функція обробки вибору числа
	const handleChoice = number => {
		// Перевіряємо чи правильна відповідь
		const correct = number === scene.count
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentScene < scenes.length - 1) {
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
				<h1 className='game-title'>Count the Friends 👨‍👩‍👧‍👦</h1>
				<p className='game-instruction'>How many people do you see?</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {scenes.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 All Counted! Score: {score}/{scenes.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Відображення людей для підрахунку */}
					<div
						style={{
							background: 'linear-gradient(135deg, #FFD700, #FFA500)',
							borderRadius: '24px',
							padding: '60px',
							marginBottom: '40px',
							border: '6px solid #0077BE',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							display: 'flex',
							gap: '30px',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						{/* Виводимо кожну людину з анімацією */}
						{scene.people.map((person, idx) => (
							<div
								key={idx}
								style={{
									fontSize: '6rem',
									// Різна швидкість анімації для кожної людини
									animation: `float ${2 + idx * 0.3}s ease-in-out infinite`,
								}}
							>
								{person}
							</div>
						))}
					</div>

					{/* Варіанти відповідей - числа */}
					<div className='choice-container'>
						{options.map(number => (
							<button
								key={number}
								// Динамічні класи для відображення результату
								className={`choice-card ${
									feedback && number === scene.count
										? 'correct'
										: feedback && number !== scene.count
											? 'wrong'
											: ''
								}`}
								onClick={() => !feedback && handleChoice(number)}
								style={{
									cursor: feedback ? 'default' : 'pointer',
									minWidth: '150px',
								}}
							>
								{/* Відображаємо число великим шрифтом */}
								<div className='choice-label' style={{ fontSize: '3rem' }}>
									{number}
								</div>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default CountTheFriends
