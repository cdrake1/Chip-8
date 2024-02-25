import { hardware } from "./hardware";

export class cpu extends hardware {
    programCounter: number = 0x200; //program counter

    constructor(id: number, name: string) {
      super(id, name);
    }

    public fetch(){}
    public decode(){}
    public excute(){}
  }