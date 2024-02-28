/**
 * @swagger
 * components:
 *  schemas:
 *      MajorData:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *              name:
 *                  type: string
 *                  example: "Computer Science"
 *              code:
 *                  type: string
 *                  example: "CS"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      GetAllMajorResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/GetAllMajorData'
 *
 *      GetAllMajorData:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/MajorData'
 */