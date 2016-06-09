
import { getDataset } from './dataset';
import { sortByKey } from '../../common/utils/sort';
import { normalize } from '../../common/utils/string_utils';

export function getReceptors() {
  let datasetId = 'receptor_profile';
  return getDataset(datasetId).then((receptorData) => {
    return receptorData[0].measurements.map((measurement) => {

      return {label: measurement.receptor, value: normalize(measurement.receptor)};
    }).sort(sortByKey('value'));
  });
}
