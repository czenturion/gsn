export const Carousel = (totalUsersCount, pageSize, currentPage) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // Pagination
    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = ((curP + 5) > pagesCount) ? pagesCount : curP + 5;
    return pages.slice(curPF, curPL);
}