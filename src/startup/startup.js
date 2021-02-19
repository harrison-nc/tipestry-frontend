export const getPostFunction = `${process.env.REACT_APP_POST_API}`;
export const upVoteFunction = `${process.env.REACT_APP_UP_VOTE_API}`;
export const downVoteFunction = `${process.env.REACT_APP_DOWN_VOTE_API}`;
export const addCommentFunction = `${process.env.REACT_APP_ADD_COMMENT_API}`;
export const addPostFunction = `${process.env.REACT_APP_ADD_POST_API}`;
export const loginUserFunction = `${process.env.REACT_APP_LOGIN_USER_API}`;
export const uploadFunction = `${process.env.REACT_APP_UPLOAD_API}`;
export const registerUserFunction = `${process.env.REACT_APP_REGISTER_USER_API}`;
export const userPostFunction = `${process.env.REACT_APP_USER_POST_API}`;

console.debug('get  post    api', getPostFunction);
console.debug('up   vote    api', upVoteFunction);
console.debug('down vote    api', downVoteFunction);
console.debug('add  comment api', addCommentFunction);
console.debug('add  post    api', addPostFunction);
console.debug('upload       api', uploadFunction);
console.debug('register     api', registerUserFunction);
console.debug('login        api', loginUserFunction);
console.debug('user post        api', userPostFunction);

if (!getPostFunction) {
    throw new Error('Post API URL not provided');
}
if (!upVoteFunction) {
    throw new Error('Up Vote API URL not provided');
}
if (!downVoteFunction) {
    throw new Error('Down Vote API URL not provided');
}
if (!addCommentFunction) {
    throw new Error('Add Comment API URL not provided');
}
if (!addPostFunction) {
    throw new Error('Add Post API URL not provided');
}
if (!uploadFunction) {
    throw new Error('Upload API URL not provided');
}
if (!registerUserFunction) {
    throw new Error('Register User API URL not provided');
}
if (!loginUserFunction) {
    throw new Error('Login User API URL not provided');
}
if (!userPostFunction) {
    throw new Error('Login User API URL not provided');
}
