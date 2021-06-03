---
title: GraphQL Basics
description: GraphQL is a query language for APIs, it uses a type system that
  defines your information and runs on the server side. It's not tied to a
  database or some information storage system, instead, is managed by the code
  that defines it.
tags: development
date: 2021-03-01 06:01:00
---
## Introduction

GraphQL is a query language for APIs, it uses a type system that defines your information and runs on the server side. It's not tied to a database or some information storage system, instead, is managed by the code that defines it.

It's based on the definition of types that allows consulting specific fields of objects and resolving the information required in the query.

## Fields

```javascript
// Type
type Car {
    model: String!
    manufacturer: String!
}
```

```javascript
// Query
{
    car {
        model
        manufacturer
    }
}
```

```json
// Data resolved
{
    "data": {
        "car": {
            "model": "97"
            "manufacturer": "Ford"
        }
    }
}
```

In this simple example, we have a query in GraphQL that needs a car object that contains two fields: `model` and `manufacturer`. A field in short is everything that is not an object and it's of a Scalar type, in this case, the fields within car resolve in Scalar types of type `String`.

The only object in this service is **car** which is composed of fields and defined as a type in the initial part of the query. For the context of this service, **car** is a type object that contains two fields that composes it.

In this way, we can write a query that checks inside the car object and returns both fields.

## Scalar Types

Since GraphQL is based on the definition of types, it provides us with some Scalar types. These types that allow the information to be resolved to a specific value, for example:

- `Int`: A signed 32‐bit integer
- `Float`: A signed double-precision floating-point value
- `String`: A UTF‐8 character sequence
- `Boolean`: `true` or `false`
- `ID`: This Scalar Type represents a unique identifier of the object, this type is resolved in a `String`

GraphQL provides us those established values above, but it's not restricted to their definition, some GraphQL services allow you to create your own Scalar Types with the condition that each one has to have defined the way to serialize and deserialize the information to communicate between the code that defines it, and the one who consults it.

## Arguments

At first glance, GraphQL seems like a good way to obtain data, but the arguments provide a way to query the information concretely.

```javascript
{
    car(id: "10"): {
        model
        manufacturer
    }
}
```

Each query can have 0 or N number of arguments. In the previous example through an `id` argument it filters the information resolved to only those **cars** which has the `id` 10.