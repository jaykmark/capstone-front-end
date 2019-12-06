import React from 'react';
import axios from 'axios';
import SkillDetail from '../components/SkillDetail/SkillDetail';

class SkillDetailContainer extends React.Component {
  state = {
    skillDetail: ''
  };

  componentDidMount(){
    const skillId = this.props.location.pathname.split('/')[2]
    axios.get(`${process.env.REACT_APP_API_URL}/skills/${skillId}`)
      .then(res => {
        this.setState({
          skillDetail: res.data.data,
        })
      })
      .catch(err => console.log(err))
  }

  editSkill = (event, editedSkill) => {
    const skillId = editedSkill.id;
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/skills/${skillId}`, editedSkill)
      .then(res => {
        this.setState({
          skillDetail: res.data.data,
        })
      })
      .catch(err => console.log(err));
  };

  deleteSkill = (event, deletedSkill) => {
    event.preventDefault();
    axios.delete(`${process.env.REACT_APP_API_URL}/skills/${deletedSkill}`)
      .then(res => this.props.history.push('/profile'))
      .catch(err => console.log(err))
  };

  render() {
    return (
      <>
        {this.state.skillDetail && <SkillDetail skillDetail={this.state.skillDetail} editSkill={this.editSkill}deleteSkill={this.deleteSkill} /> }
      </>
    )
  }
}

export default SkillDetailContainer;