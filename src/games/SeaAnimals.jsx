// Імпортуємо необхідні хуки з React та функцію навігації
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив морських тварин зі звуками
const animals = [
	{ id: 1, name: 'Dolphin', emoji: '🐬', audio: '/src/public/sounds/dolphin.mp3' }, // Дельфін
	{ id: 2, name: 'Crab', emoji: '🦀', audio: '/src/public/sounds/crab.mp3' }, // Краб
	{ id: 3, name: 'Fish', emoji: '🐟', audio: '/src/public/sounds/fish.mp3' }, // Риба
	{ id: 4, name: 'Whale', emoji: '🐋', audio: '/src/public/sounds/whale.mp3' }, // Кит
]

// Функція для відтворення звуку
const playSound = src => {
	const audio = new Audio(src)
	audio.play()
}

function SeaAnimals() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для режиму гри: 'learn' (навчання) або 'test' (тестування)
	const [mode, setMode] = useState('learn')
	
	// Стан для відстеження поточного тестового питання
	const [currentTest, setCurrentTest] = useState(0)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів у тесті
	const [score, setScore] = useState(0)

	// Мемоізовані тестові питання (створюються один раз)
	const testQuestions = useMemo(() => {
		return animals.map(animal => ({
			correct: animal, // Правильна відповідь
			options: [...animals].sort(() => Math.random() - 0.5), // Перемішані варіанти
		}))
	}, [])

	// Функція для режиму навчання - відтворює звук тварини
	const handleLearnClick = animal => {
		playSound(animal.audio)
	}

	// Функція для режиму тестування - перевіряє відповідь
	const handleTestAnswer = selectedAnimal => {
		// Перевіряємо чи правильна відповідь
		const correct = selectedAnimal.id === testQuestions[currentTest].correct.id

		if (correct) {
			// Правильна відповідь - відтворюємо звук успіху
			playSound('/src/public/sounds/correct.mp3')
			setScore(prev => prev + 1)
			setFeedback('correct')
		} else {
			// Неправильна відповідь - відтворюємо звук помилки
			playSound('/src/public/sounds/wrong.mp3')
			setFeedback('wrong')
		}

		// Через 1.5 секунди переходимо до наступного питання
		setTimeout(() => {
			if (currentTest < testQuestions.length - 1) {
				setCurrentTest(prev => prev + 1)
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
				<h1 className='game-title'>Sea Animals 🐬</h1>
				<p className='game-instruction'>
					{mode === 'learn' ? 'Click to hear the animals!' : 'Guess the animal sound!'}
				</p>
			</div>

			{/* Умовний рендеринг залежно від режиму */}
			{mode === 'learn' ? (
				// РЕЖИМ НАВЧАННЯ
				<>
					{/* Сітка тварин для вивчення звуків */}
					<div className='choice-container'>
						{animals.map(animal => (
							<div key={animal.id} className='choice-card' onClick={() => handleLearnClick(animal)}>
								{/* Емодзі тварини */}
								<div className='choice-image' style={{ fontSize: '8rem' }}>
									{animal.emoji}
								</div>
								{/* Назва тварини */}
								<div className='choice-label'>{animal.name}</div>
							</div>
						))}
					</div>

					{/* Кнопка переходу до тесту */}
					<button
						className='next-button'
						onClick={() => setMode('test')}
						style={{ marginTop: '40px' }}
					>
						Start Quiz! 🎮
					</button>
				</>
			) : feedback === 'complete' ? (
				// ЕКРАН ЗАВЕРШЕННЯ ТЕСТУ
				<div className='feedback correct'>
					🎉 Quiz Complete! Score: {score}/{testQuestions.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				// РЕЖИМ ТЕСТУВАННЯ
				<>
					{/* Кнопка для відтворення звуку */}
					<div
						style={{
							background: 'white',
							borderRadius: '24px',
							padding: '40px',
							marginBottom: '40px',
							border: '6px solid #0077BE',
							textAlign: 'center',
							fontSize: '2rem',
							cursor: 'pointer',
						}}
						onClick={() => playSound(testQuestions[currentTest].correct.audio)}
					>
						🔊 Tap to hear the sound
					</div>

					{/* Варіанти відповідей */}
					<div className='choice-container'>
						{testQuestions[currentTest].options.map(animal => (
							<div
								key={animal.id}
								className='choice-card'
								onClick={() => !feedback && handleTestAnswer(animal)} // Блокуємо після відповіді
							>
								{/* Емодзі тварини */}
								<div className='choice-image' style={{ fontSize: '6rem' }}>
									{animal.emoji}
								</div>
								{/* Назва тварини */}
								<div className='choice-label'>{animal.name}</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default SeaAnimals
