import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as actions from '../../actions'
import {connect} from 'react-redux'

class SearchTable extends Component {
    componentDidMount(){
        this.props.fetchAllListings();
    }
    renderListings(){
        const listingColumns = [{
            Header: 'location',
            accessor: 'location' // String-based value accessors!
        }
        , {
            Header: 'availability',
            accessor: 'availability',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
        {
            Header: 'price',
            accessor: 'price',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
        {
            Header: 'items',
            id:'items',
            accessor: d=>d.items.length
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, 
        // {
        //     Header: props => <span>Friend Age</span>, // Custom header components!
        //     accessor: 'friend.age'
        // }
        ];
        const itemColumns = [
            {
            Header: 'condition',
            accessor:'condition'
        }, 
        {
            Header: 'bulb',
            accessor: 'bulb'
        },
        {
            Header: 'model',
            accessor: 'model'
        }];

        if (this.props.listings.length) {
            return  (
                <ReactTable
                    /* data={data} */
                    data={this.props.listings}
                    columns={listingColumns}
                    defaultPageSize={10}
                    /* pivotBy={["items"]} */
                    filterable
                    SubComponent={row => {
                        console.log(row);
                        return (
                        <div style={{ padding: "20px" }}>
                            <em>
                                (Add listing description here) 
                            </em>
                            
                            <br />
                            <br />
                            <ReactTable
                            data={row.original.items}
                            columns={itemColumns}
                            defaultPageSize={row.original.items.length}
                            showPagination={false}
                            SubComponent={row => {
                                return (
                                <div style={{ padding: "20px" }}>(Item image and details here)</div>
                                );
                            }}
                            />
                        </div>);
                        }
                    }
                />
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderListings()}
            </div>
        );
    }

}

function mapSatetoProps({listings}) {
    return {
        listings,
    //     // state
    };
}

export default connect(mapSatetoProps,actions)(SearchTable)