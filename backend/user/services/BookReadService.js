const add = (userId, bookId, currentPage, startDate, finishDate) => {
  const params = {
    userId,
    bookId,
    currentPage,
    startDate,
    finishDate
  };

  bookRead.create(params);
}

module.exports = {
  add,
}