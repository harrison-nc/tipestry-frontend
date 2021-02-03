import React, { useState, useEffect } from 'react';
import Action from '../components/home/Action';
import Content from '../components/home/Content';
import Suggestions from '../components/home/Suggestions';
import { Hashtags } from '../components/home/Hashtags';
import { Search } from '../components/home/Search';
import { useFilteringAction, useSortingAction } from '../util/post-util';

export default function Home(props) {
    const { posts, toptags, onCardAction } = props;
    const [selectedPosts, setSelectedPosts] = useState(posts);
    const [filter, selectFilter] = useFilteringAction();
    const [sort, selectSort] = useSortingAction();

    useEffect(() => {
        const filteredPosts = filter ? filter.filter(posts) : posts;
        const sortedPosts = sort ? sort.sort(filteredPosts) : posts;
        setSelectedPosts(sortedPosts);

    }, [posts, filter, sort])

    const handleSortingAndFiltering = (e) => {
        const { name, value } = e.target;
        if (name === 'filter') selectFilter(value);
        else if (name === 'sort') selectSort(value);
        else console.log('invalid action', name, value);
    };

    return (
        <div className="home is-flex">
            <Suggestions />
            <section className="home__content is-flex flex-column flex-grow">
                <Search />
                <Action
                    filter={filter && filter.name}
                    sort={sort && sort.name}
                    onChange={handleSortingAndFiltering} />
                <Content posts={selectedPosts} onCardAction={onCardAction} />
            </section>
            <Hashtags toptags={toptags} />
        </div>
    );
}
