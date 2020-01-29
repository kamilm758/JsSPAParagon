import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {

    const {
      openModalFn
    } = this.props;

    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <button onClick={openModalFn}>KLIKAJ</button>
      </div>
    );
  }
}
// export const Layout = ({openModalFn}) => (
//   <div>
//       <NavMenu />
//       <Container>
//         {...props.children}
//       </Container>
//       <button onClick={openModalFn}>KLIKAJ</button>
//   </div>
// )

