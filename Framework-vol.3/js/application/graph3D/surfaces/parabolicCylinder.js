Surface.prototype.parabolicCylinder = (count = 11, color, point = new Point(0, 0, 0)) => {
    let points = [];
    let edges = [];
    let polygones = [];
    const size = 10;
    // Расставить точки
    for (let i = -count; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x = i + size / count;
            const y = x * x / size;
            const z = j - size;
            points.push(new Point(x, y, z));
        }
    }
    // Рёбра
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        // Полигоны
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            let ab = 0;
            let cb = 0;
            let clr1 = { r: 150, g: 130, b: 0 };
            let clr2 = { r: 0, g: 0, b: 0 };
            let clr = clr1;
            for (let j = 0; j < polygones.length; j++) {
                if (ab < 2) {
                    clr = clr2;
                } else if (ab < 4) {
                    clr = clr1;
                }
                ab++;
                if (ab == 4) {
                    ab = 0;
                    cb++;
                }
                if (cb == 5) {
                    cb = 0;
                    let tmp = clr2;
                    clr2 = clr1;
                    clr1 = tmp;
                }
                polygones[j].color = clr;
            }
            polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        }
    }

    return new Subject(points, edges, polygones);

}
