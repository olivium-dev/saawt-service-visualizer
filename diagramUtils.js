// diagramUtils.js

/**
 * Creates a rectangle (microservice node) centered at (centerX, centerY),
 * plus a text label at the center.
 */
window.drawServiceRect = function (svg, serviceName, centerX, centerY) {
    const rectW = 120;
    const rectH = 40;
    const rectX = centerX - rectW / 2;
    const rectY = centerY - rectH / 2;
  
    // Create the rectangle
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectW);
    rect.setAttribute("height", rectH);
    rect.setAttribute("class", "microservice-rect");
    svg.appendChild(rect);
  
    // Create the label
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", centerX);
    label.setAttribute("y", centerY);
    label.setAttribute("class", "service-label");
    label.textContent = serviceName;
    svg.appendChild(label);
  };
  
  /**
   * Increments usage count for a given microservice name in the provided map.
   */
  window.incrementUsageCount = function (map, serviceName) {
    if (!serviceName) return;
    map.set(serviceName, (map.get(serviceName) || 0) + 1);
  };