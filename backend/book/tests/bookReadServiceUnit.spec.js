const dbUtil = require('../utils/db');
const bookReadService = require('../services/BookReadService');

let userId = '';
const volumeId = '9CJWTbd-RYoC';
const volume2Id = 'nObtAAAAMAAJ';

const currentPage = 100;
const startDate = '2021-01-01';

beforeAll( async () => {
    try{
        dbUtil.connect();
    }catch(err){
        console.log(err);
    }
});

beforeEach(() => {
    userId = 'test-user-' + Math.round(Math.random() * 1000);
});

test('List all users have read a book', async () => {
    const books = await bookReadService
        .list(volumeId);

    expect(books.length).toBeGreaterThanOrEqual(0);
})

test('Add new read to a specific book', async () => {

    const result = await bookReadService
        .add(
            userId,
            volumeId,
            currentPage,
            startDate,
        );

    expect(result.userId).toBe(userId);
    expect(result.bookId).toBe(volumeId);
    expect(result.currentPage).toBe(currentPage);
    expect(Date.parse(result.startDate)).toBe(Date.parse(startDate));
});

test('Add new read to a specific book', async () => {

    const finishDate = '2021-03-01';

    const result = await bookReadService
        .add(
            userId,
            volume2Id,
            currentPage,
            startDate,
            finishDate,
        );

    expect(result.userId).toBe(userId);
    expect(result.bookId).toBe(volume2Id);
    expect(result.currentPage).toBe(currentPage);
});

test('Add new read to a specific book and try to retrieve it', async () => {

    const bookReadAdd = await bookReadService
        .add(
            userId,
            volume2Id,
            currentPage,
            startDate,
        );

    expect(bookReadAdd).toBeDefined();
    expect(bookReadAdd.userId).toBe(userId);
    expect(bookReadAdd.bookId).toBe(volume2Id);
    expect(bookReadAdd.currentPage).toBe(currentPage);

    const bookReadGet = await bookReadService
        .get(bookReadAdd.userId, bookReadAdd.bookId);

    expect(bookReadGet).toBeDefined();
    expect(bookReadGet.userId).toBe(bookReadAdd.userId);
    expect(bookReadGet.bookId).toBe(bookReadAdd.bookId);
});

test('Try to update an existing read', async () => {

    const newCurrentPage = 123;
    const newStartDate = '2021-04-01';
    const newFinishDate = '2021-06-01';

    const list = await bookReadService
        .list(volumeId);

    if(list.length <= 0){
        await bookReadService.add(userId, volumeId, currentPage, startDate);
    }

    const edit = await bookReadService.edit(list[0].userId, list[0].bookId, {
        currentPage: newCurrentPage,
        startDate: newStartDate,
        finishDate: newFinishDate,
    });

    expect(edit).toBeDefined();
    expect(edit.currentPage).toBe(newCurrentPage);
    expect(Date.parse(edit.startDate)).toBe(Date.parse(newStartDate));
    expect(Date.parse(edit.finishDate)).toBe(Date.parse(newFinishDate));
});

test('Delete a read entry', async () => {

    await bookReadService.add(userId, volumeId, currentPage, startDate);

    const remove = await bookReadService
        .remove(userId, volumeId);

    expect(remove.deletedCount).toBe(1);
});

test('Search all books read by a user', async () => {

    await bookReadService.add(userId, volumeId, currentPage, startDate);
    await bookReadService.add(userId, volume2Id, currentPage, startDate);

    const userReads = await bookReadService
        .search({
            userId
        });

    expect(userReads.length).toBe(2);
});


test('Try to add the same book to the same user twice and expect to fail', async () => {
    const add1 = await bookReadService.add(userId, volumeId, currentPage, startDate);
    let exception;
    let add2;
    try{
        add2 = await bookReadService.add(userId, volumeId, currentPage, startDate);
    }catch(ex){
        exception = ex;
    }

    expect(exception).toBeDefined();
});