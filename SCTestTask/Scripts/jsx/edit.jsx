//"use strict";

//import React, { PropTypes } from 'react';

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : "2016-01-15T01:06"
        };
    }

    render() {
        return (
            <input type="date" ref={(date) => {this.dateRef = date;}} value={this.state.date} onChange={this._onDateChange.bind(this)}/>
        );
    }

    _onDateChange(e) {
        let state = this.state;
        state['date'] = e.target.value;
        // Or (you can use below method to access component in another method)
        state['date'] = this.dateRef.value;
        this.setState(state);
    }

}

//export default Calender;

class EditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: this.getId(), name: '', birthday: '1990-01-01', email: '', salary: 0 }

    }
    
    // Пролучаем список GET параметров страницы и возвращаем id сотрудника
    getId () {
        var getArray = {}; 
        var getString = window.location.search.substring(1).split("&"); 
        //console.log(getString);
        for(var i=0; i < getString.length; i++) { 
            var getVar = getString[i].split("="); 
            getArray[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
        } 
        //console.log(getArray);
        return getArray['id']
    }

    // Отправка Id и получение в ответ данных записи
	ajaxLoadEmployee ()  {
        var data_id = { 'id': this.state.id };
            $.ajax({
                url:  this.props.employeeUrl,
                type: 'POST',
                dataType: 'json',
                data: data_id,
                success: function (data) {
                    this.setState({name: data.Name});
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(data.Birthday);
                    var date = new Date(parseFloat(results[1]));
                    var strDate = date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                    this.setState({birthday: strDate});
                    this.setState({email: data.Email});
                    this.setState({salary: data.Salary});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.employeeUrl, status, err.toString());
                }.bind(this)
            });
    }

    componentDidMount() {
        if ( this.state.id > 0)
            this.ajaxLoadEmployee();
    } 

    onNameChange (event) {
        this.setState({name: event.target.value});
    }

    onBirthdayChange (event) {
        this.setState({birthday: event.target.value});
    }

    onEmailChange (event) {
        this.setState({email: event.target.value});
    }
     
    onSalaryChange (event) {
        this.setState({salary: event.target.value});
    }
    
    onCancel () {
        document.location.href = "/home";
    }

    onSave () {
        var data = { 'Id' : this.state.id,
                     'Name': this.state.name, 
                     'Birthday': this.state.birthday, 
                     'Email': this.state.email, 
                     'Salary': this.state.salary
                    };
        console.log('Data =', data);
        $.ajax({
            url:  this.props.saveUrl,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                document.location.href = "/home";
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.employeeUrl, status, err.toString());
            }.bind(this)
        });
    }

    render () {
        return <div>
            <h2>Elployee data</h2>
            <label>Name     </label><input type="text"   value={this.state.name}     onChange={this.onNameChange.bind(this)}/><br/>
            <label>Birthday </label><input type="date"   value={this.state.birthday} onChange={this.onBirthdayChange.bind(this)}/><br/>
            <label>Email    </label><input type="email"  value={this.state.email}    onChange={this.onEmailChange.bind(this)}/><br/>
            <label>Salary   </label><input type="number" value={this.state.salary}   onChange={this.onSalaryChange.bind(this)}/><br/>
            <input type="submit" value='Save' onClick={this.onSave.bind(this)}/> 
            <input type="reset" value='Cancel' onClick={this.onCancel.bind(this)}/> 
        </div>
    }
}

ReactDOM.render(
    <EditForm employeeUrl="/home/getemployee" saveUrl="/home/addreplaceemployee" />,
    document.getElementById("content")
  );