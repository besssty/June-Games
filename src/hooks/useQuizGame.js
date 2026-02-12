import { useState, useRef, useEffect } from 'react'

export function useQuizGame(items, checkField, delay = 1200) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [feedback, setFeedback] = useState(null)
	const [score, setScore] = useState(0)

	const timeoutRef = useRef(null)

	const currentItem = items[currentIndex]

	const handleChoice = value => {
		if (feedback) return

		const correct = value === currentItem[checkField]
		setFeedback(correct ? 'correct' : 'wrong')

		if (correct) {
			setScore(prev => prev + 1)
		}

		timeoutRef.current = setTimeout(() => {
			if (currentIndex < items.length - 1) {
				setCurrentIndex(prev => prev + 1)
				setFeedback(null)
			} else {
				setFeedback('complete')
			}
		}, delay)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	return {
		currentItem,
		currentIndex,
		score,
		feedback,
		handleChoice,
		total: items.length,
	}
}
