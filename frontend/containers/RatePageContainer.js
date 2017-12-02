import ReactStars from 'react-stars'
import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'

class RatePageContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        courseId: "",
        profID: "",
        comment:"",
        difficulty: 0.0,
        overall: 0.0,
        workload: 0.0
      }
      this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    componentWillMount() {
    console.log('mount');
    console.log(location.search);
    
    var querystring = require('query-string');
    var parsed = querystring.parse(location.search);
    console.log(parsed);
    console.log(parsed.course);
    console.log(parsed.prof);
    var pname = parsed.prof.replace("_",", ");
    this.state.courseId= parsed.course;
    this.state.profID= pname;
    console.log(this.state.courseId);
    console.log(this.state.profID);

  }

    updateComment(event){
      this.setState({comment: event.target.value});
      console.log(this.state.comment)
    }

    _handleKeyPress(e) {
      if (e.key === 'Enter') {
        
        e.preventDefault();
        this.submitReview();
        
        
      }
    }

    submitReview() {
      if(this.state.difficulty!=0 && this.state.overall!=0 && this.state.workload!=0)
      {
          // Send a POST request
          axios({
            method: 'post',
            url: '/course/add_rating',
            data: {
              class_id: this.state.courseId,
              prof_id: this.state.profID,
              difficulty_rating: this.state.difficulty,
              overall_rating: this.state.overall,
              workload_rating: this.state.workload,
              comment: this.state.comment
            }
          })
          .then(function (response) {
            console.log(response.status);
               if(response.data.message){
                 alert(response.data.message);
               }
               /*if(response.data.redirectUrl){
                 window.location.href =response.data.redirectUrl;
               }else{ */

                 window.location.href ='/rating'+location.search;
               //}
          })
          .catch(function (error) {
            console.log(error.response.data.message);
          });
      }
      else
      {
        alert("Must fill out all ratings");
      }

    }

render() {

  var titleurl='/rating'+location.search;

  const overallRating = (newRating) => {
    this.state.overall = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

  const difficultyRating = (newRating) => {
    this.state.difficulty = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

  const workloadRating = (newRating) => {
    this.state.workload = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

    return(
      <div>

      <div className = "header">
          <Link to={titleurl} className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span> Course Critique </Link>
      </div>

      <lbody >


        <div id="login-page" className="row">
          <div className="col l6 push-l3 m10 push-m1 s12 z-depth-4 card-panel nohover2" style={{position: 'relative' , top: '50px', padding: '0 48px'}}> 
            <form className="login-form">
              <div className="row">
                <div className="input-field col s12 center">
                  {this.state.courseId}
                  <br/>
                  {this.state.profID}
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <div className="inputs-sizes-rate">
                    <div className = "reate-body-title">Easiness</div>
                    <ReactStars
                      count={5}
                      value={this.state.difficulty}
                      onChange={difficultyRating}
                      size={24}
                      half={false}
                      color2={'#ffd700'} />
                  </div>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <div className="inputs-sizes-rate">
                    <div className = "reate-body-title">Workload</div>
                    <ReactStars
                      count={5}
                      value={this.state.workload}
                      onChange={workloadRating}
                      size={24}
                      half={false}
                      color2={'#ffd700'} />
                  </div>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <div className="inputs-sizes-rate">
                    <div className = "reate-body-title">Overall</div>
                    <ReactStars
                      count={5}
                      value={this.state.overall}
                      onChange={overallRating}
                      size={24}
                      half={false}
                      color2={'#ffd700'} />
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" type="text" className="materialize-textarea" value={this.state.comment} onChange= {(event) => this.updateComment(event)} style={{}}></textarea>
                    <label htmlFor="icon_prefix2">Make a comment on this class</label>
                  </div>
                </div>
              </div>
            </div>
        
              <div className="row margin">
                <div className="input-field col s12">
                  <div className="submit-button-row">
                    <button
                    className="btn-large waves-effect waves-light"
                    type="button" onClick={() => this.submitReview()}>
                    submit review!
                    </button>
                  </div>
                </div>
              </div>
              

            </form>
          </div>
        </div>



      </lbody>

      

      </div>
      )
    }
  };

const mapStateToProps = (state) => {
  return{
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatePageContainer);
