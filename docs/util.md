
# Documentation for the Util class

A class with numerous utility functions (mainly unit conversion) 

## Functions

## `Util()` 

Contructor for Hurdat class. Loads and parses data from provided file

#### Example Usage

Initalization of Util class

```javascript
const util = new Util();
```

## `Util.download(filename, type)`

Download Hurdat2 data from the National Hurricane Center (NHC)

#### Parameters

`filename` - Path of file to download data to
`type` - Type of data file, "natl" for North Altantic and "pac" for Central and Eastern Pacific data

#### Example Usage

Download North Altantic Hurdat2 data from the National Hurricane Center (NHC)

```javascript
util.download("path/to/data.txt", "natl");
```


## `Util.ktToMph(kt)`

Convert knots to mph

#### Parameters

`kt` - Amount in kt to convert to mph 

#### Returns

Conversion result

#### Example Usage

Convert 50 kt to mph

```javascript
util.ktToMph(50);
```

## `Util.ktToKph(kt)`

Convert knots to kph

#### Parameters

`kt` - Amount in kt to convert to kph 

#### Returns

Conversion result

#### Example Usage

Convert 50 kt to kph

```javascript
util.ktToKph(50);
```

## `Util.mphToKt(mph)`

Convert mph to knots

#### Parameters

`mph` - Amount in mph to convert to kt 

#### Returns

Conversion result

#### Example Usage

Convert 60 mph to kt

```javascript
util.mphToKt(60);
```

## `Util.mphToKph(mph)`

Convert mph to kph

#### Parameters

`mph` - Amount in mph to convert to kph 

#### Returns

Conversion result

#### Example Usage

Convert 60 mph to kph

```javascript
util.mphToKph(60);
```

## `Util.kphToKt(kph)`

Convert kph to knots

#### Parameters

`kph` - Amount in kph to convert to knots 

#### Returns

Conversion result

#### Example Usage

Convert 90 kph to knots

```javascript
util.kphToKt(90);
```

## `Util.kphToMph(kph)`

Convert kph to mph

#### Parameters

`kph` - Amount in kph to convert to mph 

#### Returns

Conversion result

#### Example Usage

Convert 80 kph to knots

```javascript
util.kphToMph(80);
```

## `Util.dist(point1, point2)`

Calculate the distance between 2 Point objects

#### Parameters

`point1` - First point of Point object to calculate distance between
`point2` - Second point of Point object to calculate distance between

#### Returns

Distance calcuated between 2 points

#### Example Usage

Calculate the distance between `(40,50)` and `(45,60)`

```javascript
util.dist(new Point(40, 50), new Point(45,60));
```

## `Util.inside(minlat, maxlat, minlong, maxlong, point)`

Check if a point is inside an area

#### Parameters

`minlat` - Minimum latitude in area
`maxlat` - Maximum latitude in area
`minlong` - Minimum longitude in area
`maxlong` - Minimum longitude in area
`point` - Point to check if is in area

#### Returns

`boolean` representing if `point` is in the area provided created by `minlat`, `maxlat`, `minlong`, and `maxlong`

#### Example Usage

Check if `(40,45)`is in area created by a `minlat` of `35`, a `maxlat` of `50`, a `minlong` of `30`, and a `maxlong` of `60`

```javascript
util.inside(35, 50, 30, 60, new Point(40, 45));
```
