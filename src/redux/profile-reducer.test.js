import profileReducer, {
    addPostActionCreator,
    deletePost
} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hey body, whats wrong???", likesCount: 20},
        {id: 2, message: "Explain me that, what are you want", likesCount: 15},
        {id: 3, message: "I am gaining a power!", likesCount: 50},
        {id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", likesCount: 33}
    ]
};

test('length of posts should be incremented', () => {
    // 1.initial test data
    let action = addPostActionCreator("czntrn");

    // 2.action
    let newState = profileReducer(state,action);

    // 3.expectation
    expect(newState.posts.length).toBe(5);
});

test('the message of new post should be added correctly', () => {
    // 1.initial test data
    let action = addPostActionCreator("czntrn");

    // 2.action
    let newState = profileReducer(state,action);

    // 3.expectation
    expect(newState.posts[4].message).toBe("czntrn");

});

test('a chosen post by id should be deleted and length of posts should be decremented', () => {
    // 1.initial test data
    let action = deletePost(1);

    // 2.action
    let newState = profileReducer(state,action);

    // 3.expectation
    expect(newState.posts.length).toBe(3);

});

test(`a chosen post by id shouldn't be deleted and length of posts 
    shouldn't be decremented if post id incorrect`, () => {
    // 1.initial test data
    let action = deletePost(1000);

    // 2.action
    let newState = profileReducer(state,action);

    // 3.expectation
    expect(newState.posts.length).toBe(4);

});