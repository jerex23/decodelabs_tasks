import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="AddNumbers")
def AddNumbers(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('AddNumbers function triggered a request.')

    try:
        req_body = req.get_json()
        num1 = req_body.get('num1')
        num2 = req_body.get('num2')
    except ValueError:
        num1 = req.params.get('num1')
        num2 = req.params.get('num2')

    if num1 is None or num2 is None:
        return func.HttpResponse(
            "Please pass num1 and num2 either in the query string or request body.",
            status_code=400
        )

    try:
        result = float(num1) + float(num2)
    except (ValueError, TypeError):
        return func.HttpResponse(
            "num1 and num2 must be valid numbers.",
            status_code=400
        )

    return func.HttpResponse(
        json.dumps({"sum": result}),
        mimetype="application/json",
        status_code=200
    )