// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив предметів одягу та аксесуарів
const items = [
	{ id: 1, name: 'Sweater', isSummer: false, emoji: '🧥' }, // Светр - НЕ для літа
	{ id: 2, name: 'Cap', isSummer: true, emoji: '🧢' }, // Кепка - для літа
	{ id: 3, name: 'Winter Coat', isSummer: false, emoji: '🧥' }, // Зимове пальто - НЕ для літа
	{ id: 4, name: 'Sunglasses', isSummer: true, emoji: '🕶️' }, // Сонцезахисні окуляри - для літа
	{ id: 5, name: 'Snow Boots', isSummer: false, emoji: '🥾' }, // Зимові черевики - НЕ для літа
	{ id: 6, name: 'Swimsuit', isSummer: true, emoji: '🩱' }, // Купальник - для літа
	{ id: 7, name: 'Scarf', isSummer: false, emoji: '🧣' }, // Шарф - НЕ для літа
	{ id: 8, name: 'Sandals', isSummer: true, emoji: '🩴' }, // Сандалі - для літа
]

function DressForSummer() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточної пари предметів
	const [currentPair, setCurrentPair] = useState(0)
	
	// Стан для відстеження вибраного предмета (для візуального відображення)
	const [selectedItem, setSelectedItem] = useState(null)
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)

	// Створюємо пари предметів: один літній, один зимовий
	const pairs = [
		[items[0], items[1]], // Светр vs Кепка
		[items[2], items[3]], // Пальто vs Окуляри
		[items[4], items[5]], // Черевики vs Купальник
		[items[6], items[7]], // Шарф vs Сандалі
	]

	// Отримуємо поточну пару предметів
	const currentItems = pairs[currentPair]

	// Функція обробки вибору предмета
	const handleChoice = item => {
		// Зберігаємо id вибраного предмета
		setSelectedItem(item.id)

		// Перевіряємо чи це літній предмет
		if (item.isSummer) {
			// Правильний вибір
			setFeedback('correct')
			setTimeout(() => {
				if (currentPair < pairs.length - 1) {
					// Переходимо до наступної пари
					setCurrentPair(currentPair + 1)
					setSelectedItem(null)
					setFeedback(null)
				} else {
					// Всі пари пройдено
					setFeedback('complete')
				}
			}, 1500)
		} else {
			// Неправильний вибір
			setFeedback('wrong')
			setTimeout(() => {
				// Скидаємо вибір і дозволяємо спробувати знову
				setFeedback(null)
				setSelectedItem(null)
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
				<h1 className='game-title'>Dress for Summer 👕</h1>
				<p className='game-instruction'>Choose clothes for summer</p>
			</div>

			{/* Умовний рендеринг: завершення або вибір */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Great Job! 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					{/* Відображення поточної пари предметів */}
					<div className='choice-container'>
						{currentItems.map(item => (
							<div
								key={item.id}
								// Динамічні класи залежно від вибору та правильності
								className={`choice-card ${
									selectedItem === item.id ? (item.isSummer ? 'correct' : 'wrong') : ''
								}`}
								onClick={() => !selectedItem && handleChoice(item)} // Блокуємо після вибору
								style={{ cursor: selectedItem ? 'default' : 'pointer' }}
							>
								{/* Емодзі предмета */}
								<div className='choice-image' style={{ fontSize: '8rem' }}>
									{item.emoji}
								</div>
								{/* Назва предмета */}
								<div className='choice-label'>{item.name}</div>
							</div>
						))}
					</div>

					{/* Відображення зворотного зв'язку */}
					{feedback === 'correct' && <div className='feedback correct'>Correct! ✨</div>}
					{feedback === 'wrong' && <div className='feedback wrong'>Try Again! 🤔</div>}
				</>
			)}
		</div>
	)
}

export default DressForSummer
