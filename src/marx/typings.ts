export interface Mark {
  id: number;
  name: string;
  description: string;
  owner: string;
  x: number;
  z: number;
  branch: {
    color: 'red' | 'blue' | 'green' | 'yellow';
    direction: 'left' | 'right';
    offset: number;
  };
  world: 'overworld' | 'farmworld';
}
