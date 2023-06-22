# **Todo-list-APP**
## **A Todo list API**
**Description:** Developed a Todo List API that allows users to quickly and easily add, delete, and update events and tasks. Users can stay organized by managing their tasks and events. App was built in javascript using Node.js, Express, Mongoose, and Morgan. Tested API using Jest and Supertest and handling server load with Artillery.
### **How to run and test API**:
Run server:
```
npm run dev
```
Test server:
```
npm run test
```
Load test server:
```
npm run load
```
Load test settings:
```
config:
  target: "http://localhost:3000"
  phases:
    - duration: 30
      arrivalRate: 10

scenarios:
  - name: "Testing Routes"
    flow:
      - post:
          url: "/todos"
          json:
            title: 'Task1'
            description: 'Test Task1'
            complete: true
            created_at: '2023-06-15'
      - get:
          url: "/todos"
```
Load test results:
```
All virtual users finished
Summary report @ 23:16:10(-0400) 2023-06-21
  Scenarios launched:  300
  Scenarios completed: 300
  Requests completed:  600
  Mean response/sec: 19.74
  Response time (msec):
    min: 48
    max: 541
    median: 106
    p95: 141.5
    p99: 210.5
  Scenario counts:
    Testing Routes: 300 (100%)
  Codes:
    200: 600
```
A load phase of 30 seconds, with 10 new virtual users being launced every second to server. The duration of the load test is the amount of time it takes for all users created by the load to finish their scenarios in their todo list. The average response time of the API is represented by the median, min and max. 95% of users experienced performance of 141.5 miliseconds and 99% of users experienced 210.5 miliseconds. The total number of scenarios ran were 300 and all tests were successful.