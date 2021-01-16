import './css/App.css';
import './css/normalize.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import Card from './components/Card';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Search />
            <Filter />
            <Card />
        </div>
    );
}

export default App;
