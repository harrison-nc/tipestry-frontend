import './css/App.css';
import './css/normalize.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import CardList from './components/CardList';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Search />
            <Filter />
            <CardList />
        </div>
    );
}

export default App;
