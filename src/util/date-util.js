function format(today, date, type) {
    if (today === date)
        return false;
    else if (today > date) {
        const number = today - date;
        return `${number} ${type}s ago`;
    }
    else
        return type === 'hour' ? `an ${type} ago` : `a ${type} ago`;
}

export function formatDate(date) {
    try {
        const today = new Date();
        const dateCreated = new Date(date);

        const dateFormat = format(today.getFullYear(), dateCreated.getFullYear(), 'year')
            || format(today.getMonth(), dateCreated.getMonth(), 'month')
            || format(today.getDate(), dateCreated.getDate(), 'day')
            || format(today.getHours(), dateCreated.getHours(), 'hour')
            || format(today.getMinutes(), dateCreated.getMinutes(), 'minute')
            || format(today.getSeconds(), dateCreated.getSeconds(), 'second');

        return dateFormat;
    }
    catch (ex) {
        console.error(ex);
    }

    return '';
}

export function formatDateString(date) {
    try {
        const value = new Date(date);
        return value.toUTCString();
    }
    catch (ex) {
        console.error(ex);
    }

    return date;
}
