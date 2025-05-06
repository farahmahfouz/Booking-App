# Tour API Documentation

## Filtering Options

### Comparison Operators
The Tour API supports the following comparison operators for filtering:
* `gte`: Greater than or equal to
* `gt`: Greater than
* `lte`: Less than or equal to
* `lt`: Less than

### URL Format
To use these operators in your API requests, format your URL as follows:
```
/api/tours?field[operator]=value
```

### Examples
1. Get tours with duration greater than or equal to 5 days:
```
/api/tours?duration[gte]=5
```

2. Get tours with price less than 1000:
```
/api/tours?price[lt]=1000
```

3. Get tours with rating greater than 4.5:
```
/api/tours?ratingsAverage[gt]=4.5
```

4. Get tours with group size less than or equal to 20:
```
/api/tours?maxGroupSize[lte]=20
```

5. Combining multiple filters:
```
/api/tours?price[gte]=500&price[lte]=2000&ratingsAverage[gte]=4.7
```

### Available Fields for Filtering
You can apply these operators to any numeric fields in the tour model, including:
* `price`: Tour price
* `duration`: Tour duration in days
* `maxGroupSize`: Maximum number of people in a group
* `ratingsAverage`: Average rating (1-5)
* `ratingsQuantity`: Number of ratings
* `difficulty`: Tour difficulty level (easy, medium, difficult)

## Sorting

To sort the results, use the `sort` parameter:
```
/api/tours?sort=price
```

For descending order, add a minus sign before the field name:
```
/api/tours?sort=-price
```

To sort by multiple fields, separate them with commas:
```
/api/tours?sort=-ratingsAverage,price
```

## Field Limiting

To request specific fields only, use the `fields` parameter:
```
/api/tours?fields=name,duration,difficulty,price
```

To exclude specific fields, add a minus sign before the field names:
```
/api/tours?fields=-createdAt,-__v
```

## Pagination

Pagination parameters work alongside filters:
```
/api/tours?price[gte]=500&page=2&limit=10
```

* `page`: Page number (default: 1)
* `limit`: Number of items per page (default: 10)

## Search

To search for tours by name, use the `search` parameter:
```
/api/tours?search=Sea
```

## Top Tours Alias

The API provides a convenient endpoint for top-rated tours:
```
/api/tours/top-5-cheap
```

This endpoint automatically sets the following query parameters:
* `limit=5`
* `sort=-ratingsAverage,price`
* `fields=name,price,ratingsAverage,summary,difficulty`