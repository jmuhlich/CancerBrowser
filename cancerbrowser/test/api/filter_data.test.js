import { assert } from 'chai';

// import _ from 'lodash';

import {
  filterData
} from '../../common/api/util';


describe('API Util', function() {
  it('filters data with string attributes ', function() {

    var data = [
      {id:'first', attribute:'correct'},
      {id:'second', attribute:'incorrect'},
      {id:'third', attribute:'valid'}
    ];

    var filters = [
      {id:'attribute', values:['correct', 'valid', 'yes']}
    ];

    var results = filterData(data, filters);
    assert.equal(results.length, 2);
    assert.equal(results[0].id, 'first');
    assert.equal(results[1].id, 'third');
  });

  it('filters data with array attributes ', function() {

    var data = [
      {id:'first', attribute:['incorrect']},
      {id:'second', attribute:['correct', 'another']},
      {id:'third', attribute:'valid'}
    ];

    var filters = [
      {id:'attribute', values:['correct', 'valid']}
    ];

    var results = filterData(data, filters);
    assert.equal(results.length, 2);
    assert.equal(results[0].id, 'second');
    assert.equal(results[1].id, 'third');
  });

  it('filters with multiple filter groups', function() {

    var data = [
      {id:'first', attribute:['incorrect'], location:'london'},
      {id:'second', attribute:['correct', 'another'], location:'new york'},
      {id:'third', attribute:'valid', location:'paris'}
    ];

    var filters = [
      {id:'attribute', values:['correct', 'valid']},
      {id:'location', values:['new york']}

    ];

    var results = filterData(data, filters);
    assert.equal(results.length, 1);
    assert.equal(results[0].id, 'second');
  });

  it('doesnt filter data when no filter or filter is empty', function() {
    var data = [
      {id:'first', attribute:['incorrect']},
      {id:'second', attribute:['correct', 'another']},
      {id:'third', attribute:'valid'}
    ];
    var results = filterData(data);
    assert.equal(results.length, 3);

    results = filterData(data, []);
    assert.equal(results.length, 3);
  });

  it('filters data when attribute not present on data', function() {
    var data = [
      {id:'first', attribute:['incorrect']},
      {id:'second', notattribute:['correct', 'another']},
      {id:'third', attribute:'valid'}
    ];

    var filters = [
      {id:'attribute', values:['correct', 'valid']}
    ];

    var results = filterData(data, filters);

    assert.equal(results.length, 1);
    assert.equal(results[0].id, 'third');
  });

});
