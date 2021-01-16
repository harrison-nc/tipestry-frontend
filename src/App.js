import './css/App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Search />
            <Filter />
        </div>
    );
}

export default App;
