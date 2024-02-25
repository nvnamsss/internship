/**
 * @swagger
 * components:
 *  schemas:
 *      AssignmentData:
 *          type: object
 *          properties:
 *              class_id:
 *                  type: integer
 *                  example: 1
 *              name:
 *                  type: string
 *                  example: "Assignment"
 *              verified:
 *                  type: boolean
 *                  example: false
 *              data:
 *                  type: object
 *                  example: {}
 * 
 */


/**
 * @swagger
 * components:
 *  schemas:
 *      GetClassResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/ClassData'
 * 
 *      ClassData:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 0
 *              code:
 *                  type: string
 *                  example: "C31213"
 *              name:
 *                  type: string
 *                  example: "Class A323"
 *              assignments:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/AssignmentData'
 *              data:
 *                  type: object
 * 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SearchClassResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ClassData'
 * 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateClassRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "1612404"
 *              code:
 *                  type: string
 *                  example: "1612404"
 *              module_id:
 *                  type: integer
 *                  example: 1
 *              module_name:
 *                  type: string
 *                  example: "1612404"
 *              assignments:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Assignment"
 * 
 *      CreateClassResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/ClassData'
 * 
 * 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      EnrollClassRequest:
 *          type: object
 *          properties:
 *              student_ids:
 *                  type: array
 *                  items:
 *                      type: integer
 *                      example: 1
 *      EnrollClassResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/EnrollClassData'
 *      EnrollClassData:
 *          type: object
 *          properties:
 *              count:
 *                  type: integer
 *                  example: 1
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      AddAssignmentRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Assignment name"
 *      AddAssignmentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/AssignmentData'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      VerifyAssignmentRequest:
 *          type: object
 *          properties:
 *              name:
 *                  verified: bool
 *                  example: false
 *      VerifyAssignmentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/AssignmentData'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      AddMeetingRequest:
 *          type: object
 *          properties:
 *              from:
 *                  type: string
 *                  example: "2024-01-05 18:00:00"
 *                  format: date-time
 *              to:
 *                  type: string
 *                  example: "2024-01-05 18:00:00"
 *                  format: date-time
 *              interval:
 *                  type: integer
 *                  example: 15
 *              room:
 *                  type: string
 *                  example: "I53"
 *      AddMeetingResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  $ref: '#/components/schemas/AddMeetingData'
 *      AddMeetingData:
 *          type: object
 *          properties:
 *              count:
 *                  type: integer
 *                  example: 1
 */