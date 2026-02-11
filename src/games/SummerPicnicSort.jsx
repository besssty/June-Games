// Імпортуємо необхідні хуки з React та функцію навігації
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Масив предметів для сортування
const items = [
	{ id: 1, name: 'Sandwich', emoji: '🥪', forPicnic: true }, // Сендвіч - для пікніка
	{ id: 2, name: 'Apple', emoji: '🍎', forPicnic: true }, // Яблуко - для пікніка
	{ id: 3, name: 'Water', emoji: '💧', forPicnic: true }, // Вода - для пікніка
	{ id: 4, name: 'Blanket', emoji: '🧺', forPicnic: true }, // Плед/кошик - для пікніка
	{ id: 5, name: 'TV', emoji: '📺', forPicnic: false }, // Телевізор - НЕ для пікніка
	{ id: 6, name: 'Laptop', emoji: '💻', forPicnic: false }, // Ноутбук - НЕ для пікніка
	{ id: 7, name: 'Cookies', emoji: '🍪', forPicnic: true }, // Печиво - для пікніка
	{ id: 8, name: 'Refrigerator', emoji: '🧊', forPicnic: false }, // Холодильник - НЕ для пікніка
]

function SummerPicnicSort() {
	// Хук для навігації між сторінками
	const navigate = useNavigate()
	
	// Стан для відстеження поточного предмета
	const [currentIndex, setCurrentIndex] = useState(0)
	
	// Стан для зберігання предметів, які взяли на пікнік
	const [picnicItems, setPicnicItems] = useState([])
	
	// Стан для зберігання предметів, які залишили вдома
	const [notPicnicItems, setNotPicnicItems] = useState([])
	
	// Стан для відображення зворотного зв'язку
	const [feedback, setFeedback] = useState(null)

	// Отримуємо поточний предмет
	const currentItem = items[currentIndex]

	// Функція обробки сортування предмета
	const handleSort = isPicnic => {
		// Перевіряємо чи правильний вибір
		const correct = isPicnic === currentItem.forPicnic
		setFeedback(correct ? 'correct' : 'wrong')

		if (correct) {
			// Правильна відповідь - додаємо до відповідного списку
			if (isPicnic) {
				setPicnicItems([...picnicItems, currentItem])
			} else {
				setNotPicnicItems([...notPicnicItems, currentItem])
			}
		}

		// Через 1.2 секунди реагуємо на результат
		setTimeout(() => {
			if (correct) {
				// Якщо правильно - переходимо до наступного предмета
				if (currentIndex < items.length - 1) {
					setCurrentIndex(currentIndex + 1)
					setFeedback(null)
				} else {
					// Всі предмети відсортовані
					setFeedback('complete')
				}
			} else {
				// Якщо неправильно - просто скидаємо зворотний зв'язок (спробувати знову)
				setFeedback(null)
			}
		}, 1200)
	}

	return (
		<div className='game-container'>
			{/* Кнопка повернення на головну */}
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			{/* Заголовок гри */}
			<div className='game-header'>
				<h1 className='game-title'>Summer Picnic Sort 🧺</h1>
				<p className='game-instruction'>What do we take to the picnic?</p>
			</div>

			{/* Умовний рендеринг: завершення або сортування */}
			{feedback === 'complete' ? (
				// Екран завершення
				<div className='feedback correct'>
					🎉 Picnic Ready! 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						gap: '40px',
						alignItems: 'flex-start',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{/* Панель з поточним предметом та кнопками вибору */}
					<div style={{ textAlign: 'center' }}>
						{/* Картка поточного предмета */}
						<div
							className={`choice-card ${feedback === 'correct' ? 'correct' : feedback === 'wrong' ? 'wrong' : ''}`}
							style={{
								minWidth: '250px',
								cursor: 'default',
								marginBottom: '20px',
							}}
						>
							{/* Емодзі предмета */}
							<div style={{ fontSize: '8rem' }}>{currentItem.emoji}</div>
							{/* Назва предмета */}
							<div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{currentItem.name}</div>
						</div>

						{/* Кнопки сортування */}
						<div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
							{/* Кнопка "Взяти на пікнік" */}
							<button
								className='choice-card'
								onClick={() => !feedback && handleSort(true)}
								style={{
									cursor: feedback ? 'default' : 'pointer',
									background: 'linear-gradient(135deg, #6BCF7F, #4CAF50)',
									minWidth: '150px',
								}}
							>
								<div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
									🧺 Picnic
								</div>
							</button>

							{/* Кнопка "Залишити вдома" */}
							<button
								className='choice-card'
								onClick={() => !feedback && handleSort(false)}
								style={{
									cursor: feedback ? 'default' : 'pointer',
									background: 'linear-gradient(135deg, #FF6B9D, #E74C3C)',
									minWidth: '150px',
								}}
							>
								<div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
									❌ Leave
								</div>
							</button>
						</div>
					</div>

					{/* Колекції відсортованих предметів */}
					<div className='collections'>
						{/* Кошик для пікніка */}
						<div
							style={{
								background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
								border: '4px solid #4CAF50',
								borderRadius: '16px',
								padding: '20px',
								minWidth: '200px',
								minHeight: '300px',
							}}
						>
							<h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#2E7D32' }}>
								🧺 Picnic Basket
							</h3>
							{/* Список предметів для пікніка */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								{picnicItems.map(item => (
									<div key={item.id} style={{ fontSize: '2rem' }}>
										{item.emoji} {item.name}
									</div>
								))}
							</div>
						</div>

						{/* Список предметів, які залишаємо */}
						<div
							style={{
								background: 'linear-gradient(135deg, #FFEBEE, #FFCDD2)',
								border: '4px solid #E74C3C',
								borderRadius: '16px',
								padding: '20px',
								minWidth: '200px',
								minHeight: '300px',
							}}
						>
							<h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#C62828' }}>
								❌ Leave Behind
							</h3>
							{/* Список предметів, що залишаємо вдома */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								{notPicnicItems.map(item => (
									<div key={item.id} style={{ fontSize: '2rem' }}>
										{item.emoji} {item.name}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SummerPicnicSort
