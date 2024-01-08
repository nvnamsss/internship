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
 *     LoginData:
 *       type: object
 *       properties:
 *        token:
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *        refresh_token:
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *         data:
 *           $ref: '#/components/schemas/LoginData'
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Grahams
 *      CreateStudentRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Leanne Grahams"
 *              code:
 *                  type: string
 *                  example: "1612404"
 *      StudentData:
 *        type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 0
 *              name:
 *                  type: string
 *                  example: "Leanne Grahams"
 *              code:
 *                  type: string
 *                  example: "1612404"
 *      CreateStudentResponse:
 *          type: object
 *          properties:
 *             meta:
 *                $ref: '#/components/schemas/Meta'
 *            data:
 *               $ref: '#/components/schemas/StudentData'
 */
