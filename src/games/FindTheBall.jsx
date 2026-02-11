// Імпортуємо необхідні хуки з React та функцію навігації
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив пляжних предметів, серед яких потрібно знайти м'яч
const initialBeachItems = [
	{ id: 1, emoji: '🟦', name: 'Towel' }, // Рушник
	{ id: 2, emoji: '⛱️', name: 'Umbrella' }, // Парасолька
	{ id: 3, emoji: '🏄', name: 'Surfboard' }, // Дошка для серфінгу
	{ id: 4, emoji: '⚽', name: 'Ball', isBall: true }, // М'яч - шуканий предмет!
	{ id: 5, emoji: '🦀', name: 'Crab' }, // Краб
	{ id: 6, emoji: '🐚', name: 'Shell' }, // Мушля
	{ id: 7, emoji: '🪣', name: 'Bucket' }, // Відро
	{ id: 8, emoji: '🕶️', name: 'Sunglasses' }, // Окуляри
	{ id: 9, emoji: '🩴', name: 'Sandals' }, // Сандалі
	{ id: 10, emoji: '🍉', name: 'Watermelon' }, // Кавун
	{ id: 11, emoji: '🌊', name: 'Wave' }, // Хвиля
	{ id: 12, emoji: '🏝️', name: 'Island' }, // Острів
]

// Функція для перемішування масиву (алгоритм Фішера-Йейтса)
const shuffleArray = array => [...array].sort(() => Math.random() - 0.5)

function FindTheBall() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()

	// Стан для перемішаних предметів
	const [items, setItems] = useState([])

	// Стан для відстеження чи знайдено м'яч
	const [found, setFound] = useState(false)

	// Стан для відстеження натиснутих предметів
	const [clickedItems, setClickedItems] = useState([])

	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)

	// Функція для скидання гри до початкового стану
	const resetGame = () => {
		setItems(shuffleArray(initialBeachItems)) // Перемішуємо предмети
		setClickedItems([]) // Очищаємо список натиснутих
		setFeedback(null) // Скидаємо зворотний зв'язок
		setFound(false) // Скидаємо статус знайденого м'яча
	}

	// Ефект для ініціалізації гри при першому завантаженні
	useEffect(() => {
		resetGame()
	}, [])

	// Функція обробки кліку по предмету
	const handleClick = item => {
		// Ігноруємо клік якщо м'яч вже знайдено або предмет вже був натиснутий
		if (found || clickedItems.includes(item.id)) return

		// Додаємо предмет до списку натиснутих
		setClickedItems(prev => [...prev, item.id])

		if (item.isBall) {
			// Знайдено м'яч - перемога!
			setFound(true)
			setFeedback('correct')
		} else {
			// Не той предмет - показуємо помилку та перезапускаємо гру
			setFeedback('wrong')

			setTimeout(() => {
				resetGame() // Перемішуємо все знову
			}, 1000)
		}
	}

	return (
		<div className='game-container'>
			{/* Кнопка повернення на головну */}
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			{/* Заголовок гри */}
			<div className='game-header'>
				<h1 className='game-title'>Find the Ball ⚽</h1>
				<p className='game-instruction'>Where is the ball?</p>
			</div>

			{/* Умовний рендеринг: перемога або пошук */}
			{found ? (
				// Екран перемоги
				<div className='feedback correct'>
					🎉 You Found It! 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Сітка з пляжними предметами */}
					<div className='beach-grid'>
						{items.map(item => (
							<div
								key={item.id}
								// Динамічні класи для відображення результату кліку
								className={`beach-card ${
									clickedItems.includes(item.id) ? (item.isBall ? 'correct' : 'wrong') : ''
								}`}
								onClick={() => handleClick(item)}
							>
								{item.emoji}
							</div>
						))}
					</div>

					{/* Повідомлення про помилку */}
					{feedback === 'wrong' && <div className='feedback wrong'>Try Again! 🤔</div>}
				</>
			)}
		</div>
	)
}

export default FindTheBall
