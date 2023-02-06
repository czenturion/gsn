export function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1)
}

function getCombination(arr, n) {
    const sortedArr = arr.filter(x => x <= n).sort((a, b) => a - b);
    const results = [];
    const part = [];
    let sum = 0;

    if (!sortedArr.length || sortedArr[0] > n) {
        return results;
    }
    sortedArr.push(n + 1);

    const mapFn = i => sortedArr[i];

    for(let i = 0; i < sortedArr.length; i++) {
        sum += sortedArr[i];
        if (sum > n) {
            const last = part.pop();
            sum = sum - sortedArr[i] - sortedArr[last];
            i = last;
        } else {
            part.push(i);

            if (sum === n) {
                results.push(part.map(mapFn));
            }
        }
    }

    return results;
}