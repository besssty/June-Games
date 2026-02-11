// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив кроків для побудови замку з піску
const steps = [
	{ id: 1, name: 'Bucket', emoji: '🪣', instruction: 'Choose a bucket!' }, // Відро
	{ id: 2, name: 'Sand', emoji: '🏖️', instruction: 'Gather some sand!' }, // Пісок
	{ id: 3, name: 'Water', emoji: '💧', instruction: 'Add water!' }, // Вода
	{ id: 4, name: 'Walls', emoji: '🧱', instruction: 'Build a walls and towers!' }, // Стіна
	{ id: 5, name: 'Shell', emoji: '🐚', instruction: 'Decorate with shells!' }, // Мушля
	{ id: 6, name: 'Flag', emoji: '🚩', instruction: 'Add a flag!' }, // Прапорець
]

function BuildSandcastle() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()

	// Стан для відстеження поточного кроку побудови
	const [currentStep, setCurrentStep] = useState(0)

	// Стан для збереження завершених кроків
	const [completed, setCompleted] = useState([])

	// Стан для відображення готового замку
	const [showCastle, setShowCastle] = useState(false)

	// Функція обробки вибору кроку
	const handleSelect = step => {
		// Додаємо вибраний крок до списку завершених
		setCompleted([...completed, step.name])

		// Через 0.8 секунди переходимо до наступного кроку або показуємо замок
		setTimeout(() => {
			if (currentStep < steps.length - 1) {
				// Переходимо до наступного кроку
				setCurrentStep(currentStep + 1)
			} else {
				// Всі кроки завершені - показуємо замок
				setShowCastle(true)
			}
		}, 800)
	}

	return (
		<div className='game-container'>
			{/* Кнопка повернення на головну */}
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			{/* Заголовок гри з інструкціями */}
			<div className='game-header'>
				<h1 className='game-title'>Build a Sandcastle 🏰</h1>
				<p className='game-instruction'>
					{showCastle ? 'Your castle is ready!' : steps[currentStep].instruction}
				</p>
			</div>

			{/* Умовний рендеринг: готовий замок або процес побудови */}
			{showCastle ? (
				// Відображення готового замку
				<div style={{ textAlign: 'center' }}>
					{/* Анімований емодзі замку */}
					<div style={{ fontSize: '15rem', marginBottom: '30px', animation: 'celebrate 1s ease' }}>
						🏰
					</div>
					{/* Вітальне повідомлення */}
					<div className='feedback correct'>Amazing Castle! 🎉</div>
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				// Відображення процесу побудови
				<div
					style={{
						display: 'flex',
						gap: '40px',
						alignItems: 'center',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{/* Панель прогресу побудови */}
					<div
						style={{
							background: 'white',
							borderRadius: '24px',
							padding: '40px',
							minWidth: '300px',
							border: '6px solid #0077BE',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
						}}
					>
						<h3 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0077BE' }}>
							Building Progress:
						</h3>
						{/* Список всіх кроків з індикацією виконання */}
						{steps.map((step, idx) => (
							<div
								key={step.id}
								style={{
									fontSize: '1.8rem',
									margin: '15px 0',
									opacity: idx <= currentStep ? 1 : 0.3, // Затемнюємо майбутні кроки
									transition: 'all 0.3s ease',
								}}
							>
								{/* Показуємо галочку для завершених кроків */}
								{completed.includes(step.name) ? '✅' : '⬜'} {step.name}
							</div>
						))}
					</div>

					{/* Картка поточного кроку для вибору */}
					<div
						className='choice-card'
						onClick={() => handleSelect(steps[currentStep])}
						style={{
							minWidth: '300px',
							animation: 'bounce 2s ease-in-out infinite', // Анімація підстрибування
						}}
					>
						{/* Емодзі поточного кроку */}
						<div className='choice-image' style={{ fontSize: '10rem' }}>
							{steps[currentStep].emoji}
						</div>
						{/* Назва поточного кроку */}
						<div className='choice-label'>{steps[currentStep].name}</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BuildSandcastle
