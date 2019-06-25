export class TreeMap {
    name: string;
    value: any;
    data: any;
    constructor(name: string, value: number, data?: any) {
        this.name = name;
        this.value = value;
        this.data = data;
    }
}

export const TreeMapData = [
    {
        name: 'sector',
        value: 8
    },
    {
        name: 'infrastructure',
        value: 100
    },
    {
        name: 'criticality',
        value: 6
    }
];
