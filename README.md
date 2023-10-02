# CRUD API

This is a crud API built with Nodejs and MongoDB

## Installation

Use the package manager [NPM](https://pip.pypa.io/en/stable/) to install Npm and other dependencies.

```bash
npm init -y
```

## install nodemon as a development dependency:

```bash
npm install --save-dev nodemon
```

## Configuration

- go to package.json file and add the code below in the"scripts"

```javascript
 "start": "nodemon app.js",
```

- create a **_.env_** file and add your **MONGODB_URI**

## start the server

```javavscript
 npm  run dev
```

## API Reference

#### GET ALL VIDEO RECORDING

```http
  GET /api/rec
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- | --- |
| `    `    | `string` |             | --> |

#### Response

returns the video data and url in **JSON** format#

#### UPLOAD VIDEO RECORDING

```http
  POST /api/upload
```

| Parameter | Type                   | Description   |
| :-------- | :--------------------- | :------------ |
| ' '       | `(mp4)  upto  30mb   ` | **Required**. |

#### Response

returns the specific video data and url in **JSON** format#

#### GET SPECIFIC VIDEO

```http
  GET /api/rec/:name
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `name`    | `string` | **Required**. name |

#### Response

returns the specific video data and url in **JSON** format#

### GET VIDEO TRANSCRIPTION

```http
  GET  /api/transcribe/:name
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `name`    | `string` | **Required**. name |

#### Response

returns the specific video data , video transcription and url in **JSON** format#

**/:name should is cloudinary_id from json data returned**
