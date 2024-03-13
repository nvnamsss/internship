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
 *              major:
 *                  $ref: '#/components/schemas/MajorData'
 *              student:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/StudentData'
 *              data:
 *                  type: object
 *      
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
 *              major_id:
 *                  type: integer
 *                  example: 1
 *              start_date:
 *                  type: string
 *                  example: "2024-01-05"
 *              end_data:
 *                  type: string
 *                  example: "2024-01-05"
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

/**
 * @swagger
 * components:
 *  schemas:
 *      EvaluateStudentRequest:
 *          type: object
 *          properties:
 *              score:
 *                  type: float
 *                  example: 3.2
 *              comment:
 *                  type: string
 *                  example: "Very good"
 *      EvaluateStudentResponse:
 *          type: object
 *          properties:
 *              meta:
 *                  $ref: '#/components/schemas/Meta'
 *              data:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: int
 *                          example: 1
 *                      score:
 *                          type: float
 *                          example: 3.2
 *                      comment:
 *                          type: string
 *                          example: "Very good"
 *                      status:
 *                          type: string
 *                          example: "pass/failed"
 * 
 */