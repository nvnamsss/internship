/**
 * @swagger
 * components:
 *  schemas:
 *      GetReportResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/GetReportData'
 *
 *      GetReportData:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *              ref_id:
 *                  type: string
 *                  example: 24bac433-6063-4f52-81d7-3db98e10bde1
 *              class_id:
 *                  type: integer
 *              student_id:
 *                  type: integer
 *              assignment_id:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateReportRequest:
 *          type: object
 *          properties:
 *              assignment_id:
 *                  type: integer
 *              file:
 *                  type: file
 * 
 *      CreateReportResponse:
 *          type: object
 *          properties:  
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 */