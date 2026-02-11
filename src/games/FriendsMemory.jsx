// Імпортуємо необхідні хуки з React та функцію навігації
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив емодзі друзів для гри в пам'ять
const friends = [
	{ id: 1, emoji: '👨' }, // Чоловік
	{ id: 2, emoji: '👩' }, // Жінка
	{ id: 3, emoji: '👧' }, // Дівчинка
	{ id: 4, emoji: '👦' }, // Хлопчик
	{ id: 5, emoji: '👶' }, // Немовля
	{ id: 6, emoji: '🧑' }, // Людина
]

function FriendsMemory() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для зберігання всіх карток (подвоєних та перемішаних)
	const [cards, setCards] = useState([])
	
	// Стан для відстеження перевернутих карток (по uniqueId)
	const [flipped, setFlipped] = useState([])
	
	// Стан для відстеження знайдених пар (по id емодзі)
	const [matched, setMatched] = useState([])
	
	// Стан для підрахунку ходів
	const [moves, setMoves] = useState(0)
	
	// Стан для відстеження завершення гри
	const [complete, setComplete] = useState(false)

	// Ефект для ініціалізації гри при першому завантаженні
	useEffect(() => {
		// Створюємо пари карток (кожен друг двічі)
		const pairs = [...friends, ...friends].map((friend, index) => ({
			...friend,
			uniqueId: index, // Унікальний id для кожної картки (0-11)
		}))
		// Перемішуємо картки випадковим чином
		setCards(pairs.sort(() => Math.random() - 0.5))
	}, [])

	// Функція обробки кліку по картці
	const handleCardClick = card => {
		// Ігноруємо клік якщо:
		// - вже дві картки перевернуті
		// - ця картка вже перевернута
		// - пара для цього емодзі вже знайдена
		if (flipped.length === 2 || flipped.includes(card.uniqueId) || matched.includes(card.id)) {
			return
		}

		// Додаємо картку до перевернутих
		const newFlipped = [...flipped, card.uniqueId]
		setFlipped(newFlipped)

		// Якщо перевернуто дві картки - перевіряємо на співпадіння
		if (newFlipped.length === 2) {
			// Збільшуємо лічильник ходів
			setMoves(m => m + 1)

			// Отримуємо обидві перевернуті картки
			const [first, second] = newFlipped
			const firstCard = cards.find(c => c.uniqueId === first)
			const secondCard = cards.find(c => c.uniqueId === second)

			if (firstCard.id === secondCard.id) {
				// Пара знайдена!
				setMatched(prev => [...prev, firstCard.id])
				setFlipped([]) // Очищаємо перевернуті

				// Перевіряємо чи це була остання пара
				if (matched.length + 1 === friends.length) {
					setTimeout(() => setComplete(true), 400)
				}
			} else {
				// Пара не співпала - через 0.8 сек перевертаємо назад
				setTimeout(() => setFlipped([]), 800)
			}
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
				<h1 className='game-title'>Friends Memory 🎴</h1>
				<p className='game-instruction'>Find matching friends!</p>
				<p className='moves'>Moves: {moves}</p>
			</div>

			{/* Умовний рендеринг: завершення або гра */}
			{complete ? (
				// Екран завершення з кількістю ходів
				<div className='feedback correct'>
					🎉 All Matched! Moves: {moves} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				// Сітка з картками пам'яті
				<div className='memory-grid'>
					{cards.map(card => {
						// Визначаємо стан кожної картки
						const isFlipped = flipped.includes(card.uniqueId)
						const isMatched = matched.includes(card.id)

						return (
							<div
								key={card.uniqueId}
								// Динамічні класи для стану картки
								className={`memory-card ${isFlipped || isMatched ? 'open' : ''} ${
									isMatched ? 'matched' : ''
								}`}
								onClick={() => handleCardClick(card)}
								style={{
									// Різні кольори для відкритих/закритих карток
									background:
										isFlipped || isMatched
											? 'linear-gradient(135deg, #6BCF7F, #4CAF50)' // Зелений для відкритих
											: 'linear-gradient(135deg, #0077BE, #005A8C)', // Синій для закритих
								}}
							>
								{/* Показуємо емодзі або знак питання */}
								{isFlipped || isMatched ? card.emoji : '?'}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default FriendsMemory
