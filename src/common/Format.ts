import Unit from './Unit';

export const formatPercent = (value: number) => {
    return `${Math.round(value)}%`;
};

export const formatUnit = (value: number, unit: string, withUnit: boolean = true) => {
    let formatted = '';
    switch (unit) {
        case Unit.G:
            const kilo = (value / 1000).toFixed(2);
            formatted = withUnit ? `${kilo}${Unit.KG}` : `${kilo}`;
            break;
        case Unit.items:
            formatted = withUnit ? `${value} Stück` : `${value}`;
            break;
        default:
            formatted = withUnit ? `${value}${unit}` : `${value}`;
    }

    return formatted;
};
