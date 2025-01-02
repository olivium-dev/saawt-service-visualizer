window.walletControllerGetSystemWallet = [
  {
    "featureName": "getSystemWalletFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests the system wallet from the Gateway",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "GET",
          "url": "/api/Wallet/system-wallet",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "walletHolder": {
              "holderId": "00000000-0000-0000-0000-000000000000",
              "holderName": "System",
              "holderType": "SYSTEM",
              "isActive": true,
              "createdAt": "2025-01-01T00:00:00Z"
            },
            "wallets": []
          }
        }
      }
    ]
  }
];

window.walletControllerCreateWalletOwner = [
  {
    "featureName": "createWalletOwnerFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests the creation of a new wallet owner from the Gateway",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/holder/add",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "walletHolder": {
              "holderId": "123e4567-e89b-12d3-a456-426614174000",
              "holderName": "John Doe",
              "holderType": "INDIVIDUAL"
            },
            "wallets": [
              {
                "currencyID": 840,
                "type": "PRIMARY",
                "note": "Main USD wallet"
              }
            ]
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "walletHolder": {
              "holderId": "123e4567-e89b-12d3-a456-426614174000",
              "holderName": "John Doe",
              "holderType": "INDIVIDUAL",
              "isActive": true,
              "createdAt": "2025-01-01T00:00:00Z"
            },
            "wallets": [
              {
                "walletId": "234e4567-e89b-12d3-a456-426614174000",
                "holderId": "123e4567-e89b-12d3-a456-426614174000",
                "currencyID": 840,
                "amount": 0.0,
                "type": "PRIMARY",
                "note": "Main USD wallet",
                "isActive": true,
                "createdAt": "2025-01-01T00:00:00Z"
              }
            ]
          }
        }
      }
    ]
  }
];

window.walletControllerAddWalletToOwner = [
  {
    "featureName": "addWalletToOwnerFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client adds a new wallet to an existing wallet holder",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/holder/123e4567-e89b-12d3-a456-426614174000/Add",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "currencyID": 978,
            "type": "SAVINGS",
            "note": "Euro Savings"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "walletId": "345e4567-e89b-12d3-a456-426614174000",
            "holderId": "123e4567-e89b-12d3-a456-426614174000",
            "currencyID": 978,
            "amount": 0.0,
            "type": "SAVINGS",
            "note": "Euro Savings",
            "isActive": true,
            "createdAt": "2025-01-01T00:00:00Z"
          }
        }
      }
    ]
  }
];

window.walletControllerDeactivateWallet = [
  {
    "featureName": "deactivateWalletFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests the deactivation of a specific wallet",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/123e4567-e89b-12d3-a456-426614174000/345e4567-e89b-12d3-a456-426614174000/deactivate",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 202,
          "body": {}
        }
      }
    ]
  }
];

window.walletControllerForceDeactivateWallet = [
  {
    "featureName": "forceDeactivateWalletFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests the force deactivation of a specific wallet",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/123e4567-e89b-12d3-a456-426614174000/345e4567-e89b-12d3-a456-426614174000/deactivate/force-deactivate",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 202,
          "body": {}
        }
      }
    ]
  }
];

window.walletControllerDeactivateWalletHolder = [
  {
    "featureName": "deactivateWalletHolderFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests the deactivation of a wallet holder",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/holder/123e4567-e89b-12d3-a456-426614174000/deactivate",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 202,
          "body": {}
        }
      }
    ]
  }
];

window.walletControllerForceDeactivateWalletHolder = [
  {
    "featureName": "forceDeactivateWalletHolderFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests force deactivation of a wallet holder",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "POST",
          "url": "/api/Wallet/holder/123e4567-e89b-12d3-a456-426614174000/deactivate/force-deactivate",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 202,
          "body": {}
        }
      }
    ]
  }
];

window.walletControllerGetHolderWallets = [
  {
    "featureName": "getHolderWalletsFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client retrieves all wallets for a given wallet holder",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (WalletController)",
        "request": {
          "method": "GET",
          "url": "/api/Wallet/holder/123e4567-e89b-12d3-a456-426614174000/wallets",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "walletHolder": {
              "holderId": "123e4567-e89b-12d3-a456-426614174000",
              "holderName": "John Doe",
              "holderType": "INDIVIDUAL",
              "isActive": true,
              "createdAt": "2025-01-01T00:00:00Z"
            },
            "wallets": [
              {
                "walletId": "456e4567-e89b-12d3-a456-426614174000",
                "holderId": "123e4567-e89b-12d3-a456-426614174000",
                "currencyID": 840,
                "amount": 100.0,
                "type": "PRIMARY",
                "note": "USD Main",
                "isActive": true,
                "createdAt": "2025-01-01T00:00:00Z"
              },
              {
                "walletId": "789e4567-e89b-12d3-a456-426614174000",
                "holderId": "123e4567-e89b-12d3-a456-426614174000",
                "currencyID": 978,
                "amount": 50.0,
                "type": "SAVINGS",
                "note": "Euro Savings",
                "isActive": true,
                "createdAt": "2025-01-01T00:00:00Z"
              }
            ]
          }
        }
      }
    ]
  }
];
