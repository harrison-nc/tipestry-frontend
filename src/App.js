import './css/App.css';
import './css/minireset.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import CardList from './components/CardList';

function App() {
    return (
        <div className="main">
            <Navbar />
            <div className="container mt-2">
                <div className="block box">Suggestions for you</div>
                <div className="block">
                    <Search />
                    <Filter />
                    <CardList />
                </div>
                <div className="block box">Popular Hashtags</div>
            </div>
        </div>
    );
}

export default App;
