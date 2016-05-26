import React from 'react';
import { Link } from 'react-router';

const propTypes = {
  cells: React.PropTypes.object,
  routeParams: React.PropTypes.object
};

class CellDetailPage extends React.Component {

  /**
  * Render out JSX for CellDetail.
  * @return {ReactElement} JSX markup.
  */
  render() {
    const { cells, routeParams } = this.props;
    const cellLineId = routeParams.cellLineId;

    let cell;
    if (cells) {
      cell = cells[cellLineId];
    } else {
      cell = {};
    }

    return (
      <div>
        <Link to="/cell_lines" className="btn btn-lg btn-default" role="button">Cell Line Browser</Link>
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

CellDetailPage.propTypes = propTypes;

export default CellDetailPage;