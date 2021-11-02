Surface.prototype.ellipticalCylinder = (count = 19, color, a = 10, b = 10, h = 20) => {
    let points = [];
    let edges = [];
    let polygones = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;

    //Боковая поверхность цилиндра
    for (let p = 0; p < h; p++) {
        for (let i = 0; i <= PI; i += delta * 2 + count) {
            for (let j = 0; j < 2 * PI; j += delta) {
                const x = Math.cos(i) * Math.cos(j) * a;
                const y = Math.sin(j) * b;
                const z = p;
                points.push(new Point(x, z, y));
            }
        }
    }



    //Рёбра и полигоны
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        if ((i + 1) >= count && (i + 1) % count === 0) {
            edges.push(new Edge(i, i - count + 1))
        }
        if(i % 2 == 0){
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
            }
            if ((i + 1) >= count && i + count < points.length && (i + 1) % count === 0) {
                polygones.push(new Polygon([i, i - count + 1, i + 1, i + count], '#000000'));
            }
        } else {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#ffffff'));
            }
            if ((i + 1) >= count && i + count < points.length && (i + 1) % count === 0) {
                polygones.push(new Polygon([i, i - count + 1, i + 1, i + count], '#ffffff'));
            }
        }
        
    }
    return new Subject(
        points, edges, polygones
    );

}
