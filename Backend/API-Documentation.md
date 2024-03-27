
## API Documentation

#### Test Server

```http
  GET /test
```
---------------------------------------------------

#### Get Repositories

```http
  GET /getrepos
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Access_Token`      | `string` | **Required**. Access Token of respective Github User |

----------------------------------------------------
#### Get Access Token

```http
  GET /getaccesstoken/{User_Name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |

-----------------------------------------------------
#### Get Contributions

```http
  GET /getcontribution/{User_Name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |


-----------------------------------------------------
#### Commit Code

```http
  PUT /commitCode/{User_Name}/{Repo_Name}/{File_Path}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |
| `Repo_Name`      | `string` | **Required**. Github Repository Name |
| `File_Path`      | `string` | **Required**. Path of the File |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `commitMessage`      | `string` | **Required**. Commit Message |
| `ownerMail`      | `string` | **Required**. Email ID in which commit is to be done |
| `content`      | `string` | **Required**. Code to be commited |

-----------------------------------------------------
#### Get Email

```http
  GET /getemail/{User_Name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |


-----------------------------------------------------
#### Login

```http
  POST /login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |
| `Password`      | `string` | **Required**. Code-Mover User Password |


-----------------------------------------------------
#### Register

```http
  POST /register
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |
| `Password`      | `string` | **Required**. Password to be Updated |
| `Access_Token`      | `string` | **Required**. Valid Github Access Token |
| `Password`      | `string` | **Required**. Email ID of the User |


-----------------------------------------------------
#### Generate OTP

```http
  POST /otp/{User_Name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |



-----------------------------------------------------
#### Verify OTP

```http
  POST /otp/verify/{User_Name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `otp`      | `string` | **Required**. One Type Password sent to User's Email |


-----------------------------------------------------
#### Update Profile

```http
  POST /updateprofile/:type/:User_Name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User_Name`      | `string` | **Required**. Github User Name |
| `type`      | `string` | **Required**. Type of Profile Updation. Password or Profile |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Email`      | `string` | **Required**. New Email ID of the User |
| `Access_Token`      | `string` | **Required**. New Access Token to be Updated |
| `Password`      | `string` | **Required**. New Password to be Updated |
