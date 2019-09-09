class Vector {
    public x: number;
    public y: number;
    public z: number;
    
    constructor(x: number, y: number, z: number = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addX (x: number) {
        this.x += x;
    }

    addY (y: number) {
        this.y += y;
    }

    addZ (z: number)  {
        this.z += z;
    }

    set (x: number, y: number, z:number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}