Project 4: The Serverless Logic
Scenario

A company wants a simple Cost Calculator API. Running a server around the clock for such a small, occasionally used calculation would be wasteful, so the requirement is a solution that only runs, and only costs money, when it is actually triggered.

What serverless means and why it fits here

Serverless does not mean there is no server involved. It means the server is never provisioned or managed directly. Code exists only as a deployable package until a trigger causes it to run, and billing is based on execution time rather than uptime. For a function that adds two numbers and is called occasionally, this model avoids paying for idle capacity entirely, which is exactly the cost problem the scenario describes.

HTTP trigger and its two input paths

The function uses an HTTP trigger, meaning Azure exposes it at a URL that runs the function whenever a request arrives. The function accepts input two ways:

As URL query parameters, for example ?num1=5&num2=3.
As a JSON body, for example {"num1": 5, "num2": 3}.

Missing or invalid input returns a 400 status code with a clear message rather than allowing the function to fail silently.

Testing methods

The function was tested locally, then again against the live deployment, using three separate tools:

Browser, using the query string method: http://localhost:7071/api/AddNumbers?num1=5&num2=3
curl, using the JSON body method:
  curl -X POST http://localhost:7071/api/AddNumbers -H "Content-Type: application/json" -d "{\"num1\": 10, \"num2\": 15}"
Postman, sending the same JSON body as a POST request through its graphical interface.
Live invoke URL

[Insert your deployed function's invoke URL here, e.g. https://yourfunctionapp.azurewebsites.net/api/addnumbers]

Deployment troubleshooting

Several real constraints came up during deployment, worth documenting directly:

Flex Consumption is not available on free trial subscriptions, which surfaced as an explicit error during creation.
The Azure Portal's function creation wizard offers no Linux option for the classic Consumption plan once Python is selected, since Windows does not support the Python runtime for Azure Functions at all.
The workaround was to create the resource group, storage account, and function app directly through the Azure CLI, specifying --os-type linux explicitly, then publish the code with:
  func azure functionapp publish YOUR_FUNCTION_APP_NAME

A separate authentication issue also appeared when logging in to Azure CLI locally for the first time, resolved by completing multi factor authentication through the browser during az login.
