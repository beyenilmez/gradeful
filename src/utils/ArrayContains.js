class ArrayContains {
    static arrayContains(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }
}

export default ArrayContains;