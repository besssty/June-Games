import { useNavigate } from 'react-router-dom'
import { useQuizGame } from '../hooks/useQuizGame'

function QuizGame({
	title,
	question,
	items,
	checkField,
	trueLabel,
	falseLabel,
	delay = 1200,
}) {
	const navigate = useNavigate()

	const {
		currentItem,
		score,
		feedback,
		handleChoice,
		total,
	} = useQuizGame(items, checkField, delay)

	return (
		<div className='game-container'>
			<button className='home-button' onClick={() => navigate('/')}>
				🏠 Home
			</button>

			<div className='game-header'>
				<h1 className='game-title'>{title}</h1>
				<p className='game-instruction'>{question}</p>
				<p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
					Score: {score} / {total}
				</p>
			</div>

			{feedback === 'complete' ? (
				<div className='feedback correct'>
					🎉 All Done! Score: {score}/{total} 🎉
					<button className='next-button' onClick={() => navigate('/')}>
						Back to Menu
					</button>
				</div>
			) : (
				<>
					<div style={{ textAlign: 'center', marginBottom: '40px' }}>
						<div className='choice-card' style={{ display: 'inline-block', minWidth: '300px' }}>
							<div style={{ fontSize: '10rem' }}>{currentItem.emoji}</div>
							<div>{currentItem.name}</div>
						</div>
					</div>

					{!feedback && (
						<div className='choice-container'>
							<button
								className='choice-card'
								onClick={() => handleChoice(true)}
							>
								{trueLabel}
							</button>

							<button
								className='choice-card'
								onClick={() => handleChoice(false)}
							>
								{falseLabel}
							</button>
						</div>
					)}

					{feedback === 'correct' && (
						<div className='feedback correct'>✅ Correct!</div>
					)}

					{feedback === 'wrong' && (
						<div className='feedback wrong'>❌ Wrong!</div>
					)}
				</>
			)}
		</div>
	)
}

export default QuizGame
