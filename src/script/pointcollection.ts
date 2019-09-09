
class PointCollection {
    public mousePos: Vector = new Vector(0, 0);
    public points: Point[] = new Array<Point>();

    public newPoint(x: number, y: number, z: number): Point {
        let point: Point = new Point(x, y, z);
        this.points.push(point);
        return point;
    }

    public update(): void {
        console.log('point-collection update');
        let pointsLength = this.points.length;

        for (let i = 0; i < pointsLength; i++) {
            let point = this.points[i];

            if (point == null)
                continue;

            let dx = this.mousePos.x - point.curPos.x;
            let dy = this.mousePos.y - point.curPos.y;
            let dd = (dx * dx) + (dy * dy);
            let d = Math.sqrt(dd);

            if (d < 150) {
                point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
                point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
            } else {
                point.targetPos.x = point.originalPos.x;
                point.targetPos.y = point.originalPos.y;
            }

            point.update();
        }
    }

    public draw(): void {
        let pointsLength: number = this.points.length;
        for (let i: number = 0; i < pointsLength; i++) {
            var point = this.points[i];

            if (point == null)
                continue;

            point.draw();
        }
    }
}