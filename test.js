//load files from the .env file
require('dotenv').config();
//Import AWS SDK
var AWS = require('aws-sdk');
//SES
var ses = new AWS.SES({apiVersion: '2010-12-01'});
//Dynamo DB
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


function createDB() {
    var params = {
      AttributeDefinitions: [
        {
            AttributeName: "id", 
            AttributeType: "N"
        },
        {
            AttributeName: "firstName", 
            AttributeType: "S"
        },  
      ], 
      KeySchema: [
        {
        AttributeName: "id", 
        KeyType: "HASH"
       },
       {
        AttributeName: "firstName", 
        KeyType: "RANGE"
       },
      ], 
      TableName: process.argv[2],
      BillingMode: "PAY_PER_REQUEST",
     };
     dynamodb.createTable(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else  {
        console.log(data);           // successful response
        var params = {
            Item: {
                "id": {
                    N: "1"
                   }, 
             "firstName": {
               S: "gabriel"
              }, 
             "lastName": {
               S: "kay"
              }, 
             "email": {
               S: "gkardonski@gmail.com"
              }
            }, 
            TableName: process.argv[2],
           };
           dynamodb.putItem(params, function(err, data) {
             if (err) console.log(err, err.stack); // an error occurred
             else     console.log(data);           // successful response
             /*
             data = {
              ConsumedCapacity: {
               CapacityUnits: 1, 
               TableName: "Music"
              }
             }
             */
           });
       }   
       /*
       data = {
        TableDescription: {
         AttributeDefinitions: [
            {
           AttributeName: "Artist", 
           AttributeType: "S"
          }, 
            {
           AttributeName: "SongTitle", 
           AttributeType: "S"
          }
         ], 
         CreationDateTime: <Date Representation>, 
         ItemCount: 0, 
         KeySchema: [
            {
           AttributeName: "Artist", 
           KeyType: "HASH"
          }, 
            {
           AttributeName: "SongTitle", 
           KeyType: "RANGE"
          }
         ], 
         ProvisionedThroughput: {
          ReadCapacityUnits: 5, 
          WriteCapacityUnits: 5
         }, 
         TableName: "Music", 
         TableSizeBytes: 0, 
         TableStatus: "CREATING"
        }
       }
       */
     });
  }

  

  createDB();