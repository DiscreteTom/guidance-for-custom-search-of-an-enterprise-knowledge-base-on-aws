import json
import os
import logging
import boto3
import sys

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

dynamodb = boto3.resource('dynamodb')
connections = dynamodb.Table(os.environ['TABLE_NAME'])

def lambda_handler(event, context):
    logger.debug("private-search: %s" % event)

    # connection id is retrieved from the request header
    connectionId = event.get('headers',{}).get('connectionId')
    if connectionId is None:
        return { 'statusCode': 400, 
                 'body': 'bad request' }

    # store in ddb
    result = connections.put_item(Item={ 'id': connectionId})
    if result.get('ResponseMetadata',{}).get('HTTPStatusCode') != 200:
        return { 'statusCode': 500,
                 'body': 'something went wrong' }

    # invoke processor
    _function_name = 'langchain_processor_qa'
    try:
        lam.invoke(
            FunctionName=_function_name,
            InvocationType="Event",
            Payload=json.dumps(event)
        )
        return {
            "statusCode": 200,
        }
    except Exception as e:
        print(e)
