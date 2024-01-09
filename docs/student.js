/**
 * @swagger
 * components:
 *  schemas:
 *     GetStudentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/StudentData'
 *     CreateStudentRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Hi mom"
 *              code:
 *                  type: string
 *                  example: "1612404"
 *     StudentData:
 *          type: object
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
 *     CreateStudentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/StudentData'
 */
