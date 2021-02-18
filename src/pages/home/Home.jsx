import React, { useState, useEffect, useContext } from 'react';
import Action from './Action';
import Content from './Content';
import Suggestions from './Suggestions';
import { Sidebar } from './Sidebar';
import { Search } from './Search';
import { useFilteringAction, useSortingAction } from '../../util/post-util';
import { PostData } from '../../hooks/usePosts';

export default function Home({ toptags }) {
    const posts = useContext(PostData);
    const [filteredPosts, setFilterPosts] = useState(posts);
    const [listView, setListView] = useState(true);
    const [filter, selectFilter] = useFilteringAction();
    const [sort, selectSort] = useSortingAction();

    useEffect(() => {
        const filteredPosts = filter ? filter.filter(posts) : posts;
        const sortedPosts = sort ? sort.sort(filteredPosts) : posts;
        setFilterPosts(sortedPosts);

    }, [posts, filter, sort])

    const handleSortingAndFiltering = (e) => {
        const { name, value } = e.target;
        if (name === 'filter') selectFilter(value);
        else if (name === 'sort') selectSort(value);
        else console.log('invalid action', name, value);
    };

    const handleViewChange = (e) => {
        if (e.target.name === 'list') setListView(true);
        else setListView(false);
    };

    return (
        <div className="home is-flex">
            <Suggestions className="home__left" />
            <section className="home__content is-flex flex-column flex-grow">
                <Search />
                <Action
                    filter={filter && filter.name}
                    sort={sort && sort.name}
                    onViewChange={handleViewChange}
                    onChange={handleSortingAndFiltering} />
                <Content posts={filteredPosts} listView={listView} />
            </section>
            <Sidebar toptags={toptags} />
        </div>
    );
}