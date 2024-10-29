export function mapToNumeric(input: Array<string>) {
    const ret: Array<number> = [];

    input.forEach((item) => {
        const parsed = isNaN(Number(item)) ? null : Number(item);
        if (parsed != null) {
            ret.push(parsed);
        }
    });

    return ret;
}
