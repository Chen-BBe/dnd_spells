import SpellList from './pages/SpellList';
import SpellGlance from './pages/SpellGlance';
import FavouritesList from './pages/FavouritesList';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpellList />} />
        <Route path="spells" element={<SpellList />}>
          <Route path=":id" element={<SpellGlance />} />
        </Route>
        <Route path="likes" element={<FavouritesList />}>
          <Route path=":id" element={<SpellGlance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;