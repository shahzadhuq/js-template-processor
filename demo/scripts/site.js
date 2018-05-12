"use strict";

(function () {
  window.onload = function() {
    ProduceFinalHTML();
  }

  function ProduceFinalHTML() {
    try {

      // Template and rendering
      const myTemplateId = "my-template";
      const finalHtmlAnchorId = "final-html-anchor";

      const myTemplate = document.getElementById(myTemplateId);
      let finalHtmlAnchor = document.getElementById(finalHtmlAnchorId);

      // Template data source
      const dataSource = {
        userName: "Minion",
        pictureName: "awww"
      }

      // Template Processor configurations
      const config = {
        template: myTemplate.innerHTML,
        data: dataSource
      };

      // Use template processor to generate the final HTML
      const templateProcessor = new TemplateProcessor(config);
      const response = templateProcessor.process();

      // Render the final HTML
      if (!response.hasError) {
        finalHtmlAnchor.innerHTML = response.html;
      } else {
        showError(response.exception);
      }
    }
    catch (e) {
      showError(e)
    }

  }

  // Helper to show errors
  function showError(exception) {
    const errorId = "error";
    const activeClassName = "active";

    let errorAnchor = document.getElementById("error");

    errorAnchor.innerHTML = exception;
    errorAnchor.classList.add(activeClassName);
  }

})();
