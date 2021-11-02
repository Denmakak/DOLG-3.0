Surface.prototype.gnidaCube = (x = 0, y = 0, z = 0, size = 10) => {
    let points = [];
    let edges = [];
    let polygones = [];
    points = [
        new Point(x, y, z),
        new Point(x + size, y, z),
        new Point(x, y + size, z),
        new Point(x, y, z + size),
        new Point(x, y + size, z + size),  
        new Point(x + size, y, z + size),           
        new Point(x + size, y + size, z),
        new Point(x + size, y + size, z + size)
    ];    
    edges = [
        new Edge(0, 1),
        new Edge(1, 6),
        new Edge(0, 2),
        new Edge(0, 3),
        new Edge(1, 5),
        new Edge(3, 5),
        new Edge(3, 4),
        new Edge(2, 4),
        new Edge(6, 7),
        new Edge(4, 7),
        new Edge(5, 7),
        new Edge(6, 2)
    ];

    return new Subject(points, edges, polygones);
}