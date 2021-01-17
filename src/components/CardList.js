import Card from './Card';

import React, { Component } from 'react';

class CardList extends Component {
    state = {
        user: {
            name: 'user@123',
            avatarUrl: "https://via.placeholder.com/50"
        },
        post: {
            title: "title",
            description: "A web resource image or video",
            resourceUrl: "https://via.placeholder.com/600x400",
            date: "1 week age",
            tags: ["#tag1", "#tag2", "#tag3"],
            likes: 11,
            disLikes: 3,
            comments: {
                count: 1,
            },
            shares: {
                count: 9,
            },
            views: {
                count: '11.1K'
            }
        }
    }

    render() {
        return (
            <div className="box">
                <Card
                    user={this.state.user}
                    post={this.state.post} />
            </div>
        );
    }
}

export default CardList;
