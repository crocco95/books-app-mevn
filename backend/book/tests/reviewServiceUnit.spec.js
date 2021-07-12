const dbUtil = require('../utils/db');
const reviewService = require('../services/ReviewService');

const bookId = '9CJWTbd-RYoC';
const userId = 'test-user-' + Math.round(Math.random() * 1000);

beforeAll( async () => {
    try{
        await dbUtil.connect();
    }catch(err){
        console.log(err);
    }
});

afterAll( async () => {
    try{
        await dbUtil.disconnect();
    }catch(err){
        console.log(err);
    }
});

test('Add new review to Harry Potter book', async () => {

    const title = 'Lorem ipsum';
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
        'aliquip ex ea commodo consequat.';
    let vote = Math.round(Math.random() * 10 / 2);

    if(vote <= 0) vote = 3;

    const add = await reviewService.add(
        bookId,
        userId,
        title,
        description,
        vote,
    );

    expect(add).toBeDefined();
    expect(add.bookId).toBe(bookId);
    expect(add.userId).toBe(userId);
    expect(add.title).toBe(title);
    expect(add.description).toBe(description);
});

test('Add the same review of Harry Potter and expect to fail', async () => {

    const list = await reviewService.list(bookId);
    const review = list[Math.round((Math.random() * list.length) - 1)];
    let fail;
    let exception;

    try {
        fail = await reviewService.add(
            review.bookId,
            review.userId,
            review.title,
            review.description,
            3,
        );
    } catch (ex) {
        exception = ex;
    }

    expect(fail).toBeUndefined();
    expect(exception).toBeDefined();
    expect(exception instanceof TypeError).toBeTruthy();
});

test('List all reviews made by the user', async () => {
    const list = await reviewService.list(bookId);

    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThanOrEqual(1);
    expect(list[0].bookId).toBe(bookId);
});

test('Get a specific review', async () => {
    const list = await reviewService.list(bookId);
    const picked = list[0];

    const review = await reviewService.get(picked.bookId, picked._id);

    expect(review).toBeDefined();
    expect(review._id.toString()).toBe(picked._id.toString());
});

test('Edit a review', async () => {

    let review = '';
    const search = await reviewService.search({
        userId,
        bookId
    });

    switch(search.length){
        case 0:

            const title = 'Lorem ipsum';
            const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
                'aliquip ex ea commodo consequat.';
            const vote = Math.round(Math.random() * 10 / 2);

            review = await reviewService.add(bookId, userId, title, description, vote);
            break;
        case 1:
        default:
            review = search[0];
            break;
    }

    const newTitle = 'Ipsum lorem';
    const newDescription = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat' +
        'nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit' +
        'anim id est laborum.';

    const edit = await reviewService.edit(bookId, review._id, userId, newTitle, newDescription, review.vote);

    expect(edit).toBeDefined();
    expect(review._id.toString()).toBe(edit._id.toString());
    expect(edit.title).toBe(newTitle);
    expect(edit.description).toBe(newDescription);
    expect(edit.vote).toBe(review.vote);
});

test('Get the average vote', async () => {
    const reviews = await reviewService.list(bookId);
    const avg = await reviewService.avg(bookId);

    let calculateAvg = 0;

    reviews.forEach(review => {
        calculateAvg += review.vote;
    });

    calculateAvg /= reviews.length;

    expect(avg[0].avg).toBe(calculateAvg);
});