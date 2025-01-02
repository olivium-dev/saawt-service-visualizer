window.userControllerCheck = [
  {
    "featureName": "checkUserServiceFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client verifies User service availability",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "GET",
          "url": "/api/User/check",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "message": "Service is up and running."
          }
        }
      }
    ]
  }
];

window.userControllerIssueToken = [
  {
    "featureName": "issueTokenFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client issues or validates a token with the Gateway",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/issue-token",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "token": "<JWT token>"
          }
        },
        "response": {
          "statusCode": 200,
          "body": "Token validated and cookie set."
        }
      }
    ]
  }
];

window.userControllerTokenLogin = [
  {
    "featureName": "tokenLoginFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client attempts token-based login",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "GET",
          "url": "/api/User/token-login",
          "headers": {
            "Cookie": "authToken=<JWT token>"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "<user-id>",
            "authToken": "<JWT token>",
            "refreshToken": "<refresh-token>"
          }
        }
      }
    ]
  }
];

window.userControllerExpireLoginCookie = [
  {
    "featureName": "expireLoginCookieFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests to expire login cookie",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "GET",
          "url": "/api/User/expire-login-cookie",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true,
            "message": "Cookie expired successfully"
          }
        }
      }
    ]
  }
];

window.userControllerRegister = [
  {
    "featureName": "registerUserFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client registers a new user",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/register",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "email": "john.doe@example.com",
            "password": "secret123",
            "confirmPassword": "secret123",
            "username": "johndoe",
            "referralCode": ""
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "username": "johndoe",
            "email": "john.doe@example.com",
            "createdDate": "2025-01-01T00:00:00Z",
            "status": "Active"
          }
        }
      }
    ]
  }
];

window.userControllerLogin = [
  {
    "featureName": "userLoginFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client logs in a user",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/login",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "email": "john.doe@example.com",
            "password": "secret123"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "authToken": "<JWT token>",
            "refreshToken": "<refresh-token>"
          }
        }
      }
    ]
  }
];

window.userControllerLogout = [
  {
    "featureName": "userLogoutFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client logs out a user",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/logout",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true
          }
        }
      }
    ]
  }
];

window.userControllerSocial = [
  {
    "featureName": "userSocialLoginFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client logs in using a social platform",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/social",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "socialId": "9876543210",
            "socialToken": "token-from-social-platform",
            "socialPlatform": "Facebook"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "authToken": "<JWT token>"
          }
        }
      }
    ]
  }
];

window.userControllerForgotPassword = [
  {
    "featureName": "forgotPasswordFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests a password reset link",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/password/forgot",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {
            "email": "john.doe@example.com"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true
          }
        }
      }
    ]
  }
];

window.userControllerResetPassword = [
  {
    "featureName": "resetPasswordFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client resets the user’s password",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/password/reset",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {
            "token": "<reset-token>",
            "newPassword": "newSecret123",
            "confirmPassword": "newSecret123"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true
          }
        }
      }
    ]
  }
];

window.userControllerProfile = [
  {
    "featureName": "getUserProfileFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client retrieves user profile",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "GET",
          "url": "/api/User/profile/123e4567-e89b-12d3-a456-426614174000",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {}
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "username": "johndoe",
            "email": "john.doe@example.com",
            "profilePic": "profile-pic.jpg"
          }
        }
      }
    ]
  }
];

window.userControllerUpdateProfile = [
  {
    "featureName": "updateUserProfileFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client updates a user’s profile data",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "PUT",
          "url": "/api/User/profile/update",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "email": "john.doe@example.com",
            "username": "John Doe",
            "profilePic": "new-profile-pic.jpg"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "email": "john.doe@example.com",
            "username": "John Doe",
            "profilePic": "new-profile-pic.jpg"
          }
        }
      }
    ]
  }
];

window.userControllerUploadProfilePicture = [
  {
    "featureName": "uploadProfilePictureFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client uploads a new profile picture",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/profile/uploadProfilePicture?mediaTypeName=profile-picture",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "multipart/form-data"
          },
          "body": {
            "file": "<binary file content>"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "fileName": "generated-profile-picture-name.jpg"
          }
        }
      }
    ]
  }
];

window.userControllerRegisterDevice = [
  {
    "featureName": "registerDeviceFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client registers a new device for push notifications or similar",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/device/register",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "deviceId": "device123",
            "deviceToken": "tokenXYZ"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true
          }
        }
      }
    ]
  }
];

window.userControllerUnregisterDevice = [
  {
    "featureName": "unregisterDeviceFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client unregisters a device",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/device/unregister",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "userId": "123e4567-e89b-12d3-a456-426614174000",
            "deviceId": "device123"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "success": true
          }
        }
      }
    ]
  }
];

window.userControllerIssuePaymentAuthToken = [
  {
    "featureName": "issuePaymentAuthTokenFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client requests a payment auth token to be set in cookies",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/issue-payment-auth-token",
          "headers": {
            "Authorization": "Bearer <token>",
            "Content-Type": "application/json"
          },
          "body": {
            "itemId": "some-item-id",
            "token": ""
          }
        },
        "response": {
          "statusCode": 200,
          "body": "Token issued and cookie set."
        }
      }
    ]
  }
];

window.userControllerValidatePaymentAuthToken = [
  {
    "featureName": "validatePaymentAuthTokenFlow",
    "color": "#4CAF50",
    "steps": [
      {
        "step": 1,
        "description": "Client validates a previously issued payment auth token",
        "sourceMicroservice": "Client",
        "destinationMicroservice": "Gateway (UserController)",
        "request": {
          "method": "POST",
          "url": "/api/User/validate-payment-auth-token",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": {
            "token": "<payment-auth-token>"
          }
        },
        "response": {
          "statusCode": 200,
          "body": {
            "isValid": true,
            "itemId": "some-item-id"
          }
        }
      }
    ]
  }
];
