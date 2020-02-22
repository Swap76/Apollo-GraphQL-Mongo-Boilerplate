# Interfaces
Interfaces serve as parent objects from which other objects can inherit.  
An interface has its own list of named fields that are shared by implementing objects.

## User
Represents a user

### Fields

##### name ([String!](scalars.md#string))
The name of the user.

##### email ([String!](scalars.md#string))
The email of the user.

##### _id ([ID!](scalars.md#id))

##### password ([String!](scalars.md#string))
The password of the user.

##### username ([String!](scalars.md#string))
The username of the user.

##### about ([String!](scalars.md#string))
The bio of the user.

##### verified ([Boolean!](scalars.md#boolean))
The status of user is it verified or not.

##### role ([enum!](enum.md#enum))
The role of the user superuser or developer.

## Blog
Represents a blog

### Fields

##### title ([String!](scalars.md#string))
The title of the blog in plain text.

##### content ([String!](scalars.md#string))
The content of the blog in markdown.

##### _id ([ID!](scalars.md#id))

##### userId ([String!](scalars.md#string))
The ID of creator of the blog. Mostly populated to give more info about user.

##### tags ([[String!](scalars.md#string)])
The list of keywords that summarize the blog.

## Comment
Represents a comment

### Fields

##### content ([String!](scalars.md#string))
The content of the comment in plain text.

##### _id ([ID!](scalars.md#id))

##### userId ([String!](scalars.md#string))
The ID of writer of the comment. Mostly populated to give more info about user.

##### postId ([String!](scalars.md#string))
The ID of of the post in which the comment belongs.