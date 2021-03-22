## Famous Quotes Quiz

## Table of Contents
 * [About](#about-app)
 * [Technologies Used](#technologies-used-during-development)
 * [Installation](#Installation)  
 * [Laravel Decisions](#laravel-decisions)
 * [React Decisions](#react-decisions)  
 * [Rest API](#rest-api)
    * [Get All Quotes](#quotes)
---

## About App:

In the famous quote quiz game, system will ask questions and user should try to pick a correct answer. Depending
on selected mode user will have to choose correct answer from a list of answers, or simply to answer with Yes/No
to the question.

---
## Technologies used during development

System's backend side is written on Laravel framework and frontend side is on react.js. 
Style is mainly developed using tailwind.css


| Technology   | Version     |
| -----------  | ----------- |
| Composer     | 2.x         |
| Laravel      | 8.x         |
| React.js     | 16.x        |
| Tailwind.cs  | 2.x         |

---
## Installation

### Clone project
> git clone https://github.com/nkvatadze/FamousQuotesQuiz FamousQuotesQuiz

### Generate .env file
> cp .env.example .env

### Navigate to the project's folder and execute
> composer install

### Generate App key
>php artisan key:generate

### Run migrations and seeds
>php artisan migrate --seed

### Install npm packages
>npm install

### Compile assets
>npm run prod

---
## Laravel Decisions

On backend side, quotes are seeded from
https://goquotes-api.herokuapp.com/api/v1/random?count=200 Rest API.

Main problem was on [Get All Quotes](#quotes) service: **quote's possible answers must be randomly 
generated**. For this solution optimizing memory and SQL queries is mandatory. In such case Laravel's LazyCollection 
implementation is efficient. All authors are *Lazy Loaded* into the memory and actual objects are fetched when it is 
needed. After generating all possible authors they are all shuffled
####

---

## React Decisions

On React.js side, there are only functional components. States are controlled with useState hook. React application is communicating with Backend server using axios HTTP client,
getting from [quotes](#quotes) service data and rendering it into the Main Component. Questions are displayed one-by-one. They are stored on a client's side, in 
the Browser's localStorage and because of that user maintains data after refreshing page. 
---

## Rest API

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

