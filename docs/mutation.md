# Mutation

Every GraphQL schema has a root type for both queries and mutations.The mutations are the way of updating data in databases.

Sending JWT token with every request is necessary as all mutations required user to be logged in.

## Authentication

**signup** ([MutationResponse!](mutation.md#mutation-response))
Creating a blog.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``name`` | ``String!`` | Name of new User|
| ``username`` | ``String!`` | Username of new User |
| ``email`` | ``String!`` | Email ID of new User |
| ``password`` | ``String!`` | Password of new User |

**verifyUser** ([MutationResponse!](mutation.md#mutation-response))
Verifing User a blog.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``userId`` | ``ID!`` | User Id|
| ``otp`` | ``String!`` | OTP for Verification |


**forgotPassword** ([MutationResponse!](mutation.md#mutation-response))
Resets password of user.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``newPassword`` | ``String!`` | New Password|
| ``newRePassword`` | ``String!`` | Re New Password |

**updatePassword** ([MutationResponse!](mutation.md#mutation-response))
Update Password.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``oldPassword`` | ``String!`` | Provide Old password |
| ``newPassword`` | ``String!`` | new password |

**logout** ([MutationResponse!](mutation.md#mutation-response))
Logging out the user.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``userId`` | ``ID!`` | User Id|

## Blog 

**createBlog** ([MutationResponse!](mutation.md#mutation-response))
Creating a blog.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``title`` | ``String!`` | Specifies title for blog |
| ``content`` | ``String!`` | Provide content of the blog |
| ``tags`` | ``String!`` | Addes tags to blog |

**editBlog** ([MutationResponse!](mutation.md#mutation-response))
Editing a blog.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``title`` | ``String!`` | Specifies title for blog |
| ``content`` | ``String!`` | Provide content of the blog |
| ``tags`` | ``String!`` | Addes tags to blog |

**deleteBlog** ([MutationResponse!](mutation.md#mutation-response))
Editing a blog.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``ID!`` | Id blog |

## User

**updateBio** ([MutationResponse!](mutation.md#mutation-response))
Updating Bio of user.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``about`` | ``String!`` | New bio of user |

## Comment

**writeComment** ([MutationResponse!](mutation.md#mutation-response))
Write a Comment.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``postId`` | ``String!`` | Specifies the postId |
| ``content`` | ``String!`` | Provide content of the comment |

**editComment** ([MutationResponse!](mutation.md#mutation-response))
Edit a Comment.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``String!`` | Specifies the commentId |
| ``content`` | ``String!`` | Provide content of the comment |

**deleteComment** ([MutationResponse!](mutation.md#mutation-response))
Delete a Comment.

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``_id`` | ``String!`` | Specifies the commentId |

## Mutation Response

This response is uniform for all mutations

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``code`` | ``Int!`` | Status Code|
| ``success`` | ``Boolean!`` | Tells Success of mutation |
| ``message`` | ``String!`` | Provide message after mutation |