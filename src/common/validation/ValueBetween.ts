const ValueBetween = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
};

export default ValueBetween;
