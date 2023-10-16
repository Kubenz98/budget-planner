interface DataType {
  id: number;
  assigned: number;
  left: number;
  tag: string;
  color: string;
}

export const data: DataType[] = [
  {
    id: 1,
    assigned: 500,
    left: 100,
    tag: "Car",
    color: "cyan",
  },
  {
    id: 2,
    assigned: 500,
    left: 0,
    tag: "Home",
    color: "magenta",
  },
  {
    id: 3,
    assigned: 800,
    left: 200,
    tag: "Food",
    color: "green",
  },
];
