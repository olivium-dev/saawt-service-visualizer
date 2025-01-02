// scenarioFilter.js

(function() {
    const scenarioPanel = document.getElementById("scenarioPanel");
    const scenarioPanelHeader = document.getElementById("scenarioPanelHeader");
    const scenarioListDiv = document.getElementById("scenarioList");
    const scenarioFilterInput = document.getElementById("scenarioFilterInput");
    const scenarioAllFlowsContainer = document.getElementById("scenarioAllFlowsContainer");
  
    let allFlowsCheckbox; // reference to the "All flows" checkbox
  
    // 1) Build the "All flows" checkbox
    function buildAllFlowsCheckbox() {
      scenarioAllFlowsContainer.innerHTML = "";
  
      const label = document.createElement("label");
      label.style.display = "block";
  
      allFlowsCheckbox = document.createElement("input");
      allFlowsCheckbox.type = "checkbox";
      allFlowsCheckbox.checked = true; // default to ON
  
      allFlowsCheckbox.addEventListener("change", () => {
        toggleAllFlows(allFlowsCheckbox.checked);
      });
  
      label.appendChild(allFlowsCheckbox);
      label.appendChild(document.createTextNode(" All flows"));
      scenarioAllFlowsContainer.appendChild(label);
    }
  
    // 2) Build checkboxes for each scenario in window.scenarioGroups
    function buildScenarioCheckboxes() {
      scenarioListDiv.innerHTML = "";
  
      window.scenarioGroups.forEach((scen, index) => {
        const scenarioName = scen.name || `Scenario ${index + 1}`;
  
        const label = document.createElement("label");
        label.style.display = "block";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = scen.visible;
        checkbox.dataset.scenarioIndex = index;
  
        checkbox.addEventListener("change", (e) => {
          toggleScenarioVisibility(parseInt(e.target.dataset.scenarioIndex, 10), e.target.checked);
          // If one scenario is unchecked, we might uncheck "All flows" 
          // or keep it as is for simplicity. We'll keep it simpler: 
          // "All flows" won't automatically uncheck if 1 scenario is turned off.
        });
  
        label.dataset.scenarioName = scenarioName.toLowerCase();
  
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + scenarioName));
        scenarioListDiv.appendChild(label);
      });
    }
  
    // 3) Toggle the scenario's <g> in the SVG
    function toggleScenarioVisibility(index, isVisible) {
      const scenarioObj = window.scenarioGroups[index];
      if (!scenarioObj) return;
  
      scenarioObj.visible = isVisible;
      scenarioObj.groupElement.style.display = isVisible ? "block" : "none";
  
      // If everything is turned off, "All flows" might also need to be unchecked. 
      // But we'll keep "All flows" persistent unless user manually toggles it. 
    }
  
    // 4) Toggle ALL flows at once
    function toggleAllFlows(isVisible) {
      // We set each scenario to isVisible
      window.scenarioGroups.forEach((scenarioObj, index) => {
        scenarioObj.visible = isVisible;
        scenarioObj.groupElement.style.display = isVisible ? "block" : "none";
      });
  
      // Also update each scenario checkbox
      const labels = scenarioListDiv.querySelectorAll("label");
      labels.forEach((lbl) => {
        const checkbox = lbl.querySelector("input[type='checkbox']");
        if (checkbox) {
          checkbox.checked = isVisible;
        }
      });
    }
  
    // 5) Filter scenarios by name
    function filterScenarios() {
      const searchText = scenarioFilterInput.value.toLowerCase();
      const labels = scenarioListDiv.querySelectorAll("label");
  
      labels.forEach((lbl) => {
        const scenarioName = lbl.dataset.scenarioName || "";
        if (!searchText || scenarioName.includes(searchText)) {
          lbl.style.display = "block";
        } else {
          lbl.style.display = "none";
        }
      });
    }
  
    scenarioFilterInput.addEventListener("input", filterScenarios);
  
    // 6) Make scenarioPanel draggable
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
  
    scenarioPanelHeader.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - scenarioPanel.offsetLeft;
      offsetY = e.clientY - scenarioPanel.offsetTop;
      scenarioPanel.style.userSelect = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      scenarioPanel.style.left = (e.clientX - offsetX) + "px";
      scenarioPanel.style.top = (e.clientY - offsetY) + "px";
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      scenarioPanel.style.userSelect = "auto";
    });
  
    // Build scenario checkboxes and "All flows" after diagram is drawn
    window.addEventListener("load", () => {
      buildAllFlowsCheckbox();
      buildScenarioCheckboxes();
    });
  })();
  