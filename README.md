## Purpose
Processing HTML template with a data-source is super easy with libraries and frameworks like **React**, **Angular**, and more.  What if you don't have any of these libraries and need a lightweight JavaScript solution which should be template and data source agnostic.  Let me introduce you to ***TemplateProcessor*** library.

Out of the box, the **TemplateProcessor** library accepts html template and data source and it outputs final HTML that can be rendered.

> For detailed example walkthrough, please reference this [blog post](http://www.shahzadhuq.com/blog/js/template-processor).

> For a working example, please see the ***Demo*** folder

## How to use TemplateProcessor library

1. Prepare your configuration as shown below:

```
const config = {
  template: "<h1>Hello, {{fullName}}</h1>",
  data: {
    fullName: "Shahzad Huq"
  }
};
```
> please ensure each {{property}} specified in the template is present in the data source as well. Otherwise, {{property}} not found in data source are returned as is in the final HTML

> 'data' could be a single object or array of objects

2. Use library to produce final HTML

```
  const templateProcessor = new TemplateProcessor(config);
  const response = templateProcessor.process();
```

3. Render the final HTML from the *response* as shown below:

```
{
  hasErrors: false,
  error: null,
  html: "<h1>Hello, Shahzad Huq</h1>"
}
```

The *response* object represents the properties shown in table below:

| Property |      Default  |  Description
|----------|:-------------:|------
| hasError |  false        | Boolean flag indicating any processing error
| exception |    null   |   JavaScript exception object containing all the information
| html | null |    Contains the final HTML.  But if any processing error had occurred then this will be null
