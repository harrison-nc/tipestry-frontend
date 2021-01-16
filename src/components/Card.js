function CardList() {
    return (
        <div className="card">
            <div className="avatar">
                <img alt="avatar" src="https://via.placeholder.com/50" />
                <p>
                    <span>name@123</span>
                    <span className="date">a day ago</span>
                </p>
            </div>

            <div className="block">
                <div className="title">title</div>

                <div className="block tags">
                    <span>#tag1</span>
                    <span>#tag2</span>
                    <span>#tag2</span>
                </div>
            </div>

            <div>
                <figure>
                    <img alt="150" width="600" height="400" src="https://via.placeholder.com/600x400" />
                    <figcaption>A web resource image or video</figcaption>
                </figure>
            </div>

            <div className="social">
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
                View: 11.1k
            </div>
        </div>
    );
}

export default CardList;
