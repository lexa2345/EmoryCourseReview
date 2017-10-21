import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import MainPageContainer from './MainPageContainer';
import SignUpPageContainer from './SignUpPageContainer';
import LoginPageContainer from './LoginPageContainer';
import ReviewPageContainer from './ReviewPageContainer';
import RegisterSuccessContainer from './RegisterSuccessContainer';
import ResendEmailContainer from './ResendEmailContainer';


export default class Routes extends Component {
   render() {
      return(
       <div>
         <Switch>
           <Route path="/" exact={true} component={MainPageContainer}/>
           <Route path="/signup" exact={true} component={SignUpPageContainer}/>
           <Route path="/success" exact={true} component={RegisterSuccessContainer}/>
           <Route path="/login" exact={true} component={LoginPageContainer}/>
           <Route path="/review" exact={true} component={ReviewPageContainer}/>
           <Route path="/resend" exact={true} component={ResendEmailContainer}/>
         </Switch>
       </div>
     )
   }
}
