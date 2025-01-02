
window.refundController = [
      {
        "featureName": "refundFlow",
        "color": "#FF9800",
        "steps": [
          {
            "step": 1,
            "description": "Client requests a refund from the Order Service",
            "sourceMicroservice": "Client",
            "destinationMicroservice": "Order Service",
            "request": {
              "method": "POST",
              "url": "/orders/ORD-001/refund",
              "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "Content-Type": "application/json"
              },
              "body": {
                "reason": "Item arrived damaged"
              }
            },
            "response": {
              "statusCode": 200,
              "body": {
                "refundRequestId": "RR-12345",
                "status": "PENDING",
                "message": "Your refund request has been received."
              }
            }
          },
          {
            "step": 2,
            "description": "Order Service contacts Payment Service to process the refund",
            "sourceMicroservice": "Order Service",
            "destinationMicroservice": "Payment Service",
            "request": {
              "method": "POST",
              "url": "/payments/refund",
              "headers": {
                "Content-Type": "application/json"
              },
              "body": {
                "orderId": "ORD-001",
                "refundRequestId": "RR-12345",
                "amount": 75.99,
                "currency": "USD"
              }
            },
            "response": {
              "statusCode": 200,
              "body": {
                "refundId": "REF-98765",
                "status": "REFUNDED",
                "refundAmount": 75.99,
                "currency": "USD"
              }
            }
          },
          {
            "step": 3,
            "description": "Order Service finalizes the refund status and informs the client",
            "sourceMicroservice": "Order Service",
            "destinationMicroservice": "Client",
            "request": {
              "method": "POST",
              "url": "/notifications/send",
              "headers": {
                "Content-Type": "application/json"
              },
              "body": {
                "userId": "john.doe",
                "message": "Your refund for Order ORD-001 has been processed successfully."
              }
            },
            "response": {
              "statusCode": 200,
              "body": {
                "notificationId": "NOTIF-45678",
                "status": "SENT"
              }
            }
          }
        ]
      }
    ];
    