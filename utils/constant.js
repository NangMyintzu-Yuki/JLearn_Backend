const CONSTANTS = {
    messages: {
        success: "Success",
        failed: "Failed",
        created: "Successfully Created",
        updated: "Successfully Updated",
        deleted: "Successfully Deleted",
        retrieved: "Successfully Retrieved",
        failedToRetrieve: "There is no record to retrieve",
        failedToUpdate: "There is no record to update",
        failedToDelete: "There is no recored to delete",
        loginSuccess: "Successfully Login",
        loginFailed: "Incorrect phone or password! Please Try Again",
        changePasswordSuccess: "Successfully Changed Password",
        requiredPhone: "Phone Number is Required",
    },
    errors: {
        NOT_FOUND: "NOT_FOUND",
        INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
        ALREADY_EXIST: "Create Failed! RESOURCE ALREADY EXIST",
        CREATE_ERROR: "Create Failed! Please Try Again",
        UPDATE_ERROR: "Update Failed! Please Try Again",
        LOGIN_ERROR: "Login Failed! Please Try Again",
        FAILED_CHANGE_PASSWORD: "Failed Passwword Change! Please Try Again",
        RETRIEVE_ERROR: "Retrieve Failed! Please Try Again",
        DELETE_ERROR: "Delete Failed! Please Try Again",
        UPLOAD_ERROR: "Upload Failed! Please Try Again",
    },
    httpStatusCode: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER: 500,
    },


    apiResponseHeader: (code, status, message) => {
        return { code, status, message }
    }

}

module.exports = CONSTANTS