// X = minutes or seconds
// Returns X if length of X is 2, else returns '0X'
export const formatX = (X: number) => {
    return X < 10 ? `0${X}` as string: `${X}` as string;
}
