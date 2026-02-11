import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import DressForSummer from './games/DressForSummer';
import BuildSandcastle from './games/BuildSandcastle';
import BeachOrNot from './games/BeachOrNot';
import FindTheBall from './games/FindTheBall';
import SeaAnimals from './games/SeaAnimals';
import SummerActions from './games/SummerActions';
import CountTheFriends from './games/CountTheFriends';
import ChooseWeather from './games/ChooseWeather';
import FoodShadow from './games/FoodShadow';
import IsItOkSummer from './games/IsItOkSummer';
import SunSafety from './games/SunSafety';
import LiveInSea from './games/LiveInSea';
import SummerPicnicSort from './games/SummerPicnicSort';
import FriendsMemory from './games/FriendsMemory';
import SummerSounds from './games/SummerSounds';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dress-for-summer" element={<DressForSummer />} />
        <Route path="/build-sandcastle" element={<BuildSandcastle />} />
        <Route path="/beach-or-not" element={<BeachOrNot />} />
        <Route path="/find-the-ball" element={<FindTheBall />} />
        <Route path="/sea-animals" element={<SeaAnimals />} />
        <Route path="/summer-actions" element={<SummerActions />} />
        <Route path="/count-friends" element={<CountTheFriends />} />
        <Route path="/choose-weather" element={<ChooseWeather />} />
        <Route path="/food-shadow" element={<FoodShadow />} />
        <Route path="/is-it-ok-summer" element={<IsItOkSummer />} />
        <Route path="/sun-safety" element={<SunSafety />} />
        <Route path="/live-in-sea" element={<LiveInSea />} />
        <Route path="/summer-picnic-sort" element={<SummerPicnicSort />} />
        <Route path="/friends-memory" element={<FriendsMemory />} />
        <Route path="/summer-sounds" element={<SummerSounds />} />
      </Routes>
    </Router>
  );
}

export default App;
