// main.js

const svg = document.getElementById("diagram");

// Ensure we can see arrow tips outside typical bounds
svg.style.overflow = "visible";

// We'll store each scenario's <g> element so we can show/hide or modify them easily.
window.scenarioGroups = [];

// Track which flow is currently "selected" (null if none)
let selectedFlowIndex = null;

// Once the SVG is loaded and sized, build the diagram.
window.addEventListener("load", () => {
  const { width, height } = svg.getBoundingClientRect();
  drawDiagram(width, height);

  // Global click listener to reset selection if user clicks outside any arrow or on a checkbox,
  // also hide step popup if visible
  document.addEventListener("click", (e) => {
    const isArrow = e.target instanceof SVGPathElement && e.target.hasAttribute("data-scenario-index");
    const isCheckbox = (e.target.tagName === "INPUT" && e.target.type === "checkbox");
    if (!isArrow || isCheckbox) {
      resetFlowSelection();
      hideStepPopup();
    }
  });
});

/**
 * Main function to build the diagram with a pinned "most used" microservice on the left
 * and all other microservices placed in a grid (max 5 rows), equally spaced vertically & horizontally.
 */
function drawDiagram(svgWidth, svgHeight) {
  if (!Array.isArray(scenarioData) || scenarioData.length === 0) {
    console.warn("No scenarioData found or it's empty.");
    return;
  }

  // 1) Identify the most-used microservice by counting usage
  const usageCount = new Map();
  scenarioData.forEach(flow => {
    if (!flow.steps) return;
    flow.steps.forEach(step => {
      incrementUsageCount(usageCount, step.sourceMicroservice);
      incrementUsageCount(usageCount, step.destinationMicroservice);
    });
  });

  let mostUsedService = null;
  let maxUsage = 0;
  usageCount.forEach((count, serviceName) => {
    if (count > maxUsage) {
      maxUsage = count;
      mostUsedService = serviceName;
    }
  });

  // 2) Collect all unique services
  const allServicesSet = new Set();
  scenarioData.forEach(flow => {
    flow.steps?.forEach(step => {
      allServicesSet.add(step.sourceMicroservice);
      allServicesSet.add(step.destinationMicroservice);
    });
  });
  const allServicesArray = Array.from(allServicesSet);

  if (allServicesArray.length === 0) {
    console.warn("No microservices found in scenarioData.");
    return;
  }

  // Fallback if no "most used" found
  if (!mostUsedService) {
    mostUsedService = allServicesArray[0];
  }

  // 3) Pin the "most used" microservice on the left
  const leftX = svgWidth * 0.15;
  const leftY = svgHeight / 2;

  // The rest of the microservices go into a grid to the right
  const otherServices = allServicesArray.filter(s => s !== mostUsedService);

  // We'll store final positions in a map: serviceName -> { x, y }
  const serviceCoords = new Map();
  serviceCoords.set(mostUsedService, { x: leftX, y: leftY });

  // 4) Grid placement for the other services
  const gridStartX = leftX + 300;   // shift right from pinned node
  const gridStartY = leftY - 200;   // shift upward so grid is roughly centered
  const rowMax = 5;                 // max 5 microservices per column
  const rowSpacing = 100;           // vertical gap
  const colSpacing = 150;           // horizontal gap

  otherServices.forEach((svc, i) => {
    const colIndex = Math.floor(i / rowMax);
    const rowIndex = i % rowMax;
    const xPos = gridStartX + colIndex * colSpacing;
    const yPos = gridStartY + rowIndex * rowSpacing;
    serviceCoords.set(svc, { x: xPos, y: yPos });
  });

  // 5) Draw microservice rectangles FIRST
  serviceCoords.forEach((coords, svc) => {
    drawServiceRect(svg, svc, coords.x, coords.y);
  });

  // 6) For each scenario, create an SVG <g> and then draw arrows + step labels
  scenarioData.forEach((flow, flowIndex) => {
    if (!flow.steps || !Array.isArray(flow.steps)) return;

    const scenarioGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    scenarioGroup.setAttribute("data-scenario-name", flow.featureName || `Scenario${flowIndex + 1}`);
    svg.appendChild(scenarioGroup);

    scenarioGroups.push({
      name: flow.featureName,
      groupElement: scenarioGroup,
      visible: true
    });

    const arrowColor = flow.color || "#fff";

    flow.steps.forEach(step => {
      const src = step.sourceMicroservice;
      const dst = step.destinationMicroservice;
      if (!serviceCoords.has(src)) {
        console.warn(`Source microservice "${src}" not found, skipping step ${step.step}`);
        return;
      }
      if (!serviceCoords.has(dst)) {
        console.warn(`Destination microservice "${dst}" not found, skipping step ${step.step}`);
        return;
      }

      // Each microservice rectangle is 120 wide, 40 high, centered at (x, y).
      const { x: cx1, y: cy1 } = serviceCoords.get(src);
      const { x: cx2, y: cy2 } = serviceCoords.get(dst);

      // lineRectIntersection to ensure arrow leaves/enters at rectangle border
      const [x1, y1] = lineRectIntersection(cx1, cy1, cx2, cy2, 120, 40);
      const [x2, y2] = lineRectIntersection(cx2, cy2, cx1, cy1, 120, 40);

      // Variation index so repeated arrows are offset
      const variationIndex = getOrIncrementArrowVariation(src, dst);

      // Create a curved path from (x1,y1) to (x2,y2)
      const pathStr = createCurvedPath(x1, y1, x2, y2, variationIndex);

      // Draw the arrow <path> with arrowhead
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathStr);
      path.setAttribute("stroke", arrowColor);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      path.setAttribute("marker-end", "url(#arrowhead)");
      path.setAttribute("data-scenario-index", flowIndex);
      scenarioGroup.appendChild(path);

      // Place arrow label
      const coords1 = parseFirstCoordinates(pathStr);
      const coords2 = parseLastCoordinates(pathStr);
      if (coords1 && coords2) {
        const midX = (coords1.x + coords2.x) / 2;
        const midY = (coords1.y + coords2.y) / 2;

        const dx = coords2.x - coords1.x;
        const dy = coords2.y - coords1.y;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        const baseLabelOffset = 10;
        const labelIncrement = 5;
        const offsetDist = baseLabelOffset + variationIndex * labelIncrement;

        const nx = -dy / length;
        const ny = dx / length;

        const offsetX = nx * offsetDist;
        const offsetY = ny * offsetDist;

        const labelX = midX + offsetX;
        const labelY = midY + offsetY;

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
        label.setAttribute("class", "arrow-step-label");
        label.setAttribute("style", "pointer-events: auto; cursor: pointer;");
        label.textContent = `Step ${step.step}`;
        scenarioGroup.appendChild(label);

        // Show popup on label click
        label.addEventListener("click", (e) => {
          e.stopPropagation(); // do not reset flow selection
          showStepPopup(step, e.clientX, e.clientY);
        });
      }

      // Flow selection on arrow
      path.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = parseInt(path.getAttribute("data-scenario-index"), 10);
        setFlowSelection(index);
      });
    });
  });
}

/**
 * lineRectIntersection:
 * Given a rectangle of width=rectW, height=rectH centered at (cx, cy),
 * and a line from (cx, cy) -> (tx, ty), returns [ix, iy] on the rectangle border.
 */
function lineRectIntersection(cx, cy, tx, ty, rectW, rectH) {
  let dx = tx - cx;
  let dy = ty - cy;
  const halfW = rectW / 2;
  const halfH = rectH / 2;

  // If no movement, just return center
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return [cx, cy];
  }

  let tMin = 1.0; // intersection param in [0..1]

  const left = cx - halfW;
  const right = cx + halfW;
  const top = cy - halfH;
  const bottom = cy + halfH;

  // Intersect with vertical planes
  if (Math.abs(dx) > 0.0001) {
    let t1 = (left - cx) / dx;
    let yInt1 = cy + dy * t1;
    if (t1 >= 0 && t1 <= 1 && yInt1 >= top && yInt1 <= bottom) {
      tMin = Math.min(tMin, t1);
    }
    let t2 = (right - cx) / dx;
    let yInt2 = cy + dy * t2;
    if (t2 >= 0 && t2 <= 1 && yInt2 >= top && yInt2 <= bottom) {
      tMin = Math.min(tMin, t2);
    }
  }

  // Intersect with horizontal planes
  if (Math.abs(dy) > 0.0001) {
    let t3 = (top - cy) / dy;
    let xInt3 = cx + dx * t3;
    if (t3 >= 0 && t3 <= 1 && xInt3 >= left && xInt3 <= right) {
      tMin = Math.min(tMin, t3);
    }
    let t4 = (bottom - cy) / dy;
    let xInt4 = cx + dx * t4;
    if (t4 >= 0 && t4 <= 1 && xInt4 >= left && xInt4 <= right) {
      tMin = Math.min(tMin, t4);
    }
  }

  const ix = cx + dx * tMin;
  const iy = cy + dy * tMin;
  return [ix, iy];
}

/** Hide the popup container */
function hideStepPopup() {
  const container = document.getElementById("stepPopupContainer");
  if (container) {
    container.innerHTML = "";
    container.style.display = "none";
  }
}

/**
 * Show a popup using the template from index.html with step details.
 */
function showStepPopup(step, clientX, clientY) {
  const container = document.getElementById("stepPopupContainer");
  const template = document.getElementById("stepPopupTemplate");
  if (!template || !container) return;

  // Clear any previous popup
  container.innerHTML = "";

  // Clone template content
  const popup = template.content.cloneNode(true);

  // Fill in the data
  const popupDiv = popup.querySelector(".step-popup");
  const closeBtn = popupDiv.querySelector(".popup-close-btn");
  const stepSpan = popupDiv.querySelector(".popup-step");
  const descSpan = popupDiv.querySelector(".popup-description");
  const reqMethod = popupDiv.querySelector(".popup-req-method");
  const reqUrl = popupDiv.querySelector(".popup-req-url");
  const reqHeaders = popupDiv.querySelector(".popup-req-headers");
  const reqBody = popupDiv.querySelector(".popup-req-body");
  const resStatus = popupDiv.querySelector(".popup-res-status");
  const resBody = popupDiv.querySelector(".popup-res-body");

  stepSpan.textContent = `Step ${step.step}`;
  descSpan.textContent = step.description || "No description";

  const requestObj = step.request || {};
  reqMethod.textContent = requestObj.method || "N/A";
  reqUrl.textContent = requestObj.url || "N/A";
  reqHeaders.textContent = JSON.stringify(requestObj.headers || {}, null, 2);
  reqBody.textContent = (requestObj.body)
    ? JSON.stringify(requestObj.body, null, 2)
    : "{}";

  const responseObj = step.response || {};
  resStatus.textContent = responseObj.statusCode || "N/A";
  resBody.textContent = (responseObj.body)
    ? JSON.stringify(responseObj.body, null, 2)
    : "{}";

  // Append to container
  container.appendChild(popup);

  // Position near the click
  let posX = clientX;
  let posY = clientY;

  // If near right edge
  const popupWidth = 320;
  if (posX + popupWidth + 20 > window.innerWidth) {
    posX = window.innerWidth - popupWidth - 20;
  }

  // If near bottom
  const approxHeight = 300;
  if (posY + approxHeight > window.innerHeight) {
    posY = window.innerHeight - approxHeight - 20;
  }

  container.style.left = `${posX}px`;
  container.style.top = `${posY}px`;
  container.style.display = "block";

  // Close button
  closeBtn.addEventListener("click", () => {
    hideStepPopup();
  });
}

/** 
 * When we select a scenario (flow), set it to full opacity and dim all others to 50%.
 */
function setFlowSelection(flowIndex) {
  selectedFlowIndex = flowIndex;
  scenarioGroups.forEach((scen, i) => {
    if (i === flowIndex) {
      scen.groupElement.style.opacity = "1.0";
    } else {
      scen.groupElement.style.opacity = "0.5";
    }
  });
}

/** Reset any flow selection, returning all flows to full opacity. */
function resetFlowSelection() {
  selectedFlowIndex = null;
  scenarioGroups.forEach((scen) => {
    scen.groupElement.style.opacity = "1.0";
  });
}
