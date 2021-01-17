import './css/App.css';
import './css/minireset.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import CardList from './components/CardList';

function App() {
    return (
        <div className="main is-flex flex-column">
            <Navbar />
            <div className="container is-flex">
                <div className="block">
                    <div className="panel has-background-white py-3 px-3">
                        Suggestions for you
                    </div>
                </div>
                <div className="is-flex flex-column">
                    <Search />
                    <Filter />
                    <CardList />
                </div>
                <div className="container">
                    <div className="panel has-background-white py-3 px-3">
                        Popular Hashtags
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
