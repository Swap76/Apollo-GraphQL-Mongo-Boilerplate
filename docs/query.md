# Query
Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.

For few Queries the JWT token is neccessary. Good practice will be to send JWT when ever user is logged in.

## Main Pages

**blogs** ([[Blog!]](interfaces.md#blog))
Look up for blogs   

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``limit`` | ``Int`` | Limit the number of blogs |
| ``skip`` | ``Int`` | Skip few blogs from the start |
| ``where`` | ``BlogWhereInput`` | Find by specific value of the fields |

## Authentication

**login** ([QueryResponse!](query.md#query-response))
Login with email and password 

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``email`` | ``String!`` | Email Id of user |
| ``password`` | ``String!`` | Password of user |


**resendOtp** ([QueryResponse!](query.md#query-response))
Resend the OTP to mail of user

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``userId`` | ``String!`` | userId of user |

**forgotPasswordMail** ([QueryResponse!](query.md#query-response))
Send password reset link using mail

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``email`` | ``String!`` | Email Id of user |

## Blog

**blogById** ([singleBlog!](interfaces.md#blog))
Look up for single blog with comments   

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``ID!`` | ID of blog |

**blogByUser** ([Blog!](interfaces.md#blog))
Look up for blogs by a particular user 

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``userId`` | ``String!`` | Find using user Id |
| ``limit`` | ``Int`` | Limit the number of blogs |
| ``skip`` | ``Int`` | Skip few blogs from the start |
| ``where`` | ``BlogWhereInput`` | Find by specific value of the fields |

## Comment

**comments** ([[Comment!]](interfaces.md#comment))
Look up for comments   

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``limit`` | ``Int`` | Limit the number of comments |
| ``skip`` | ``Int`` | Skip few comments from the start |
| ``where`` | ``CommentWhereInput`` | Find by specific value of the fields |

**commentById** ([Comment!](interfaces.md#comment))
Look up for single comment by Id  

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``ID!`` | ID of comment |

## User

**users** ([[User!]](interfaces.md#user))
Look up for users   

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``limit`` | ``Int`` | Limit the number of users |
| ``skip`` | ``Int`` | Skip few users from the start |
| ``where`` | ``UserWhereInput`` | Find by specific value of the fields |

**userById** ([User!](interfaces.md#user))
Look up for single user by Id  

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``ID!`` | ID of user |

## Query Response

This response is for some queries

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``code`` | ``Int!`` | Status Code|
| ``success`` | ``Boolean!`` | Tells Success of queries |
| ``message`` | ``String!`` | Provide message after queries |