export const Carousel = (totalUsersCount: number, pageSize: number, currentPage: number): number[] => {
    const pagesCount: number = Math.ceil(totalUsersCount / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    // Pagination
    const curP= currentPage
    const curPF= ((curP - 5) < 0) ? 0 : curP - 5
    const curPL= ((curP + 5) > pagesCount) ? pagesCount : curP + 5
    return pages.slice(curPF, curPL)
}