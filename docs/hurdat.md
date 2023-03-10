# Documentation for the Hurdat class

Main class for parsing data, contains various methods for searching for storms

## Properties

`storms` - List of Storm objects parsed

## Functions

## `Hurdat(filename)` 

Contructor for Hurdat class. Loads and parses data from provided file
#### Parameters

`filename` - File location of data file, should be String

#### Example Usage

Initalize and load Hurdat2 data
```javascript
const hurdat = new Hurdat("path/to/data.txt");
```

## `Hurdat.funcFilter(func)`

A method to filter storms using the passed function

#### Parameters

`func` - Function used to filter storms 

#### Returns

Array of `Storm` filtered 

#### Example Usage

Finds storms named "Henri"

```javascript
hurdat.funcFilter(function(storm) {
  return storm.name == "Henri";
});
```

Find storms with forming in July

```javascript
hurdat.funcFilter(function(storm) {
  return storm.formed.getMonth() == 6;
});
```

## `Hurdat.filter(query)`

A method to quickly query for storms

#### Parameters


`query` - An object containing different conditions to query for
**Note**: All `query` parameters are optional
- `season` (Number) - Look for storms in a certain year
- `namematch` (Regular expression) - Look for storms with names matching a certain regular expression
- `number` (Number or Array of numbers) - Look for storms whose number is equal to the provided number or is in the provided array
- `peakwind` (Number or Array of numbers) - Look for storms whose highest wind speed (kt) is equal to the provided number or is greater than or equal to the first item of the provided array (minimum) and less than or equal to the second item of the provided array (maximum)
- `peakpressure` (Number or Array of numbers) - Look for storms whose lowest pressure (mb) is equal to the provided number or is greater than or equal to the first item of the provided array (minimum) and less than or equal to the second item of the provided array (maximum)
- `date` (Array of 2 Date objects) - Look for storms that were active during period of time in the provided array 
    - **Note**: This feature is currently experimental and could lead to inaccurate results  
- `landfallnum` (Number or Array of numbers) - Look for storms whose number of landfalls is equal to the provided number or is greater than or equal to the first item of the provided array (beginning of date range) and less than or equal to the second item of the provided array (ending of date range)
- `point` (Array of 4 numbers) - Look for storms that have passed through an area (Item 1 of the provided array is the minimum latitude, Item 2 is the maximum latitude, Item 3 is the minimum longitude, Item 4 is the maximum longitude)
- `landfall` (Array of 4 numbers) - Look for storms that have made landfall in an area (Item 1 of the provided array is the minimum latitude, Item 2 is the maximum latitude, Item 3 is the minimum longitude, Item 4 is the maximum longitude)

#### Returns

List of Storm objects matching query

#### Example Usage

Find storms that made landfall at least `3` times and no more than `5` in `2005`

```javascript
hurdat.filter({"season" : "2005","landfallnum" : [3, 5]});
```

Find storms that made landfall on Long Island before 1950

```javascript
hurdat.filter({"date" : [new Date(1800, 1, 1), new Date(1950, 1, 1)], "landfall" : [40.54, 41.21, -71.75, -74.18]});
```

Find storms that made at least `5` landfalls and no more than `10` landfalls that had a peak intensity of `80` to `100` knots

```javascript
hurdat.filter({"peakwind": [80, 100], "landfallnum": [5, 10]})
```
