import React from 'react';
import { Link } from 'react-router';

const propTypes = {
  cells: React.PropTypes.object,
  routeParams: React.PropTypes.object
};

class CellDetail extends React.Component {

  /**
  * Render out JSX for CellDetail.
  * @return {ReactElement} JSX markup.
  */
  render() {
    const { cells, routeParams } = this.props;
    const cellId = routeParams.cellId;
    const cell = cells[cellId];

    return (
      <div>
        <Link to="/Cell/" className="btn btn-lg btn-default" role="button">List</Link>
        <Link to="/Cell/Cube/" className="btn btn-lg btn-default" role="button">Cube</Link>
        <h1>{ cell.name }</h1>
        <p>General Information</p>
        <table>
          <tbody>
            <tr>
              <td>Clinical subtype</td>
              <td>TNBC</td>
            </tr>
            <tr>
              <td>Transcription Subtype</td>
              <td>Non-malignant Basal</td>
            </tr>
            <tr>
              <td>HMS LINCS ID</td>
              <td>{ cell.lincs_id }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CellDetail.propTypes = propTypes;

export default CellDetail;
