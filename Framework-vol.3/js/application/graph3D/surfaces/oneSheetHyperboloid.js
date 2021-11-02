Surface.prototype.oneSheetHyperboloid = (count = 21, a = 4, b = 4,  c = 4,
    point = new Point(0, 0, 0), color = '#f03538' ) => {
   let points = [];
   let edges = [];
   let polygones = [];

   const PI = Math.PI;
   let delta = 2 * PI / count;

   // Расставить точки
   for (let i = -PI; i <= PI; i += delta) {
       for (let j = 0; j < 2 * PI; j += delta) {
           const x = a * Math.cosh(i) * Math.cos(j);
           const y = b * Math.cosh(i) * Math.sin(j);
           const z = c * Math.sinh(i);
           points.push(new Point(x, z, y));
       }
   }

   //Провести рёбра
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
   }

   // Провести полигоны
   let zebra = 0;
   for (let i = 0; i < points.length; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
        let ab = 0;
        let cb = 0;
        let clr1 = { r: 150, g: 130, b: 74 };
        let clr2 = { r: 200, g: 100, b: 24 };
        let clr = clr1;
        for (let i = 0; i < polygones.length; i++) {
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
            if (cb == 4) {
                cb = 0;
                let tmp = clr2;
                clr2 = clr1;
                clr1 = tmp;
            }
            polygones[i].color = clr;
        }}

   return new Subject(
       points, edges, polygones
   );

}