## Famous Quotes Quiz

---

### About App:

In the famous quote quiz game, system will ask questions and user should try to pick a correct answer. Depending
on selected mode user will have to choose correct answer from a list of answers, or simply to answer with Yes/No
to the question.

---
### Technologies used during development

System's backend side is written on Laravel framework and frontend side is on react.js. 
Style is mainly developed using tailwind.css


| Technology   | Version     |
| -----------  | ----------- |
| Laravel      | 8.x         |
| React.js     | 16.x        |
| Tailwind.cs  | 2.x         |


---
### Laravel Decisions

On backend side, quotes are seeded from
https://goquotes-api.herokuapp.com/api/v1/random?count=200 Rest API.

Main problem was on [Get All Quotes](#quotes) service: **quote's possible answers must be randomly 
generated**. For this solution optimizing memory and SQL queries is mandatory. In such case Laravel's LazyCollection 
implementation is efficient. All authors are *Lazy Loaded* into the memory and actual objects are fetched when it is 
needed. After generating all possible authors they are all shuffled
####


#### Rest API

| HTTP Method | Endpoint    |
| ----------- | ----------- |
| POST        | [/api/quotes](#quotes) |

### Get All Quotes<a name="quotes" /> 

---

#### Headers
| Key    | Value               |
|------- | ------------------- |
| Accept | application/json    |

#### Query Params

| Name | Type   | Values            |
| ---- | ------ | ---------------- |
| mode | string | multiple/binary | 


#### Response

```json
{
    "mode": "string multiple/binary",
    "quotes": [
        {
            "id": "integer",
            "correct_author_id": "integer",
            "text": "string",
            "authors": [
                {
                    "id": "integer",
                    "name": "string"
                }
            ]
        }
    ]
}
```

