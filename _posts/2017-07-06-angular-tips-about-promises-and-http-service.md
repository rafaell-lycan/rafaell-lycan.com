---
title: 'AngularJS: Tips about Promises and $http Service'
tags: angular
resumo: >
   A good practices guide about how to use Promises along with services (especially the $http) in AngularJS world.
---

Hey all, everything all right?

First of all, I'd like to thank all support and those that have questions, for sure I'd like to be able to respond to everyone, or have all the answers, however, sometimes I neither have time enough or just don't know the answer.

Currently, I've been reviewing a lot of Angular code lately, and received some curious emails about a problem I found many times during my reviews that it's the unnecessary use of the **deferred** object to resolve or reject promises. Yes, that's exactly what I'll talk about today, and yes, I know it may not be the most useful thing possible, but since I had a question about it and also I always see some unnecessary code, I want to teach a simplified approach.

Another problem is always mixed `then()` and `catch()` with two callbacks in the `then()`, and sometimes even `success()` and `error()` in the return of the **$http service** . I will try to be as quickly as possible with the examples, proposing a single style that can be applied to any other promise library in the future.

## Resolving Promises

The code below use the **$http service** to make a REST call and return only the **data** property of the response. This is a common implementation that I usually find in AngularJS code, and I know that works, but let's see how to improve it.

{% highlight javascript %}
function getData($q, $http) {
  var deferred = $q.defer();
  $http.get('...')
    .then(function(response) {
      deferred.resolve(response.data);
    });

  return $q.promise;
}
{% endhighlight %}

The code above could be simplified like this:

{% highlight javascript %}
// Better
function getData($http) {
  return $http.get('...')
    .then(function(response) {
      return response.data;
    });
}
{% endhighlight %}

The `then()` function accepts three callback parameters: *successCallback, errorCallback, * and *notifyCallback*

So, If you return a value on **successCallback** or **errorCallback**, the return will be used to resolve the **promise**. Yes, you don't need to explicitly `deferred.resolve(response.data)` every time to solve **promises**, instead, you can simply return **response.data** in `then()`'s callback.

The `then()` function returns a new **promise**, so isn't need to use `$q` to create a **deferred** object and return a **promise**. Just return the **promise** created by `then()`.

## Rejecting Promises

What about error handling? Let's use the example above, we can call `deferred.reject` as **errorCallback**.

{% highlight javascript %}
function getData($q, $http) {
  var deferred = $q.defer();
  $http.get('...')
    .then(function(response) {
      deferred.resolve(response.data);
    },
    function(err){
      deferred.reject(err);
    });

  return $q.promise;
}
{% endhighlight %}

Now we can think in a simplified solution and just return something instead of reject right? But by doing so, what we return? You probably think that we could return the error as in **successCallback**:

{% highlight javascript %}
function getData($http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    },
    function(err){
      return err; // Wrong
    });
}
{% endhighlight %}

As I said before, the returned values from the **successCallback** and **errorCallback** are considered values resolved for the **promise**. So the returned response in the **errorCallback** will solve the **promise** instead reject it. Even if you return a `false` value or nothing, the value will be considered resolved. You can use another way if necessary with `$q.reject(err)`:

{% highlight javascript %}
// Better
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    },
    function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}

Besides the **errorCallback** as second parameter, the **promise** has another method called `catch()` to handle  errors. I personally prefer to use `then()` and `catch()` together over the two **callback** functions in `then()` because of readability.

{% highlight javascript %}
// Even Better
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    })
    .catch(function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}

This way, `then()` is used only for **successCallback**, and `catch()` is basically used for errors applied as if it were `then()` without the **successCallback**  – `then(angular.noop, errorCallback)`

The biggest advantage is that we can avoid **callback hell** by **chaining promises** using the `then()` and handle any errors that could happen during the process in a single `catch()`:

{% highlight javascript %}
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return DataService.validateData(response.data);
    })
    .then(function(data) {
      return DataService.updateOffilineStorage(data);
    })
    .catch(function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}

Chaining **promises** from services like the `DataService` above that returns us **promises**, make our code more elegant and simple to read and capturing any errors in a single point.

## Success and Errors in $http Service

In old versions of AngularJS (1.3.x and earlier) **$http service** has two additional methods `success()` and `error()` that are similar to `then()`, but they have some differences :

{% highlight javascript %}
$http.get('...')
  .success(function(data) {
    ...
  })
  .error(function(err) {
    ...
  })
{% endhighlight %}

If you have remembered **jQuery** and how simple things were at that time, forget about it, since version 1.4.x these two methods have been obsolete because of the confusion they introduced.

The **callback** you pass both `success()` and `error()` is not a response object, but the data itself (as in **jQuery**), and inside the callback is no longer necessary to return `response.data` to get only the data. An example:

{% highlight javascript %}
// Success
$http.get('...')
  .success(function(data) {
    $log(data)
  });
  
// Then
$http.get('...')
  .then(function(response) {
    $log(response.data)
  });
{% endhighlight %}

Yes, it's a silly difference, but neither`success()` or `error()` will return a new **promise**, so I strongly recommend adopt `then()` and `catch()` since they can be found in other Promise libraries as a convention.

## Conclusion

The use of a **deferred** object can be replaced by simple things:

- Return a value creating a new **promise** when it resolves.
- Return a rejected **promise** using `$q.reject()` to reject the promise.

Prefira utilizar `catch()` para fornecer **erroCallbacks** e facilitar o encadeamento **promises** ao invés de dois **callbacks** dentro de `then()`. e pare de utilizar `success()` e `error()`.

Finally, prefer using  `catch()` to provide **erroCallbacks** and use the power of chained **promises** instead than two **callbacks** in `then()`. And stop using `success()` and `error()`, please!
