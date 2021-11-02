Surface.prototype.hyperbolicParaboloid = (p = 2, q = 2, count = 21, color = '#f03538') => {

    const points = [];
    const edges = [];
    const polygones = [];

    const LEFT = -10;
    const RIGHT = 10
    const step = (RIGHT - LEFT) / count;
    //точки 
    for (let x = LEFT; x < RIGHT; x += step) {
        for (let y = LEFT; y < RIGHT; y += step) {
            points.push(new Point(
                x,
                (x ** 2 / p - y ** 2 / q) / 2,
                y,
            ));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1] && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));

        }
    }

    for (let i = 0; i < points.length; i++) {
        //заполнить в шахматном порядке
        if(i % 2 == 0){
            continue;
        }
        if (points[i + 1 + count] && (i + 1) % count !== 0) {
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], color));
        }
    }
    //заполнить рядами
    /*
    let newP = [];
    for(let i = 0; i < count - 1; i++){
        newP.push(polygones.splice(0, count - 1));
    }
    for(let i = 0; i < newP.length; i++){
        if(i % 2 == 1){
            continue;
        }
        for(let j = 0; j < count - 1; j++){
            polygones.push(newP[i][j]);
        }
    }
    */

    return new Subject(points, edges, polygones);
}