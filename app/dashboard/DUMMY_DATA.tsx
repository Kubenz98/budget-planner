interface DataType {
  key: string;
  assigned: number;
  left: number;
  tag: string;
  color: string;
}

export const data: DataType[] = [
  {
    key: "1",
    assigned: 500,
    left: 100,
    tag: "Car",
    color: "cyan",
  },
  {
    key: "2",
    assigned: 600,
    left: 0,
    tag: "Home",
    color: "magenta",
  },
  {
    key: "3",
    assigned: 800,
    left: 200,
    tag: "Food",
    color: "green",
  },
];
