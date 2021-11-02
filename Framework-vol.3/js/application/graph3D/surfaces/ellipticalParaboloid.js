Surface.prototype.ellipticalParaboloid = (color = '#eca61d', x = 0, y = -55, a = 10, b = 5, t = 18, h = 18) => {
    while (t % 6 != 0){
        t++;
    }
    h = t;
    console.log(t, h);
    angle = 2 * Math.PI / t;
    let points = [];
    let edges = [];
    let polygones = [];

    //точки
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < t; i++) {
            points.push(
                new Point(
                    x + a * j * Math.cos(angle * i),
                    y + Math.pow(j, 2),
                    b * j * Math.sin(angle * i),
                )
            )
        }
    }

    //ребра
    let current = h;
    for (let i = h; i < t * h; i++) {
        if (i % h != h - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += h;
        }
    }
    for (let i = 0; i < t * h - h; i++) {
        edges.push(new Edge(i, i + h));
    }

    //полигоны
    let polCurrent = 0;
    for (let i = 0; i < t * h - h; i++) {
        if (i % h != h - 1) {
            polygones.push(new Polygon([i, i + 1, i + h + 1, i + h], color));
        } else {
            polygones.push(new Polygon([i, polCurrent, i + 1, i + h], color));
            polCurrent += h;
        }
    }
    
    let cube = 0;
    let clr1 = {r: 154, g: 92, b: 209};
    let clr2 = {r: 32, g: 6, b: 56};
    let counter = 0;
    for(let i = 0; i < polygones.length; i++){
        if (counter < 3) {
            polygones[i].color = clr2;
            for(let j = 0; j < t / 6; j++){
                if(cube == t / 6 + j && counter == 1) {
                    polygones[i].color = {r: 154, g: 92, b: 209};
                }
            }
        } else if (counter < 6) {
            polygones[i].color = clr1;
            for(let j = 0; j < t / 6; j++){
                if(cube == t / 6 + j && counter == 4){
                    polygones[i].color = {r: 154, g: 92, b: 209};
                }
            }
        }
        counter++;
        if (counter == 6) {
            counter = 0;
            cube++;
        }
        if (cube == t/2) {
            cube = 0;
            let tmp = clr2;
            clr2 = clr1;
            clr1 = tmp;
        }
        
    }
    
    let dotes = [];
    for (let i = 1; i <= h; i++) {
        dotes.push(t * h - i);
    }
    polygones.push(new Polygon(dotes, '#c9c9c9'));

    return new Subject(points, edges, polygones);
}