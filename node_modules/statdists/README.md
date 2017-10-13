# statdists.js

This is a super tiny library that currently simulates the functionality of R for generating random variables (`r<dist>`) and also calculating their density (`d<dist>`). It also includes a few vectorized math functions that help in translating code from something like `numpy` or `dplyr` to javascript. 

In the future this will recreate all of the distributions in R, but currently it does not calculate CDFs. 

Relies on the library `d3-random` because I'm too lazy to code the CDF of the normal to generate my own normal samples. 

## Installing

The library is on NPM and is bundled in the UMD format. 

```bash
npm install --save statdists
```

```js
import {rnorm, runif} from 'statdists';

const someNormals = rnorm(10, 6, 2);
console.log(someNormals)
// > [5.733267780144279, 3.6284953605592105, 5.505710070640804, 7.340289876074601, 5.357392656344408, 7.772439732383019, 5.848394411674981, 4.508991919446658, 6.992326735630431, 4.177258305494865]
```