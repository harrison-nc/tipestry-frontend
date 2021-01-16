function Avatar() {
    return (
        <div className="avatar">
            <img alt="avatar" src="https://via.placeholder.com/50" />
            <p>
                <span>name@123</span>
                <span className="date">a day ago</span>
            </p>
        </div>
    );
}

function Header() {
    return (
        <div className="block">
            <Avatar />

            <div className="title">title</div>

            <div className="block tags">
                <span>#tag1</span>
                <span>#tag2</span>
                <span>#tag2</span>
            </div>
        </div>
    );
}

function Content() {
    return (
        <div>
            <figure>
                <img alt="Resouce" src="https://via.placeholder.com/600x400" />
                <figcaption>A web resource image or video</figcaption>
            </figure>
        </div>
    );
}

function Footer() {
    return (
        <div className="social">
            <div className="control">
                <label>
                    <button>Like</button> 12
                </label>
                <label>
                    <button>Dislike</button> 5
                </label>
                <label>
                    <button>Comment</button> 12
                </label>
                <label>
                    <button>Share</button> 12
                </label>
            </div>
            <div>
                View: 11.1K
            </div>
        </div>
    );
}

function Card() {
    return (
        <div className="card">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Card;
