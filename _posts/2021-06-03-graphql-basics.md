---
title: "GraphQL 101: The Basics"
date: 2021-03-01 06:01:00
description: GraphQL is a query language for APIs, it uses a type system that
  defines your information and runs on the server side. It's not tied to a
  database or some information storage system, instead, is managed by the code
  that defines it.
tags: development
---
## Introduction

GraphQL is a query language for APIs, it uses a type system that defines your information and runs on the server-side. It's not tied to a database or some information storage system, instead, is managed by the code that defines it.

It's based on the definition of types that allows consulting specific fields of objects and resolving the information required in the query.

## Fields

```javascript
// Type
type Car {
    model: String!
    year: Int!
    manufacturer: String!
}
```

```javascript
// Query
{
    car {
        model
        year
        manufacturer
    }
}
```

```json
// Data resolved
{
    "data": {
        "car": {
            "model": "Maverick GT",
            "year": 1973,
            "manufacturer": "Ford"
        }
    }
}
```

In this simple example, we have a query in GraphQL that needs a car object that contains three fields: `model` and `manufacturer`. A field in short is everything that is not an object and it's of a Scalar type, in this case, the fields within car resolve in Scalar types of type `String`.

The only object in this service is **car** which is composed of fields and defined as a type in the initial part of the query. For the context of this service, **car** is a type object that contains three fields that composes it.

In this way, we can write a query that checks inside the car object and returns both fields.

## Scalar Types

Since GraphQL is based on the definition of types, it provides us with some Scalar types. These types allow the information to be resolved to a specific value, for example:

- `Int`: A signed 32‐bit integer
- `Float`: A signed double-precision floating-point value
- `String`: A UTF‐8 character sequence
- `Boolean`: `true` or `false`
- `ID`: This Scalar Type represents a unique identifier of the object, this type is resolved in a `String`

GraphQL provides us those established values above, but it's not restricted to their definition, some GraphQL services allow you to create your own Scalar Types with the condition that each one has to have defined the way to serialize and deserialize the information to communicate between the code that defines it, and the one who consults it.

## Arguments

At first glance, GraphQL seems like a good way to obtain data, but the arguments provide a way to query the information concretely:

```javascript
{
    car(id: "10"): {
        model
        manufacturer
    }
}
```

Each query can have `0` or `N` number of arguments. In the example above, we can filter the information through an `id` argument which filters and resolve information to only those **cars** which have the `id` 10.

## Aliases

When making queries, you may need a way to distinguish the information returned by the query. This is made simple by adding aliases in your query:

```javascript
{
    fordCars: car(manufacturer: "ford") {
        model
        manufacturer
    }
    chevyCars: car(manufacturer: "chevrolet") {
        model
        manufacturer
    }
}
```

```json
{
    "data": {
        "fordCars": [
            {
                "model": "Maverick GT",
                "manufacturer": "Ford"
            }
        ],
        "chevyCars": [
            {
                "model": "Camaro SS",
                "manufacturer": "Chevrolet"
            }
        ]
    }
}
```

Aliases can be added to the query and specify changes in the name of the property that it will have. Aliases are particularly useful when having to rename a key on your output and to avoid duplication which will lead to an error.

## Fragments

When the query becomes repetitive or at least some part of it we need a way to simplify it. For this particular scenario, we can use fragments which as the name suggests are fragments of types. The fragments help us to encapsulate a part of the type of data we need to reuse and make the same data request in different queries.

```javascript
fragment carInformation on Car {
    model
    year
    manufacturer
}

{
    fordCars: car(manufacturer: "ford") {
        ...carInformation
    }
    chevyCars: car(manufacturer: "chevrolet") {
        ...carInformation
    }
}
```

It might seem obvious, but this is super handy when you're dealing with a repetitive shape in many different places.

## Variables

Although this is self-explanatory, most of the time you will need to query the information dynamically, for example, the examples below using the `manufacturer` variables for a specific list of results, but we can give a step further by adding more variables to our query statically:

```javascript
query CarByFord {
    fordCars: car(manufacturer: "ford", limit: 20) {
        model
        year
        manufacturer
    }
}
```

We call it static because the information that the cars that we will obtain will always be from the manufacturer `"ford"`, but if we need to consult those that are from the manufacturer `"chevrolet"` we would have to write a new query. Let's make some changes by defining a base:

```javascript
query CarByManufacturer($manufacturer: String!, $limit: Int = 20) {
    car(manufacturer: $manufacturer, limit: $limit) {
        model
        year
        manufacturer
    }
}
```

With this approach, when executing the query and sending it the `$manufacturer` variable, it will be passed down as an argument in the query and will allow dynamic filtering of the information.

Also, as we can see we defined a default `$limit` to 20 directly in that query, and we could do the same for the manufacturer if needed. e.g.: always defaults to **ford** in the same way we did for `$limit`.

Also, you can identify that we're using an exclamation on `$manufacturer` only as it's a mandatory variable on our query and there's no default value.