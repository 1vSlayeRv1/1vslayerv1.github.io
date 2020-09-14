import React, {useState, forceUpdate} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import {PanelHeaderButton, PanelHeaderContent, PanelHeaderContext, View, InfoRow,Progress,File, Select, Header, Input,FormLayout, FormLayoutGroup, PanelHeaderBack, List, Card, CardGrid } from '@vkontakte/vkui/';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import './Preview.css'
const styles = {
	
	group: {
		minHeight:'80vh',
		height: '100%',
	},
	div: {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexFlow:"column"
	},
	cell:{
		backgroundColor:"#F5F5F5",
		marginTop:"12px",
	},

	button:{
		width:"100%",
	},
	file:{
		display: "block",
	maxHeight : "30vh",
		margin: "0 auto"

	},
	p:{
		fontSize: "13px",
		color: "#818C99",
		marginTop:"0"
	},
	h1:{
		marginBottom:"0",
		fontSize: "15px"
	},
	p2: {
		marginBottom:'10px',
		fontSize:'13px'
	},
	div2: {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		
	},
	prog: {
		


	},
	but: {
		float:"right",
		maxWidth:"30%",
		marginTop:"-5vh",
		marginRight:"4vh"
	}
	
	
	
}

// <PanelHeader left={<PanelHeaderBack onClick={go} data-to="dop"/>}>{localStorage.getItem('author') == 'm' ? 'Матвей Правосудов' : 'Анонимно'}</PanelHeader>


const Preview = ({ id, go, fetchedUser }) => {
	
	
 
 	let currentDay = new Date()
 	currentDay = currentDay.getDate()
 	
 	let dataLast = localStorage.getItem('data') - currentDay
	
 return (

	<Panel id={id}>
		<Example go={go}/>
		<Div>
		<img id="image1" src={localStorage.getItem('img')} style={styles.file} alt="yourimage"/>
		<h1 style = {styles.h1}>{localStorage.getItem('name')}</h1>
		<p style = {styles.p}>{localStorage.getItem('author') == 'm' ? 'Матвей Правосудов' : 'Анонимно'} &#183; Закончится через { dataLast} дней</p>
		<p style = {styles.p2}>Помогите первым</p>
		<InfoRow >
		<Progress value ={0} style = {styles.prog} />
		<Button size="l"mode="outline" style={styles.but}>Помочь</Button>
		</InfoRow>
		</Div>
		
<Div>
		<Button  id = "but" size="xl" style={styles.button}>Публиковать</Button>
	</Div> 
	

	</Panel>

);

}

Preview.propTypes = {
	id: PropTypes.string.isRequired,

	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Preview;
class Example extends React.Component {

  constructor (props) {
  	super(props)
    this.state = {
      contextOpened: false,
      mode: 'all',
      go: this.props.go
     
     
    }
    this.toggleContext = this.toggleContext.bind(this);
    this.select = this.select.bind(this);
  }

  toggleContext () {
    this.setState({ contextOpened: !this.state.contextOpened });
  }

  select (e) {
    const mode = e.currentTarget.dataset.mode;
    this.setState({ mode });
    requestAnimationFrame(this.toggleContext);
    if(localStorage.getItem('author') == 'm') {
    	if(mode === 'managed')
    	localStorage.setItem('author','a')
    } else {
    	if(mode === 'all')
    	localStorage.setItem('author','m')
    }
    
  }

  render () {

    return (
      
       <React.Fragment>
          <PanelHeader
            left={<PanelHeaderBack onClick={this.props.go} data-to="dop" />}
            
          >
            <PanelHeaderContent
              aside={<Icon16Dropdown style={{ transform: `rotate(${this.state.contextOpened ? '180deg' : '0'})` }} />}
              onClick={this.toggleContext}
            >
              {localStorage.getItem('author') == 'm' ? 'Матвей Правосудов' : 'Анонимно'}
            </PanelHeaderContent>
          </PanelHeader>
          <PanelHeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
            <List>
              <Cell
                before={<Icon28UsersOutline />}
                asideContent={this.state.mode === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
                onClick={this.select}
                data-mode="all"
              >
                Матвей Правосудов
              </Cell>
              <Cell
                before={<Icon28SettingsOutline />}
                asideContent={this.state.mode === 'managed' ? <Icon24Done fill="var(--accent)" /> : null}
                onClick={this.select}
                data-mode="managed"
              >
                 Анонимно
              </Cell>
            </List>
          </PanelHeaderContext>
        </React.Fragment>
      
    )
  }
}


