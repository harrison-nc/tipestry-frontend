import Card from './Card';

import React, { Component } from 'react';

function Cards(props) {
    return (
        <div className="box">
            <Card
                user={this.state.user}
                post={this.state.post} />
        </div>
    );
}

export default Cards;
