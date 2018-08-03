import React from 'react';
import NotificationSystem from 'react-notification-system';


class Notifications extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notificationSystem: null,
      message: '',
      level: '',
    }
  }

  componentDidMount() {
    this.state.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.message !== ""){
      this.state.notificationSystem.addNotification({
        message: nextProps.message,
        level: 'success'
      });
    }
  }

  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default Notifications;
