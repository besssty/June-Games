// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив літніх звуків з варіантами відповідей
const sounds = [
	{ id: 1, name: 'Sea', audio: '/sounds/sea.mp3', options: ['Sea', 'Wind', 'Rain'] }, // Море
	{ id: 2, name: 'Boat', audio: '/sounds/boat.mp3', options: ['Car', 'Boat', 'Train'] }, // Човен
	{
		id: 3,
		name: 'Parrot',
		audio: '/sounds/parrot.mp3',
		options: ['Dog', 'Cat', 'Parrot'], // Папуга
	},
	{
		id: 4,
		name: 'Dolphin',
		audio: '/sounds/dolphin.mp3',
		options: ['Dolphin', 'Whale', 'Seal'], // Дельфін
	},
	{
		id: 5,
		name: 'Beach Ball',
		audio: '/sounds/ball.mp3',
		options: ['Beach Ball', 'Drum', 'Bell'], // Пляжний м'яч
	},
]

// Функція для відтворення звуку
const playSound = src => {
	const audio = new Audio(src)
	audio.play()
}

function SummerSounds() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()

	// Стан для відстеження поточного звуку
	const [currentIndex, setCurrentIndex] = useState(0)

	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)

	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточний звук
	const currentSound = sounds[currentIndex]

	// Функція для відтворення поточного звуку
	const handlePlaySound = () => {
		playSound(currentSound.audio)
	}

	// Функція обробки вибору відповіді
	const handleChoice = choice => {
		// Перевіряємо чи правильна відповідь
		const correct = choice === currentSound.name

		if (correct) {
			// Правильна відповідь - відтворюємо звук успіху
			playSound('/sounds/correct.mp3')
			setScore(prev => prev + 1)
			setFeedback('correct')
		} else {
			// Неправильна відповідь - відтворюємо звук помилки
			playSound('/sounds/wrong.mp3')
			setFeedback('wrong')
		}

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < sounds.length - 1) {
				setCurrentIndex(prev => prev + 1)
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
				<h1 className='game-title'>Summer Sounds 🔊</h1>
				<p className='game-instruction'>Listen and guess the sound!</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {sounds.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або питання */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Sound Master! Score: {score}/{sounds.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Кнопка відтворення звуку */}
					<div style={{ textAlign: 'center', marginBottom: '40px' }}>
						<button
							onClick={handlePlaySound}
							style={{
								borderRadius: '50%', // Кругла кнопка
								width: '180px',
								height: '180px',
								fontSize: '5rem',
								cursor: 'pointer',
							}}
						>
							▶️
						</button>
					</div>

					{/* Варіанти відповідей */}
					<div className='choice-container'>
						{currentSound.options.map(option => (
							<button
								key={option}
								className='choice-card'
								onClick={() => !feedback && handleChoice(option)} // Блокуємо після вибору
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

export default SummerSounds
