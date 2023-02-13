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

## `Hurdat.filter(query)`

A method to quickly query for storms

#### Parameters


`query` - An function with one parameter to filter items or an object containing different conditions to query for
#### Query object fields
**Note**: All `query` parameters are optional
- `season` (Number) - Look for storms in a certain year
- `namematch` (Regular expression) - Look for storms with names matching a certain regular expression
- `number` (Number or Array of numbers) - Look for storms whose number is equal to the provided number or is in the provided array
- `peakwind` (Number or Array of 2 numbers) - Look for storms whose highest wind speed (kt) is equal to the provided number or is greater than or equal to the first item of the provided array (minimum) and less than or equal to the second item of the provided array (maximum)
- `peakpressure` (Number or Array of 2 numbers) - Look for storms whose lowest pressure (mb) is equal to the provided number or is greater than or equal to the first item of the provided array (minimum) and less than or equal to the second item of the provided array (maximum)
- `date` (Array of 2 Date objects) - Look for storms that were active during period of time in the provided array 
    - **Note**: This feature is currently experimental and could lead to inaccurate results  
- `landfallnum` (Number or Array of 2 numbers) - Look for storms whose number of landfalls is equal to the provided number or is greater than or equal to the first item of the provided array (beginning of date range) and less than or equal to the second item of the provided array (ending of date range)
- `point` (Array of 4 numbers) - Look for storms that have passed through an area (Item 1 of the provided array is the minimum latitude, Item 2 is the maximum latitude, Item 3 is the minimum longitude, Item 4 is the maximum longitude)
- `landfall` (Array of 4 numbers) - Look for storms that have made landfall in an area (Item 1 of the provided array is the minimum latitude, Item 2 is the maximum latitude, Item 3 is the minimum longitude, Item 4 is the maximum longitude)
- `distancekm` (Number or Array of 2 numbers) - Look for storms whose track distance in kilometers is equal to the provided number or is greater than or equal to the first item of the provided array (beginning of range) and less than or equal to the second item of the provided array (ending of range)
- `distancemi` (Number or Array of 2 numbers) - Look for storms whose track distance in miles is equal to the provided number or is greater than or equal to the first item of the provided array (beginning of range) and less than or equal to the second item of the provided array (ending of range)

#### Returns

List of Storm objects matching query

#### Example Usage

Find storms that made landfall at least `3` times and no more than `5` in `2005`

```javascript
hurdat.filter({"season" : "2005","landfallnum" : [3, 5]});
```

Find storms that made landfall on Long Island before 1950

```javascript
hurdat.filter({"date" : [new Date(1800, 0, 1), new Date(1950, 0, 1)], "landfall" : [40.54, 41.21, -71.75, -74.18]});
```

Find storms that made at least `5` landfalls and no more than `10` landfalls that had a peak intensity of `80` to `100` knots

```javascript
hurdat.filter({"peakwind": [80, 100], "landfallnum": [5, 10]})
```

Find storms that have a track distance of at least 2,500 miles and less than or equal to 10,000 miles after 2000

```javascript
hurdat.filter({"distancemi": [2500, 10000], "date": [new Date(2000, 0, 1), new Date(2500, 0, 1)]})
```

Example usage of using a function to filter storms with the name Henri

```javascript
hurdat.filter(function(storm) {
  return storm.name == "HENRI";
})
```
