class Graph {
    constructor(container, gap) {
        this.gap = gap;
        this.container = container;
        this.canvas;
        this.ctx;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "canvas-graph");
        this.canvas.width = window.getComputedStyle(document.querySelector("." + this.container), null).getPropertyValue("width").split("px")[0];
        this.canvas.height = window.getComputedStyle(document.querySelector("." + this.container), null).getPropertyValue("height").split("px")[0];
        document.querySelector("." + this.container).appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.drawGraphLines();
    }

    drawGraphLines() {
        this.ctx.beginPath();
        this.ctx.moveTo(2, 0);
        this.ctx.lineTo(2, this.canvas.height - 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(2, this.canvas.height - 20);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 20);
        this.ctx.stroke();
    }

    draw(graphData) {
        var gap = 3;

        let XY = graphData.reduce(function (a, b) { return { x: a.x + b.x, y: a.y + b.y }; });
        let meanX = XY.x / graphData.length;
        let meanY = XY.y / graphData.length;

        let maxY = Math.max.apply(Math, graphData.map(function (o) { return o.y }));
        let heightY = (this.canvas.height - 40) / maxY;

        let widthX = (this.canvas.width / graphData.length) - this.gap;

        for (let i = 0; i < graphData.length; i++) {

            this.ctx.beginPath();
            this.ctx.fillStyle = "#e91e63";
            this.ctx.rect(gap, this.canvas.height - 20, widthX, -(graphData[i].y * heightY));
            this.ctx.fill();

            //X line text
            this.ctx.font = this.canvas.width / 80 + "px arial";
            this.ctx.fillStyle = "#000";
            this.ctx.fillText(graphData[i].x, gap + widthX / 3, this.canvas.height);

            //Y line text
            this.ctx.save();
            this.ctx.translate(gap + widthX / 4, this.canvas.height - graphData[i].y * heightY - 22);
            // this.ctx.rotate(-Math.PI / 2);
            this.ctx.fillText(graphData[i].y, 0, 0);
            this.ctx.restore();

            gap += widthX + this.gap;
        }
    }
}