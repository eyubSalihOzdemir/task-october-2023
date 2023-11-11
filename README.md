# task-october-2023
## Number Grouping Problem
I explained the logic of the code using comments. You can find the details in "NumberGroupingProblem/index.php"

## Email Problem
I tried my best to implement OOP features. 
I've created a seperate "User" class to manage users more easily and securly. 
I created a "Constants" class to be able to change subject and body texts more easily, it can also be used for others constants in the future.
I've added the necessary functions inside the "Mail" class and explained key points using comments.
You can find the use case in "EmailProblem/index.php".

## JS API Problem
Since I don't know what the API can respond with, I thought it would be a good idea to categorize the respones status codes to distinguish response types: Information, Redirection, ClientError, ServerError and UnexpectedError (this allows me to handle other errors in the process).
I used console logging functions to let the user know of the responses as clear as I can.
I've wrote a function called "getResponse(apiEndpoint)" and used with a try-catch block to manage the request process.
Created a constants enumerator for error types.
Again, key points explained in the code using comments. Please check "JSProblem/main.js".

## Website Problem
This was by far the most time consuming problem but I believe that I nailed it. It was very hard to manage Symfony, Angular and MySQL all at the time since I don't have any prior experience on web applications and sources are pretty outdated but it also felt very rewarding at the end. 
I've used Angular 17 and Symfony 6.
All of the requirements in the provided PDF file are met and I believe the UI is also acceptable.
I've also tried to document each coding step for this project using Notion, if you wish to take a look at: [Notion](https://miniature-glue-ddc.notion.site/Symfony-Angular-8e35ca386d5346f7b76fa94b576d773f?pvs=4)
The most valuable source on this topic was thic blog post: [Okta Developer Blog Post](https://developer.okta.com/blog/2018/08/14/php-crud-app-symfony-angular#create-a-form-to-add-new-movies-to-the-angular-app)
Plaese check "WebsiteProblem/" folder for both Angular & Symfony project files if you wish to take a look at the code. I've also provided visual elements down below.
