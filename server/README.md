# Node + Express + TypeScript + REST API

This is a very basic project to implement a REST API using Node, Express and
TypeScript. It just uses an in memory array of users for data storage.

## Run the api server

```shell
npm install
npm run dev
```

## Usage: Access the api endpoints using `curl`

### Fetch all users

```shell
curl http://localhost:3000/api/users/
```

**Output**

```
[{"id":"1","name":"Alice","email":"alice@example.com"},{"id":"2","name":"Bob","email":"bob@example.com"}]
```

### Fetch a single user

```shell
curl http://localhost:3000/api/users/2
```

**Output**

```
{"id":"2","name":"Bob","email":"bob@example.com"}
```

### Create a user

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name":"Cam","email":"cam@example.com"}' "http://localhost:3000/api/users/"
```

**Output**

```
{"id":"3","name":"Cam","email":"cam@example.com"}
```

### Update a user

```shell
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Chucky"}' "http://localhost:3000/api/users/3"
```

**Output**

```
{"id":"3","name":"Chucky","email":"cam@example.com"}
```

### Delete a user

```shell
curl -X DELETE "http://localhost:3000/api/users/4"
```

**Output**

_None if user was successfully deleted._
