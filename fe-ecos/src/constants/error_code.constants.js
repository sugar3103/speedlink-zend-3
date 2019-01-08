export const errorCodeConstants = {
    SUCCESS: 1, //success
    FAILURE: 0, //failure
    FAILURE_IDENTITY_NOT_FOUND: -1, //Failure due to identity not being found
    FAILURE_IDENTITY_AMBIGUOUS: -2, //Failure due to identity being ambiguous
    FAILURE_CREDENTIAL_INVALID: -3, //Failure due to invalid credential being supplied
    FAILURE_UNCATEGORIZED: -4, //Failure due to uncategorized reasons
    FAILURE_AUTHENCATION: -5 //Failure authentication expired or does not exists
}