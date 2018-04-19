

export function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

export function boxCollides(pos, size, pos2, size2) {
  return collides(
    pos[0],
    pos[1],
    pos[0] + size[0],
    pos[1] + size[1],
    pos2[0],
    pos2[1],
    pos2[0] + size2[0],
    pos2[1] + size2[1]
  );
}
