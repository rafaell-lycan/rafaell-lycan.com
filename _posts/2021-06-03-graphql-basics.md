---
title: GraphQL Basics
description: GraphQL is a query language for APIs, it uses a type system that
  defines your information and runs on the server side. It's not tied to a
  database or some information storage system, instead, is managed by the code
  that defines it.
tags: development
date: 2021-06-03 06:01:02
---
# Introduction

GraphQL is a query language for APIs, it uses a type system that defines your information and runs on the server side. It's not tied to a database or some information storage system, instead, is managed by the code that defines it.

It's based on the definition of types that allows consulting specific fields of objects and resolving the information required in the query.

## Fields

```js
# Type
type Car {
    model: String!
    manufacturer: String!
}

# Query
{
    car {
        model
        manufacturer
    }
}
```

