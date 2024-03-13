/**
 * @swagger
 * components:
 *   schemas:
 *     Meta:
 *      type: object
 *      properties:
 *          code:
 *              type: integer
 *              example: 4040001
 *          message:
 *              type: string
 *              example: "OK"
 *     LoginRequest:
 *       type: object
 *       properties:
 *         username:
 *          type: string
 *          example: "username"
 *         password:
 *          type: string
 *          example: "password"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *         data:
 *           $ref: '#/components/schemas/LoginData'
 * 
 *     LoginData:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *              refresh_token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *              user_info:
 *                  $ref: '#/components/schemas/UserData'
 *              role_id:
 *                  type: integer
 *                  example: 2
 *              role_name:
 *                  type: string
 *                  example: "student"
 *                  
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      RefreshTokenRequest:
 *          type: object
 *          properties:
 *              refresh_token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *      RefreshTokenResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/RefreshTokenData'
 *      RefreshTokenData:
 *          type: object
 *          properties:
 *              access_token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      RegisterRequest:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  example: "username"
 *              password:
 *                  type: string
 *                  example: "password"
 *              role_id:
 *                  type: integer
 *                  example: "{1, 2, 3}"
 *      RegisterResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      BindRequest:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *                  description: "student/teacher code"
 *                  example: "1612404"
 *   
 *      BindResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *     UserData:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Nguyen Van A"
 *              sex:
 *                  type: string
 *                  example: "Male"
 *              phone:
 *                  type: string
 *                  example: "0123456789"
 *              email:
 *                  type: string
 *                  example: "abc@gmail.com"
 *              nationality:
 *                  type: string
 *                  example: "Vietnamese"
 *              birthday:
 *                  type: string
 *                  example: "1999-01-01"
 *                  
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      GetUserResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/UserData'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdateUserRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Nguyen Van A"
 *              sex:
 *                  type: string
 *                  example: "Male"
 *              phone:
 *                  type: string
 *                  example: "0123456789"
 *              email:
 *                  type: string
 *                  example: "abc@gmail.com"
 *              nationality:
 *                  type: string
 *                  example: "Vietnamese"
 *              birthday:
 *                  type: string
 *                  example: "1999-01-01"
 *              
 *      UpdateUserResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/UpdateUserData'
 * 
 *      UpdateUserData:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Nguyen Van A"
 *              sex:
 *                  type: string
 *                  example: "Male"
 *              phone:
 *                  type: string
 *                  example: "0123456789"
 *              email:
 *                  type: string
 *                  example: "abc@gmail.com"
 *              nationality:
 *                  type: string
 *                  example: "Vietnamese"
 *              birthday:
 *                  type: string
 *                  example: "1999-01-01"
 *                  
 */