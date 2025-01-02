// collision.js

/**
 * Collision avoidance with optional pinned node support.
 * If a node has p.fixed = true, we skip moving that node.
 * 
 * @param {Array} positions - array of { name, x, y, fixed?: boolean }
 * @param {number} nodeRadius - approximate collision radius for each node
 * @param {number} iterations - how many repulsion iterations to run
 */
window.applyCollisionAvoidance = function (positions, nodeRadius, iterations) {
    const desiredDist = nodeRadius * 2; // minimal distance between centers
  
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[j].x - positions[i].x;
          const dy = positions[j].y - positions[i].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < desiredDist * desiredDist) {
            const dist = Math.sqrt(distSq) || 0.001;
            const overlap = (desiredDist - dist) / 2;
  
            // Normalized direction
            const nx = dx / dist;
            const ny = dy / dist;
  
            const pi = positions[i];
            const pj = positions[j];
  
            // If neither node is fixed, move both
            if (!pi.fixed && !pj.fixed) {
              pi.x -= nx * overlap;
              pi.y -= ny * overlap;
              pj.x += nx * overlap;
              pj.y += ny * overlap;
            } else if (!pi.fixed && pj.fixed) {
              // only move i (double it)
              pi.x -= nx * (2 * overlap);
              pi.y -= ny * (2 * overlap);
            } else if (pi.fixed && !pj.fixed) {
              // only move j (double)
              pj.x += nx * (2 * overlap);
              pj.y += ny * (2 * overlap);
            }
          }
        }
      }
    }
  };
  