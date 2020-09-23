/* Written by Ye Liu */

const checkEmptyObject = (obj) => {
    for (var _ in obj) {
        return false;
    }
    return true;
}

export { checkEmptyObject };
