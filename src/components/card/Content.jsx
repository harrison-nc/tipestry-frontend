import  { Fragment } from 'react';

function Content(props) {
    return (
        <Fragment>
            <figure>
                <img alt="Resource" src={props.resourceUrl} />
                <figcaption>{props.description}</figcaption>
            </figure>
        </Fragment>
    );
}

export default Content;
