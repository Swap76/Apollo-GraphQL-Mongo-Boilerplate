# Special Inputs

## Comment

**CommentWhereInput** ([CommentWhereInput](query.md#comment))
Look up by field values for comments

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``postId`` | ``String`` | The post ID of the comments|
| ``userId`` | ``String`` | The user ID of the comments|

## User

**UserWhereInput** ([UserWhereInput](query.md#user))
Look up by field values for users

| Argument | Type | Description |
|-------------------|--------------|-------------|
| ``email`` | ``String`` | The email of the user in plain text |
| ``username`` | ``String`` | The username of the user in plain text |
| ``verified`` | ``Boolean`` | The verification of the user in boolean |
| ``role`` | ``Roles`` | The name of the user in plain text |
