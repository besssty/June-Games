import { Link } from 'react-router-dom'

const games = [
	{
		id: 1,
		name: 'Dress for Summer',
		path: '/dress-for-summer',
		icon: '👕',
		description: 'Choose summer clothes!',
	},
	{
		id: 2,
		name: 'Build a Sandcastle',
		path: '/build-sandcastle',
		icon: '🏰',
		description: 'Build with bucket & shovel!',
	},
	{
		id: 3,
		name: 'Beach or Not?',
		path: '/beach-or-not',
		icon: '🏖️',
		description: 'What goes to the beach?',
	},
	{
		id: 4,
		name: 'Find the Ball',
		path: '/find-the-ball',
		icon: '⚽',
		description: 'Where is the ball?',
	},
	{
		id: 5,
		name: 'Sea Animals',
		path: '/sea-animals',
		icon: '🐬',
		description: 'Learn sea animal sounds!',
	},
	{
		id: 6,
		name: 'Summer Actions',
		path: '/summer-actions',
		icon: '🏊',
		description: 'What are they doing?',
	},
	{
		id: 7,
		name: 'Count the Friends',
		path: '/count-friends',
		icon: '👨‍👩‍👧‍👦',
		description: 'How many friends?',
	},
	{
		id: 8,
		name: 'Choose Weather',
		path: '/choose-weather',
		icon: '🌤️',
		description: "What's the weather?",
	},
	{
		id: 9,
		name: 'Food Shadow',
		path: '/food-shadow',
		icon: '🍉',
		description: 'Match food to shadows!',
	},
	{
		id: 10,
		name: 'Is it OK in Summer?',
		path: '/is-it-ok-summer',
		icon: '☀️',
		description: 'Do we do this in summer?',
	},
	{
		id: 11,
		name: 'Sun Safety',
		path: '/sun-safety',
		icon: '🕶️',
		description: 'Protect from the sun!',
	},
	{
		id: 12,
		name: 'Live in the Sea?',
		path: '/live-in-sea',
		icon: '🐟',
		description: 'Does it live in the sea?',
	},
	{
		id: 13,
		name: 'Summer Picnic Sort',
		path: '/summer-picnic-sort',
		icon: '🧺',
		description: 'Pack for the picnic!',
	},
	{
		id: 14,
		name: 'Friends Memory',
		path: '/friends-memory',
		icon: '🎴',
		description: 'Find matching friends!',
	},
	{
		id: 15,
		name: 'Summer Sounds',
		path: '/summer-sounds',
		icon: '🔊',
		description: 'Guess the sound!',
	},
]

function Menu() {
	return (
		<div className='menu-container'>
			<div className='menu-header'>
				<h1 className='menu-title'>June Games</h1>
			</div>

			<div className='games-grid'>
				{games.map(game => (
					<Link key={game.id} to={game.path} className='game-card'>
						<div className='game-number'>{game.id}</div>
						<span className='game-icon'>{game.icon}</span>
						<h2 className='game-name'>{game.name}</h2>
						<p className='game-description'>{game.description}</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Menu
