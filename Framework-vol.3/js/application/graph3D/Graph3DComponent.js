class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        this.WINDOW = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        };
        this.lumenValue = document.getElementById('lumen').value;
        this.LIGHT = new Light(-40, 10, -20, this.lumenValue);
        this.canRotate = false;
        this.isLeftClicked = false;
        this.isMiddleClicked = false;
        this.dx = 0;
        this.dy = 0;
        this.dz = 0;
        this.sur = new Surface;
        this.zoomStep = 0.9;
        this.graph2D = new Graph({
            WINDOW: this.WINDOW,
            id: 'canvas3D',
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mouseleave: () => this.mouseleave(),
                mousedown: (event) => this.mousedown(event),
                mousemove: (event) => this.mousemove(event)
            }
        });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.figure = [this.sur.sphere()];
        document.getElementById('lumen').addEventListener("change", () => {
            let size = document.getElementById('lumen').value;
            this.LIGHT.lumen = size;
            this.printScene();
        });
        document.getElementById('change').addEventListener('click', () => {
            let clr = '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
            this.figure[0] = this.sur.sphere(new Point(0, 0, 0), clr);
            this.printScene();
        });
        document.getElementById('addSphere').addEventListener("click", () => this.addNewSphere());
        document.getElementById('deletePolygon').addEventListener("click", () => this.deletePolygon());
        document.getElementById('deletePoint').addEventListener("click", () => this.deletePoint());
        document.getElementById('addCube').addEventListener("click", () => this.addGnidaCube());
        document.getElementById('points').addEventListener("change", () => this.printScene());
        document.getElementById('edges').addEventListener("change", () => this.printScene());
        document.getElementById('polygones').addEventListener("change", () => this.printScene());
        document.getElementById('figure').addEventListener("change", () => {
            let fig = document.getElementById('figure').value;
            if (fig == "Сфера") {
                this.figure[0] = this.sur.sphere();
            }
            if (fig == "Куб") {
                this.figure[0] = this.sur.cube(-5, -5);
            }
            if (fig == "Тор") {
                this.figure[0] = this.sur.donut();
            }
            if (fig == "Пирамида") {
                this.figure[0] = this.sur.pyramid();
            }
            if (fig == "ЭЦ") {
                this.figure[0] = this.sur.ellipticalCylinder();
            }
            if (fig == "ОГ") {
                this.figure[0] = this.sur.oneSheetHyperboloid();
            }
            if (fig == "ЭП") {
                this.figure[0] = this.sur.ellipticalParaboloid();
            }
            if (fig == "ПЦ") {
                this.figure[0] = this.sur.parabolicCylinder();
            }
            if (fig == "Овал") {
                this.figure[0] = this.sur.ellipsoid();
            }
            if (fig == "ДГ") {
                this.figure[0] = this.sur.twoSheetHyperboloid();
            }
            if (fig == "ГЦ") {
                this.figure[0] = this.sur.hyperbolicCylinder();
            }
            if (fig == "Седло") {
                this.figure[0] = this.sur.hyperbolicParaboloid();
            }
            this.printScene();
        });
        this.printScene();
    }
    deletePolygon() {
        this.figure[0].polygones.splice(10, 15);
        this.printScene(); 
    }
    deletePoint() {
        for (let i = 0; i < this.figure[0].polygones.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.figure[0].polygones[i].points[j] === 35) {
                    this.figure[0].polygones[0].points.splice(j, 1);
                }
            }
        }
        for (let i = 0; i < this.figure[0].edges.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.figure[0].polygones[i].points[j] === 35) {
                    this.figure[0].polygones[0].points.splice(j, 1);
                }
            }
        }
        this.figure[0].points.splice(35, 1);
        this.printScene();
    }
    addNewSphere() {
        this.figure.push(this.sur.sphere(new Point(8, 10, 3)));
    }
    addGnidaCube() {
        //подрисовать квидратик)00)0)))
        let maxX = 0;
        let maxY = 0;
        let maxZ = 0;
        let minX = 0;
        let minY = 0;
        let minZ = 0;
        for (let i = 0; i < this.figure[0].points.length; i++) {
            const point = this.figure[0].points[i];
            if (maxX < point.x) {
                maxX = point.x;
            }
            if (maxY < point.y) {
                maxY = point.y;
            }
            if (maxZ < point.z) {
                maxZ = point.z;
            }
            if (minX > point.x) {
                minX = point.x;
            }
            if (minY > point.y) {
                minY = point.y;
            }
            if (minZ > point.z) {
                minZ = point.z;
            }
        }
        let cubeSize = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
        this.figure = this.figure.slice(0, 1);
        let ahahah = cubeSize + 2;
        this.figure.push(this.sur.gnidaCube(-(ahahah / 2), -(ahahah / 2), -(ahahah / 2), cubeSize + 2));
        this.printScene();
    }
    wheel(event) {
        let delta = (event.wheelDelta > 1) ? 1.1 : 0.9;
        for (let j = 0; j < this.figure.length; j++) {
            for (let i = 0; i < this.figure[j].points.length; i++) {
                this.graph3D.zoom(delta, this.figure[j].points[i]);
            }
        }

        this.printScene();
    }
    clear() {
        this.graph2D.clear();
    }
    printSubject(subject) {
        if (document.getElementById('polygones').checked) {
            this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
            this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
            this.graph3D.sortByArtistAlorithm(subject);
            for (let i = 0; i < subject.polygones.length; i++) {
                const points = subject.polygones[i].points;
                const array = [];
                for (let j = 0; j < points.length; j++) {
                    array.push({
                        x: this.graph3D.xs(subject.points[points[j]]),
                        y: this.graph3D.ys(subject.points[points[j]])
                    });
                }
                const lumen = this.graph3D.calcIlluminance(
                    subject.polygones[i].lumen, this.LIGHT.lumen
                );
                let { r, g, b } = subject.polygones[i].color;
                //отрисовать некоторые полигоны
                /*
                if ((subject.polygones[i].number % 10) !== 0) {
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                } else {
                    r = Math.round(r);
                    g = Math.round(g);
                    b = Math.round(b);
                }
                */
                
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                
                this.graph2D.polygones(array, subject.polygones[i].rgbToHex(r, g, b));
                //подрисовать ЦЫФРЫ))0)))
            }
        }
        if (document.getElementById('edges').checked) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                this.graph3D.calcDistanceEdge(subject, this.LIGHT, 'lumen');
                const lumen = this.graph3D.calcIlluminance(
                    subject.edges[i].lumen, this.LIGHT.lumen
                );
                let { r, g, b } = subject.edges[i].color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                const p1 = subject.points[edge.p1];
                const p2 = subject.points[edge.p2];
                //что бы затеняемые рёбра были)0))
                /*
                this.graph2D.line(
                    this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2), subject.edges[i].rgbToHex(r, g, b)
                );
                */
                
                this.graph2D.line(
                    this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2), '#000'
                );
                
            }
        }
        if (document.getElementById('points').checked) {
            for (let i = 0; i < subject.points.length; i++) {
                this.graph3D.calcDistancePoint(subject, this.LIGHT, 'lumen');
                const lumen = this.graph3D.calcIlluminance(
                    subject.points[i].lumen, this.LIGHT.lumen
                );
                let { r, g, b } = subject.points[i].color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                const point = subject.points[i];
                //что бы затеняемые точки были)0))
                //this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point), 2, subject.points[i].rgbToHex(r, g, b));
                this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point), 2, '#000');
            }
        }
    }
    printScene() {
        this.clear();
        for (let i = 0; i < this.figure.length; i++) {
            this.printSubject(this.figure[i]);
        }
    }
    mouseup() {
        this.canRotate = false;
    }
    mouseleave() {
        this.canRotate = false;
    }
    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        if (event.which == 1) {
            this.isLeftClicked = true;
            this.isMiddleClicked = false;
        }
        if (event.which == 2) {
            this.isLeftClicked = false;
            this.isMiddleClicked = true;
        }
    }
    mousemove(event) {
        const angle = Math.PI / 3600;
        for (let i = 0; i < this.figure.length; i++) {
            if (this.canRotate && this.isLeftClicked) {
                this.figure[i].points.forEach(point => {
                    this.graph3D.rotateOy((this.dx - event.offsetX) * angle, point);
                    this.graph3D.rotateOx((this.dy - event.offsetY) * angle, point);
                });
            }
            if (this.canRotate && this.isMiddleClicked) {
                this.figure[i].points.forEach(point => {
                    this.graph3D.rotateOz((this.dz - event.offsetX) * angle, point);
                });
            }
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        this.dz = event.offsetY;
        this.printScene();
    }
}