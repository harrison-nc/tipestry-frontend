import { Fragment } from 'react';

const Content = ({ resourceUrl, description }) => {
    return (
        <Fragment>
            <figure>
                <img alt="Resource" src={resourceUrl} />
                <figcaption>{description}</figcaption>
            </figure>
        </Fragment>
    );
}

export default Content;
