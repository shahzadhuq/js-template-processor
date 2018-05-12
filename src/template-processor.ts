/* Note: only for simplicity, these interfaces are included in the same file.  It's recommended to track these
interfaces in their own files.
*/
interface TemplateProcessorConfig {
  template: string;
  data: any;
  autoIncrementIndex?: string
}

interface TemplateProcessorResponse {
  hasError: boolean;
  exception: object;
  html: string;
}

/**
 * Helps process Html templates
 */
class TemplateProcessor {

  config: TemplateProcessorConfig;

  constructor(config: TemplateProcessorConfig) {
    this.config = config;
  }

 /**
 * Using the Html template and data source, it produces the final HTML
 * @returns Returns a response of type  TemplateProcessorResponse
 */
  public process(): TemplateProcessorResponse {

    if (this.config.data.html && this.config.data.html.lenght === 0)
    return;

    let response: TemplateProcessorResponse = {
      hasError: false,
      exception: null,
      html: null
    };

    try {

      let finalHTML = ""; // Used to track processed template
      const data = this.config.data; // Data source: could be a single object or an array of objects
      const autoIncrementIndexDefault = 0;
      const autoIncrementIndex = this.config.autoIncrementIndex || null; // optional unique element identifier

      // For array of items, cycle through each item
      if (Array.isArray(data)) {
        data.forEach(function (d, index) {
          finalHTML = finalHTML + this.processData(d, index, autoIncrementIndex); // Cycle through each property in the item
        });
      } else {
        finalHTML = this.processData(data, autoIncrementIndexDefault, autoIncrementIndex); // For single object, just cycle through each property in the item
      }

      response.html = finalHTML;

    }
    catch (e) {
      response.hasError = true;
      response.exception = e;
      response.html = null;
    }

    return response;
  }

  // Helper function to process item(s) in the data source
  private processData = (obj, uniqueId, autoIncrementIndex): string => {
    if (!obj) { return; } // Exist if object is null

    let newItem = null; // Used to track new item over each iteration
    let searchExpression = null; // Used to search replacement token in the template

    newItem = this.config.template;

    // Perform a case insensitive search for all instance of the property like {{propertyName}} and replace it
    Object.keys(obj).forEach(function (key, index) {
      searchExpression = new RegExp("{{" + key + "}}", "gi"); // g: search for all instance, i: ignore case
      newItem = newItem.replace(searchExpression, obj[key]);
    });

    // This is only applicable if we want to generate unique DOM elements
    // The template must have this exact keyword present to be replaced
    if (autoIncrementIndex) {
      searchExpression = new RegExp(autoIncrementIndex, "gi");
      newItem = newItem.replace(searchExpression, uniqueId);
    }

    return newItem;
  };
}
