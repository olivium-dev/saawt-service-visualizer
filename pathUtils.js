// pathUtils.js

/**
 * Creates a cubic Bézier path between (x1, y1) and (x2, y2),
 * offset so it's curved (not a straight line). The variationIndex
 * increases curvature for repeated arrows between the same pair.
 */
window.createCurvedPath = function (x1, y1, x2, y2, variationIndex) {
    // If source == destination, create a small loop
    if (x1 === x2 && y1 === y2) {
      return createLoopPath(x1, y1, variationIndex);
    }
  
    // Midpoint
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
  
    // Vector from (x1, y1) to (x2, y2)
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    // We'll offset the control points perpendicular to (dx, dy).
    // Each arrow between the same pair increments variationIndex,
    // giving it more curvature.
    const baseOffset = 0.2;
    const increment = 0.15;
    const offsetFactor = baseOffset + variationIndex * increment;
  
    const cxOffset = -dy * offsetFactor;
    const cyOffset = dx * offsetFactor;
  
    // Control points
    const c1x = mx + cxOffset;
    const c1y = my + cyOffset;
    const c2x = mx - cxOffset;
    const c2y = my - cyOffset;
  
    // Construct the path string:
    // "M x1,y1 C c1x,c1y c2x,c2y x2,y2"
    return `M ${x1},${y1} C ${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
  };
  
  /**
   * If source and destination are the same, create a small loop path
   * around the node, with increasing size per variationIndex.
   */
  window.createLoopPath = function (x, y, variationIndex) {
    const baseLoopRadius = 40;
    const increment = 10;
    const loopRadius = baseLoopRadius + variationIndex * increment;
  
    return `M ${x},${y}
            C ${x - loopRadius},${y - loopRadius}
              ${x + loopRadius},${y - loopRadius}
              ${x},${y}`;
  };
  
  /**
   * Extract the first coordinate (x1,y1) from a path string (after 'M ').
   * Example pathStr: "M 100,200 C 150,50 300,50 300,200"
   */
  window.parseFirstCoordinates = function (pathStr) {
    const tokens = pathStr.trim().split(/\s+/);
    if (tokens.length < 2 || tokens[0] !== "M") return null;
  
    const xy = tokens[1].split(",");
    if (xy.length < 2) return null;
    return {
      x: parseFloat(xy[0]),
      y: parseFloat(xy[1]),
    };
  };
  
  /**
   * Extract the final coordinate (x2,y2) from the path string (the last token).
   */
  window.parseLastCoordinates = function (pathStr) {
    const tokens = pathStr.trim().split(/\s+/);
    if (tokens.length < 2) return null;
  
    const lastToken = tokens[tokens.length - 1];
    const xy = lastToken.split(",");
    if (xy.length < 2) return null;
    return {
      x: parseFloat(xy[0]),
      y: parseFloat(xy[1]),
    };
  };
  