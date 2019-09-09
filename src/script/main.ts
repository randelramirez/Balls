class Main {

   public static canvas: JQuery<HTMLCanvasElement> = $("#c");
   public canvasHeight: number;
   public canvasWidth: number;
   public static ctx: CanvasRenderingContext2D;
   public dt = 0.1;
   public static pointCollection: PointCollection;

   constructor() {}

   public init(): void {
      this.updateCanvasDimensions();

      let g: Point[] = [new Point(-45, 120, 0.0, 8, "#3059e3"), new Point(-45, 100, 0.0, 8, "#3059e3"), new Point(-45, 80, 0.0, 8, "#3059e3"), new Point(-45, 60, 0.0, 8, "#3059e3"), new Point(-45, 40, 0.0, 8, "#3059e3"), new Point(-45, 20, 0.0, 8, "#3059e3"), new Point(-45, 0, 0.0, 8, "#3059e3"), new Point(-25, 10, 0.0, 6, "#3059e3"), new Point(-10, 5, 0.0, 7, "#3059e3"), new Point(15, 15, 0.0, 8, "#3059e3"), new Point(0, 50, 0.0, 7, "#3059e3"), new Point(10, 35, 0.0, 7, "#3059e3"), new Point(-15, 60, 0.0, 7, "#3059e3"), new Point(-25, 75, 0.0, 6, "#3059e3"), new Point(-15, 90, 0.0, 7, "#3059e3"), new Point(-5, 105, 0.0, 7, "#3059e3"), new Point(10, 115, 0.0, 8, "#3059e3"), new Point(90, 120, 0.0, 7, "#cd4359"), new Point(80, 110, 0.0, 7, "#c41731"), new Point(70, 120, 0.0, 6, "#c41731"), new Point(60, 125, 0.0, 5, "#c41731"), new Point(50, 125, 0.0, 4, "#c41731"), new Point(45, 115, 0.0, 4, "#c41731"), new Point(50, 125, 0.0, 4, "#c41731"), new Point(45, 105, 0.0, 5, "#c41731"), new Point(48, 95, 0.0, 5, "#c41731"), new Point(53, 85, 0.0, 6, "#c41731"), new Point(67, 80, 0.0, 7, "#c41731"), new Point(75, 95, 0.0, 7, "#c41731"), new Point(120, 120, 0.0, 7, "#ed9d33"), new Point(120, 105, 0.0, 7, "#ed9d33"), new Point(120, 90, 0.0, 7, "#ed9d33"), new Point(120, 75, 0.0, 7, "#ed9d33"), new Point(132, 85, 0.0, 5, "#ed9d33"), new Point(145, 77, 0.0, 6, "#ed9d33"), new Point(155, 88, 0.0, 7, "#ed9d33"), new Point(157, 105, 0.0, 7, "#ed9d33"), new Point(157, 122, 0.0, 7, "#ed9d33"), new Point(225, 25, 0.0, 8, "#3059e3"), new Point(225, 45, 0.0, 8, "#3059e3"), new Point(225, 65, 0.0, 8, "#3059e3"), new Point(225, 85, 0.0, 8, "#3059e3"), new Point(225, 105, 0.0, 8, "#3059e3"), new Point(225, 125, 0.0, 7, "#3059e3"), new Point(210, 125, 0.0, 8, "#3059e3"), new Point(195, 115, 0.0, 7, "#3059e3"), new Point(185, 100, 0.0, 7, "#3059e3"), new Point(195, 85, 0.0, 7, "#3059e3"), new Point(205, 70, 0.0, 7, "#3059e3"), new Point(205, 70, 0.0, 7, "#3059e3"), new Point(255, 100, 0.0, 5, "#11ab35"), new Point(270, 108, 0.0, 5, "#11ab35"), new Point(285, 100, 0.0, 5, "#11ab35"), new Point(293, 90, 0.0, 5, "#11ab35"), new Point(280, 80, 0.0, 6, "#11ab35"), new Point(265, 88, 0.0, 5, "#11ab35"), new Point(257, 115, 0.0, 5, "#11ab35"), new Point(270, 125, 0.0, 7, "#11ab35"), new Point(285, 120, 0.0, 6, "#11ab35"), new Point(300, 118, 0.0, 5, "#11ab35"), new Point(325, 125, 0.0, 7, "#cd4359"), new Point(325, 110, 0.0, 7, "#cd4359"), new Point(325, 95, 0.0, 7, "#cd4359"), new Point(325, 80, 0.0, 7, "#cd4359"), new Point(325, 65, 0.0, 7, "#cd4359"), new Point(325, 50, 0.0, 7, "#cd4359"), new Point(325, 35, 0.0, 7, "#cd4359"), new Point(325, 20, 0.0, 7, "#cd4359"), new Point(325, 5, 0.0, 7, "#cd4359")];
      let gLength = g.length;
      for (var i = 0; i < gLength; i++) {
         g[i].curPos.x = (this.canvasWidth / 2 - 180) + g[i].curPos.x;
         g[i].curPos.y = (this.canvasHeight / 2 - 65) + g[i].curPos.y;

         g[i].originalPos.x = (this.canvasWidth / 2 - 180) + g[i].originalPos.x;
         g[i].originalPos.y = (this.canvasHeight / 2 - 65) + g[i].originalPos.y;
      };

      Main.pointCollection = new PointCollection();
      Main.pointCollection.points = g;

      this.initEventListeners();
      this.timeout();
   }

   public updateCanvasDimensions(): void {
      Main.canvas.attr({ height: $(window).height(), width: $(window).width() });
      this.canvasWidth = Main.canvas.width();
      this.canvasHeight = Main.canvas.height();
      this.draw();
   }

   public initEventListeners(): void {
      let self = this;

      $(window).bind('resize', self.updateCanvasDimensions).bind('mousemove', self.onMove);
      Main.canvas.get(0).ontouchmove = (e) => {e.preventDefault(); this.onTouchMove(<TouchEvent>e)}

      Main.canvas.get(0).ontouchstart = (e: Event): void => { e.preventDefault(); }
   }

   public onMove(e: any): void {
      if (Main.pointCollection) 
         Main.pointCollection.mousePos.set(e.pageX, e.pageY);
      
   }

   public onTouchMove(e: TouchEvent): void {
      if (Main.pointCollection)
         Main.pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
   }

   public timeout(): void { 
      this.draw();
      this.update();
      setTimeout(() => { this.timeout(); }, 30);

   }

   public draw(): void {
      let tmpCanvas = Main.canvas.get(0);

      if (tmpCanvas.getContext == null) {
         return;
      }

      Main.ctx = tmpCanvas.getContext('2d');
      Main.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      if (Main.pointCollection)
         Main.pointCollection.draw();
   }

   public update(): void {
      if (Main.pointCollection)
            Main.pointCollection.update();
   }
}