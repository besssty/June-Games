// Імпортуємо необхідні хуки з React та функцію навігації
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив продуктів харчування для гри
const foodItems = [
	{ id: 1, name: 'Watermelon', emoji: '🍉' }, // Кавун
	{ id: 2, name: 'Ice Cream', emoji: '🍦' }, // Морозиво
	{ id: 3, name: 'Pizza', emoji: '🍕' }, // Піца
	{ id: 4, name: 'Apple', emoji: '🍎' }, // Яблуко
]

function FoodShadow() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточного індексу продукту
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для відстеження вибраного продукту
	const [selectedFood, setSelectedFood] = useState(null)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)
	
	// Стан для підрахунку балів
	const [score, setScore] = useState(0)

	// Отримуємо поточний продукт
	const currentFood = foodItems[currentIndex]
	
	// Стан для перемішаних варіантів відповідей
	const [options, setOptions] = useState([])

	// Ефект для перемішування варіантів при зміні продукту
	useEffect(() => {
		// Створюємо копію масиву та випадково перемішуємо
		setOptions([...foodItems].sort(() => Math.random() - 0.5))
	}, [currentIndex])

	// Функція обробки вибору продукту
	const handleDrop = food => {
		// Зберігаємо вибраний продукт
		setSelectedFood(food.id)
		
		// Перевіряємо чи правильний вибір
		const correct = food.id === currentFood.id
		setFeedback(correct ? 'correct' : 'wrong')
		
		// Якщо правильно - додаємо бал
		if (correct) setScore(score + 1)

		// Через 1.5 секунди переходимо далі
		setTimeout(() => {
			if (currentIndex < foodItems.length - 1) {
				// Переходимо до наступного продукту
				setCurrentIndex(currentIndex + 1)
				setSelectedFood(null)
				setFeedback(null)
			} else {
				// Всі продукти пройдено
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
				<h1 className='game-title'>Food Shadow 🍉</h1>
				<p className='game-instruction'>Match the food to its shadow!</p>
				<p style={{ fontSize: '1.8rem', color: '#FF6B9D', fontWeight: 'bold' }}>
					Score: {score} / {foodItems.length}
				</p>
			</div>

			{/* Умовний рендеринг: результат або гра */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Perfect Match! Score: {score}/{foodItems.length} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						gap: '60px',
						alignItems: 'center',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{/* Панель з тінню продукту */}
					<div
						style={{
							background: 'white',
							borderRadius: '24px',
							padding: '40px',
							border: '6px dashed #0077BE',
							minWidth: '250px',
							textAlign: 'center',
						}}
					>
						<h3 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0077BE' }}>Shadow</h3>
						{/* Емодзі продукту, перетворене на тінь */}
						<div
							style={{
								fontSize: '10rem',
								filter: 'brightness(0)', // Робимо чорним
								opacity: 0.3, // Робимо напівпрозорим
							}}
						>
							{currentFood.emoji}
						</div>
					</div>

					{/* Сітка з варіантами продуктів */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '20px',
						}}
					>
						{options.map(food => (
							<div
								key={food.id}
								// Динамічні класи для відображення вибору
								className={`choice-card ${
									selectedFood === food.id ? (food.id === currentFood.id ? 'correct' : 'wrong') : ''
								}`}
								onClick={() => !selectedFood && handleDrop(food)} // Блокуємо після вибору
								style={{
									cursor: selectedFood ? 'default' : 'pointer',
									minWidth: '150px',
								}}
							>
								{/* Емодзі продукту */}
								<div style={{ fontSize: '6rem' }}>{food.emoji}</div>
								{/* Назва продукту */}
								<div style={{ fontSize: '1.3rem', marginTop: '10px', fontWeight: 'bold' }}>
									{food.name}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default FoodShadow
