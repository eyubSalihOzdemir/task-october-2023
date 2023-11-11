const ERROR_TYPES = {
    INFORMATION: 'Information',
    REDIRECTION: 'Redirection',
    CLIENT_ERROR: 'ClientError',
    SERVER_ERROR: 'ServerError',
    UNEXPECTED_ERROR: 'UnexpectedError'
};

async function getResponse(apiEndpoint) {
    // we'll use try-catch block to keep the request process in control
    // this way we can decide what code to run if the result is a success or something else
	try {
        // actual request
        const response = await fetch(
            apiEndpoint,
            {
                method: 'GET',
            }
        );
        
        // if the response is not ok, throw an error an cancel the remaining process
        if (!response.ok) {
            // get the first number of status to catch all the other status codes in between
            // like 100-199, 300-399 etc.
            switch(Math.floor(response.status / 100)) {
                case 1:
                    throw {type: ERROR_TYPES.INFORMATION, message: `Info: ${response.statusText}. API call returned status ${response.status}`, status: response.status};
                case 3:
                    throw {type: ERROR_TYPES.REDIRECTION, message: `Redirection: ${response.statusText}. API call returned status ${response.status}.`, status: response.status};
                case 4:
                    throw {type: ERROR_TYPES.CLIENT_ERROR, message: `ClientError: ${response.statusText}. API call returned status ${response.status}.`, status: response.status};
                case 5:
                    throw {type: ERROR_TYPES.SERVER_ERROR, message: `ServerError: ${response.statusText}. API call returned status ${response.status}.`, status: response.status};
                default:
                    throw {type: ERROR_TYPES.UNEXPECTED_ERROR, message: `UnexpectedError: ${response.statusText}. API call returned status ${response.status}.`, status: response.status};
            }
        }
        // if we're here, the response is OK

        // show the user a clear message about the successful response
        console.log(`Success: ${response.statusText}. API call returned status ${response.status}.`)
        console.log('Yay! Everything went well.')
        
        const data = await response.json();

        console.log(data);
        console.log('');

        // other things to do with the response goes here...
        // we can either return the data or do other things
        
        // return data;

    } catch(error) {
        // show the user a clear message on the console about the response
        switch(error.type) {
            case 'Information':
            case 'Redirection':
                console.info(error.message);
                break;
            case 'ClientError':
            case 'ServerError':
            case 'UnexpectedError':
                console.error(error.message);
                break;
            default:
                console.error(`Unexpected error: ${error.message}`);
        }
        
        console.log('');

        // other things to do when an error is catched goes here...
    }
}

const endpoints = [
    'https://jsonplaceholder.typicode.com/todos/1', // Success
    'https://httpbin.org/status/300',               // Redirection
    'https://httpbin.org/status/404',               // ClientError
    'https://httpbin.org/status/505',               // ServerError
    'aEFJAPw5b[-*AW#_A(WEFJAPwaor[mwv0'            // Unexpected
];
endpoints.forEach(endpoint => getResponse(endpoint));