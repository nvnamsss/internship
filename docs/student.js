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
 *              data:
 *                  type: object
 *              score:
 *                  type: float
 *                  example: 4.2
 *              status:
 *                  type: string
 *                  example: "-/pass/failed"
 *              comment:
 *                  type: string
 *                  example: "hi mom"
 *              
 *     CreateStudentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/StudentData'
 */
