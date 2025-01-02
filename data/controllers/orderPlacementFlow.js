
window.orderController = [
    {
      "featureName": "orderPlacementFlow",
      "color": "#4CAF50",
      "steps": [
        {
          "step": 1,
          "description": "Client logs in and obtains an authentication token from Auth Service",
          "sourceMicroservice": "Client",
          "destinationMicroservice": "Auth Service",
          "request": {
            "method": "POST",
            "url": "/auth/login",
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "username": "john.doe",
              "password": "secret123"
            }
          },
          "response": {
            "statusCode": 200,
            "body": {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
          }
        },
        {
          "step": 2,
          "description": "Client creates a new order with the Order Service",
          "sourceMicroservice": "Client",
          "destinationMicroservice": "Order Service",
          "request": {
            "method": "POST",
            "url": "/orders",
            "headers": {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "Content-Type": "application/json"
            },
            "body": {
              "items": [
                {
                  "productId": "P12345",
                  "quantity": 2
                },
                {
                  "productId": "P67890",
                  "quantity": 1
                }
              ],
              "shippingAddress": "123 Main St, Springfield, USA"
            }
          },
          "response": {
            "statusCode": 201,
            "body": {
              "orderId": "ORD-001",
              "status": "CREATED"
            }
          }
        },
        {
          "step": 3,
          "description": "Order Service checks Inventory Service for product availability",
          "sourceMicroservice": "Order Service",
          "destinationMicroservice": "Inventory Service",
          "request": {
            "method": "GET",
            "url": "/inventory/checkAvailability?productId=P12345&quantity=2&productId=P67890&quantity=1",
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {}
          },
          "response": {
            "statusCode": 200,
            "body": {
              "products": [
                {
                  "productId": "P12345",
                  "availableQuantity": 100,
                  "isAvailable": true
                },
                {
                  "productId": "P67890",
                  "availableQuantity": 10,
                  "isAvailable": true
                }
              ],
              "allAvailable": true
            }
          }
        },
        {
          "step": 4,
          "description": "Order Service processes payment through Payment Service",
          "sourceMicroservice": "Order Service",
          "destinationMicroservice": "Payment Service",
          "request": {
            "method": "POST",
            "url": "/payments",
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "orderId": "ORD-001",
              "amount": 75.99,
              "currency": "USD",
              "paymentMethod": {
                "type": "CREDIT_CARD",
                "cardNumber": "4111 1111 1111 1111",
                "expiryMonth": 12,
                "expiryYear": 2026,
                "cvv": "123"
              }
            }
          },
          "response": {
            "statusCode": 200,
            "body": {
              "paymentId": "PAY-ABC-123",
              "status": "SUCCESS",
              "authorizedAmount": 75.99,
              "currency": "USD"
            }
          }
        },
        {
          "step": 5,
          "description": "Client finalizes the order status in the Order Service and receives confirmation",
          "sourceMicroservice": "Client",
          "destinationMicroservice": "Order Service",
          "request": {
            "method": "PATCH",
            "url": "/orders/ORD-001",
            "headers": {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "Content-Type": "application/json"
            },
            "body": {
              "status": "PLACED"
            }
          },
          "response": {
            "statusCode": 200,
            "body": {
              "orderId": "ORD-001",
              "status": "PLACED",
              "message": "Your order has been successfully placed."
            }
          }
        }
      ]
    }
    ];
    