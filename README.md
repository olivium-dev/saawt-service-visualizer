
# Microservices Diagram (Olivium Microservice Visualizer)

**Author**: Ouday Khaled  

This project uses **HTML**, **CSS**, and **JavaScript** to **visualize** microservice flows, including requests and responses across multiple scenarios. It features:
- A **draggable, floating filter panel** for toggling scenario visibility.  
- A **popup** showing details (request/response) upon clicking step labels.  
- **Arrows** connecting microservices, with arrowheads defined in `<defs>`.  
- **Scenario** data split into **controllers** (e.g., `orderPlacementFlow.js`, `refundFlow.js`), then appended into `scenarioData`.  

## Table of Contents
1. [Project Overview](#project-overview)  
2. [File Structure](#file-structure)  
3. [Installation & Setup](#installation--setup)  
4. [How It Works](#how-it-works)  
   - [The Index HTML](#the-index-html)  
   - [JavaScript Files](#javascript-files)  
   - [Scenario Data & Controllers](#scenario-data--controllers)  
5. [Usage](#usage)  
   - [Serving Locally](#serving-locally)  
   - [Viewing the Diagram](#viewing-the-diagram)  
   - [Filtering Scenarios](#filtering-scenarios)  
6. [Generating JSON Flows from Gateway Logs](#generating-json-flows-from-gateway-logs)  
7. [Customization](#customization)  
8. [License](#license)

---

## Project Overview

This tool, called **Olivium - Microservice Visualizer**, draws a **flow diagram** of microservice interactions:

- Each **microservice** appears as a **rectangle**.  
- **Arrows** show requests from one microservice to another, with labeled steps.  
- Clicking a **step label** opens a popup describing that request/response in detail.  
- A **scenario** (or flow) is a set of steps, all drawn in the same color.  
- Multiple scenarios can be toggled on/off using a **draggable filter panel** (i.e., scenario checkboxes).

---

## File Structure

A common layout might be:

```
.
├── data/
│   ├── controllers/
│   │   ├── orderPlacementFlow.js
│   │   ├── refundFlow.js
│   │   └── ...
│   ├── data.js
│   └── loadControllers.js
├── arrowVariation.js
├── collision.js
├── diagramUtils.js
├── index.html
├── main.js
├── pathUtils.js
├── scenarioFilter.js
├── styles.css
└── README.md
```

**Key Files**:

1. **index.html**  
   - Hosts the main layout: header/footer, the `<svg>` for drawing, the popup template, and scenario filter panel.  
   - Defines the **marker** in `<defs>` for arrowheads.

2. **styles.css**  
   - Global styling, including microservice rectangles, scenario panel, and popup.

3. **main.js**  
   - Core logic for building the diagram, positioning microservices, drawing arrows, labeling steps, and showing popups.

4. **scenarioFilter.js**  
   - Implements the **draggable** scenario panel with checkboxes to toggle flows and a filter input.

5. **collision.js** / **arrowVariation.js** / **diagramUtils.js** / **pathUtils.js**  
   - Additional helper logic for collision avoidance, arrow offset, labeling, etc.

6. **data/\***  
   - Contains **controllers** (like `orderPlacementFlow.js`, `refundFlow.js`) that define flows.  
   - A base `data.js` that merges or initializes `window.scenarioData`.  
   - `loadControllers.js` that calls `appendFlows(...)` to load them into the global array.

---

## Installation & Setup

1. **Clone** or download this repository.  
2. Ensure you have a **local HTTP server** (e.g., `npm i -g http-server` or use Python’s `python -m http.server`).  
3. Place files in a single folder and run a simple local server in that folder, for example:  
   ```bash
   http-server .
   ```
4. Open your browser at `http://localhost:8080/` (or whatever port) to see **index.html**.

---

## How It Works

### The Index HTML

```html
<!-- index.html snippet -->
<body>
  <header>...</header>

  <div id="visualizationArea">
    <svg id="diagram" style="overflow:visible;">
      <defs>
        <!-- The arrowhead definition -->
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L10,3.5 z" fill="inherit" />
        </marker>
      </defs>
    </svg>
  </div>

  <!-- The popup template and scenario panel, plus scripts -->
  ...
</body>
```

- We define a **`<marker>`** for the arrow tips.  
- `overflow="visible"` ensures arrowheads aren’t clipped.  
- The **draggable** scenario filter panel is also in this file, along with the popup `<template>`.

### JavaScript Files

- **`main.js`**: Draws the diagram, placing the most-used microservice on the left, others in a grid or circle. Calls `lineRectIntersection` to place arrows at rectangle edges, etc.  
- **`scenarioFilter.js`**: Builds the checkboxes for each flow, plus the “All flows” checkbox, and handles drag events on the filter panel.  
- **`collision.js`**: (Optional) If you’re using collision-avoidance logic.  
- **`arrowVariation.js`**: (Optional) Tracks repeated arrow offsets.  
- **`diagramUtils.js` / `pathUtils.js`**: Helper functions for drawing microservices, parsing paths, or building curved arrows.

### Scenario Data & Controllers

- **`data/controllers/*.js`**: Each file (e.g., `orderPlacementFlow.js`, `refundFlow.js`) exports a global array like `window.orderController = [ { featureName, steps }, ... ]`.  
- **`data/data.js`**: Usually sets `window.scenarioData = []` and a function like `appendFlows(flows)`.  
- **`data/loadControllers.js`**: Calls `appendFlows(window.orderController)`, etc., appending them all into `window.scenarioData`.  

---

## Usage

### Serving Locally

1. Run a local server in your project folder (e.g., `npx http-server .`).  
2. Go to `http://localhost:8080/index.html` in your browser.

### Viewing the Diagram

- The page automatically draws an **SVG** of microservices and arrows.  
- **Hover** or **click** on a **step label** to see a popup with request/response info.  
- **Click** on an arrow to highlight that scenario and dim others. Click outside or on a checkbox to reset.

### Filtering Scenarios

- On the **draggable** panel (top-right):
  - Each scenario has a checkbox to toggle it.  
  - A “Filter scenarios…” text box for searching scenario names.  
  - You can drag the panel around by its header.

---

## Generating JSON Flows from Gateway Logs

We provide a sample Node.js script (`generateFlow.js`) that can parse gateway logs and output flows in the format:
```js
window.someController = [ { featureName, color, steps: [ ... ] } ];
```
Adapt it to real logs, then load the resulting `.js` file in `index.html`.

---

## Customization

- **Positioning**: Change `main.js` logic to place microservices in a circle, random layout, or a force-based approach.  
- **Styling**: Adjust `styles.css` to customize microservice rectangles, arrow colors, scenario panel.  
- **Popup**: Modify the `<template>` in `index.html` for different request/response formatting.  
- **Arrowhead**: To resize or recolor, edit the `<marker>` definition in `<svg><defs>`.

---

## License

*(Include your preferred license text. For example, MIT license.)*

> **Example**:
> 
> ```
> MIT License
> 
> Copyright (c) 2023 ...
> Permission is hereby granted, free of charge, ...
> ```
>
> Adjust to your actual license if different.

---

**Enjoy** visualizing your microservices with **Olivium**! If you encounter issues, feel free to open an [issue](#) or adapt this example to your needs.
