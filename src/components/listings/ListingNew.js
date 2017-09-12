// ListingNew shows ListingForm and ListingFormReview
import React, { Component } from 'react';
import ListingForm from './ListingForm';
import ListingFormReview from './ListingFormReview';

class ListingNew extends Component {
  state = { showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <ListingFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <ListingForm
        onListingSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div className="container" style={{marginTop:'75px'}}>
        {this.renderContent()}
      </div>
    );
  }
}

export default ListingNew;
