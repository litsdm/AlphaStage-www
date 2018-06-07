const AABBIntersect = (ax, ay, aw, ah, bx, by, bw, bh) =>
  ax < bx + bw && bx < ax + aw && ay < by + bh && by < ay + ah;

export default AABBIntersect;
