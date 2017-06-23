import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class HeaderNav extends Component {

    render(){
            let isLogin = this.props.user.isLogin;
            return(
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1"
                                    aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Survey</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            { isLogin  ?
                                <ul className="nav navbar-nav">
                                    <li><Link to="/new">설문생성</Link></li>
                                </ul> : ""
                            }
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#" onClick={this.props.handleUserLogin.bind(this)}>{ isLogin ? "로그아웃":"로그인"}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
    }

}

HeaderNav.PropTypes = {
    user:PropTypes.object.isRequire,
    handleUserLogin:PropTypes.func.isRequire
}

export default HeaderNav;
