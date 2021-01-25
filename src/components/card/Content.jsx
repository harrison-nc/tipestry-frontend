import { Fragment } from 'react';

const Content = (props) => {
    const { resourceUrl, description } = props.post;

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
