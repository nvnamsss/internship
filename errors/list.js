const {StatusCodes, ReasonPhrases} = require("http-status-codes")
const { NewError } = require("./error")

const ModuleCommon = 0
const ModuleStudent = 1
const ModuleTeacher = 2
const ModuleClass = 3
const ModuleAssignment = 4
const ModuleReport = 5

const ErrorNotFound = NewError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, ModuleCommon, 0);
const ErrorInvalidRequest = NewError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST, ModuleCommon, 0);
const ErrorDuplicated = NewError("record is duplicated", StatusCodes.BAD_REQUEST, ModuleCommon, 1);
const ErrUnauthorized = NewError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED, ModuleCommon, 0);
const ErrorInternalServer = NewError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR, ModuleCommon, 0);

const ErrorStudentNotFound = NewError("student not found", StatusCodes.NOT_FOUND, ModuleStudent, 0);
const ErrorStudentUnbinded = NewError("user was not binded to a student", StatusCodes.BAD_REQUEST, ModuleStudent, 0);

const ErrorTeacherNotFound = NewError("teacher not found", StatusCodes.NOT_FOUND, ModuleTeacher, 0);
const ErrorTeacherUnbinded = NewError("user was not binded to a teacher", StatusCodes.BAD_REQUEST, ModuleTeacher, 0)

const ErrorClassCodeDuplicate = NewError("class code is already exists", StatusCodes.BAD_REQUEST, ModuleClass, 0);
const ErrorStudentAlreadyEnrolled = NewError("student is already enrolled", StatusCodes.BAD_REQUEST, ModuleClass, 1);
const ErrorStudentIDsEmpty = NewError("student ids is empty", StatusCodes.BAD_REQUEST, ModuleClass, 2);
const ErrorAssignmentNotVerified = NewError("assignment is not verified", StatusCodes.BAD_REQUEST, ModuleClass, 2);

module.exports = {
    ModuleCommon,
    ModuleStudent,
    ModuleTeacher,
    ModuleClass,
    ModuleAssignment,
    ModuleReport,



    ErrorNotFound,
    ErrorInvalidRequest,
    ErrorStudentNotFound,
    ErrUnauthorized,
    ErrorInternalServer,
    ErrorClassCodeDuplicate,
    ErrorStudentAlreadyEnrolled,
    ErrorDuplicated,
    ErrorStudentIDsEmpty,
    ErrorAssignmentNotVerified,
    ErrorStudentUnbinded,
    ErrorTeacherUnbinded,
}