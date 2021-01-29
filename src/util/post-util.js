import { useState } from "react";

export function toPostDate(p) {
    p.getDateCreated = () => new Date(p.createdAt || 1);
    return p;
}

export function toPostViews(p) {
    p.getViews = () => Number(p.views || 0);
    return p;
}

const today = new Date();

export const isSameYear = (p) => today.getFullYear() === p.getDateCreated().getFullYear();
export const isSameMonth = (p) => today.getMonth() === p.getDateCreated().getMonth();
export const isSameDay = (p) => today.getDate() === p.getDateCreated().getDate();
export const isToday = (p) => isSameYear(p) && isSameMonth(p) && isSameDay(p);

export const isWithinMonths = (p, months) =>
    today.getMonth() - p.getDateCreated().getMonth() <= months;

export const isWithinDays = (p, days) =>
    today.getDate() - p.getDateCreated().getDate() <= days;

export const isWithinHours = (p, hours) =>
    today.getHours() - p.getDateCreated().getHours() <= hours;

export function popularPosts(posts) {
    return posts.map(toPostViews)
        .sort((p1, p2) => p2.getViews() - p1.getViews());
}
export function recentPosts(posts) {
    return posts.map(toPostDate)
        .sort((p1, p2) => p2.getDateCreated() - p1.getDateCreated());
}
export function thisMonthsPosts(posts) {
    return posts.map(toPostDate)
        .filter(p => isSameYear(p)
            && isSameMonth(p));
}
export function thisWeeksPosts(posts) {
    return posts.map(toPostDate)
        .filter(p => isSameYear(p)
            && isSameMonth(p)
            && isWithinDays(p, 7));
}
export function todaysPosts(posts) {
    return posts.map(toPostDate).filter(p => isToday(p));
}
export function lastHoursPosts(posts) {
    return posts.map(toPostDate)
        .filter(p => isSameYear(p)
            && isSameMonth(p)
            && isSameDay(p)
            && isWithinHours(p, 2));
}

export const actions = Object.freeze({
    filters: [
        { name: "now", value: "Now", filter: (posts) => lastHoursPosts(posts) },
        { name: "today", value: "Today", filter: (posts) => todaysPosts(posts) },
        { name: "week", value: "This Week", filter: (posts) => thisWeeksPosts(posts) },
        { name: "month", value: "This Month", filter: (posts) => thisMonthsPosts(posts) },
        { name: "all", value: "All Time", filter: (posts) => [...posts] },
    ],

    sorts: [
        { name: "popular", value: 'Popular', sort: (posts) => popularPosts(posts) },
        { name: "recent", value: 'Recent', sort: (posts) => recentPosts(posts) },
    ],

    getFilterActions() {
        return this.filters;
    },

    getSortActions() {
        return this.sorts;
    }
});

const defaultFilter = actions.filters.today;
const defaultSort = actions.sorts.recent;

function useAction(type, inital) {
    const [action, setAction] = useState(inital);

    const getActions = () => {
        return actions[type];
    };

    const selectAction = (name) => {
        const selectedAction = getActions().filter(a => a.name === name);

        if (selectedAction.length === 0) {
            console.error('action not found', name);
            return selectedAction;
        }

        const action = selectedAction[0];
        setAction(action);
        return action;
    }

    return [
        action,
        selectAction,
        getActions,
    ];
}

export function useFilteringAction() {
    return useAction('filters', defaultFilter);
};

export function useSortingAction() {
    return useAction('sorts', defaultSort);
};

export const getFilteredPosts = (posts, filter) => {
    const filters = actions.getFilterActions();
    const action = filters && filters[filter];

    if (action) return action.filter(posts);
    else return posts;
};

export const getSortedPosts = (posts, sort) => {
    const sorts = actions.getSortActions();
    const action = sorts && sorts[sort];

    if (action) return action.sort(posts);
    else return posts;
};
