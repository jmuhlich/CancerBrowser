import { filterData, countMatchedFilterGroups } from './util';

import _ from 'lodash';

//TODO async load drug data.
import drugData from  './data/drugs.json';

/**
 * Returns all drugs filtered by filterGroups
 */
export function getDrugs(filterGroups = {}) {
  return new Promise(function(resolve) {

    let filteredDrugData = _.clone(drugData);
    Object.keys(filterGroups).forEach(function(key) {
      const filterGroup = filterGroups[key];
      filteredDrugData = filterData(filteredDrugData, filterGroup);
    });
    resolve(filteredDrugData);
  });
}

/**
 * Returns info for particular drug
 */
export function getDrugInfo(drugId) {
  return getDrugs().then(function(drugs) {
    return drugs.filter((d) => d.id === drugId)[0];
  });
}

/**
 * Provides counts for each filter group in the allFilterGroup
 *
 * @param {Array} cellLines array of cell line data to match
 * @param {Object} filter groups for the cell line data.
 *
 */
export function getDrugCounts(drugs, allFilterGroups) {
  return countMatchedFilterGroups(drugs, allFilterGroups);
}

/**
 * Provides the filter definition for drugs, generated based on
 * values in the data.
 *
 * @return {Array}
 */
export function getDrugFilters() {
  const drugFilters = [
    {
      id: 'class',
      label: 'Class',
      type: 'multi-select',
      values: [
        { value: '00-preclinical', label: 'Preclinical' },
        { value: '10-phase1', label: 'Phase 1' },
        { value: '20-phase2', label: 'Phase 2' },
        { value: '30-phase3', label: 'Phase 3' },
        { value: '40-approved', label: 'Approved' }
      ]
    }, {
      id: 'target',
      label: 'Target / Pathway',
      type: 'multi-select',
      // generate based on the data
      values: _.chain(drugData)
        .map(d => d.nominalTarget)
        .keyBy('value')
        .values()
        .compact()
        .sortBy('label')
        .value()
    }
  ];

  return drugFilters;
}
