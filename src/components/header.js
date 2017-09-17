import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

 function handleTouchTap() {
alert('onClick triggered on the title component');
}

const styles = {
title: {
  cursor: 'pointer',
},
};

class Header extends Component {
   constructor(props) {
    super(props);
    this.state = {open: false};
  }

  renderLinks() {
    if (this.props.authenticated) {
      return [
          <Link key={1} className="nav-item" to="/signout"  onClick={(close) => this.setState({open: false})}>
            <MenuItem className="nav-link">Sign Out</MenuItem>
          </Link>,
          <Link key={2} className="nav-item" to="/listings"  onClick={(close) => this.setState({open: false})}>
            <MenuItem className="nav-link">Listings</MenuItem>
          </Link>,
          <Link key={3} className="nav-item" to="/create-listing"  onClick={(close) => this.setState({open: false})}>
            <MenuItem>Create Listing</MenuItem>
          </Link>,
          <Link key={4} className="nav-item" to="/search"  onClick={(close) => this.setState({open: false})}>
          <MenuItem>Search Listing</MenuItem>
        </Link>
      ]
    } else {
      return [
        
          <Link key={1} className="nav-item" to="/signin"  onClick={(close) => this.setState({open: false})}>
            <MenuItem>Sign In</MenuItem>
            </Link>,
          <Link key={2} className="nav-item" to="/signup"  onClick={(close) => this.setState({open: false})}>
            <MenuItem>Sign Up</MenuItem>
          </Link>,
          <Link key={3} className="nav-item" to="/feature"  onClick={(close) => this.setState({open: false})}>
            <MenuItem>Protected Site </MenuItem>
          </Link>,
          <Link key={4} className="nav-item" to="/search"  onClick={(close) => this.setState({open: false})}>
          <MenuItem>Search Listings</MenuItem>
        </Link>
      ]
    }
  }

  renderAppBar() {
    if (this.props.authenticated) {
      return [
        <AppBar
          key={0}
          title={<span style={styles.title}>Title</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu/></IconButton>}
          iconElementRight={<Link className="nav-item" to="/signout"><MenuItem className="white-text nav-item">Log Out</MenuItem></Link>}
        />
      ]
    } else {
      return [
        <AppBar
           key={0}
          title={<span style={styles.title}>Title</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu/></IconButton>}
          iconElementRight={<Link className="nav-item" to="/signin"><MenuItem className="white-text nav-item">Log In</MenuItem></Link>}
        />
      ]
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>

        {this.renderAppBar()}
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          children={this.renderLinks()}
          onRequestClose={this.handleClose}
         
        >
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps,)(Header)