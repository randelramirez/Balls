class Point {
    public x: number;
    public y: number;
    public z: number;
    public size: number;
    public colour: string;
    public curPos: Vector;
    public friction: number;
    public originalPos: Vector;
    public radius: number;
    public springStrength: number;
    public targetPos: Vector;
    public velocity: Vector;
    public static canvas: JQuery<HTMLCanvasElement> = $("#c") //refactor canvas should not be here

    constructor(x: number, y: number, z: number, size: number = 0, colour: string = ''){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.colour = colour;
        this.colour = colour;
        this.curPos = new Vector(x, y, z);
        this.friction = 0.8;
        this.originalPos = new Vector(x, y, z);
        this.radius = size;
        this.size = size;
        this.springStrength = 0.1;
        this.targetPos = new Vector(x, y, z);
        this.velocity = new Vector(0.0, 0.0, 0.0);
    }

    public draw(): void {
        Main.ctx.fillStyle = this.colour;
        Main.ctx.beginPath();
        Main.ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI * 2, true);
        Main.ctx.fill();
    }

    public update() :void{
        this.updateX();
        this.updateY();

        let dox = this.originalPos.x - this.curPos.x;
        let doy = this.originalPos.y - this.curPos.y;
        let dd = (dox * dox) + (doy * doy);
        let d = Math.sqrt(dd);

        this.targetPos.z = d / 100 + 1;
        let dz = this.targetPos.z - this.curPos.z;
        let az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;

        this.updateRadius();
    }

    private updateX() :void{
        let dx = this.targetPos.x - this.curPos.x;
        let ax = dx * this.springStrength;
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;
    }

    private updateY() :void{
        let dy = this.targetPos.y - this.curPos.y;
        let ay = dy * this.springStrength;
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;
    }

    private updateRadius() :void{
        this.radius = this.size * this.curPos.z;
        if (this.radius < 1)
            this.radius = 1;
    }
}
